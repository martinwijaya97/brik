import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import useGlobal from '../../../globalStore';

const AppDialog = () => {
  const [
    { shouldShowDialog, dialogTitle, dialogMessage, dialogConfirmFunction, dialogCloseFunction },
    { closeDialog },
  ] = useGlobal(
    (state) => state.settings,
    (actions) => actions.settings
  );

  if (!shouldShowDialog) return null;

  const handleClose = () => {
    if (dialogCloseFunction) dialogCloseFunction();
    closeDialog();
  };

  const handleConfirm = () => {
    dialogConfirmFunction?.();
    closeDialog();
  };

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={shouldShowDialog}
      onClose={closeDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' disableTypography>
        <Typography variant='h5'>{dialogTitle}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Tidak
        </Button>
        <Button onClick={handleConfirm} color='secondary' autoFocus>
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppDialog;
