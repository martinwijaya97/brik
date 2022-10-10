const defaultState = {
  show: {
    message: '',
    type: '',
  },
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_SNACKBAR':
      return {
        ...state,
        show: action.data,
      };
    default:
      return state;
  }
}
