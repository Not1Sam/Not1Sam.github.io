interface RateLimitInfo {
  remaining: number;
  reset: number;
}

let cachedRateLimit: RateLimitInfo | null = null;

export async function githubFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = response.headers.get("x-ratelimit-reset");

  if (remaining !== null && reset !== null) {
    cachedRateLimit = {
      remaining: parseInt(remaining, 10),
      reset: parseInt(reset, 10),
    };
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

  return response.json() as Promise<T>;
}

export function getRateLimitInfo(): RateLimitInfo | null {
  return cachedRateLimit;
}
