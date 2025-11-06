import { z } from "zod";

// Step 1: Create Account Schema
export const createAccountSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  role: z.string().min(1, "Role is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptedTerms1: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms of Service",
  }),
  acceptedTerms2: z.boolean().refine((val) => val === true, {
    message: "You must accept the Privacy Policy",
  }),
  acceptedTerms3: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Step 2: Business Details Schema
export const businessDetailsSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  website: z.string().url("Must be a valid URL"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(5, "Address is required"),
  yearFounded: z.string()
    .regex(/^\d{4}$/, "Must be a valid year")
    .refine((val) => {
      const year = parseInt(val);
      return year >= 1900 && year <= new Date().getFullYear();
    }, "Year must be between 1900 and current year"),
  category: z.string().min(1, "Category is required"),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(250, "Description must be at most 250 characters"),
});

// Step 3: Documents Schema
export const documentsSchema = z.object({
  files: z.array(z.instanceof(File))
    .min(1, "At least one document is required")
    .refine((files) => {
      return files.every(file => file.size <= 1024 * 1024); // 1MB
    }, "Each file must be less than 1MB"),
  selectedTypes: z.array(z.string())
    .min(1, "Select at least one document type"),
});

// Step 4: Experience Schema
export const experienceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Category is required"),
  country: z.string().min(1, "Country is required"),
  location: z.string().min(3, "Location is required"),
  pricePerPerson: z.object({
    min: z.string().min(1, "Minimum is required"),
    max: z.string().min(1, "Maximum is required"),
    currency: z.string().min(1, "Currency is required"),
  })
  .refine((data) => {
    const minNum = parseFloat(data.min);
    return !isNaN(minNum) && minNum > 0;
  }, {
    message: "Min price must be a valid positive number",
    path: ["min"],
  })
  .refine((data) => {
    const maxNum = parseFloat(data.max);
    return !isNaN(maxNum) && maxNum > 0;
  }, {
    message: "Max price must be a valid positive number",
    path: ["max"],
  })
  .refine((data) => {
    // Only check min <= max if both are valid numbers
    if (data.min === "" || data.max === "") return true;
    
    const minNum = parseFloat(data.min);
    const maxNum = parseFloat(data.max);
    
    if (isNaN(minNum) || isNaN(maxNum)) return true;
    
    return minNum <= maxNum;
  }, {
    message: "Max price must be greater than or equal to min price",
    path: ["max"],
  }),
  duration: z.object({
    number: z.string()
      .min(1, "Duration is required")
      .regex(/^\d*\.?\d*$/, "Duration must be a valid number"),
    units: z.string().min(1, "Time frame is required"),
  }),
  highlights: z.array(
    z.object({
      symbolId: z.string()
        .min(1, "Select a symbol"),
      input: z.string()
        .min(2, "Enter a short highlight description"),
    })
  ),
  specialFeatures: z.array(z.string()),
  sdgs: z.array(z.string()).min(1, "Select at least one SDG"),
  longDescription: z.string().min(50, "Description must be at least 50 characters"),
  maxGuests: z.number().min(1, "Must accommodate at least 1 guest"),
  refundable: z.string().min(1, "Refundability is required"),
  heroImage: z.instanceof(File)
  .nullable()
  .refine((file) => file !== null, {
    message: "Hero image is required",
  }),
  galleryImages: z.array(z.instanceof(File)),
  videoLink: z.string().refine(
    (val) => {
      // If empty, it's valid
      if (val === "") return true;
      // If provided, must be valid URL
      return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|drive\.google\.com)\//.test(val);
    },
    { message: "Must be a valid YouTube or Google Drive link" }
  ),
});

export const experiencesArraySchema = z.object({
  experiences: z.array(experienceSchema)
    .min(1, "At least one experience is required")
    .max(3, "Maximum 3 experiences allowed"),
});

// Step 5: Sustainability Verification Schema
export const sustainabilityVerificationSchema = z.object({
  people: z.string().min(20, "Please provide at least 20 characters"),
  planet: z.string().min(20, "Please provide at least 20 characters"),
  partnerships: z.string().min(20, "Please provide at least 20 characters"),
  peace: z.string().min(20, "Please provide at least 20 characters"),
  prosperity: z.string().min(20, "Please provide at least 20 characters"),
  files: z.array(z.instanceof(File))
    .max(5, "Maximum 5 documents allowed")
    .refine((files) => {
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      return totalSize <= 10 * 1024 * 1024; // 10MB total
    }, "Total file size must not exceed 10MB"),
});

// Step 6: Submit Schema
export const submitSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to continue",
  }),
});

// Type inference
export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
export type BusinessDetailsFormData = z.infer<typeof businessDetailsSchema>;
export type DocumentsFormData = z.infer<typeof documentsSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type SustainabilityVerificationFormData = z.infer<typeof sustainabilityVerificationSchema>;
export type SubmitFormData = z.infer<typeof submitSchema>;