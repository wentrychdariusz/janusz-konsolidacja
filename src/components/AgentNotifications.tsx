import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { AlertTriangle, CheckCircle, XCircle, Eye, DollarSign, CreditCard, User, MessageSquare } from 'lucide-react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';
import { useToast } from './ui/use-toast';

interface AgentAssessment {
  is_lie: boolean | null;
  actual_income?: number;
  actual_debt?: number;
  agent_notes?: string;
}

const AgentNotifications = () => {
  const { sendToMake } = useMakeWebhook();
  const { toast } = useToast();
  const [lastWebhookData, setLastWebhookData] = useState<any>(null);
  const [zapierWebhookUrl, setZapierWebhookUrl] = useState('');
  const [isLoadingSMS, setIsLoadingSMS] = useState(false);
  const [agentAssessment, setAgentAssessment] = useState<AgentAssessment>({
    is_lie: null,
    actual_income: undefined,
    actual_debt: undefined,
    agent_notes: ''
  });

  useEffect(() => {
    // Pobierz zapisany Zapier webhook URL
    const savedZapierUrl = localStorage.getItem('zapier_webhook_url');
    if (savedZapierUrl) {
      setZapierWebhookUrl(savedZapierUrl);
    }

    // Pobierz ostatnie dane wysłane do Make
    // Pobierz ostatnie dane wysłane do Make
    const lastSent = localStorage.getItem('last_make_send');
    if (lastSent) {
      try {
        const data = JSON.parse(lastSent);
        setLastWebhookData(data.data);
      } catch (error) {
        console.error('Error parsing last webhook data:', error);
      }
    }

    // Sprawdź localStorage co sekundę dla nowych danych
    const interval = setInterval(() => {
      const lastSent = localStorage.getItem('last_make_send');
      if (lastSent) {
        try {
          const data = JSON.parse(lastSent);
          if (data.timestamp > (lastWebhookData?.timestamp || 0)) {
            setLastWebhookData(data.data);
          }
        } catch (error) {
          console.error('Error parsing last webhook data:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastWebhookData?.timestamp]);

  const sendSMSAssessment = async (assessment: 'PRAWDA' | 'KŁAMIE') => {
    if (!zapierWebhookUrl) {
      toast({
        title: "Błąd",
        description: "Wprowadź URL webhook Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingSMS(true);
    console.log("Wysyłanie SMS przez Zapier:", assessment);

    try {
      const response = await fetch(zapierWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          message: assessment,
          timestamp: new Date().toISOString(),
          client_data: {
            income: lastWebhookData?.income,
            total_debt: lastWebhookData?.total_debt
          }
        }),
      });

      toast({
        title: "SMS Wysłany",
        description: `Wysłano "${assessment}" przez Zapier. Sprawdź historię Zap.`,
      });
    } catch (error) {
      console.error("Błąd wysyłania SMS:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać SMS. Sprawdź URL Zapier.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSMS(false);
    }
  };

  const saveZapierUrl = () => {
    localStorage.setItem('zapier_webhook_url', zapierWebhookUrl);
    toast({
      title: "Zapisano",
      description: "URL Zapier został zapisany",
    });
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'major':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'moderate':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'minor':
        return <Eye className="w-5 h-5 text-blue-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'major':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'moderate':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'minor':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  const handleSubmitAssessment = async () => {
    if (!lastWebhookData) return;

    const updatedData = {
      ...lastWebhookData,
      agent_assessment: agentAssessment,
      assessment_timestamp: Date.now()
    };

    await sendToMake(updatedData);
    
    // Zapisz ocenę agenta
    localStorage.setItem('agent_assessment', JSON.stringify({
      ...agentAssessment,
      timestamp: Date.now(),
      original_data: lastWebhookData
    }));

    console.log('📤 Wysłano ocenę agenta do Make:', agentAssessment);
  };

  if (!lastWebhookData) {
    return (
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-600 flex items-center gap-2">
            <User className="w-5 h-5" />
            Panel Agenta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Brak danych do analizy. Poczekaj na przesłanie formularza przez klienta.</p>
        </CardContent>
      </Card>
    );
  }

  const { truthfulness_analysis } = lastWebhookData;

  return (
    <div className="space-y-4">
      {/* Analiza automatyczna */}
      {truthfulness_analysis && (
        <Card className={`border-2 ${getSeverityColor(truthfulness_analysis.lie_severity)}`}>
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              {getSeverityIcon(truthfulness_analysis.lie_severity)}
              Analiza Wiarygodności Danych
              <Badge variant={truthfulness_analysis.is_potential_lie ? "destructive" : "default"}>
                {truthfulness_analysis.is_potential_lie ? "PODEJRZANE" : "ZGODNE"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">
                  Popup: <strong>{truthfulness_analysis.popup_salary?.toLocaleString()} zł</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">
                  Kalkulator: <strong>{truthfulness_analysis.calculator_income?.toLocaleString()} zł</strong>
                </span>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-white/50 border">
              <p className="text-sm font-medium mb-1">Notatka systemowa:</p>
              <p className="text-sm">{truthfulness_analysis.agent_note}</p>
            </div>

            <div className="text-xs text-gray-600">
              Różnica: {truthfulness_analysis.difference_percentage?.toFixed(1)}% | 
              Poziom: {truthfulness_analysis.lie_severity}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Panel SMS dla Agenta */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Wyślij SMS do Agenta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="zapier-webhook">Zapier Webhook URL (SMS)</Label>
            <div className="flex gap-2">
              <Input
                id="zapier-webhook"
                type="url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={zapierWebhookUrl}
                onChange={(e) => setZapierWebhookUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={saveZapierUrl} size="sm" variant="outline">
                💾 Zapisz
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Utwórz Zap z webhook triggerem + SMS action
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => sendSMSAssessment('PRAWDA')}
              disabled={!zapierWebhookUrl || isLoadingSMS}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              {isLoadingSMS ? '📤 Wysyłanie...' : '📱 SMS: PRAWDA'}
            </Button>
            <Button
              onClick={() => sendSMSAssessment('KŁAMIE')}
              disabled={!zapierWebhookUrl || isLoadingSMS}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              {isLoadingSMS ? '📤 Wysyłanie...' : '📱 SMS: KŁAMIE'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Panel oceny agenta dla Make.com */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-navy-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            Szczegółowa Ocena (Make.com)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => setAgentAssessment(prev => ({ ...prev, is_lie: false }))}
              variant={agentAssessment.is_lie === false ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              PRAWDA
            </Button>
            <Button
              onClick={() => setAgentAssessment(prev => ({ ...prev, is_lie: true }))}
              variant={agentAssessment.is_lie === true ? "destructive" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              KŁAMIE
            </Button>
            <Button
              onClick={() => setAgentAssessment(prev => ({ ...prev, is_lie: null }))}
              variant={agentAssessment.is_lie === null ? "secondary" : "outline"}
              size="sm"
            >
              RESET
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="actual-income">Rzeczywiste zarobki (zł)</Label>
              <Input
                id="actual-income"
                type="number"
                placeholder="np. 4500"
                value={agentAssessment.actual_income || ''}
                onChange={(e) => setAgentAssessment(prev => ({ 
                  ...prev, 
                  actual_income: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
              />
            </div>
            <div>
              <Label htmlFor="actual-debt">Rzeczywiste zadłużenie (zł)</Label>
              <Input
                id="actual-debt"
                type="number"
                placeholder="np. 15000"
                value={agentAssessment.actual_debt || ''}
                onChange={(e) => setAgentAssessment(prev => ({ 
                  ...prev, 
                  actual_debt: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="agent-notes">Notatki agenta</Label>
            <Textarea
              id="agent-notes"
              placeholder="Dodaj swoje uwagi na temat klienta..."
              value={agentAssessment.agent_notes || ''}
              onChange={(e) => setAgentAssessment(prev => ({ 
                ...prev, 
                agent_notes: e.target.value 
              }))}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleSubmitAssessment}
            className="w-full"
            disabled={agentAssessment.is_lie === null}
          >
            📤 Wyślij Ocenę do Make.com
          </Button>

          {/* Dane klienta */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-2">Dane z formularza:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>Zarobki: {lastWebhookData.income?.toLocaleString()} zł</div>
              <div>Chwilówki: {lastWebhookData.payday_debt?.toLocaleString()} zł</div>
              <div>Banki: {lastWebhookData.bank_debt?.toLocaleString()} zł</div>
              <div>Razem: {lastWebhookData.total_debt?.toLocaleString()} zł</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentNotifications;