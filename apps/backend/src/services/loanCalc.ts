export interface Payment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Generate an amortization schedule for a fixed rate mortgage.
 * @param principal The starting loan balance
 * @param annualRate Annual interest rate as decimal (e.g. 0.05 for 5%)
 * @param years Loan term in years
 */
export function calculateAmortization(principal: number, annualRate: number, years: number): Payment[] {
  const payments: Payment[] = [];
  const monthlyRate = annualRate / 12;
  const n = years * 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  let balance = principal;

  for (let month = 1; month <= n; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    payments.push({
      month,
      payment,
      principal: principalPaid,
      interest,
      balance
    });
  }
  return payments;
}

/**
 * Compute a schedule with an initial rate buydown.
 * The loan starts with a reduced rate for buydownYears then reverts to annualRate.
 */
export function calculateBuydown(
  principal: number,
  annualRate: number,
  buydownRate: number,
  buydownYears: number,
  termYears: number
): Payment[] {
  const schedule: Payment[] = [];
  const buydownMonthlyRate = (annualRate - buydownRate) / 12;
  const baseMonthlyRate = annualRate / 12;
  const totalMonths = termYears * 12;
  const buydownMonths = buydownYears * 12;

  // Payment during buydown period
  const buydownPayment = principal * (buydownMonthlyRate * Math.pow(1 + buydownMonthlyRate, totalMonths)) /
    (Math.pow(1 + buydownMonthlyRate, totalMonths) - 1);

  let balance = principal;
  for (let month = 1; month <= buydownMonths; month++) {
    const interest = balance * buydownMonthlyRate;
    const principalPaid = buydownPayment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ month, payment: buydownPayment, principal: principalPaid, interest, balance });
  }

  // Remaining term at base rate
  const remainingMonths = totalMonths - buydownMonths;
  const basePayment = balance * (baseMonthlyRate * Math.pow(1 + baseMonthlyRate, remainingMonths)) /
    (Math.pow(1 + baseMonthlyRate, remainingMonths) - 1);

  for (let i = 1; i <= remainingMonths; i++) {
    const month = buydownMonths + i;
    const interest = balance * baseMonthlyRate;
    const principalPaid = basePayment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ month, payment: basePayment, principal: principalPaid, interest, balance });
  }

  return schedule;
}
