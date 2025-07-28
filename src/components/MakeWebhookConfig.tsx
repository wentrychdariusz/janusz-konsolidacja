import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const MakeWebhookConfig = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Wczytaj zapisany webhook URL
    const savedUrl = localStorage.getItem('make_webhook_url');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

  const handleSave = () => {
    if (!webhookUrl.trim()) {
      toast({
        title: 'Błąd',
        description: 'Wprowadź URL webhook',
        variant: 'destructive',
      });
      return;
    }

    localStorage.setItem('make_webhook_url', webhookUrl);
    // Ustaw globalną zmienną dla innych komponentów
    (window as any).makeWebhookUrl = webhookUrl;
    
    toast({
      title: 'Zapisano',
      description: 'URL webhook został zapisany',
    });

    console.log('🔗 Make.com webhook URL saved:', webhookUrl);
  };

  const handleTest = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: 'Błąd',
        description: 'Najpierw zapisz URL webhook',
        variant: 'destructive',
      });
      return;
    }

    try {
      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'Test z konfiguracji webhook'
      };

      console.log('🧪 Testowanie webhook:', webhookUrl, testData);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(testData),
      });

      toast({
        title: 'Test wysłany',
        description: 'Sprawdź Make.com czy dane dotarły',
      });

      console.log('✅ Test webhook wysłany');
    } catch (error) {
      console.error('❌ Błąd testu webhook:', error);
      toast({
        title: 'Błąd',
        description: 'Nie udało się wysłać testu',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-4">
      <CardHeader>
        <CardTitle className="text-sm">🔗 Make.com Webhook</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label htmlFor="webhook-url" className="text-xs">URL Webhook</Label>
          <Input
            id="webhook-url"
            type="url"
            placeholder="https://hook.eu2.make.com/..."
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="text-xs"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" className="text-xs">
            Zapisz
          </Button>
          <Button onClick={handleTest} variant="outline" size="sm" className="text-xs">
            Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MakeWebhookConfig;