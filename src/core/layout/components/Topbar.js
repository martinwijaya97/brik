import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

import Theme from '../../theme';

import isMobileDevice from '../../utils/isMobileDevice';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.header,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    textTitle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: theme.fontSize[24],
      color: theme.colors.textSecondary,
    },
    iconMenu: {
      marginLeft: 2,
      color: theme.colors.textSecondary,
    },
  };

  return styles;
};

const Topbar = ({ handleOpenSidebar }) => {
  const styles = useStyles();
  const isMobile = isMobileDevice();

  const renderMenuIcon = () => {
    if (isMobile) {
      return (
        <IconButton sx={styles.iconMenu} onClick={handleOpenSidebar}>
          <MenuIcon />
        </IconButton>
      );
    }
  };

  return (
    <Box div sx={styles.root}>
      <Grid container sx={styles.container}>
        <Grid item xs>
          {renderMenuIcon()}
        </Grid>
        <Grid item xs={6}>
          <Typography sx={styles.textTitle}>Brik</Typography>
        </Grid>
        <Grid item xs />
      </Grid>
    </Box>
  );
};

export default Topbar;
