import { del } from '@vercel/blob';

/**
 * Deletes an image from Vercel Blob Storage
 * @param url The URL of the image to delete
 * @returns A promise that resolves when the image is deleted
 */
export async function deleteImage(url: string): Promise<boolean> {
  try {
    if (!url || url.startsWith('data:')) return true;

    // Extract the filename from the URL
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);

    await del(filename);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * Validates if a URL is a valid image URL
 * @param url The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  // Allow data URLs for development
  if (url.startsWith('data:image/')) return true;

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch (error) {
    console.log('🚀 ~ isValidImageUrl ~ error:', error);
    return false;
  }
}
