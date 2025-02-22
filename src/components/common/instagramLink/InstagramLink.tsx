import { Instagram } from 'lucide-react';

interface InstagramLinkProps {
  username: string;
  label?: string;
}

export const InstagramLink = ({ username, label }: InstagramLinkProps) => {
  return (
    <a
      href={`https://instagram.com/${username.replace('@', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 hover:text-primary transition-colors"
    >
      <Instagram className="w-4 h-4" />
      <span className="truncate" dir="ltr">
        {label || username}
      </span>
    </a>
  );
};
