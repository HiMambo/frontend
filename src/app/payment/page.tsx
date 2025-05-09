import BookingSummary from "@/components/BookingSummary";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginAndPaymentFlow from "@/components/payment/LoginAndPaymentFlow";

export default function PaymentPage() {
  return (
    <>
      <Header />
      <main className="grid md:grid-cols-2 gap-6 p-6">
        <LoginAndPaymentFlow />
        <BookingSummary />
      </main>
      <Footer />
    </>
  );
}
