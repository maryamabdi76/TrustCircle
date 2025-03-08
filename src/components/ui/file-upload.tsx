'use client';

import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const variants = {
  base: 'relative rounded-md p-4 transition-colors flex justify-center items-center flex-col cursor-pointer border border-dashed border-muted-foreground/25',
  active: 'border-primary/50 bg-primary/5',
  disabled: 'opacity-50 cursor-not-allowed bg-muted',
  accept: 'border-primary/50 bg-primary/5',
  reject: 'border-destructive/50 bg-destructive/5',
};

type InputProps = {
  width?: number;
  height?: number;
  className?: string;
  value?: string[];
  onChange?: (files: string[]) => void | Promise<void>;
  onFilesChange?: (files: File[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
  maxFiles?: number;
};

const FileUpload = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      onFilesChange,
      value = [],
      width,
      height,
      className,
      disabled = false,
      dropzoneOptions,
      maxFiles = 5,
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<string[]>(value || []);
    const [isUploading, setIsUploading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // This will only run when the value prop changes from outside the component
    React.useEffect(() => {
      const valueStr = JSON.stringify(value);
      const filesStr = JSON.stringify(files);

      if (valueStr !== filesStr) {
        setFiles(value || []);
      }
    }, [value]);

    // Convert file to base64
    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    };

    // Check if a string is a base64 data URL
    const isBase64Image = (url: string): boolean => {
      return url.startsWith('data:image/');
    };

    const onDrop = React.useCallback(
      async (acceptedFiles: File[]) => {
        if (disabled) return;
        if (files.length + acceptedFiles.length > maxFiles) {
          setError(`You can only upload up to ${maxFiles} images`);
          return;
        }

        setIsUploading(true);
        setError(null);

        try {
          if (onFilesChange) {
            await onFilesChange(acceptedFiles);
          }

          // Try to upload to Vercel Blob Storage first
          const uploadedImages = await Promise.all(
            acceptedFiles.map(async (file) => {
              try {
                // Create a FormData instance
                const formData = new FormData();
                formData.append('file', file);

                // Try to upload to server
                const response = await fetch('/api/upload', {
                  method: 'POST',
                  body: formData,
                });

                if (!response.ok) {
                  throw new Error('Failed to upload image');
                }

                const data = await response.json();
                return data.url; // Return the URL from your server
              } catch (error) {
                console.error(
                  'Server upload error, falling back to base64:',
                  error
                );
                // Fallback to base64 if server upload fails
                return fileToBase64(file);
              }
            })
          );

          const newFiles = [...files, ...uploadedImages];
          setFiles(newFiles);
          if (onChange) {
            onChange(newFiles);
          }
        } catch (err) {
          console.error('Upload error:', err);
          setError('Failed to upload images');
        } finally {
          setIsUploading(false);
        }
      },
      [disabled, files, maxFiles, onChange, onFilesChange]
    );

    const removeFile = (index: number) => {
      if (disabled) return;
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      if (onChange) {
        onChange(newFiles);
      }
    };

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      },
      maxSize: 5 * 1024 * 1024, // 5MB
      disabled: disabled || isUploading || files.length >= maxFiles,
      ...dropzoneOptions,
    });

    const dropzoneClassName = React.useMemo(
      () =>
        cn(
          variants.base,
          isDragActive && variants.active,
          isDragAccept && variants.accept,
          isDragReject && variants.reject,
          disabled && variants.disabled,
          className
        ),
      [isDragActive, isDragAccept, isDragReject, disabled, className]
    );

    return (
      <div className="space-y-4">
        <div
          {...getRootProps({
            className: dropzoneClassName,
            style: {
              width,
              height,
            },
          })}
        >
          <input ref={ref} {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-xs text-muted-foreground gap-2">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            {isUploading ? (
              <div className="text-center">
                <div className="mt-1 text-sm">Uploading...</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mt-1 text-sm font-medium">
                  {files.length >= maxFiles
                    ? `Maximum ${maxFiles} images reached`
                    : `Drag & drop images or click to browse`}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, GIF, WEBP up to 5MB
                </div>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-md overflow-hidden border"
              >
                <Image
                  src={file || '/placeholder.svg'}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={isBase64Image(file)} // Only set unoptimized for base64 images
                />
                {!disabled && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
