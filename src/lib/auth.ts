import bcrypt from 'bcryptjs';
import { DefaultSession, getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import {
  createUser,
  findUserByEmail,
  findUserByProviderId,
} from '@/app/api/auth/userRepo';
import { PATHS } from '@/constants/PATHS';

// Extend session type to include user ID
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
  }

  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Email + Password Authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await findUserByEmail(credentials.email);
        if (!user) return null;

        // Compare hashed password
        const isValid = bcrypt.compareSync(
          credentials.password,
          user?.password
        );
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),

    // Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',

  pages: {
    signIn: PATHS.SIGNIN.ROOT,
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        // Check if user already exists in DB
        const existingUser = findUserByProviderId(
          'google',
          account.providerAccountId!
        );
        if (!existingUser) {
          // Create new user in DB
          createUser({
            name: user.name || '',
            email: user.email || '',
            image: user.image || '',
            provider: 'google',
            providerAccountId: account.providerAccountId,
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const validateSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session;
};
