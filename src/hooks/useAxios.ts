import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

type ValidMethods = "GET" | "POST";

/**
 * use Axios hook returns loading, data, and result http status
 * @param method HTTP Method
 * @param url calling API URL
 */
export const useAxios = <T = any>(method: ValidMethods, url: string) => {
  // Loading state
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const [httpStatus, setHttpStatus] = useState<number>();

  const callApi = useCallback(async () => {
    const { status, data } = await axios({
      method,
      url,
    });
    setData(data);
    setHttpStatus(status);
  }, [url]);

  useEffect(() => {
    callApi();
    setLoading(false);
  }, []);

  return {
    loading,
    data,
    httpStatus,
  };
};
