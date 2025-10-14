"use client";

import { AuthForm } from "@/components/PaymentPage/AuthForm";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  initialView?: "signup" | "login";
}

export function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialView = "login",
}: AuthModalProps) {

  const handleAuthComplete = () => {
    console.log("Auth completed in modal");
    if (onAuthSuccess) onAuthSuccess();
    else handleClose();
  };

  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md overscroll-contain"
      onClick={handleClose}
    >
      <div
        className="relative bg-surface rounded-800 shadow-elevation-1 w-auto transition-all duration-300 overflow-hidden scale-100 opacity-100 p-1200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="icon-size-s text-tertiary" />
        </button>

        {/* Auth Flow */}
        <div>
          <AuthForm
            onComplete={handleAuthComplete}
            initialView={initialView}
            autoCheckSession={false}
          />
        </div>
      </div>
    </div>
  );
}
