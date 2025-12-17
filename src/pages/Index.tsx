import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const banks = [
  { id: 'alfa', name: 'Альфа-Банк', icon: 'Building2', color: 'from-red-500/20 to-red-600/20' },
  { id: 'sber', name: 'Сбербанк', icon: 'Landmark', color: 'from-green-500/20 to-green-600/20' },
  { id: 'tinkoff', name: 'Тинькофф', icon: 'CreditCard', color: 'from-yellow-400/20 to-yellow-500/20' },
  { id: 'vtb', name: 'ВТБ', icon: 'Wallet', color: 'from-blue-500/20 to-blue-600/20' },
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
          background: 'hsl(222 14% 10%)',
          color: 'hsl(0 0% 100%)',
          border: '1px solid hsl(280 100% 70%)',
        }
      });
      return;
    }

    const link = `https://payflow.app/pay?amount=${amount.replace(/\s/g, '')}&seller=${encodeURIComponent(sellerName)}&bank=${selectedBank}`;
    setGeneratedLink(link);
    toast.success('Ссылка сгенерирована!', {
      style: {
        background: 'hsl(222 14% 10%)',
        color: 'hsl(0 0% 100%)',
        border: '1px solid hsl(280 100% 70%)',
      }
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('Скопировано', {
      style: {
        background: 'hsl(222 14% 10%)',
        color: 'hsl(0 0% 100%)',
        border: '1px solid hsl(280 100% 70%)',
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse-glow" />
        <div className="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl border border-primary/20 shadow-2xl animate-float">
            <Icon name="Sparkles" size={48} className="text-primary" />
          </div>
          <div>
            <h1 className="text-7xl font-black tracking-tighter gradient-text mb-3">
              PayFlow
            </h1>
            <p className="text-muted-foreground text-lg">
              Создайте платёжную ссылку за секунды
            </p>
          </div>
        </div>

        <Card className="p-8 space-y-6 glass-card animate-scale-in">
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-sm font-medium text-primary flex items-center gap-2">
              <Icon name="Coins" size={16} />
              Сумма платежа
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="text"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                className="text-5xl font-bold h-24 text-center tracking-tight bg-muted/50 border-2 border-primary/20 focus:border-primary/50 transition-all duration-300"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-primary/60 font-bold">
                ₽
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="seller" className="text-sm font-medium text-primary flex items-center gap-2">
              <Icon name="User" size={16} />
              ФИО продавца
            </Label>
            <Input
              id="seller"
              type="text"
              placeholder="Иванов Иван Иванович"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="h-14 text-lg bg-muted/50 border-2 border-primary/20 focus:border-primary/50 transition-all duration-300"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-primary flex items-center gap-2">
              <Icon name="Building2" size={16} />
              Выберите банк
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.id)}
                  className={`
                    relative h-20 rounded-2xl transition-all duration-300 overflow-hidden group
                    ${selectedBank === bank.id 
                      ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary scale-[1.02]' 
                      : 'bg-muted/30 border-2 border-primary/10 hover:border-primary/30 hover:bg-muted/50'
                    }
                  `}
                >
                  <div className="flex flex-col items-center justify-center h-full gap-2 relative z-10">
                    <Icon name={bank.icon as any} size={24} className={selectedBank === bank.id ? 'text-primary' : 'text-foreground/60'} />
                    <span className={`text-xs font-semibold ${selectedBank === bank.id ? 'text-foreground' : 'text-foreground/60'}`}>
                      {bank.name}
                    </span>
                  </div>
                  {selectedBank === bank.id && (
                    <div className="absolute inset-0 shimmer opacity-30" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerateLink}
            className="w-full h-14 text-base font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transition-all duration-300"
            size="lg"
          >
            <Icon name="Sparkles" size={20} className="mr-2" />
            Сгенерировать ссылку
          </Button>

          {generatedLink && (
            <div className="space-y-3 pt-4 border-t border-primary/20 animate-fade-in">
              <Label className="text-sm font-medium text-primary flex items-center gap-2">
                <Icon name="Link" size={16} />
                Готовая ссылка
              </Label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="text-xs bg-muted/50 border-2 border-primary/20 font-mono"
                />
                <Button
                  onClick={handleCopyLink}
                  className="shrink-0 h-11 w-11 bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 hover:border-primary/50"
                  size="icon"
                  variant="outline"
                >
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <Icon name="Shield" size={14} className="text-primary" />
              Безопасно
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Zap" size={14} className="text-primary" />
              Мгновенно
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Check" size={14} className="text-primary" />
              Надёжно
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
