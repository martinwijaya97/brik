const defaultState = {
  products: [],
  productsByCategory: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_PRODUCT':
      return {
        ...state,
        products: action.data,
      };
    case 'SET_PRODUCT_BY_CATEGORY':
      return {
        ...state,
        productsByCategory: action.data.products,
      };
    default:
      return state;
  }
}
