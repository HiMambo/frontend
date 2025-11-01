//showNext and showBack will be removed when step dependencies are implemented in the context, as the dependencies will handle this on their own
//eg. if step 1 is locked, step 2 won't show back button

export const ONBOARDING_STEP_DEFINITIONS = [
  {
    step: 1,
    label: 'Account Details',
    title: 'Create Free Account',
    completedTitle: 'Account Details',
    component: 'CreateAccountForm',
    route: '/register-experience/account-details',
    showBackButton: false,
    showNextButton: true,
  },
  {
    step: 2,
    label: 'Business Details',
    title: 'Business Details',
    completedTitle: 'Business Details Added',
    component: 'BusinessDetailsForm',
    route: '/register-experience/business-details',
    showBackButton: true,
    showNextButton: true,
  },
  {
    step: 3,
    label: 'Documents',
    title: 'Upload Documents',
    completedTitle: 'Documents Uploaded',
    component: 'DocumentsForm',
    route: '/register-experience/documents',
    showBackButton: true,
    showNextButton: true,
  },
  {
    step: 4,
    label: 'Experience Info',
    title: 'Experience Information',
    completedTitle: 'Experience Added',
    component: 'ExperienceInfoForm',
    route: '/register-experience/experience-info',
    showBackButton: true,
    showNextButton: true,
  },
  {
    step: 5,
    label: 'Sustainability',
    title: '',
    completedTitle: '',
    component: 'SustainabilityVerificationForm',
    route: '/register-experience/sustainability-verification',
    showBackButton: true,
    showNextButton: true,
  },
  {
    step: 6,
    label: 'Final Submission',
    title: '',
    completedTitle: '',
    component: 'RegistrationSuccess',
    route: '/register-experience/success',
    showBackButton: true,
    showNextButton: false,
  },
];

import {
  User,
  UserCheck,
  Store,
  FileQuestion,
  FileCheck,
  CircleAlert,
  Leaf,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export const ONBOARDING_STEP_ICONS = [
  {
    incomplete: User,
    completed: UserCheck,
  },
  {
    incomplete: Store,
    completed: Store,
  },
  {
    incomplete: FileQuestion,
    completed: FileCheck,
  },
  {
    incomplete: CircleAlert,
    completed: CircleAlert,
  },
  {
    incomplete: Leaf,
    completed: Leaf,
  },
  {
    incomplete: ToggleLeft,
    completed: ToggleRight,
  },
];