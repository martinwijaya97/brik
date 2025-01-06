import React from 'react';
import globalHook from 'use-global-hook';
import * as actions from './actions';
import initialState from './state';

console.log('STATE:', initialState);
console.log('ACTIONS:', actions);

const asd = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  },
};

console.log('asd', asd);

const useGlobal = globalHook(initialState, actions);

export default useGlobal;
