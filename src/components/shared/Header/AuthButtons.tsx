"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthFlow/AuthModal";

export default function AuthButtons() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");

  const handleAuthSuccess = () => {
    console.log("User authenticated successfully!");
    setShowAuthModal(false);
  };

  return (
    <>
      <div className="flex items-center gap-[var(--spacing-600)]">
        {/* LOGIN */}
        <Button
          variant="outline"
          size="custom"
          className="px-[var(--spacing-400)] py-[var(--spacing-300)]"
          onClick={() => {
            setAuthView("login");
            setShowAuthModal(true);
          }}
        >
          Login
        </Button>

        {/* SIGN UP */}
        <Button
          className="px-[var(--spacing-1200)] py-[var(--spacing-300)]"
          size="custom"
          onClick={() => {
            setAuthView("signup");
            setShowAuthModal(true);
          }}
        >
          Sign up
        </Button>
      </div>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialView={authView}
      />
    </>
  );
}
