import { Globe } from 'lucide-react';

interface WebsiteLinkProps {
  websiteUrl: string;
  label?: string;
}

export const WebsiteLink = ({ websiteUrl, label }: WebsiteLinkProps) => {
  return (
    <a
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 hover:text-primary transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="truncate">
        {label || websiteUrl.replace('https://', '')}
      </span>
    </a>
  );
};
