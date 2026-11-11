const LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const SCHEME = /^[a-z][a-z0-9+.-]*:\/\//;

export function normalizeAddress(input: string): string | null {
  let value = input.trim().toLowerCase();
  value = value.replace(SCHEME, "");
  value = value.replace(/[/?#].*$/, "");

  if (value.length === 0 || value.length > 253) {
    return null;
  }

  const labels = value.split(".");
  // At least two labels, and a non-numeric ending, so "localhost" and "127.0.0.1" are not addresses.
  if (labels.length < 2 || /^\d+$/.test(labels[labels.length - 1] ?? "")) {
    return null;
  }

  return labels.every((label) => LABEL.test(label)) ? value : null;
}

export function isValidAddress(input: string): boolean {
  return normalizeAddress(input) !== null;
}
