/**
 * Formats minor units (paise) into INR currency display
 * e.g., 55000 -> "₹550" or "₹550.00"
 */
export function formatINR(amountMinor: number, showDecimals: boolean = false): string {
  const rupees = amountMinor / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(rupees);
}

export function minorToRupees(amountMinor: number): number {
  return amountMinor / 100;
}

export function rupeesToMinor(rupees: number): number {
  return Math.round(rupees * 100);
}
