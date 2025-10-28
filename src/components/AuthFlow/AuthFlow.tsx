'use client';

import { Login } from './AuthTabs/Login';
import { SignUp } from './AuthTabs/SignUp';
import { ForgotPassword } from './AuthTabs/ForgotPassword';
import { ResetPassword } from './AuthTabs/ResetPassword';
import { Success } from './AuthTabs/Success';
import { useCheckSession } from '@/hooks/auth/useCheckSession';
import { useAuth } from '@/context/AuthContext';

interface AuthFlowProps {
  autoCheckSession?: boolean;
}

export function AuthFlow({ 
  autoCheckSession = true
}: AuthFlowProps) {
  const {activeView, onComplete } = useAuth();
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
      {activeView === 'signup' && <SignUp />}
      {activeView === 'login' && <Login />}
      {activeView === 'forgot' && <ForgotPassword />}
      {activeView === 'reset' && <ResetPassword />}
      {activeView === 'success' && <Success />}
    </div>
  );
}
