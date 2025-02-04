import globalHook from 'use-global-hook';
import * as actions from './actions';
import initialState from './state';

const useGlobal = globalHook(initialState, actions);

export default useGlobal;
