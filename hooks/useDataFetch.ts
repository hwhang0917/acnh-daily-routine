import { useEffect, useState } from "react";

function useDataFetch<P>(api: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<P>();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [api]);

  return { data, loading, error };
}

export default useDataFetch;
