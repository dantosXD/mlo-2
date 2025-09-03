import React, { useState } from 'react';

interface Payment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// Simple client-side wrappers around the backend math
function amortization(principal: number, rate: number, years: number): Payment[] {
  const monthlyRate = rate / 12;
  const n = years * 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  let balance = principal;
  const result: Payment[] = [];
  for (let month = 1; month <= n; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    result.push({ month, payment, principal: principalPaid, interest, balance });
  }
  return result;
}

function buydown(principal: number, rate: number, buydownRate: number, buydownYears: number, termYears: number): Payment[] {
  const buydownMonthlyRate = (rate - buydownRate) / 12;
  const baseMonthlyRate = rate / 12;
  const totalMonths = termYears * 12;
  const buydownMonths = buydownYears * 12;
  const buydownPayment = principal * (buydownMonthlyRate * Math.pow(1 + buydownMonthlyRate, totalMonths)) /
    (Math.pow(1 + buydownMonthlyRate, totalMonths) - 1);
  let balance = principal;
  const schedule: Payment[] = [];
  for (let m = 1; m <= buydownMonths; m++) {
    const interest = balance * buydownMonthlyRate;
    const principalPaid = buydownPayment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ month: m, payment: buydownPayment, principal: principalPaid, interest, balance });
  }
  const remainingMonths = totalMonths - buydownMonths;
  const basePayment = balance * (baseMonthlyRate * Math.pow(1 + baseMonthlyRate, remainingMonths)) /
    (Math.pow(1 + baseMonthlyRate, remainingMonths) - 1);
  for (let i = 1; i <= remainingMonths; i++) {
    const interest = balance * baseMonthlyRate;
    const principalPaid = basePayment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ month: buydownMonths + i, payment: basePayment, principal: principalPaid, interest, balance });
  }
  return schedule;
}

const ScenarioPlanner: React.FC = () => {
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(0.05);
  const [term, setTerm] = useState(30);
  const [buydownRate, setBuydownRate] = useState(0.01);
  const [buydownYears, setBuydownYears] = useState(2);
  const [schedule, setSchedule] = useState<Payment[]>([]);

  const handleCalc = () => {
    setSchedule(buydown(amount, rate, buydownRate, buydownYears, term));
  };

  return (
    <div>
      <h2>Loan Scenario Planner</h2>
      <div>
        <label>Amount <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} /></label>
        <label>Rate <input type="number" step="0.001" value={rate} onChange={e => setRate(Number(e.target.value))} /></label>
        <label>Term (years) <input type="number" value={term} onChange={e => setTerm(Number(e.target.value))} /></label>
        <label>Buydown Rate <input type="number" step="0.001" value={buydownRate} onChange={e => setBuydownRate(Number(e.target.value))} /></label>
        <label>Buydown Years <input type="number" value={buydownYears} onChange={e => setBuydownYears(Number(e.target.value))} /></label>
        <button onClick={handleCalc}>Calculate</button>
      </div>
      {schedule.length > 0 && (
        <table>
          <thead>
            <tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>
          </thead>
          <tbody>
            {schedule.slice(0,12).map(p => (
              <tr key={p.month}>
                <td>{p.month}</td>
                <td>{p.payment.toFixed(2)}</td>
                <td>{p.principal.toFixed(2)}</td>
                <td>{p.interest.toFixed(2)}</td>
                <td>{p.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScenarioPlanner;
