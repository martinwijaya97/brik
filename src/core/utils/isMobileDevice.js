import { useState, useLayoutEffect } from 'react';

const IsMobileDevice = () => {
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    function update() {
      setSize(window.innerWidth);
    }

    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, []);

  if (size > 600) {
    return false;
  } else {
    return true;
  }
};

export default IsMobileDevice;
