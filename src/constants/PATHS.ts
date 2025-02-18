export const PATHS = {
  LANDING: {
    ROOT: '/',
  },
  SIGNUP: {
    ROOT: '/auth/signup',
  },
  SIGNIN: {
    ROOT: '/auth/signin',
  },
  FORGOT_PASSWORD: {
    ROOT: '/auth/forgot-password',
  },
  LOGIN: {
    ROOT: '/login',
  },
  BUSINESSES: {
    ROOT: '/businesses',
  },
  REVIEWS: {
    ROOT: '/reviews',
    WRITE: (businessId: string) => `/reviews/write/${businessId}`,
  },
  BLOG: {
    ROOT: '/blog',
  },
  REVIEW: {
    WRITE: '/write-review',
  },
};
