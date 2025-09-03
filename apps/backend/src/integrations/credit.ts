import fetch from 'node-fetch';

export async function fetchCreditScore(ssn: string) {
  const url = `${process.env.CREDIT_API_URL}/score?ssn=${encodeURIComponent(ssn)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Credit API error: ${res.status}`);
  }
  return res.json();
}
