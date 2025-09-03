import fetch from 'node-fetch';

export async function fetchIncomeVerification(ssn: string) {
  const url = `${process.env.INCOME_API_URL}/verify?ssn=${encodeURIComponent(ssn)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Income API error: ${res.status}`);
  }
  return res.json();
}
