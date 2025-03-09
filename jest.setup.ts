import '@testing-library/jest-dom';

// Mock `NextResponse.json` to prevent errors
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({ json: () => data })),
  },
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/current-page'),
}));
