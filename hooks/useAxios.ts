import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import qs from "qs";

axios.defaults.paramsSerializer = (params) => qs.stringify(params);

/**
 * Axios Request를 보내는 커스텀 Hook
 */
export const useAxios = <T = any>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  url: string,
  config?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const request = useCallback(async () => {
    try {
      const { data } = await axios.request<T>({ ...config, url, method });
      setData(data);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [method, url, config]);

  useEffect(() => {
    request();
  }, [request]);

  return {
    data,
    error,
    loading,
  };
};
