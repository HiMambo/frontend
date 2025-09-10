import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { CreateUserData, createOrUpdateUser } from './api'

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      // Determine login type based on provider
      const loginType = account?.provider === 'google' ? 'google' : 'credentials';
      
      // For now, default all users to 'client'
      const userType = 'client';

      if (user.email) {
        const userData: CreateUserData = {
          user_email: user.email,
          login_type: loginType,
          user_type: userType,
        };
        
        // Create or update user in your backend
        console.log('Attempting to create user in backend, with userData:', userData)
        const success = await createOrUpdateUser(userData);
        
        if (!success) {
          console.warn('Failed to create user in backend, but allowing sign in to continue');
        }
      }

      return true;
    },

    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}