import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const banks = [
  { id: 'alfa', name: 'Альфа-Банк', color: '#EF3124' },
  { id: 'sber', name: 'Сбербанк', color: '#21A038' },
  { id: 'tinkoff', name: 'Тинькофф', color: '#FFDD2D' },
  { id: 'vtb', name: 'ВТБ', color: '#0075C9' },
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
      toast.error('Заполните все поля');
      return;
    }

    const selectedBankData = banks.find(b => b.id === selectedBank);
    const link = `https://payflow.app/pay?amount=${amount.replace(/\s/g, '')}&seller=${encodeURIComponent(sellerName)}&bank=${selectedBank}`;
    setGeneratedLink(link);
    toast.success('Ссылка сгенерирована!');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('Ссылка скопирована в буфер обмена');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Icon name="Wallet" size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">PayFlow</h1>
          <p className="text-muted-foreground text-lg">Создайте ссылку для оплаты</p>
        </div>

        <Card className="p-8 space-y-6 shadow-lg animate-scale-in">
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-base font-medium">
              Сумма платежа
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="text"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                className="text-4xl font-semibold h-20 text-center tracking-tight border-2 focus:border-primary transition-all"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground font-medium">
                ₽
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="seller" className="text-base font-medium">
              ФИО продавца
            </Label>
            <Input
              id="seller"
              type="text"
              placeholder="Иванов Иван Иванович"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="h-14 text-lg border-2 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Выберите банк</Label>
            <div className="grid grid-cols-2 gap-3">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.id)}
                  className={`
                    relative h-16 rounded-xl border-2 transition-all duration-200
                    ${selectedBank === bank.id 
                      ? 'border-primary bg-primary/5 scale-[1.02]' 
                      : 'border-border hover:border-primary/40 hover:bg-muted/30'
                    }
                  `}
                >
                  <div className="flex items-center justify-center h-full px-4">
                    <span className="font-medium text-sm">{bank.name}</span>
                  </div>
                  {selectedBank === bank.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Icon name="Check" size={14} className="text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerateLink}
            className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            size="lg"
          >
            <Icon name="Link" size={20} className="mr-2" />
            Сгенерировать ссылку
          </Button>

          {generatedLink && (
            <div className="space-y-3 pt-4 border-t animate-fade-in">
              <Label className="text-base font-medium">Готовая ссылка</Label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="text-sm border-2"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="icon"
                  className="shrink-0 h-10 w-10"
                >
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Безопасные платежи через банковские приложения
        </p>
      </div>
    </div>
  );
}
