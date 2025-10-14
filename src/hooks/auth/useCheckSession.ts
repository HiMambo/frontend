import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

export function useCheckSession(onComplete: () => void, autoCheckSession = true) {
  const [isChecking, setIsChecking] = useState(autoCheckSession);

  useEffect(() => {
    if (!autoCheckSession) {
      setIsChecking(false);
      return;
    }

    const checkExistingSession = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          console.log('User already logged in:', session.user);
          onComplete();
        }
      } catch (err) {
        console.error('Error checking session:', err);
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingSession();
  }, [onComplete, autoCheckSession]);

  return isChecking;
}
