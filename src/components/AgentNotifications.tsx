import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NotificationData {
  type: 'sms_assessment' | 'calculator_result' | 'form_submission';
  message: string;
  data?: any;
  timestamp: string;
}

const AgentNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Funkcja do dodawania powiadomień
  const addNotification = (notification: Omit<NotificationData, 'timestamp'>) => {
    const newNotification = {
      ...notification,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    console.log('📬 New agent notification:', newNotification);
  };

  // Funkcja SMS Assessment dostępna globalnie
  const sendSMSAssessment = async (assessment: 'positive' | 'negative', data?: any) => {
    console.log('🔥 sendSMSAssessment wywołane z:', { assessment, data });
    
    // Dodaj powiadomienie do panelu agenta
    addNotification({
      type: 'sms_assessment',
      message: `SMS Assessment: ${assessment === 'positive' ? 'PRAWDA' : 'KŁAMIE'}`,
      data: data
    });

    // Pobierz webhook URL
    const webhookUrl = localStorage.getItem('make_webhook_url') || (window as any).makeWebhookUrl;
    
    if (webhookUrl) {
      try {
        const sendData = {
          sms_assessment: assessment,
          assessment_label: assessment === 'positive' ? 'PRAWDA' : 'KŁAMIE',
          timestamp: new Date().toISOString(),
          ...data
        };

        console.log('🚀 Wysyłanie do Make.com:', sendData);

        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(sendData),
        });

        console.log('✅ Dane wysłane do Make.com');
      } catch (error) {
        console.error('❌ Błąd wysyłania do Make.com:', error);
      }
    } else {
      console.warn('⚠️ Brak skonfigurowanego webhook URL');
    }
  };

  // Udostępnij funkcję globalnie
  useEffect(() => {
    (window as any).sendSMSAssessment = sendSMSAssessment;
    console.log('🌍 sendSMSAssessment dostępne globalnie');
    
    return () => {
      delete (window as any).sendSMSAssessment;
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          🤖 Panel Agenta
          <Badge variant="outline" className="text-xs">
            {notifications.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Oceń SMS klienta:</p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="text-xs flex-1"
              onClick={() => sendSMSAssessment('positive')}
            >
              SMS: prawda
            </Button>
            <Button 
              size="sm" 
              variant="destructive" 
              className="text-xs flex-1"
              onClick={() => sendSMSAssessment('negative')}
            >
              SMS: kłamie
            </Button>
          </div>
        </div>
        
        {notifications.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium">Ostatnie akcje:</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {notifications.map((notification, index) => (
                <div key={index} className="text-xs p-2 bg-muted rounded">
                  <div className="font-medium">{notification.message}</div>
                  <div className="text-muted-foreground">{notification.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentNotifications;