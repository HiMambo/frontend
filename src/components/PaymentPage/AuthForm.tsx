'use client';
import { useState } from 'react';
import { Login } from '../shared/AuthTabs/Login';
import { SignUp } from '../shared/AuthTabs/SignUp';
import { ForgotPassword } from '../shared/AuthTabs/ForgotPassword';
import { useCheckSession } from '@/hooks/auth/useCheckSession';

interface AuthFormProps {
  onComplete: () => void;
  initialView?: 'signup' | 'login';
  autoCheckSession?: boolean;
}

export function AuthForm({ 
  onComplete, 
  initialView = 'signup',
  autoCheckSession = true
}: AuthFormProps) {
  const [activeView, setActiveView] = useState<'signup' | 'login' | 'forgot'>(initialView);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const isCheckingAuth = useCheckSession(onComplete, autoCheckSession);

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
    <div className="w-[var(--width-authscreen)]">
      {activeView === 'signup' ? (
        <SignUp
          onSwitchToLogin={() => setActiveView('login')}
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
          onComplete={onComplete}
        />
      ) : activeView === 'login' ? (
        <Login
          onSwitchToSignup={() => setActiveView('signup')}
          onSwitchToForgot={() => setActiveView('forgot')}
          onComplete={onComplete}
        />
      ) : (
        <ForgotPassword
          onSwitchToSignup={() => setActiveView('signup')}
          onSwitchToLogin={() => setActiveView('login')}
        />
      )}
    </div>
  );
}
