import { combineReducers } from 'redux';
import machine from './MachineReducer';
import snackbar from './SnackbarReducer';

const rootReducer = combineReducers({
  machine,
  snackbar,
});

export default rootReducer;
