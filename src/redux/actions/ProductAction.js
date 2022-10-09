import config from '../../config';

function setData({ data, type }) {
  return {
    type: type,
    data: data,
  };
}

function getProducts() {
  return async (dispatch) => {
    try {
      const response = await config.get().then(({ data }) => data);
      if (response) {
        dispatch(setData({ data: response, type: 'SET_PRODUCT' }));
        return response;
      }
      console.log('MARTING GILA', response);
    } catch (error) {
      console.log(error);
    }
  };
}

function createProduct({
  categoryId,
  categoryName,
  sku,
  name,
  description,
  weight,
  width,
  length,
  height,
  price,
  image,
}) {
  return async (dispatch) => {
    try {
      const payload = {
        categoryId,
        categoryName,
        sku,
        name,
        description,
        weight,
        width,
        length,
        height,
        price,
        image,
      };

      const response = await config.post('/', payload).then(({ data }) => data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}

export const ProductAction = {
  setData,
  getProducts,
  createProduct,
};
