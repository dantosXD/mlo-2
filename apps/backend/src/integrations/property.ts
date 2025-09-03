import fetch from 'node-fetch';

export async function fetchPropertyDetails(address: string) {
  const url = `${process.env.PROPERTY_API_URL}/details?address=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Property API error: ${res.status}`);
  }
  return res.json();
}
