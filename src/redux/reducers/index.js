import { combineReducers } from 'redux';
import product from './ProductReducer';
import snackbar from './SnackbarReducer';

const rootReducer = combineReducers({
  product,
  snackbar,
});

export default rootReducer;
