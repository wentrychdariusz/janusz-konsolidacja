import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SuspiciousBehaviorData {
  sessionId: string;
  formType: string;
  totalSuspiciousFlags: number;
  suspiciousCategories: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  incomeReported?: number;
  totalDebtReported?: number;
  incomeToDebtRatio?: number;
  behavioralPatterns: Record<string, any>;
}

interface DataConsistencyCheck {
  income: number;
  paydayDebt: number;
  bankDebt: number;
  incomeType?: string;
}

// Generowanie ID sesji
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getSessionId = (): string => {
  const SESSION_DURATION = 60 * 60 * 1000; // 1 godzina
  const now = Date.now();
  
  const sessionData = localStorage.getItem('suspicious_behavior_session');
  
  if (sessionData) {
    try {
      const { sessionId, timestamp } = JSON.parse(sessionData);
      if (now - timestamp < SESSION_DURATION) {
        return sessionId;
      }
    } catch (error) {
      console.error('Error parsing suspicious behavior session data:', error);
    }
  }
  
  const newSessionId = generateSessionId();
  localStorage.setItem('suspicious_behavior_session', JSON.stringify({
    sessionId: newSessionId,
    timestamp: now
  }));
  
  console.log(`🔍 New suspicious behavior session created: ${newSessionId}`);
  return newSessionId;
};

// Sprawdzenie spójności danych finansowych
const analyzeDataConsistency = (data: DataConsistencyCheck): { 
  isConsistent: boolean; 
  inconsistencies: string[];
  riskFactors: string[];
} => {
  const inconsistencies: string[] = [];
  const riskFactors: string[] = [];
  
  const { income, paydayDebt, bankDebt, incomeType } = data;
  const totalDebt = paydayDebt + bankDebt;
  const debtToIncomeRatio = totalDebt / income;

  // 1. Sprawdzenie relacji dochodu do zadłużenia
  if (debtToIncomeRatio > 2.0) {
    inconsistencies.push(`Bardzo wysokie zadłużenie w stosunku do dochodu (${(debtToIncomeRatio * 100).toFixed(0)}%)`);
    riskFactors.push('high_debt_ratio');
  }

  // 2. Sprawdzenie bardzo niskiego zadłużenia przy wysokich dochodach
  if (income > 15000 && totalDebt < 5000) {
    inconsistencies.push('Bardzo niskie zadłużenie przy wysokich dochodach - może być nierzetelne');
    riskFactors.push('low_debt_high_income');
  }

  // 3. Sprawdzenie bardzo wysokich dochodów
  if (income > 25000) {
    riskFactors.push('very_high_income');
    if (totalDebt < 10000) {
      inconsistencies.push('Osoba z bardzo wysokimi dochodami z niskim zadłużeniem - sprawdzić wiarygodność');
    }
  }

  // 4. Sprawdzenie bardzo niskich dochodów z wysokim zadłużeniem
  if (income < 3000 && totalDebt > 20000) {
    inconsistencies.push('Bardzo niski dochód z wysokim zadłużeniem - sprawdzić możliwość spłaty');
    riskFactors.push('low_income_high_debt');
  }

  // 5. Sprawdzenie okrągłych kwot (podejrzane)
  if (income % 1000 === 0 && income > 0) {
    riskFactors.push('rounded_income');
  }
  
  if (paydayDebt % 1000 === 0 && paydayDebt > 0) {
    riskFactors.push('rounded_payday_debt');
  }
  
  if (bankDebt % 1000 === 0 && bankDebt > 0) {
    riskFactors.push('rounded_bank_debt');
  }

  // 6. Sprawdzenie typu dochodu vs kwota
  if (incomeType === 'emerytura' && income > 8000) {
    inconsistencies.push('Bardzo wysoka emerytura - sprawdzić wiarygodność');
    riskFactors.push('suspicious_pension_amount');
  }

  if (incomeType === 'zasilek' && income > 2000) {
    inconsistencies.push('Bardzo wysoki zasiłek - sprawdzić wiarygodność');
    riskFactors.push('suspicious_benefit_amount');
  }

  // 7. Sprawdzenie niemożliwych kombinacji
  if (incomeType === 'nie_pracuje' && income > 1000) {
    inconsistencies.push('Deklaruje brak pracy ale ma dochód - niespójność');
    riskFactors.push('income_employment_mismatch');
  }

  return {
    isConsistent: inconsistencies.length === 0,
    inconsistencies,
    riskFactors
  };
};

// Ocena poziomu ryzyka
const calculateRiskLevel = (
  suspiciousFlags: number, 
  inconsistencies: string[], 
  riskFactors: string[]
): 'low' | 'medium' | 'high' | 'critical' => {
  let riskScore = 0;

  // Dodaj punkty za podejrzane flagi
  riskScore += suspiciousFlags * 2;

  // Dodaj punkty za niespójności
  riskScore += inconsistencies.length * 3;

  // Dodaj punkty za czynniki ryzyka
  riskScore += riskFactors.length;

  // Szczególnie wysokie ryzyko dla niektórych wzorców
  if (riskFactors.includes('income_employment_mismatch')) {
    riskScore += 5;
  }
  
  if (riskFactors.includes('suspicious_pension_amount') || riskFactors.includes('suspicious_benefit_amount')) {
    riskScore += 4;
  }

  if (riskFactors.includes('high_debt_ratio')) {
    riskScore += 3;
  }

  // Określ poziom ryzyka
  if (riskScore >= 15) return 'critical';
  if (riskScore >= 10) return 'high';
  if (riskScore >= 5) return 'medium';
  return 'low';
};

// Zapisywanie analizy podejrzanych zachowań do Supabase
const saveSuspiciousBehaviorToSupabase = async (data: SuspiciousBehaviorData) => {
  try {
    console.log('🔍 Saving suspicious behavior analysis to Supabase:', data);

    const { error } = await supabase
      .from('suspicious_behavior_analysis')
      .insert({
        session_id: data.sessionId,
        form_type: data.formType,
        total_suspicious_flags: data.totalSuspiciousFlags,
        suspicious_categories: data.suspiciousCategories,
        risk_level: data.riskLevel,
        income_reported: data.incomeReported || null,
        total_debt_reported: data.totalDebtReported || null,
        income_to_debt_ratio: data.incomeToDebtRatio || null,
        behavioral_patterns: data.behavioralPatterns
      });

    if (error) {
      console.error('❌ Error saving suspicious behavior analysis to Supabase:', error);
    } else {
      console.log(`✅ Successfully saved suspicious behavior analysis to Supabase - Risk Level: ${data.riskLevel}`);
    }
  } catch (error) {
    console.error('❌ Error saving suspicious behavior analysis:', error);
  }
};

export const useSuspiciousBehaviorDetection = (formType: string = 'debt_calculator') => {
  const behaviorsRef = useRef<{
    sessionId: string;
    suspiciousFlags: string[];
    inconsistencies: string[];
    riskFactors: string[];
    formData?: DataConsistencyCheck;
  }>({
    sessionId: getSessionId(),
    suspiciousFlags: [],
    inconsistencies: [],
    riskFactors: []
  });

  // Dodaj podejrzaną flagę
  const addSuspiciousFlag = (flag: string) => {
    if (!behaviorsRef.current.suspiciousFlags.includes(flag)) {
      behaviorsRef.current.suspiciousFlags.push(flag);
      console.log(`🚨 Added suspicious flag: ${flag}`);
    }
  };

  // Analizuj spójność danych
  const analyzeFinancialData = (data: DataConsistencyCheck) => {
    behaviorsRef.current.formData = data;
    
    const consistency = analyzeDataConsistency(data);
    behaviorsRef.current.inconsistencies = consistency.inconsistencies;
    behaviorsRef.current.riskFactors = consistency.riskFactors;

    // Dodaj flagi dla niespójności
    consistency.inconsistencies.forEach(inconsistency => {
      addSuspiciousFlag(`NIESPÓJNOŚĆ: ${inconsistency}`);
    });

    console.log('🔍 Financial data analysis completed:', {
      isConsistent: consistency.isConsistent,
      inconsistencies: consistency.inconsistencies,
      riskFactors: consistency.riskFactors
    });

    return consistency;
  };

  // Pobierz poziom ryzyka
  const getRiskLevel = (): 'low' | 'medium' | 'high' | 'critical' => {
    return calculateRiskLevel(
      behaviorsRef.current.suspiciousFlags.length,
      behaviorsRef.current.inconsistencies,
      behaviorsRef.current.riskFactors
    );
  };

  // Pobierz wszystkie podejrzane zachowania
  const getAllSuspiciousBehaviors = () => {
    return {
      suspiciousFlags: [...behaviorsRef.current.suspiciousFlags],
      inconsistencies: [...behaviorsRef.current.inconsistencies],
      riskFactors: [...behaviorsRef.current.riskFactors],
      totalFlags: behaviorsRef.current.suspiciousFlags.length,
      riskLevel: getRiskLevel()
    };
  };

  // Sprawdź czy jest wysokie ryzyko
  const isHighRisk = (): boolean => {
    const riskLevel = getRiskLevel();
    return riskLevel === 'high' || riskLevel === 'critical';
  };

  // Zakończ analizę i zapisz wyniki
  const completeBehaviorAnalysis = async () => {
    const riskLevel = getRiskLevel();
    const formData = behaviorsRef.current.formData;
    
    const suspiciousCategories = [
      ...new Set([
        ...(behaviorsRef.current.suspiciousFlags.length > 0 ? ['behavioral_flags'] : []),
        ...(behaviorsRef.current.inconsistencies.length > 0 ? ['data_inconsistency'] : []),
        ...(behaviorsRef.current.riskFactors.length > 0 ? ['risk_factors'] : [])
      ])
    ];

    const analysisData: SuspiciousBehaviorData = {
      sessionId: behaviorsRef.current.sessionId,
      formType,
      totalSuspiciousFlags: behaviorsRef.current.suspiciousFlags.length,
      suspiciousCategories,
      riskLevel,
      incomeReported: formData?.income,
      totalDebtReported: formData ? formData.paydayDebt + formData.bankDebt : undefined,
      incomeToDebtRatio: formData ? (formData.paydayDebt + formData.bankDebt) / formData.income : undefined,
      behavioralPatterns: {
        suspiciousFlags: behaviorsRef.current.suspiciousFlags,
        inconsistencies: behaviorsRef.current.inconsistencies,
        riskFactors: behaviorsRef.current.riskFactors,
        analysisTimestamp: new Date().toISOString()
      }
    };

    await saveSuspiciousBehaviorToSupabase(analysisData);

    console.log(`🔍 Behavior analysis completed - Risk Level: ${riskLevel}`, analysisData);
    
    return analysisData;
  };

  // Reset analizy
  const resetBehaviorAnalysis = () => {
    behaviorsRef.current = {
      sessionId: getSessionId(),
      suspiciousFlags: [],
      inconsistencies: [],
      riskFactors: []
    };
    console.log('🔍 Behavior analysis reset');
  };

  return {
    // Podstawowe funkcje
    addSuspiciousFlag,
    analyzeFinancialData,
    completeBehaviorAnalysis,
    resetBehaviorAnalysis,
    
    // Pobieranie danych
    getAllSuspiciousBehaviors,
    getRiskLevel,
    isHighRisk,
    
    // Stan
    sessionId: behaviorsRef.current.sessionId
  };
};