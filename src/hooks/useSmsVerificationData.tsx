import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export interface SmsVerificationData {
  // Dane podstawowe z URL
  name: string;
  email: string;
  phone: string;
  
  // Dane z localStorage (kalkulator, salaries itp.)
  calculatorData?: {
    income?: number;
    paydayDebt?: number;
    bankDebt?: number;
    incomeType?: string;
    source?: string;
  };
  
  originalMainData?: {
    income?: number;
    paydayDebt?: number;
    bankDebt?: number;
    timestamp?: number;
  };
  
  salaryData?: {
    salary?: number;
    timestamp?: number;
  };
  
  // Stan weryfikacji
  isVerified: boolean;
  verificationCode?: string;
  verifiedAt?: string;
  
  // Metadane sesji
  sessionId: string;
  startedAt: string;
}

export const useSmsVerificationData = () => {
  const [searchParams] = useSearchParams();
  const [verificationData, setVerificationData] = useState<SmsVerificationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generowanie session ID
  const generateSessionId = useCallback(() => {
    return `sms_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Inicjalizacja danych przy ładowaniu komponentu
  useEffect(() => {
    const initializeData = () => {
      try {
        // Pobierz dane z URL
        const urlName = searchParams.get('name') || '';
        const urlEmail = searchParams.get('email') || '';
        const urlPhone = searchParams.get('phone') || '';
        const urlSalary = searchParams.get('salary');

        // Pobierz dane z localStorage
        const calculatorData = localStorage.getItem('calculator_data');
        const originalMainData = localStorage.getItem('original_main_data');
        const existingVerificationData = localStorage.getItem('sms_verification_data');

        let parsedCalculatorData = null;
        let parsedOriginalData = null;
        let parsedSalaryData = null;

        try {
          if (calculatorData) {
            parsedCalculatorData = JSON.parse(calculatorData);
          }
        } catch (error) {
          console.error('❌ Error parsing calculator data:', error);
        }

        try {
          if (originalMainData) {
            parsedOriginalData = JSON.parse(originalMainData);
          }
        } catch (error) {
          console.error('❌ Error parsing original main data:', error);
        }

        // Pobierz salary z URL lub localStorage
        if (urlSalary) {
          parsedSalaryData = {
            salary: parseInt(urlSalary),
            timestamp: Date.now()
          };
        }

        // Sprawdź czy już mamy dane weryfikacji w sesji
        let sessionId: string;
        let startedAt: string;
        let isVerified = false;
        
        if (existingVerificationData) {
          try {
            const existing = JSON.parse(existingVerificationData);
            sessionId = existing.sessionId;
            startedAt = existing.startedAt;
            isVerified = existing.isVerified || false;
          } catch (error) {
            console.error('❌ Error parsing existing verification data:', error);
            sessionId = generateSessionId();
            startedAt = new Date().toISOString();
          }
        } else {
          sessionId = generateSessionId();
          startedAt = new Date().toISOString();
        }

        const initialData: SmsVerificationData = {
          name: decodeURIComponent(urlName),
          email: decodeURIComponent(urlEmail),
          phone: decodeURIComponent(urlPhone),
          calculatorData: parsedCalculatorData,
          originalMainData: parsedOriginalData,
          salaryData: parsedSalaryData,
          isVerified,
          sessionId,
          startedAt
        };

        setVerificationData(initialData);
        
        // Zapisz do localStorage
        localStorage.setItem('sms_verification_data', JSON.stringify(initialData));
        
        console.log('📊 SMS Verification data initialized:', initialData);
        
      } catch (error) {
        console.error('❌ Error initializing SMS verification data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [searchParams, generateSessionId]);

  // Zapisz dane weryfikacji do Supabase
  const saveVerificationDataToSupabase = useCallback(async (data: SmsVerificationData) => {
    try {
      console.log('💾 Saving verification data to Supabase:', data);
      
      // Przygotuj dane do zapisu
      const supabaseData = {
        session_id: data.sessionId,
        form_type: 'sms_verification',
        field_name: 'verification_complete',
        field_value: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          verification_code: data.verificationCode,
          verified_at: data.verifiedAt,
          calculator_data: data.calculatorData,
          original_main_data: data.originalMainData,
          salary_data: data.salaryData
        }),
        time_to_fill: data.verifiedAt ? 
          Math.round((new Date(data.verifiedAt).getTime() - new Date(data.startedAt).getTime()) / 1000) : 0,
        is_suspicious: false,
        user_agent: navigator.userAgent
      };

      const { error } = await supabase
        .from('form_timing_analysis')
        .insert(supabaseData);

      if (error) {
        console.error('❌ Error saving verification data to Supabase:', error);
      } else {
        console.log('✅ Verification data saved to Supabase successfully');
      }
    } catch (error) {
      console.error('❌ Error saving verification data to Supabase:', error);
    }
  }, []);

  // Oznacz jako zweryfikowane
  const markAsVerified = useCallback(async (verificationCode: string) => {
    if (!verificationData) return null;

    const verifiedAt = new Date().toISOString();
    
    const updatedData: SmsVerificationData = {
      ...verificationData,
      isVerified: true,
      verificationCode,
      verifiedAt
    };

    setVerificationData(updatedData);
    
    // Zapisz do localStorage
    localStorage.setItem('sms_verification_data', JSON.stringify(updatedData));
    
    // Zapisz do Supabase
    await saveVerificationDataToSupabase(updatedData);
    
    console.log('✅ Marked as verified with code:', verificationCode);
    console.log('📊 Complete verification data:', updatedData);
    
    return updatedData;
  }, [verificationData, saveVerificationDataToSupabase]);

  // Pobierz wszystkie dane dla Make.com
  const getAllDataForMake = useCallback(() => {
    if (!verificationData) return null;

    return {
      // Dane osobowe
      name: verificationData.name,
      email: verificationData.email,
      phone: verificationData.phone,
      
      // Status weryfikacji
      is_verified: verificationData.isVerified,
      verification_code: verificationData.verificationCode,
      verified_at: verificationData.verifiedAt,
      
      // Dane finansowe z kalkulatora
      income: verificationData.calculatorData?.income || verificationData.originalMainData?.income,
      payday_debt: verificationData.calculatorData?.paydayDebt || verificationData.originalMainData?.paydayDebt,
      bank_debt: verificationData.calculatorData?.bankDebt || verificationData.originalMainData?.bankDebt,
      income_type: verificationData.calculatorData?.incomeType,
      calculator_source: verificationData.calculatorData?.source,
      
      // Dane o salary
      salary: verificationData.salaryData?.salary,
      
      // Metadane sesji
      session_id: verificationData.sessionId,
      started_at: verificationData.startedAt,
      
      // Dodatkowe informacje
      total_debt: (verificationData.calculatorData?.paydayDebt || 0) + (verificationData.calculatorData?.bankDebt || 0),
      source: 'sms_verification_complete',
      timestamp: new Date().toISOString()
    };
  }, [verificationData]);

  // Wyczyść dane weryfikacji
  const clearVerificationData = useCallback(() => {
    localStorage.removeItem('sms_verification_data');
    setVerificationData(null);
    console.log('🗑️ SMS verification data cleared');
  }, []);

  return {
    verificationData,
    isLoading,
    markAsVerified,
    getAllDataForMake,
    clearVerificationData,
    
    // Helper functions
    hasCalculatorData: !!verificationData?.calculatorData,
    hasOriginalMainData: !!verificationData?.originalMainData,
    hasSalaryData: !!verificationData?.salaryData,
    isVerified: verificationData?.isVerified || false
  };
};