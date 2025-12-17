import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const banks = [
  { id: 'alfa', name: 'ALFA' },
  { id: 'sber', name: 'SBER' },
  { id: 'tinkoff', name: 'TINKOFF' },
  { id: 'vtb', name: 'VTB' },
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
      toast.error('ERROR: EMPTY_FIELDS', {
        style: {
          background: '#000',
          color: '#00ff00',
          border: '1px solid #00ff00',
          fontFamily: 'Courier New, monospace'
        }
      });
      return;
    }

    const link = `https://payflow.app/pay?amount=${amount.replace(/\s/g, '')}&seller=${encodeURIComponent(sellerName)}&bank=${selectedBank}`;
    setGeneratedLink(link);
    toast.success('SUCCESS: LINK_GENERATED', {
      style: {
        background: '#000',
        color: '#00ff00',
        border: '1px solid #00ff00',
        fontFamily: 'Courier New, monospace'
      }
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success('SUCCESS: COPIED_TO_CLIPBOARD', {
      style: {
        background: '#000',
        color: '#00ff00',
        border: '1px solid #00ff00',
        fontFamily: 'Courier New, monospace'
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 matrix-bg scan-line">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-primary text-2xl">{'>'}</span>
            <Icon name="Terminal" size={28} className="text-primary terminal-text" />
          </div>
          <h1 className="text-5xl font-bold tracking-wider terminal-text uppercase">
            PAYFLOW
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            [PAYMENT_LINK_GENERATOR_v1.0]
          </p>
        </div>

        <Card className="p-6 space-y-6 border-2 border-primary bg-card/95 backdrop-blur-sm">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-xs uppercase tracking-widest text-primary">
              {'> AMOUNT_RUB'}
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="text"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                className="text-3xl font-bold h-16 text-center tracking-wider border-2 border-primary bg-input text-primary focus:border-primary focus:ring-2 focus:ring-primary/50 terminal-text"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-primary/60 font-bold">
                RUB
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller" className="text-xs uppercase tracking-widest text-primary">
              {'> SELLER_NAME'}
            </Label>
            <Input
              id="seller"
              type="text"
              placeholder="IVANOV_I_I"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="h-12 text-base font-bold border-2 border-primary bg-input text-primary focus:border-primary focus:ring-2 focus:ring-primary/50 terminal-text uppercase"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-primary">{'> BANK_SELECT'}</Label>
            <div className="grid grid-cols-2 gap-2">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.id)}
                  className={`
                    h-12 border-2 transition-all duration-150 font-bold text-sm uppercase tracking-wider
                    ${selectedBank === bank.id 
                      ? 'border-primary bg-primary text-black' 
                      : 'border-primary/40 bg-transparent text-primary hover:border-primary hover:bg-primary/10'
                    }
                  `}
                >
                  {selectedBank === bank.id && <span className="mr-1">{'>'}</span>}
                  {bank.name}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerateLink}
            className="w-full h-12 text-sm font-bold border-2 border-primary bg-primary text-black hover:bg-primary/90 uppercase tracking-widest transition-all"
          >
            {'> GENERATE_LINK'}
          </Button>

          {generatedLink && (
            <div className="space-y-2 pt-4 border-t-2 border-primary/30 animate-fade-in">
              <Label className="text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                <Icon name="Link" size={14} className="text-primary" />
                {'OUTPUT'}
              </Label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="text-xs border-2 border-primary/40 bg-muted text-primary font-mono"
                />
                <Button
                  onClick={handleCopyLink}
                  className="shrink-0 h-10 w-10 border-2 border-primary bg-primary text-black hover:bg-primary/90"
                  size="icon"
                >
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-mono">
            [SECURE] • [INSTANT] • [24/7]
          </p>
        </div>
      </div>
    </div>
  );
}
