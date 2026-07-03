interface RateLimitInfo {
  remaining: number;
  reset: number;
}

let cachedRateLimit: RateLimitInfo | null = null;

const CACHE_TTL = 5 * 60 * 1000;

function getCached<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(`gh_${key}`);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(`gh_${key}`);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function setCached(key: string, data: unknown): void {
  try {
    sessionStorage.setItem(`gh_${key}`, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

export async function githubFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  if (!options?.method || options.method === "GET") {
    const cached = getCached<T>(url);
    if (cached !== null) return cached;
  }

  const response = await fetch(url, options);

  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = response.headers.get("x-ratelimit-reset");

  if (remaining !== null && reset !== null) {
    const parsed = parseInt(remaining, 10);
    const parsedReset = parseInt(reset, 10);
    if (!isNaN(parsed) && !isNaN(parsedReset)) {
      cachedRateLimit = { remaining: parsed, reset: parsedReset };
    }
  }

  if (response.status === 403 && cachedRateLimit?.remaining === 0) {
    const resetTime = new Date(cachedRateLimit.reset * 1000);
    const waitSeconds = Math.max(0, Math.ceil((resetTime.getTime() - Date.now()) / 1000));
    throw new Error(
      `GitHub API rate limit exceeded. Resets in ${waitSeconds} seconds.`
    );
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("GitHub API returned non-JSON response");
  }

  const data = (await response.json()) as T;

  if (!options?.method || options.method === "GET") {
    setCached(url, data);
  }

  return data;
}
