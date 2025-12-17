import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const banks = [
  { id: 'alfa', name: 'Альфа-Банк', gradient: 'from-red-500 to-red-600' },
  { id: 'sber', name: 'Сбербанк', gradient: 'from-green-500 to-green-600' },
  { id: 'tinkoff', name: 'Тинькофф', gradient: 'from-yellow-400 to-yellow-500' },
  { id: 'vtb', name: 'ВТБ', gradient: 'from-blue-500 to-blue-600' },
];

export default function Index() {
  const [amount, setAmount] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [selectedBank, setSelectedBank] = useState('alfa');
  const [generatedLink, setGeneratedLink] = useState('');

  const formatAmount = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    const formatted = new Intl.NumberFormat('ru-RU').format(Number(numbers));
    return formatted;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value);
    setAmount(formatted);
  };

  const handleGenerateLink = () => {
    if (!amount || !sellerName) {
      toast.error('Заполните все поля', {
        style: {
          background: 'hsl(240 8% 8%)',
          color: 'hsl(0 0% 98%)',
          border: '1px solid hsl(346 77% 50%)',
        }
      });
      return;
    }

    const link = `https://payflow.app/pay?amount=${amount.replace(/\s/g, '')}&seller=${encodeURIComponent(sellerName)}&bank=${selectedBank}`;
    setGeneratedLink(link);
    toast.success('Ссылка сгенерирована!', {
      style: {
        background: 'hsl(240 8% 8%)',
        color: 'hsl(0 0% 98%)',
        border: '1px solid hsl(346 77% 50%)',
      }
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('Скопировано в буфер обмена', {
      style: {
        background: 'hsl(240 8% 8%)',
        color: 'hsl(0 0% 98%)',
        border: '1px solid hsl(346 77% 50%)',
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-gradient-shift" 
           style={{ backgroundSize: '200% 200%' }} />
      
      <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-4 shadow-2xl animate-pulse-glow">
            <Icon name="Zap" size={40} className="text-white" />
          </div>
          <h1 className="text-6xl font-black tracking-tighter gradient-text">
            PayFlow
          </h1>
          <p className="text-muted-foreground text-xl font-semibold">
            Мгновенная генерация платежей
          </p>
        </div>

        <Card className="p-8 space-y-8 neon-border backdrop-blur-xl bg-card/40 animate-scale-in">
          <div className="space-y-4">
            <Label htmlFor="amount" className="text-lg font-bold text-foreground">
              💰 Сумма платежа
            </Label>
            <div className="relative group">
              <Input
                id="amount"
                type="text"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                className="text-5xl font-black h-24 text-center tracking-tighter border-0 bg-gradient-to-br from-muted to-input focus:from-primary/10 focus:to-secondary/10 transition-all duration-300 shadow-2xl"
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                ₽
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="seller" className="text-lg font-bold text-foreground">
              👤 ФИО продавца
            </Label>
            <Input
              id="seller"
              type="text"
              placeholder="Иванов Иван Иванович"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="h-16 text-xl font-semibold border-0 bg-gradient-to-br from-muted to-input focus:from-primary/10 focus:to-secondary/10 transition-all duration-300 shadow-xl"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-bold text-foreground">🏦 Выберите банк</Label>
            <div className="grid grid-cols-2 gap-4">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.id)}
                  className={`
                    relative h-20 rounded-2xl transition-all duration-300 font-bold text-white overflow-hidden
                    ${selectedBank === bank.id 
                      ? 'scale-105 shadow-2xl' 
                      : 'scale-100 shadow-lg opacity-70 hover:opacity-100 hover:scale-[1.02]'
                    }
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${bank.gradient}`} />
                  <div className="relative flex items-center justify-center h-full px-4 z-10">
                    <span className="drop-shadow-lg">{bank.name}</span>
                  </div>
                  {selectedBank === bank.id && (
                    <div className="absolute top-3 right-3 z-20">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <Icon name="Check" size={16} className="text-green-600" />
                      </div>
                    </div>
                  )}
                  {selectedBank === bank.id && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerateLink}
            className="w-full h-16 text-xl font-black shadow-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:from-pink-600 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 animate-gradient-shift border-0"
            style={{ backgroundSize: '200% 200%' }}
            size="lg"
          >
            <Icon name="Zap" size={24} className="mr-2" />
            СГЕНЕРИРОВАТЬ ССЫЛКУ
          </Button>

          {generatedLink && (
            <div className="space-y-4 pt-6 border-t-2 border-primary/30 animate-fade-in">
              <Label className="text-lg font-bold text-foreground flex items-center gap-2">
                <Icon name="Link2" size={20} className="text-primary" />
                Готовая ссылка
              </Label>
              <div className="flex gap-3">
                <Input
                  value={generatedLink}
                  readOnly
                  className="text-sm border-0 bg-muted/50 font-mono"
                />
                <Button
                  onClick={handleCopyLink}
                  className="shrink-0 h-12 w-12 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl"
                  size="icon"
                >
                  <Icon name="Copy" size={20} />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="text-center">
          <p className="text-sm font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            ⚡ Мгновенные платежи • Защищённые транзакции • 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
