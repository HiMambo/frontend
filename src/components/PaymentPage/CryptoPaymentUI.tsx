import Link from 'next/link';
import { CountdownTimer } from '@/components/PaymentPage/CountdownTimer';
import QRCode from 'react-qr-code';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog";
import Image from 'next/image';

type PaymentSession = {
  session_id: string;
  experience_id: string;
  price_data: Record<string, { price: number; digits: number; convert_rate: number }>;
  final_price: number;
  final_currency: string;
  public_key: string;
  status: 'init' | 'pending' | 'checked' | 'success';
  expires_at: string;
};

type Currency = 'USDC' | 'SOL';

type CryptoPaymentUIProps = {
  loading: boolean;
  error: string | null;
  payment: PaymentSession | null;
  selectedCurrency: Currency;
  showPaymentModal: boolean;
  copySuccess: string | null;
  getAmount: () => string;
  onRetry: () => void;
  onCloseModal: () => void;
  onCurrencySelect: (currency: Currency) => void;
  onProceedClick: () => void;
  onCopy: (text: string) => void;
};

// PaymentModal outside of the main component to prevent recreation on re-renders
const PaymentModal = ({ 
  showPaymentModal, 
  onCloseModal, 
  payment, 
  getAmount, 
  selectedCurrency, 
  onCopy, 
  copySuccess 
}: {
  showPaymentModal: boolean;
  onCloseModal: () => void;
  payment: PaymentSession | null;
  getAmount: () => string;
  selectedCurrency: Currency;
  onCopy: (text: string) => void;
  copySuccess: string | null;
}) => (
  <Dialog open={showPaymentModal} onOpenChange={onCloseModal}>
    <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
    <DialogContent className="max-w-sm p-4">
      {payment?.status === 'pending' ? (
        <>
          <DialogHeader className="pb-2">
            <DialogTitle className="text-center text-xl">
              Pay {getAmount()} {selectedCurrency}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {payment && (
              <CountdownTimer
                expiresAt={payment.expires_at}
                onExpire={() => {
                  onCloseModal();
                }}
              />
            )}

            {/* Compact QR Code section */}
            <div className="rounded-lg p-4 space-y-3">
              <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center p-2 max-w-[200px] max-h-[200px] mx-auto">
                <QRCode
                  value={payment.public_key}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Payment Address (click to copy)</Label>
                <div 
                  onClick={() => onCopy(payment?.public_key || '')}
                  className="bg-background rounded border p-2 font-mono text-xs cursor-pointer hover:bg-muted/50 transition-colors truncate text-center"
                  title={payment?.public_key}
                >
                  {payment?.public_key}
                </div>
                {copySuccess && (
                  <div className="text-xs text-green-600 font-medium text-center">
                    ✓ {copySuccess}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-1 py-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        </>
      ) : payment?.status === 'success' ? (
        <>
          <DialogHeader className="pb-2">
            <DialogTitle className="text-center text-xl text-green-600">
              Payment Successful!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-2">
            <Image
              src="/happy-face.png"
              alt="Happy Face"
              width={64}
              height={64}
              className="mx-auto"
            />
            <p className="text-sm text-muted-foreground">
              Thank you for your payment. Your transaction has been confirmed.
            </p>
            <Link href="/mybookings">
              <Button className="w-full" variant="default" size="sm">
                View Your Bookings
              </Button>
            </Link>
          </div>
        </>
      ) : payment?.status === 'checked' ? (
        <>
          <DialogHeader className="pb-2">
            <DialogTitle className="text-center text-xl text-green-600">
              Just a bit longer
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-2">
            <Image
              src="/paper-plane.png"
              alt="Paper Plane"
              width={64}
              height={64}
              className="mx-auto"
            />
            <p className="text-sm text-muted-foreground">
              We are letting our HiMambo partner know you are on your way!
            </p>
          </div>
        </>
      ) : (
        <>
          <DialogHeader className="pb-2">
            <DialogTitle className="text-center text-lg">
              Processing Payment
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-2">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
            <p className="text-sm text-muted-foreground">Processing payment...</p>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

export function CryptoPaymentUI({ 
  loading, 
  error, 
  payment, 
  selectedCurrency, 
  showPaymentModal, 
  copySuccess,
  getAmount,
  onRetry,
  onCloseModal,
  onCurrencySelect,
  onProceedClick,
  onCopy
}: CryptoPaymentUIProps) {

  // Handle loading state
  if (loading) {
    return (
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
        <div className="text-center space-y-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={onRetry} variant="outline" className="w-full">
            Try Again
          </Button>
        </div>
    );
  }
  
  // Handle no payment data
  if (!payment?.price_data) {
    return (
        <div className="text-center">
          <p className="text-muted-foreground">No payment data available</p>
        </div>
    );
  }

  // Main payment selection UI
  return (
    <>
        <div className="space-y-6">
          {/* Currency Selection */}
          <div>
            <Label className="mb-3 block text-sm font-medium">Select Currency</Label>
            <div className="flex gap-2 w-full">
              {['USDC', 'SOL'].map((currency) => (
                <Button
                  key={currency}
                  onClick={() => onCurrencySelect(currency as Currency)}
                  variant={selectedCurrency === currency ? "default" : "outline"}
                  className="flex-1 h-12 text-base"
                  size="lg"
                >
                  {currency}
                </Button>
              ))}
            </div>
          </div>

          {/* Amount Display */}
          <div className="bg-muted/30 rounded-lg p-6 text-center space-y-2">
            <Label className="text-sm text-muted-foreground">Total Amount</Label>
            <div className="text-3xl font-bold text-foreground">
              {getAmount()} {selectedCurrency}
            </div>
          </div>

          {/* Proceed Button */}
          <Button onClick={onProceedClick} className="w-full" size="lg">
            Proceed to Payment
          </Button>
        </div>

      {/* Payment Modal */}
      <PaymentModal 
        showPaymentModal={showPaymentModal}
        onCloseModal={onCloseModal}
        payment={payment}
        getAmount={getAmount}
        selectedCurrency={selectedCurrency}
        onCopy={onCopy}
        copySuccess={copySuccess}
      />
    </>
  );
}