import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);

  const getData = () => fetch(url).then((res) => res.json());

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch((err) => setHasError(true));
  }, [url]);

  return { data, hasError };
};
