import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { SnackbarAction } from '../../../redux/actions/SnackbarAction';

import Theme from '../../theme';

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
      backgroundColor: theme.colors.semanticSuccess,
    },
    rootError: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingX: 2,
      backgroundColor: theme.colors.semanticError,
    },
  };
  return styles;
};

const AppSnackbar = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar?.show);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (snackbar?.message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [snackbar]);

  const handleClose = async () => {
    await dispatch(SnackbarAction.closeSnackbar());
  };

  const handleStyles = (type) => {
    switch (type) {
      case 'success':
        return styles.rootSuccess;
      case 'error':
        return styles.rootError;
      default:
        return styles.rootSuccessll;
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
    if (snackbar?.message) {
      return (
        <Box sx={handleStyles(snackbar?.type)}>
          {renderIcon(snackbar?.type)}
          <Typography>{snackbar?.message}</Typography>
          <IconButton>
            <CloseIcon />
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
