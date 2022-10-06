import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Topbar from './components/Topbar';
import NewSideBar from './components/NewSideBar';

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const Main = ({ children }) => {
  const { height, width } = useWindowSize();
  return (
    <div
      style={{
        height: height,
        width: width,
        position: 'fixed',
      }}
    >
      <Topbar />
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <NewSideBar />
        <main
          style={{
            width: '100%',
            height: 'auto',
            overflowY: 'scroll',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
