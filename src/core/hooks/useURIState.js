import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

const useURIState = ({ name, defaultValue, readFunction, isNumber }) => {
  const location = useLocation();
  return useState(() => {
    const initialState = qs.parse(location.search, { ignoreQueryPrefix: true });
    const valueFromUrl = initialState[name];
    if (!valueFromUrl) {
      return defaultValue;
    }
    const value = isNumber ? parseInt(valueFromUrl, 10) : valueFromUrl;
    return readFunction ? readFunction(value) : value;
  });
};

export default useURIState;
