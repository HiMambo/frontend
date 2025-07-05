'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookingSteps } from '@/context/BookingStepsContext';

export function AuthForm() {

  const { goToNextStep, markStepComplete } = useBookingSteps();

  const onComplete = () => {
    markStepComplete(1);
    goToNextStep();
  }

  const handleSignup = () => {
    // Authentication placeholder
    onComplete(); 
  };

  const handleLogin = () => {
    // Authentication placeholder
    onComplete(); 
  };

  const [tab, setTab] = useState<'login' | 'signup'>('signup');
  const [referralSource, setReferralSource] = useState<string | undefined>();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div>
      <div className="flex justify-around mb-6">
        <button
          className={`text-sm font-medium ${tab === 'signup' ? 'border-b-2 border-black' : 'text-muted-foreground'}`}
          onClick={() => setTab('signup')}
        >
          Sign up
        </button>
        <button
          className={`text-sm font-medium ${tab === 'login' ? 'border-b-2 border-black' : 'text-muted-foreground'}`}
          onClick={() => setTab('login')}
        >
          Login
        </button>
      </div>

      {tab === 'signup' && (
        <div className="space-y-6">
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
          <div className="flex gap-2">
            <Input className="w-1/2" placeholder="First name" />
            <Input className="w-1/2" placeholder="Last name" />
          </div>

          <div>
            <Label className="mb-1 block text-sm font-medium">How did you learn about us?</Label>
            <Select value={referralSource} onValueChange={setReferralSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friend">Friends</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="ads">Online Ads</SelectItem>
                <SelectItem value="search">Search Engine</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
            />
            <Label htmlFor="terms" className="text-sm leading-snug flex-1">
              <span className="leading-snug">
                I accept the <a href="#" className="underline">Terms of Service</a> and the <a href="#" className="underline">Privacy Policy</a>.
              </span>
            </Label>
          </div>

          <Button className="w-full" onClick={handleSignup} disabled={!acceptedTerms}>
            Sign up
          </Button>
        </div>
      )}

      {tab === 'login' && (
        <div className="space-y-4">
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full" onClick={handleLogin}>Login</Button>
        </div>
      )}
    </div>
  );
}
