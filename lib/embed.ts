export const NON_EMBEDDABLE_DOMAINS = [
  "github.com",
  "stackoverflow.com",
  "medium.com",
  "leetcode.com",
  "geeksforgeeks.org",
  "wikipedia.org",
  "towardsdatascience.com",
  "google.com",
  "pypi.org",
  "codeforces.com",
  "cses.fi"
];

export function checkIsEmbeddable(url: string, explicitEmbeddable?: boolean): boolean {
  if (explicitEmbeddable !== undefined) return explicitEmbeddable;
  try {
    const hostname = new URL(url).hostname;
    return !NON_EMBEDDABLE_DOMAINS.some(domain => hostname.includes(domain));
  } catch {
    return true;
  }
}
