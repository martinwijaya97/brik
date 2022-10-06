import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const Topbar = () => {
  const styles = {
    typography1: {
      fontWeight: 'bold',
      fontSize: '26px',
      color: 'white',
      marginBottom: 10,
    },
    buttonMenuItem: {
      fontSize: '12px',
      color: 'black',
    },
    verticalDivider: {
      height: 20,
      width: 0,
      marginLeft: 10,
      marginRight: 10,
      border: '1px solid rgba(0, 0, 0, 0.13',
    },
  };

  return (
    <div
      style={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'RED',
      }}
    >
      {/* <img
        style={{ width: 'auto', height: 150 }}
        src='/images/teakdepotnew.png'
        alt='logo'
      /> */}
      <Typography style={styles.typography1}>Teakdepot</Typography>
    </div>
  );
};

export default Topbar;
