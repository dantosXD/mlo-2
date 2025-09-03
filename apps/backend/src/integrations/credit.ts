export interface CreditReport {
  score: number;
  history: string[];
}

/**
 * Fetch a mock credit report for the supplied SSN.
 */
export async function fetchCredit(ssn: string): Promise<CreditReport> {
  const res = await fetch(`https://example.com/api/credit?ssn=${encodeURIComponent(ssn)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch credit report');
  }
  return res.json() as Promise<CreditReport>;
}
