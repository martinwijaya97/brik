import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import { deviceSize } from '../utils';

const useStyles = () => {
  const { height } = deviceSize();
  const styles = {
    root: {
      height: '100%',
      width: '100%',
      flex: 1,
      position: 'fixed',
    },
    header: {
      height: height * 0.1,
    },
    body: {
      height: height * 0.9,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    wrapFeature: {
      width: '100%',
      padding: 2,
      overflowY: 'scroll',
    },
  };
  return styles;
};

const Main = ({ children }) => {
  const styles = useStyles();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setIsOpenSidebar(false);
  };

  const renderHeader = () => {
    return (
      <Box div sx={styles.header}>
        <Topbar handleOpenSidebar={handleOpenSidebar} />
      </Box>
    );
  };

  const renderSidebar = () => {
    return <Sidebar open={isOpenSidebar} handleClose={handleCloseSidebar} />;
  };

  const renderFeature = () => {
    return (
      <Box main sx={styles.wrapFeature}>
        {children}
      </Box>
    );
  };

  const renderBody = () => {
    return (
      <Box style={styles.body}>
        {renderSidebar()}
        {renderFeature()}
      </Box>
    );
  };

  return (
    <Box div sx={styles.root}>
      {renderHeader()}
      {renderBody()}
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
