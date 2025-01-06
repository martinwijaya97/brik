/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useMemoCompare from './useMemoCompare';
import qs from 'qs';

const useSyncUrl = (states, initializeStateFromUrl) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state from URL on mount
  useEffect(() => {
    if (initializeStateFromUrl) {
      const initialState = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      initializeStateFromUrl(initialState);
    }
  }, [initializeStateFromUrl, location.search]);

  // Memoize states for comparison
  const memoStates = useMemoCompare(states, (prevState, state) => {
    const stringifiedState = JSON.stringify(state);
    const stringifiedPrevState = JSON.stringify(prevState);

    return stringifiedState === stringifiedPrevState;
  });

  // Sync states with the URL
  useEffect(() => {
    if (!memoStates) return;

    const cleanedStates = Object.entries(memoStates).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    const queryUrl = qs.stringify(cleanedStates, { addQueryPrefix: true });
    const nextPath = `${location.pathname}${queryUrl}`;
    navigate(nextPath, { replace: true });
  }, [memoStates, location.pathname, navigate]);
};

export default useSyncUrl;
