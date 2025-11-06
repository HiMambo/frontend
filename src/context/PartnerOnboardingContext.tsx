"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  CreateAccountFormData,
  BusinessDetailsFormData,
  DocumentsFormData,
  ExperienceFormData, //Future: Should eventually be merged with the existing experience interface, as they should be the same
  SustainabilityVerificationFormData,
} from "@/lib/validation/onboarding";

// Consolidated onboarding data structure
export interface OnboardingFormData {
  step1: CreateAccountFormData | null;
  step2: BusinessDetailsFormData | null;
  step3: DocumentsFormData | null;
  step4: ExperienceFormData[];
  step5: SustainabilityVerificationFormData | null;
}

interface OnboardingContextValue {
  // Form data
  formData: OnboardingFormData;
  
  // Actions
  updateStep1: (data: CreateAccountFormData) => void;
  updateStep2: (data: BusinessDetailsFormData) => void;
  updateStep3: (data: DocumentsFormData) => void;
  updateStep4: (data: ExperienceFormData[]) => void;
  updateStep5: (data: SustainabilityVerificationFormData) => void;

  updateSingleExperience: (index: number, data: ExperienceFormData) => void;

  // Hydrate from backend (future use)
  hydrateFromBackend: (data: Partial<OnboardingFormData>) => void;
  
  // Reset
  resetAllData: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

// Default values for each step
export const defaultCreateAccountData: CreateAccountFormData = {
  fullName: "",
  phone: "",
  email: "",
  languages: [],
  role: "",
  password: "",
  confirmPassword: "",
  acceptedTerms1: false,
  acceptedTerms2: false,
  acceptedTerms3: false,
};

export const defaultBusinessDetailsData: BusinessDetailsFormData = {
  businessName: "",
  website: "",
  country: "",
  address: "",
  yearFounded: "",
  category: "",
  description: "",
};

export const defaultDocumentsData: DocumentsFormData = {
  files: [],
  selectedTypes: [],
};

export const defaultExperienceData: ExperienceFormData = {
  title: "",
  category: "",
  country: "",
  location: "",
  pricePerPerson: { min: "", max: "", currency: "" },
  duration: { number: "", units: "" },
  highlights: [
    { symbolId: "", input: "" },
    { symbolId: "", input: "" },
  ],
  specialFeatures: [],
  sdgs: [],
  longDescription: "",
  maxGuests: 1,
  refundable: "",
  heroImage: null,
  galleryImages: [],
  videoLink: "",
};

export const defaultSustainabilityData: SustainabilityVerificationFormData = {
  people: "",
  planet: "",
  partnerships: "",
  peace: "",
  prosperity: "",
  files: [],
};

// Initial empty state
const initialFormData: OnboardingFormData = {
  step1: null,
  step2: null,
  step3: null,
  step4: [],
  step5: null,
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);

  // Step-specific updaters
  const updateStep1 = useCallback((data: CreateAccountFormData) => {
    setFormData((prev) => ({ ...prev, step1: data }));
  }, []);

  const updateStep2 = useCallback((data: BusinessDetailsFormData) => {
    setFormData((prev) => ({ ...prev, step2: data }));
  }, []);

  const updateStep3 = useCallback((data: DocumentsFormData) => {
    setFormData((prev) => ({ ...prev, step3: data }));
  }, []);

  const updateStep4 = useCallback((data: ExperienceFormData[]) => {
    setFormData((prev) => ({ ...prev, step4: data }));
  }, []);

  const updateStep5 = useCallback((data: SustainabilityVerificationFormData) => {
    setFormData((prev) => ({ ...prev, step5: data }));
  }, []);

  const updateSingleExperience = useCallback((index: number, data: ExperienceFormData) => {
    setFormData((prev) => {
      const newStep4 = [...prev.step4];
      
      // Ensure array is large enough
      while (newStep4.length <= index) {
        newStep4.push(defaultExperienceData);
      }
      
      newStep4[index] = data;
      return { ...prev, step4: newStep4 };
    });
  }, []);

  // Hydrate from backend response (future use)
  const hydrateFromBackend = useCallback((data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  }, []);

  // Reset all data
  const resetAllData = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const value: OnboardingContextValue = {
    formData,
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    updateStep5,
    updateSingleExperience,
    hydrateFromBackend,
    resetAllData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom hook to use the context
export function useOnboardingData() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboardingData must be used within OnboardingProvider");
  }
  return context;
}