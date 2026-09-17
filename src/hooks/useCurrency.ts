import { useTranslation } from 'react-i18next';

type Currency = 'PEN' | 'USD' | 'EUR' | 'BRL';

const CURRENCY_RATES: Record<Currency, number> = {
  USD: 1,
  PEN: 3.75,
  EUR: 0.92,
  BRL: 5.0,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  PEN: 'S/.',
  EUR: '€',
  BRL: 'R$',
};

export const useCurrency = () => {
  const { i18n } = useTranslation();

  const getCurrency = (): Currency => {
    switch (i18n.language) {
      case 'es': return 'PEN';
      case 'fr': return 'EUR';
      case 'pt': return 'BRL';
      case 'en':
      default: return 'USD';
    }
  };

  const currency = getCurrency();

  const formatPrice = (amountInUSD: number): string => {
    const rate = CURRENCY_RATES[currency];
    const converted = amountInUSD * rate;
    
    const formatted = new Intl.NumberFormat(i18n.language === 'en' ? 'en-US' : i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'pt' ? 'pt-BR' : 'es-PE', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(converted);

    return ${CURRENCY_SYMBOLS[currency]} ;
  };

  const getRawPrice = (amountInUSD: number): number => {
    return Math.round(amountInUSD * CURRENCY_RATES[currency]);
  };

  return {
    currency,
    symbol: CURRENCY_SYMBOLS[currency],
    formatPrice,
    getRawPrice,
  };
};