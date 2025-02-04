import { useNavigate } from 'react-router-dom';

const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = (fallback = '/') => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return goBack;
};

export default useGoBack;
