
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Analiza from "./pages/Analiza";
import ThankYou from "./pages/ThankYou";
import SmsVerification from "./pages/SmsVerification";
import SmsVerificationA from "./pages/SmsVerificationA";
import SmsVerificationB from "./pages/SmsVerificationB";
import Podziekowania from "./pages/Podziekowania";
import ABTestStats from "./pages/ABTestStats";
import AdminLogin from "./pages/AdminLogin";
import AdminLogout from "./pages/AdminLogout";
import NotFound from "./pages/NotFound";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kalkulator" element={<Calculator />} />
          <Route path="/analiza" element={<Analiza />} />
          <Route path="/formularz" element={<ThankYou />} />
          <Route path="/sms-verification" element={<SmsVerification />} />
          <Route path="/sms-verification-a" element={<SmsVerificationA />} />
          <Route path="/sms-verification-b" element={<SmsVerificationB />} />
          <Route path="/podziekowania" element={<Podziekowania />} />
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
