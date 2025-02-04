export const showSuccessMessage = async (store, message) => {
  const settings = {
    ...store.state.settings,
    message: message,
    shouldOpenSnackbar: true,
    type: 'success',
  };
  store.setState({ settings });
};

export const showErrorMessage = async (store, message) => {
  const settings = {
    ...store.state.settings,
    message: message,
    shouldOpenSnackbar: true,
    type: 'error',
  };
  store.setState({ settings });
};

export const closeSnackbar = async (store) => {
  const settings = {
    ...store.state.settings,
    message: '',
    shouldOpenSnackbar: false,
  };
  store.setState({ settings });
};

export const showDialog = async (store, { dialogTitle, dialogMessage, dialogConfirmFunction }) => {
  const settings = {
    ...store.state.settings,
    shouldShowDialog: true,
    dialogTitle,
    dialogMessage,
    dialogConfirmFunction,
  };
  store.setState({ settings });
};

export const closeDialog = async (store) => {
  const settings = {
    ...store.state.settings,
    shouldShowDialog: false,
    dialogTitle: null,
    dialogMessage: null,
    dialogConfirmFunction: null,
  };
  store.setState({ settings });
};
