import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Link2, CheckCircle, AlertCircle } from 'lucide-react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

const MakeWebhookConfig = () => {
  const { setWebhookUrl, getWebhookUrl } = useMakeWebhook();
  const [url, setUrl] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  useEffect(() => {
    const savedUrl = getWebhookUrl();
    if (savedUrl) {
      setUrl(savedUrl);
      setIsEnabled(true);
    }
  }, []);

  const handleSave = () => {
    if (url.trim()) {
      setWebhookUrl(url.trim());
      setIsEnabled(true);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleTest = async () => {
    if (!url.trim()) return;
    
    setStatus('testing');
    try {
      const response = await fetch(url.trim(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          timestamp: Date.now(),
          message: "Test połączenia z Make.com"
        }),
      });
      
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleDisable = () => {
    setIsEnabled(false);
    setWebhookUrl('');
    setUrl('');
  };

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-navy-900 flex items-center gap-2">
          <Link2 className="w-5 h-5" />
          Konfiguracja Make.com
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-make"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
          <Label htmlFor="enable-make">Wysyłaj dane do Make.com</Label>
        </div>

        {isEnabled && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="webhook-url">URL webhook Make.com</Label>
              <Input
                id="webhook-url"
                type="url"
                placeholder="https://hook.eu1.make.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-600 mt-1">
                Skopiuj URL webhook ze swojego scenariusza Make.com
              </p>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                disabled={!url.trim() || status === 'testing'}
                size="sm"
              >
                💾 Zapisz
              </Button>
              <Button 
                onClick={handleTest}
                disabled={!url.trim() || status === 'testing'}
                variant="outline"
                size="sm"
              >
                {status === 'testing' ? '🔄 Testowanie...' : '🧪 Testuj'}
              </Button>
              <Button 
                onClick={handleDisable}
                variant="destructive"
                size="sm"
              >
                ❌ Wyłącz
              </Button>
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                Webhook skonfigurowany pomyślnie!
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                Błąd podczas testowania webhook
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-blue-900 mb-2">📊 Dane wysyłane do Make:</p>
              <ul className="text-blue-800 space-y-1 text-xs">
                <li>• Typ kalkulatora (classic/beta)</li>
                <li>• Dane finansowe (zarobki, zadłużenie)</li>
                <li>• Wynik analizy (positive/warning/negative)</li>
                <li>• Analiza wiarygodności (KŁAMIE/PRAWDA)</li>
                <li>• Różnice między popup a kalkulatorem</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MakeWebhookConfig;