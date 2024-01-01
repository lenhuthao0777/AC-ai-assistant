import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';

import { db } from './prisma';

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text', label: 'email' },
        password: {
          type: 'text',
          label: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const checkPass = await compare(
          credentials.password,
          user?.password as string
        );

        if (!user || !checkPass) return null;

        return {
          id: user?.id,
          email: user?.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  // adapter: PrismaAdapter(db),
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-up',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.email,
          image: '',
        };
      }
      return token;
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          image: ''
        },
      };
    },
  },
};

export const useServerSession = () => getServerSession(options);
