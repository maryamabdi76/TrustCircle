'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { PATHS } from '@/constants/PATHS';

interface AuthPromptProps {
  redirectPath?: string;
  message?: string;
  className?: string;
}

export const AuthPrompt = ({
  redirectPath,
  message,
  className,
}: AuthPromptProps) => {
  const t = useTranslations('Auth');
  const router = useRouter();
  const pathname = usePathname();

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const returnUrl = encodeURIComponent(redirectPath || pathname);
    router.push(`${PATHS.SIGNIN.ROOT}?returnUrl=${returnUrl}`);
  };

  return (
    <div className={`bg-muted p-4 rounded-lg w-full ${className}`}>
      <CardTitle className="text-center mb-2">{t('pleaseSignIn')}</CardTitle>
      <CardDescription className="text-center mb-4">
        {message || t('signInToContinue')}
      </CardDescription>
      <Button onClick={handleSignIn} className="w-full">
        {t('signIn')}
      </Button>
    </div>
  );
};
