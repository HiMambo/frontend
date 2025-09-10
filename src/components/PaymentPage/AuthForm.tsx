'use client';
import { useState, useEffect, useCallback } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookingSteps } from '@/context/BookingStepsContext';
import { GoogleIcon } from '../shared/IconComponents';

export function AuthForm() {
  const { goToNextStep, markStepComplete } = useBookingSteps();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const onComplete = useCallback(() => {
    markStepComplete(1);
    goToNextStep();
  }, [markStepComplete, goToNextStep]);

  const [referralSource, setReferralSource] = useState<string | undefined>();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="signup" className="space-y-6">
      <TabsList className="w-full flex justify-around">
        <TabsTrigger value="signup" className="flex-1">Sign up</TabsTrigger>
        <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
      </TabsList>

      <TabsContent value="signup">
        <div className="space-y-6">
          {/* Google Sign Up Button */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
          >
            <GoogleIcon width={18} height={18} />
            {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
          </Button>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

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
                I accept the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
              </span>
            </Label>
          </div>
          <Button className="w-full" onClick={onComplete} disabled={!acceptedTerms}>
            Sign up
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="login">
        <div className="space-y-4">
          {/* Google Login Button */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
          >
            <GoogleIcon width={18} height={18} />
            {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full" onClick={onComplete}>Login</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}