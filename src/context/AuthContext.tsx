'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
type AuthView = 'signup' | 'login' | 'forgot' | 'reset' | 'success';

interface SignupFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface ForgotFormData {
  email: string;
}

interface ResetFormData {
  password: string;
  confirm: string;
}

interface FormData {
  signup: SignupFormData;
  login: LoginFormData;
  forgot: ForgotFormData;
  reset: ResetFormData;
}

interface AuthContextType {
  activeView: AuthView;
  setActiveView: (view: AuthView) => void;
  formData: FormData;
  updateFormData: <T extends keyof FormData, K extends keyof FormData[T]>(
    view: T,
    field: K,
    value: FormData[T][K]
  ) => void;
  clearFormData: (view?: keyof FormData) => void;
  onComplete: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
  onComplete: () => void;
  initialView?: AuthView;
}

// Initial form data
const initialFormData: FormData = {
  signup: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    acceptedTerms: false,
  },
  login: {
    email: '',
    password: '',
  },
  forgot: {
    email: '',
  },
  reset: {
    password: '',
    confirm: '',
  },
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({
  children,
  onComplete,
  initialView = 'signup',
}: AuthProviderProps) {
  const [activeView, setActiveView] = useState<AuthView>(initialView);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = <T extends keyof FormData, K extends keyof FormData[T]>(
    view: T,
    field: K,
    value: FormData[T][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [view]: {
        ...prev[view],
        [field]: value,
      },
    }));
  };

  const clearFormData = (view?: keyof FormData) => {
    if (view) {
      setFormData((prev) => ({
        ...prev,
        [view]: initialFormData[view],
      }));
    } else {
      setFormData(initialFormData);
    }
  };

  const value: AuthContextType = {
    activeView,
    setActiveView,
    formData,
    updateFormData,
    clearFormData,
    onComplete,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}