import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { PATHS } from '@/constants/PATHS';

export function ReviewAuth() {
  const t = useTranslations('Reviews');
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  const handleSignIn = () => {
    const returnUrl = encodeURIComponent(pathname);
    router.push(`${PATHS.SIGNIN.ROOT}?returnUrl=${returnUrl}`);
  };

  return (
    <div className="bg-muted p-4 rounded-lg">
      <CardTitle className="text-center mb-2">{t('pleaseSignIn')}</CardTitle>
      <CardDescription className="text-center mb-4">
        {t('signInToReview')}
      </CardDescription>
      <Button onClick={handleSignIn} className="w-full">
        {t('signIn')}
      </Button>
    </div>
  );
}
