const defaultState = {
  products: JSON.parse(window.localStorage.getItem('products')) || [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_PRODUCT':
      window.localStorage.setItem('products', JSON.stringify(action.data));
      return {
        ...state,
        products: action.data,
      };

    default:
      return state;
  }
}
