export interface IncomeReport {
  annual: number;
  employer: string;
}

/**
 * Fetch a mock income report by tax identifier.
 */
export async function fetchIncome(taxId: string): Promise<IncomeReport> {
  const res = await fetch(`https://example.com/api/income?taxId=${encodeURIComponent(taxId)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch income report');
  }
  return res.json() as Promise<IncomeReport>;
}
