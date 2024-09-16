import axios from "axios";
import { useState, useEffect } from "react";
import {apiVariable} from "./apiVariable";

const useDataById = (id) => {
  const [data, setData] = useState(null); // Use 'null' instead of []
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiVariable}/search/restaurant/${id}`);
      setData(response.data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id); // Fetch data only if 'id' is provided
    }
  }, [id]);

  return { data, loading, error };
};

export default useDataById;
