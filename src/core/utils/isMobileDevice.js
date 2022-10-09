// const IsMobileDevice = () => {
//   const details = navigator.userAgent;

//   const regexp = /android|iphone|kindle|ipad/i;

//   const isMobileDevice = regexp.test(details);

//   return isMobileDevice;
// };

// export default IsMobileDevice;

import { useState, useLayoutEffect } from 'react';

const IsMobileDevice = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (size.width > 600) {
    return false;
  } else {
    return true;
  }
};

export default IsMobileDevice;
