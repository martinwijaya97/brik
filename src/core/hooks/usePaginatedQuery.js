import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';

const usePaginatedQuery = (query, variables, cacheKey = 'default') => {
  const [cache, setCache] = useState({});
  const [rows, setRows] = useState([]);

  cacheKey = `${variables.page}_${variables.sortByColumnName}_${variables.sortByDirection}`;

  const {
    data: result,
    loading,
    error,
    refetch,
  } = useQuery(query, {
    variables,
    fetchPolicy: 'network-only',
    skip: !!cache[cacheKey],
  });

  const loadData = useCallback(() => {
    const currentPageData = cache[cacheKey];
    if (currentPageData) {
      setRows(currentPageData);
    } else if (result) {
      setRows(result.companyList);
      setCache((prevCache) => ({
        ...prevCache,
        [cacheKey]: {
          companies: result.companyList.companies,
          meta: result.companyList.meta,
        },
      }));
    }
  }, [result, cache, cacheKey]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data: rows, error, loading, refetch };
};

export default usePaginatedQuery;
