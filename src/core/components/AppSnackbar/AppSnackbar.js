import React, { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Theme from '../../theme';
import useGlobal from '../../../globalStore';

const useStyles = () => {
  const theme = Theme();
  const styles = {
    rootSuccess: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingX: 2,
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.semanticSuccess,
    },
    rootError: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingX: 2,
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.semanticError,
    },
    icon: {
      color: theme.colors.textSecondary,
    },
    text: {
      marginLeft: 1,
    },
  };
  return styles;
};

const AppSnackbar = () => {
  const styles = useStyles();

  const [settingState, settingActions] = useGlobal(
    (state) => state.settings,
    (actions) => actions.settings
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(settingState);
    if (settingState?.message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [settingState]);

  const handleClose = async () => {
    await settingActions.closeSnackbar();
  };

  const handleStyles = (type) => {
    switch (type) {
      case 'success':
        return styles.rootSuccess;
      case 'error':
        return styles.rootError;
      default:
        return styles.rootSuccess;
    }
  };
  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <WarningIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const renderSnackbarValue = () => {
    if (settingState?.message) {
      return (
        <Box sx={handleStyles(settingState?.type)}>
          {renderIcon(settingState?.type)}
          <Typography sx={styles.text}>{settingState?.message}</Typography>
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon sx={styles.icon} />
          </IconButton>
        </Box>
      );
    }
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      open={open}
      onClose={() => handleClose()}
    >
      {renderSnackbarValue()}
    </Snackbar>
  );
};

export default AppSnackbar;
