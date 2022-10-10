// import axios from 'axios';
// import config from '../../config';

function setData({ data, type }) {
  return {
    type: type,
    data: data,
  };
}

function showSnackbar({ message, type }) {
  return async (dispatch) => {
    await dispatch(setData({ data: { message, type }, type: 'SET_SNACKBAR' }));
  };
}

function closeSnackbar() {
  return async (dispatch) => {
    await dispatch(
      setData({
        data: {},
        type: 'SET_SNACKBAR',
      })
    );
  };
}

export const SnackbarAction = {
  setData,
  showSnackbar,
  closeSnackbar,
};
