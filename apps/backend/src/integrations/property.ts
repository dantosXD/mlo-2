export interface PropertyRecord {
  address: string;
  value: number;
}

/**
 * Fetch a mock property record for a given address.
 */
export async function fetchProperty(address: string): Promise<PropertyRecord> {
  const res = await fetch(`https://example.com/api/property?address=${encodeURIComponent(address)}`);
  if (!res.ok) {
    throw new Error('Failed to fetch property record');
  }
  return res.json() as Promise<PropertyRecord>;
}
