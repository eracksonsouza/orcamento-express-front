const FALLBACK_API_URL = "http://localhost:3333";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? FALLBACK_API_URL;
}

type RequestConfig = RequestInit & {
  path: string;
};

export async function httpClient<T>({ path, headers, ...init }: RequestConfig): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
