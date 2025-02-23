'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useState } from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const ClientProvider: FC<IProps> = ({ children, className }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
