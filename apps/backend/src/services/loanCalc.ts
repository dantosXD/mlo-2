export interface AmortizationPayment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Calculate standard amortization schedule for a loan.
 * @param principal loan amount
 * @param annualRate annual interest rate as percentage (e.g. 5 for 5%)
 * @param termMonths number of months for the loan
 */
export function calculateAmortization(
  principal: number,
  annualRate: number,
  termMonths: number
): AmortizationPayment[] {
  const monthlyRate = annualRate / 12 / 100;
  const payment =
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -termMonths));

  const schedule: AmortizationPayment[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month,
      payment,
      principal: principalPaid,
      interest,
      balance,
    });
  }
  return schedule;
}

/**
 * Calculate payments for a simple rate buydown where the interest rate is
 * reduced by `buydownRate` for the first `buydownMonths` payments.
 */
export function calculateBuydown(
  principal: number,
  annualRate: number,
  termMonths: number,
  buydownRate: number,
  buydownMonths: number
): AmortizationPayment[] {
  const baseRate = annualRate / 12 / 100;
  const buydownMonthlyRate = (annualRate - buydownRate) / 12 / 100;

  const basePayment =
    (principal * baseRate) / (1 - Math.pow(1 + baseRate, -termMonths));
  const buydownPayment =
    (principal * buydownMonthlyRate) /
    (1 - Math.pow(1 + buydownMonthlyRate, -termMonths));

  const schedule: AmortizationPayment[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const rate = month <= buydownMonths ? buydownMonthlyRate : baseRate;
    const payment = month <= buydownMonths ? buydownPayment : basePayment;
    const interest = balance * rate;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month,
      payment,
      principal: principalPaid,
      interest,
      balance,
    });
  }
  return schedule;
}
