import { useState, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.gameserver.petedillo.com';

interface UseApiReturn<T, U = Record<string, unknown>> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (body?: U) => Promise<T | void>;
}

export function useApi<T = unknown, U = Record<string, unknown>>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  initialData: T | null = null
): UseApiReturn<T, U> {
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (body?: U) => {
      const url = `${API_BASE_URL}${endpoint}`;

      setLoading(true);
      setError(null);
      
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(body);
      }

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        // For 204 No Content responses, return early
        if (response.status === 204) {
          setLoading(false);
          return;
        }

        const responseData = await response.json() as T;
        setData(responseData);
        setLoading(false);
        return responseData;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        setData(null);
        setLoading(false);
        throw err;
      }
    },
    [endpoint, method]
  );

  return { data, loading, error, execute };
}

export default useApi;
