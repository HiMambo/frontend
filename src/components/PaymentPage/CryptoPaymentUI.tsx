import Link from 'next/link';
import { CountdownTimer } from '@/components/PaymentPage/CountdownTimer';
import QRCode from 'react-qr-code';
import { Button } from "@/components/ui/button";
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
    <DialogContent className="max-w-sm p-[var(--spacing-600)]">
      {payment?.status === 'pending' ? (
        <>
          <DialogHeader className="pb-[var(--spacing-400)]">
            <DialogTitle className="heading-h5-light text-secondary text-center">
              Pay {getAmount()} {selectedCurrency}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-[var(--spacing-600)]">
            {payment && (
              <CountdownTimer
                expiresAt={payment.expires_at}
                onExpire={() => {
                  onCloseModal();
                }}
              />
            )}

            {/* QR Code section */}
            <div className="flex flex-col gap-[var(--spacing-400)]">
              <div className="w-full aspect-square bg-white rounded-300 flex items-center justify-center p-[var(--spacing-400)] max-w-[200px] mx-auto">
                <QRCode
                  value={payment.public_key}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="flex flex-col gap-[var(--spacing-200)]">
                <span className="body-m text-tertiary text-center">Payment Address (click to copy)</span>
                <div 
                  onClick={() => onCopy(payment?.public_key || '')}
                  className="bg-white rounded-300 border-2 border-[var(--text-disabled)] p-[var(--spacing-400)] font-mono text-xs cursor-pointer hover:bg-surface transition-colors truncate text-center text-tertiary"
                  title={payment?.public_key}
                >
                  {payment?.public_key}
                </div>
                {copySuccess && (
                  <div className="body-m text-secondary text-center">
                    ✓ {copySuccess}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-[var(--spacing-200)] py-[var(--spacing-400)]">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        </>
      ) : payment?.status === 'success' ? (
        <>
          <DialogHeader className="pb-[var(--spacing-400)]">
            <DialogTitle className="heading-h5-light text-secondary text-center">
              Payment Successful!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-[var(--spacing-600)] items-center py-[var(--spacing-400)]">
            <Image
              src="/happy-face.png"
              alt="Happy Face"
              width={64}
              height={64}
              className="mx-auto"
            />
            <p className="body-m text-tertiary text-center">
              Thank you for your payment. Your transaction has been confirmed.
            </p>
            <Link href="/mybookings" className="w-full">
              <Button className="w-full">
                View Your Bookings
              </Button>
            </Link>
          </div>
        </>
      ) : payment?.status === 'checked' ? (
        <>
          <DialogHeader className="pb-[var(--spacing-400)]">
            <DialogTitle className="heading-h5-light text-secondary text-center">
              Just a bit longer
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-[var(--spacing-600)] items-center py-[var(--spacing-400)]">
            <Image
              src="/paper-plane.png"
              alt="Paper Plane"
              width={64}
              height={64}
              className="mx-auto"
            />
            <p className="body-m text-tertiary text-center">
              We are letting our HiMambo partner know you are on your way!
            </p>
          </div>
        </>
      ) : (
        <>
          <DialogHeader className="pb-[var(--spacing-400)]">
            <DialogTitle className="heading-h5-light text-secondary text-center">
              Processing Payment
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-[var(--spacing-600)] items-center py-[var(--spacing-400)]">
            <div className="flex justify-center gap-[var(--spacing-200)]">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
            <p className="body-m text-tertiary">Processing payment...</p>
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
      <div className="flex flex-col bg-surface gap-[var(--spacing-600)] p-[var(--spacing-600)] items-center w-full">
        <div className="flex justify-center gap-[var(--spacing-200)]">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        </div>
        <p className="body-m text-tertiary">Loading payment details...</p>
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col bg-surface gap-[var(--spacing-600)] p-[var(--spacing-600)] items-center w-full">
        <Alert variant="destructive">
          <AlertDescription className="body-m">{error}</AlertDescription>
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
      <div className="flex flex-col bg-surface gap-[var(--spacing-600)] p-[var(--spacing-600)] items-center w-full">
        <p className="body-m text-tertiary">No payment data available</p>
      </div>
    );
  }

  // Main payment selection UI
  return (
    <>
      <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
        {/* Header */}
        <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
          Complete Payment
        </h2>

        {/* Currency Selection */}
        <div className="flex gap-[var(--spacing-800)] justify-center w-full body-l-button">
          {['USDC', 'SOL'].map((currency) => (
            <span
              key={currency}
              className={`transition-colors cursor-pointer ${
                selectedCurrency === currency
                  ? "underline text-[var(--terracotta-600)] decoration-2 underline-offset-10"
                  : "text-primary hover:underline hover:decoration-2 hover:underline-offset-10"
              }`}
              onClick={() => onCurrencySelect(currency as Currency)}
            >
              {currency}
            </span>
          ))}
        </div>

        {/* Amount Display */}
          <div className="heading-h5-light text-secondary">
            {getAmount()} {selectedCurrency}
          </div>

        {/* Proceed Button */}
        <Button onClick={onProceedClick} className="w-[var(--width-authforms)]">
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