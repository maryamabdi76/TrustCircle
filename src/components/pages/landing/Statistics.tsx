import { useTranslations } from 'next-intl';

export const Statistics = () => {
  const t = useTranslations('LandingPage');

  const stats = ['reviews', 'shops', 'users'];

  return (
    <section className="bg-muted py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat} className="p-6 bg-card rounded-lg shadow-md">
              <h3 className="text-4xl font-bold mb-2">
                {t(`statistics.${stat}.number`)}
              </h3>
              <p className="text-muted-foreground">
                {t(`statistics.${stat}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
