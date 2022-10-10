import React from 'react';
import Box from '@mui/material/Box';
import { isMobileDevice } from '../../utils';

const useStyles = () => {
  const styles = {
    root: {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rootMobile: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    left: {
      maxWidth: '900px',
      flexGrow: 1,
      marginY: '2px',
    },
    right: {
      marginY: '2px',
    },
  };
  return styles;
};

const FeatureHeader = ({ left, right }) => {
  const styles = useStyles();
  const isMobile = isMobileDevice();

  const rootStyles = isMobile ? styles.rootMobile : styles.root;

  return (
    <Box sx={rootStyles}>
      <Box sx={styles.left}>{left}</Box>
      <Box sx={styles.right}>{right}</Box>
    </Box>
  );
};

export default FeatureHeader;
