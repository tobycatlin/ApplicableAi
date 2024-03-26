import { useState, useEffect } from "react";
import httpErrorCodes from "@lib/utils/http_error_codes";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          // console.log(response);
          const errorDetail = httpErrorCodes[response.status];

          throw new Error(
            `HTTP error: ${response.status} ${errorDetail.error} ${errorDetail.explanation}`
          );
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
