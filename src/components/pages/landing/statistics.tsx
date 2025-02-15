export const Statistics = () => {
  return (
    <section className="bg-muted dark:bg-gray-800 py-12">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-900 dark:text-white">
          <div>
            <h3 className="text-4xl font-bold mb-2">100K+</h3>
            <p className="text-muted-foreground">Verified Reviews</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">10K+</h3>
            <p className="text-muted-foreground">Trusted Shops</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">50K+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
        </div>
      </div>
    </section>
  );
};
