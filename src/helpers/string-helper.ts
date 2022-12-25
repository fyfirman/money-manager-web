export const currencyFormatter = (amount: number) => {
  const parts = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).formatToParts(amount);

  let formatted = "";
  for (const part of parts) {
    if (part.type === "integer") {
      formatted += part.value.replace(",", ".");
    } else if (part.type === "decimal") {
      formatted += `.${part.value}`;
    } else {
      formatted += part.value;
    }
  }

  return formatted;
};
