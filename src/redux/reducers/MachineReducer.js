const defaultState = {
  machines: JSON.parse(window.localStorage.getItem('machines')) || [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_PRODUCT':
      window.localStorage.setItem('machines', JSON.stringify(action.data));
      return {
        ...state,
        machines: action.data,
      };

    default:
      return state;
  }
}
