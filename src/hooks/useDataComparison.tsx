import { useState, useEffect } from 'react';
import { useSupabaseTracking } from './useSupabaseTracking';

interface PopupData {
  salary: number;
  timestamp: number;
  source: 'popup' | 'url';
}

interface CalculatorData {
  income: number;
  paydayDebt: number;
  bankDebt: number;
  timestamp: number;
  calculator_type: 'classic' | 'beta';
}

interface ComparisonResult {
  popupData: PopupData | null;
  calculatorData: CalculatorData | null;
  hasComparison: boolean;
  incomeMatch: boolean;
  incomeDifference: number;
  differencePercentage: number;
  isSignificantDifference: boolean; // >20% różnicy
  comparisonTimestamp: number;
}

export const useDataComparison = () => {
  const { trackEvent } = useSupabaseTracking();
  const [comparison, setComparison] = useState<ComparisonResult>({
    popupData: null,
    calculatorData: null,
    hasComparison: false,
    incomeMatch: false,
    incomeDifference: 0,
    differencePercentage: 0,
    isSignificantDifference: false,
    comparisonTimestamp: 0
  });

  const getPopupData = (): PopupData | null => {
    // Sprawdź URL params (z PersonalizedOfferModal)
    const urlParams = new URLSearchParams(window.location.search);
    const salaryFromUrl = urlParams.get('salary');
    
    if (salaryFromUrl) {
      return {
        salary: parseFloat(salaryFromUrl),
        timestamp: Date.now(),
        source: 'url'
      };
    }

    // Sprawdź localStorage (może być zapisane z popup-a)
    const savedSalary = localStorage.getItem('popup_salary_data');
    if (savedSalary) {
      try {
        const data = JSON.parse(savedSalary);
        return {
          salary: data.salary,
          timestamp: data.timestamp,
          source: 'popup'
        };
      } catch (error) {
        console.error('Error parsing popup salary data:', error);
      }
    }

    return null;
  };

  const getCalculatorData = (): CalculatorData | null => {
    // Sprawdź localStorage dla danych z kalkulatora
    const classicData = localStorage.getItem('calculator_data_classic');
    const betaData = localStorage.getItem('calculator_data_beta');

    if (betaData) {
      try {
        const data = JSON.parse(betaData);
        return {
          income: data.income,
          paydayDebt: data.paydayDebt,
          bankDebt: data.bankDebt,
          timestamp: data.timestamp,
          calculator_type: 'beta'
        };
      } catch (error) {
        console.error('Error parsing beta calculator data:', error);
      }
    }

    if (classicData) {
      try {
        const data = JSON.parse(classicData);
        return {
          income: data.income,
          paydayDebt: data.paydayDebt,
          bankDebt: data.bankDebt,
          timestamp: data.timestamp,
          calculator_type: 'classic'
        };
      } catch (error) {
        console.error('Error parsing classic calculator data:', error);
      }
    }

    return null;
  };

  const compareData = () => {
    const popupData = getPopupData();
    const calculatorData = getCalculatorData();

    if (!popupData || !calculatorData) {
      setComparison(prev => ({
        ...prev,
        popupData,
        calculatorData,
        hasComparison: false
      }));
      return;
    }

    const incomeDifference = Math.abs(popupData.salary - calculatorData.income);
    const differencePercentage = (incomeDifference / popupData.salary) * 100;
    const incomeMatch = incomeDifference < 100; // Różnica mniejsza niż 100 zł
    const isSignificantDifference = differencePercentage > 20;

    const result: ComparisonResult = {
      popupData,
      calculatorData,
      hasComparison: true,
      incomeMatch,
      incomeDifference,
      differencePercentage,
      isSignificantDifference,
      comparisonTimestamp: Date.now()
    };

    setComparison(result);

    // Track porównanie w Supabase
    trackEvent('data_comparison', JSON.stringify({
      popup_salary: popupData.salary,
      calculator_income: calculatorData.income,
      difference: incomeDifference,
      difference_percentage: differencePercentage,
      income_match: incomeMatch,
      is_significant_difference: isSignificantDifference,
      popup_source: popupData.source,
      calculator_type: calculatorData.calculator_type
    }));

    console.log('📊 Data Comparison Result:', {
      popup_salary: popupData.salary,
      calculator_income: calculatorData.income,
      difference: incomeDifference,
      percentage: `${differencePercentage.toFixed(1)}%`,
      match: incomeMatch,
      significant_diff: isSignificantDifference
    });

    return result;
  };

  // Zapisz dane z popup-a
  const savePopupData = (salary: number) => {
    const data = {
      salary,
      timestamp: Date.now()
    };
    localStorage.setItem('popup_salary_data', JSON.stringify(data));
    console.log('💾 Saved popup salary data:', data);
  };

  // Sprawdź dane przy montowaniu komponentu
  useEffect(() => {
    compareData();
  }, []);

  // Słuchacz na zmiany w kalkulatorze
  useEffect(() => {
    const handleCalculatorUsed = () => {
      setTimeout(() => compareData(), 100); // Małe opóźnienie na zapisanie danych
    };

    window.addEventListener('calculatorUsed', handleCalculatorUsed);
    return () => window.removeEventListener('calculatorUsed', handleCalculatorUsed);
  }, []);

  return {
    comparison,
    compareData,
    savePopupData,
    hasPopupData: !!getPopupData(),
    hasCalculatorData: !!getCalculatorData()
  };
};