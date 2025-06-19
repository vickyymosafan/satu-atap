import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

interface UseFetchOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export function useApiFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { immediate = true, onSuccess, onError } = options;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url);
      const result: ApiResponse<T> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
        onSuccess?.(result.data);
      } else {
        const errorMessage = result.message || 'Gagal memuat data.';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = 'Gagal memuat data. Silakan coba lagi.';
      console.error(`Error fetching ${url}:`, err);
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, immediate]);

  return {
    data,
    loading,
    error,
    refetch,
    setData,
    setError
  };
}
