import axios from 'axios';
import { useState, useEffect } from 'react';
import {apiVariable} from "./apiVariable";

const usePaginatedData = (initialPage = 1, initialPageSize = 10) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [total_pages, setTotalPages] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from the Flask API
  const fetchData = async (filter, page, pageSize) => {
    setLoading(true);
    setError(null);
    console.log(`${apiVariable}/search/restaurant/all`);

    try {
      const response = await axios.get(`${apiVariable}/search/restaurant/all`, {
        params: {
          filter1: filter.name,
          country: filter.country,
          avgSpend: filter.avgSpend,
          cuisines: filter.cuisines,
          long: filter.longitude,
          lat: filter.latitude,
          radius: filter.radius,
          page,
          page_size: pageSize
        }
      });
      setTotalPages(response.data["total_pages"]);
      setData(response.data["data"]);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when filter, page, or pageSize changes
  useEffect(() => {
    fetchData(filter, page, pageSize);
  }, [filter, page, pageSize]);

  return { data, page, total_pages, pageSize, loading, error, setPage, setPageSize, setFilter };
};

export default usePaginatedData;
