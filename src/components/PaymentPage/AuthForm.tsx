'use client';
import { useState, useEffect, useCallback } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useBookingSteps } from '@/context/BookingStepsContext';
import { Login } from '../shared/AuthTabs/Login';
import { SignUp } from '../shared/AuthTabs/SignUp';
import { ForgotPassword } from '../shared/AuthTabs/ForgotPassword';

export function AuthForm() {
  const { goToNextStep, markStepComplete } = useBookingSteps();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeView, setActiveView] = useState<'signup' | 'login' | 'forgot'>('signup');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const onComplete = useCallback(() => {
    markStepComplete(1);
    goToNextStep();
  }, [markStepComplete, goToNextStep]);

  // Check if user is already logged in on component mount
  useEffect(() => {
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
        setIsCheckingAuth(false);
      }
    };

    checkExistingSession();
  }, [onComplete]);

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    
    try {
      const result = await signIn('google', {
        redirect: false,
      });
      
      if (result?.error) {
        console.error('Google sign in error:', result.error);
      } else if (result?.ok) {
        // Wait a moment for the session to be established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if session was created
        const session = await getSession();
        if (session?.user) {
          console.log('Authentication successful:', session.user);
          onComplete();
        }
      }
    } catch (err) {
      console.error('Google auth error:', err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="bg-surface items-center w-[var(--width-authscreen)]">
        <div className="flex flex-col items-center gap-[var(--spacing-600)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="body-m text-tertiary">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-[var(--width-authscreen)]'>
      {activeView === 'signup' ? (
        <SignUp 
          onSwitchToLogin={() => setActiveView('login')}
          onGoogleAuth={handleGoogleAuth}
          isGoogleLoading={isGoogleLoading}
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
          onComplete={onComplete}
        />
      ) : activeView === 'login' ? (
        <Login 
          onSwitchToSignup={() => setActiveView('signup')}
          onSwitchToForgot={() => setActiveView('forgot')}
          onGoogleAuth={handleGoogleAuth}
          isGoogleLoading={isGoogleLoading}
          onComplete={onComplete}
        />
      ) : (
        <ForgotPassword 
          onSwitchToSignup={() => setActiveView('signup')}
          onSwitchToLogin={() => setActiveView('login')}
        />)}
    </div>
  );
}