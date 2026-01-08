export const formatPriceKeepSymbol = (price: string) => {
  if (!price) return "";

  const symbol = price.charAt(0); // ₦ | $ | £
  const amount = Number(price.slice(1));

  if (isNaN(amount)) return price;

  const formattedAmount = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${symbol}${formattedAmount}`;
};

export const parsePrice = (price?: string) => {
  if (!price) return 0;
  return Number(price.replace(/[^\d.]/g, ""));
};

export const parsePriceToCents = (price?: string): number => {
  if (!price) return 0;

  const numeric = price.replace(/[^\d.]/g, "");
  return Math.round(Number(numeric) * 100);
};
