/**
 * Utility helpers for handling Social Security Numbers.
 */

/**
 * Naive "decryption" placeholder. In a real application this would use a
 * strong cryptographic routine and the encrypted value would be stored on the
 * server. For demonstration we simply return the given value.
 */
export function decryptSSN(encrypted: string): string {
  // Placeholder: the value is assumed to already be decrypted
  return encrypted;
}

/**
 * Returns a masked version of the SSN unless the caller is authorized. If the
 * caller is authorized, the SSN is "decrypted" and returned in full.
 */
export function formatSSN(encrypted: string, authorized: boolean): string {
  const ssn = authorized ? decryptSSN(encrypted) : encrypted;
  if (authorized) {
    return ssn;
  }
  // Mask all digits except the last four
  return ssn.replace(/\d(?=\d{4})/g, '*');
}
