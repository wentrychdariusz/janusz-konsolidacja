
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GlownaKopia from "./pages/GlownaKopia";
import Glowna1 from "./pages/Glowna1";
import Glowna1A from "./pages/Glowna1A";
import Glowna1B from "./pages/Glowna1B";
import Premium from "./pages/Premium";
import Gratulacje4000_6000 from "./pages/Gratulacje4000_6000";
import Calculator from "./pages/Calculator";
import CalculatorBeta from "./pages/CalculatorBeta";
import Analiza from "./pages/Analiza";
import SuspiciousAnalysis from "./pages/SuspiciousAnalysis";
import ThankYou from "./pages/ThankYou";
import PodziękowanieBezVIP from "./pages/PodziękowanieBezVIP";
import SmsVerification from "./pages/SmsVerification";
import SmsVerificationA from "./pages/SmsVerificationA";
import SmsVerificationB from "./pages/SmsVerificationB";
import ContactForm from "./pages/ContactForm";
import ContactFormA from "./pages/ContactFormA";
import ContactFormB from "./pages/ContactFormB";
import Podziekowania from "./pages/Podziekowania";
import ABTestStats from "./pages/ABTestStats";
import AdminLogin from "./pages/AdminLogin";
import AdminLogout from "./pages/AdminLogout";
import NotFound from "./pages/NotFound";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import PaymentTest from "./pages/PaymentTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/glownakopia" element={<GlownaKopia />} />
          <Route path="/glowna1" element={<Glowna1 />} />
          <Route path="/glowna1a" element={<Glowna1A />} />
          <Route path="/glowna1b" element={<Glowna1B />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/4000_6000" element={<Gratulacje4000_6000 />} />
          <Route path="/kalkulator" element={<Calculator />} />
          <Route path="/kalkulator-beta" element={<CalculatorBeta />} />
          <Route path="/analiza" element={<Analiza />} />
          <Route path="/formularz" element={<ThankYou />} />
          <Route path="/sms-verification" element={<SmsVerification />} />
          <Route path="/sms-verification-a" element={<SmsVerificationA />} />
          <Route path="/sms-verification-b" element={<SmsVerificationB />} />
          <Route path="/kontakt" element={<ContactForm />} />
          <Route path="/kontakt-a" element={<ContactFormA />} />
          <Route path="/kontakt-b" element={<ContactFormB />} />
          <Route path="/podziekowania" element={<Podziekowania />} />
          <Route path="/podziekowaniebezvip" element={<PodziękowanieBezVIP />} />
          <Route path="/payment" element={<PaymentTest />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/panel" element={
            <ProtectedAdminRoute>
              <ABTestStats />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin-logout" element={<AdminLogout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
