import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FieldTiming {
  fieldName: string;
  startTime: number;
  endTime?: number;
  timeToFill?: number;
  value?: string;
  isSuspicious?: boolean;
  suspiciousReasons?: string[];
}

interface FormTimingData {
  sessionId: string;
  formType: string;
  formStartTime: number;
  fieldTimings: Map<string, FieldTiming>;
  totalFormTime?: number;
  userAgent: string;
}

// Generowanie ID sesji
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Pobieranie ID sesji
const getSessionId = (): string => {
  const SESSION_DURATION = 60 * 60 * 1000; // 1 godzina
  const now = Date.now();
  
  const sessionData = localStorage.getItem('timing_analysis_session');
  
  if (sessionData) {
    try {
      const { sessionId, timestamp } = JSON.parse(sessionData);
      if (now - timestamp < SESSION_DURATION) {
        return sessionId;
      }
    } catch (error) {
      console.error('Error parsing timing session data:', error);
    }
  }
  
  const newSessionId = generateSessionId();
  localStorage.setItem('timing_analysis_session', JSON.stringify({
    sessionId: newSessionId,
    timestamp: now
  }));
  
  console.log(`⏱️ New timing session created: ${newSessionId}`);
  return newSessionId;
};

// Wykrywanie podejrzanych czasów wypełniania
const detectSuspiciousTimings = (timeToFill: number, fieldName: string, value?: string): { isSuspicious: boolean; reasons: string[] } => {
  const reasons: string[] = [];
  let isSuspicious = false;

  // 1. Zbyt szybkie wypełnianie (mniej niż 1 sekunda dla większości pól)
  if (timeToFill < 1000) {
    reasons.push(`Zbyt szybkie wypełnienie pola ${fieldName} (${timeToFill}ms)`);
    isSuspicious = true;
  }

  // 2. Bardzo długie wypełnianie (więcej niż 5 minut)
  if (timeToFill > 300000) {
    reasons.push(`Bardzo długie wypełnianie pola ${fieldName} (${Math.round(timeToFill / 1000)}s)`);
    isSuspicious = true;
  }

  // 3. Specyficzne sprawdzenia dla różnych pól
  if (fieldName === 'income' && timeToFill < 2000) {
    reasons.push('Zbyt szybka deklaracja dochodów - może być nieprawdziwa');
    isSuspicious = true;
  }

  if (fieldName.includes('debt') && timeToFill < 1500) {
    reasons.push('Zbyt szybka deklaracja zadłużenia - może być nieprawdziwa');
    isSuspicious = true;
  }

  // 4. Sprawdzenie wartości zaokrąglonych (może wskazywać na zgadywanie)
  if (value && fieldName === 'income') {
    const numValue = parseInt(value.replace(/\D/g, ''));
    if (numValue % 1000 === 0 && numValue > 0) {
      reasons.push(`Podana zaokrąglona kwota dochodu (${numValue}) - może być nieprecyzyjna`);
      isSuspicious = true;
    }
  }

  return { isSuspicious, reasons };
};

// Zapisywanie danych czasowych do Supabase
const saveTimingToSupabase = async (timingData: FormTimingData) => {
  try {
    console.log('⏱️ Saving timing data to Supabase:', timingData);

    // Przygotuj dane dla każdego pola
    const timingRecords = Array.from(timingData.fieldTimings.values())
      .filter(timing => timing.timeToFill !== undefined)
      .map(timing => ({
        session_id: timingData.sessionId,
        form_type: timingData.formType,
        field_name: timing.fieldName,
        field_value: timing.value || null,
        time_to_fill: timing.timeToFill!,
        total_form_time: timingData.totalFormTime || null,
        is_suspicious: timing.isSuspicious || false,
        suspicious_reasons: timing.suspiciousReasons || [],
        user_agent: timingData.userAgent
      }));

    if (timingRecords.length === 0) {
      console.log('⏱️ No timing records to save');
      return;
    }

    const { error } = await supabase
      .from('form_timing_analysis')
      .insert(timingRecords);

    if (error) {
      console.error('❌ Error saving timing data to Supabase:', error);
    } else {
      console.log(`✅ Successfully saved ${timingRecords.length} timing records to Supabase`);
    }
  } catch (error) {
    console.error('❌ Error saving timing data:', error);
  }
};

export const useTimingAnalysis = (formType: string = 'debt_calculator') => {
  const timingDataRef = useRef<FormTimingData>({
    sessionId: getSessionId(),
    formType,
    formStartTime: Date.now(),
    fieldTimings: new Map(),
    userAgent: navigator.userAgent
  });

  const [isFormStarted, setIsFormStarted] = useState(false);

  // Rozpocznij tracking formularza
  const startFormTiming = () => {
    timingDataRef.current.formStartTime = Date.now();
    setIsFormStarted(true);
    console.log(`⏱️ Started timing analysis for form: ${formType}`);
  };

  // Rozpocznij tracking konkretnego pola
  const startFieldTiming = (fieldName: string) => {
    const currentTimings = timingDataRef.current.fieldTimings;
    currentTimings.set(fieldName, {
      fieldName,
      startTime: Date.now()
    });
    
    console.log(`⏱️ Started timing for field: ${fieldName}`);
  };

  // Zakończ tracking pola
  const endFieldTiming = (fieldName: string, value?: string) => {
    const currentTimings = timingDataRef.current.fieldTimings;
    const fieldTiming = currentTimings.get(fieldName);
    
    if (!fieldTiming || !fieldTiming.startTime) {
      console.warn(`⚠️ No start time found for field: ${fieldName}`);
      return;
    }

    const endTime = Date.now();
    const timeToFill = endTime - fieldTiming.startTime;
    
    // Wykryj podejrzane zachowania
    const suspiciousAnalysis = detectSuspiciousTimings(timeToFill, fieldName, value);
    
    // Zaktualizuj dane czasowe
    const updatedTiming: FieldTiming = {
      ...fieldTiming,
      endTime,
      timeToFill,
      value,
      isSuspicious: suspiciousAnalysis.isSuspicious,
      suspiciousReasons: suspiciousAnalysis.reasons
    };
    
    currentTimings.set(fieldName, updatedTiming);
    
    console.log(`⏱️ Completed timing for field: ${fieldName} - ${timeToFill}ms${suspiciousAnalysis.isSuspicious ? ' (SUSPICIOUS)' : ''}`);
    
    if (suspiciousAnalysis.isSuspicious) {
      console.log('🚨 Suspicious timing detected:', suspiciousAnalysis.reasons);
    }
  };

  // Zakończ timing całego formularza i zapisz dane
  const completeFormTiming = async () => {
    const totalFormTime = Date.now() - timingDataRef.current.formStartTime;
    timingDataRef.current.totalFormTime = totalFormTime;
    
    console.log(`⏱️ Form completed in: ${totalFormTime}ms`);
    
    // Zapisz dane do Supabase
    await saveTimingToSupabase(timingDataRef.current);
    
    setIsFormStarted(false);
  };

  // Pobierz aktualne dane czasowe
  const getTimingData = (): FormTimingData => {
    return { ...timingDataRef.current };
  };

  // Pobierz podejrzane zachowania
  const getSuspiciousFields = (): FieldTiming[] => {
    return Array.from(timingDataRef.current.fieldTimings.values())
      .filter(timing => timing.isSuspicious);
  };

  // Sprawdź czy formularz ma podejrzane zachowania
  const hasAnyuspiciousBehavior = (): boolean => {
    return getSuspiciousFields().length > 0;
  };

  // Wyczyść dane czasowe (reset formularza)
  const resetTiming = () => {
    timingDataRef.current = {
      sessionId: getSessionId(),
      formType,
      formStartTime: Date.now(),
      fieldTimings: new Map(),
      userAgent: navigator.userAgent
    };
    setIsFormStarted(false);
    console.log('⏱️ Timing data reset');
  };

  return {
    // Podstawowe funkcje
    startFormTiming,
    startFieldTiming,
    endFieldTiming,
    completeFormTiming,
    resetTiming,
    
    // Pobieranie danych
    getTimingData,
    getSuspiciousFields,
    hasAnyuspiciousBehavior,
    
    // Stan
    isFormStarted,
    sessionId: timingDataRef.current.sessionId
  };
};