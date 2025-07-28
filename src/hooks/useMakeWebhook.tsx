import { useDataComparison } from './useDataComparison';

interface MakeWebhookData {
  calculator_type: 'classic' | 'beta';
  income: number;
  payday_debt: number;
  bank_debt: number;
  total_debt: number;
  income_type?: string;
  result_type: 'positive' | 'negative' | 'warning';
  timestamp: number;
  
  // Analiza wiarygodności
  truthfulness_analysis?: {
    is_potential_lie: boolean;
    lie_severity: 'none' | 'minor' | 'moderate' | 'major';
    difference_percentage: number;
    agent_note: string;
    popup_salary?: number;
    calculator_income?: number;
  };

  // Dane dla agenta
  agent_assessment?: {
    is_lie: boolean | null; // Agent ocenia: prawda/kłamstwo
    actual_income?: number; // Rzeczywiste zarobki wg agenta
    actual_debt?: number; // Rzeczywiste zadłużenie wg agenta
    agent_notes?: string; // Notatki agenta
  };
}

export const useMakeWebhook = () => {
  const { comparison } = useDataComparison();

  const sendToMake = async (data: MakeWebhookData) => {
    // Domyślny webhook URL - może być nadpisany przez użytkownika
    const defaultWebhookUrl = localStorage.getItem('make_webhook_url') || '';
    
    if (!defaultWebhookUrl) {
      console.log('⚠️ Brak Make webhook URL - dane nie zostaną wysłane');
      return;
    }

    // Przygotuj pełne dane z analizą wiarygodności
    const fullData = {
      ...data,
      truthfulness_analysis: comparison.hasComparison ? {
        is_potential_lie: comparison.isPotentialLie,
        lie_severity: comparison.lieSeverity,
        difference_percentage: comparison.differencePercentage,
        agent_note: comparison.agentNote,
        popup_salary: comparison.popupData?.salary,
        calculator_income: comparison.calculatorData?.income
      } : undefined
    };

    try {
      console.log('📤 Wysyłanie danych do Make:', fullData);
      
      const response = await fetch(defaultWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(fullData),
      });

      console.log('✅ Dane wysłane do Make');
      
      // Zapisz informację o wysłaniu
      localStorage.setItem('last_make_send', JSON.stringify({
        timestamp: Date.now(),
        data: fullData
      }));

    } catch (error) {
      console.error('❌ Błąd podczas wysyłania do Make:', error);
    }
  };

  const setWebhookUrl = (url: string) => {
    localStorage.setItem('make_webhook_url', url);
    console.log('💾 Zapisano Make webhook URL');
  };

  const getWebhookUrl = () => {
    return localStorage.getItem('make_webhook_url') || '';
  };

  return {
    sendToMake,
    setWebhookUrl,
    getWebhookUrl
  };
};