import axios from 'axios';
import config from '../../config';

import { SnackbarAction } from './SnackbarAction';

const handleSnackbar = ({ message, dispatch, type }) => {
  dispatch(
    SnackbarAction.showSnackbar({
      message: message,
      type,
    })
  );
};

const handleMachineSearch = ({ data, searchQuery }) => {
  if (searchQuery) {
    return data.filter((value) => value.name.includes(searchQuery));
  }
  return data;
};

const handleGroupMachine = ({ data, rowsPerPage, page }) => {
  if (!rowsPerPage && !page) {
    return data;
  }

  let parents = [];
  let children = [];

  data.forEach((value, index) => {
    if (data.length === index + 1) {
      children.push(value);
      parents.push(children);
      return (children = []);
    }

    if (children.length < rowsPerPage - 1) {
      return children.push(value);
    }

    if (children.length === rowsPerPage - 1) {
      children.push(value);
      parents.push(children);
      return (children = []);
    }
  });

  return parents[page];
};

function setData({ data, type }) {
  return {
    type: type,
    data: data,
  };
}

function getMachines({ rowsPerPage, page, searchQuery }) {
  return async (dispatch) => {
    try {
      const data = await config.get().then(({ data }) => data);
      const machines = handleMachineSearch({ data, searchQuery });
      const machinePagination = handleGroupMachine({
        data: machines,
        rowsPerPage,
        page,
        searchQuery,
      });

      const response = {
        machines: machinePagination,
        total: machines.length,
      };

      if (response) {
        await dispatch(setData({ data: response, type: 'SET_PRODUCT' }));
        return response;
      }
    } catch (error) {
      handleSnackbar({
        message: 'Get Machine Failed!',
        dispatch,
        type: 'error',
      });
      return null;
    }
  };
}

function getMachineDetail({ id }) {
  return async (dispatch) => {
    try {
      const response = JSON.parse(window.localStorage.getItem('machines'));
      const machineFind = response?.machines?.find((machine) => machine._id === id);

      if (!!machineFind) {
        return machineFind;
      }
    } catch (error) {
      handleSnackbar({
        message: 'Get Machine Detail Failed!',
        dispatch,
        type: 'error',
      });
      return null;
    }
  };
}

function createMachine({ machineCode, machineName, machineType, subInstrumentCode, image }) {
  return async (dispatch) => {
    try {
      const payload = {
        machineCode,
        machineName,
        machineType,
        subInstrumentCode,
        image,
      };

      const response = await config.post('/', payload).then(({ data }) => data);
      if (!!response) {
        handleSnackbar({
          message: 'Create Machine Success!',
          dispatch,
          type: 'success',
        });
        return response;
      }
    } catch (error) {
      handleSnackbar({
        message: 'Create Machine Failed!',
        dispatch,
        type: 'error',
      });
      return null;
    }
  };
}

function updateMachine({ id, machineCode, machineName, machineType, subInstrumentCode, image }) {
  return async (dispatch) => {
    try {
      const payload = {
        id,
        machineCode,
        machineName,
        machineType,
        subInstrumentCode,
        image,
      };

      const response = await config.post('/', payload).then(({ data }) => data);
      if (!!response) {
        handleSnackbar({
          message: 'Create Machine Success!',
          dispatch,
          type: 'success',
        });
        return response;
      }
    } catch (error) {
      handleSnackbar({
        message: 'Create Machine Failed!',
        dispatch,
        type: 'error',
      });
      return null;
    }
  };
}

function machineUploadImage({ file }) {
  var formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'machine');
  const url = 'http://api.yamsi.online/api/v1/internal/upload';

  return async () => {
    try {
      const result = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return result.data.path;
    } catch (error) {
      return null;
    }
  };
}

export const MachineAction = {
  setData,
  getMachines,
  getMachineDetail,
  createMachine,
  updateMachine,
  machineUploadImage,
};
