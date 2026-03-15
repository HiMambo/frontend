import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';

export function useGoogleAuth(onComplete: () => void) {
  const [isGoogleLoading, setisGoogleLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setisGoogleLoading(true);
    try {
      const result = await signIn('google', { redirect: false });

      if (result?.error) {
        console.error('Google sign in error:', result.error);
      } else if (result?.ok) {
        // Wait for session to be established
        await new Promise(resolve => setTimeout(resolve, 1000));

        const session = await getSession();
        if (session?.user) {
          console.log('Authentication successful:', session.user);
          onComplete();
        }
      }
    } catch (err) {
      console.error('Google auth error:', err);
    } finally {
      setisGoogleLoading(false);
    }
  };

  return { isGoogleLoading, handleGoogleAuth };
}
