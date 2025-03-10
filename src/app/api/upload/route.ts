import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

import { validateSession } from '@/lib/auth'; // Ensure correct import path
import { handleError } from '@/lib/server-utils';
import { put } from '@vercel/blob';
import { handleUpload, HandleUploadBody } from '@vercel/blob/client';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Validate user session
    const session = await validateSession();

    if (!session?.user?.id) {
      return handleError({ message: 'Unauthorized', status: 401 });
    }

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      return handleDirectUpload(request, session.user.id);
    } else if (contentType.includes('application/json')) {
      return handleClientUpload(request, session.user.id);
    }

    return handleError({ message: 'Unsupported content type', status: 400 });
  } catch (error) {
    return handleError({
      error,
      message: 'Unauthorized or upload failed',
      status: 401,
    });
  }
}

/**
 * Handles direct file uploads via FormData.
 */
async function handleDirectUpload(
  request: Request,
  userId: string
): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return handleError({ message: 'No file provided', status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return handleError({ message: 'File must be an image', status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return handleError({
        message: 'File size exceeds 5MB limit',
        status: 400,
      });
    }

    // Generate a unique filename
    const filename = `${userId}-${nanoid()}-${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      ''
    )}`;

    // Upload to Vercel Blob Storage
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({
      url: blob.url,
      success: true,
    });
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to upload file',
      status: 500,
    });
  }
}

/**
 * Handles client-assisted uploads using handleUpload.
 */
async function handleClientUpload(
  request: Request,
  userId: string
): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({ userId }), // Include user ID for tracking
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Blob upload completed:', blob, tokenPayload);

        try {
          // Example: Update user data in the database
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          console.log('🚀 ~ onUploadCompleted: ~ error:', error);
          throw new Error('Could not update user');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return handleError({ error, message: 'Upload failed', status: 400 });
  }
}
