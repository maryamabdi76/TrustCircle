import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PATHS } from '@/constants/PATHS';

export function BusinessNotFound() {
  const t = useTranslations('Reviews');
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{t('businessNotFound')}</CardTitle>
          <CardDescription>{t('businessNotFoundDescription')}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => router.push(PATHS.BUSINESSES.ROOT)}
          >
            {t('backToBusinesses')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
