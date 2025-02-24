import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { PATHS } from '@/constants/PATHS';

export function ReviewAuth() {
  const t = useTranslations('Reviews');
  const router = useRouter();

  return (
    <div className="bg-muted p-4 rounded-lg">
      <CardTitle className="text-center mb-2">{t('pleaseSignIn')}</CardTitle>
      <CardDescription className="text-center mb-4">
        {t('signInToReview')}
      </CardDescription>
      <Button onClick={() => router.push(PATHS.SIGNIN.ROOT)} className="w-full">
        {t('signIn')}
      </Button>
    </div>
  );
}
