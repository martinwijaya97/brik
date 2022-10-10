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

const handleProductSearch = ({ data, searchQuery }) => {
  if (searchQuery) {
    return data.filter((value) => value.name.includes(searchQuery));
  }
  return data;
};

const handleGroupProduct = ({ data, rowsPerPage, page }) => {
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

function getProducts({ rowsPerPage, page, searchQuery }) {
  return async (dispatch) => {
    try {
      const data = await config.get().then(({ data }) => data);
      const products = handleProductSearch({ data, searchQuery });
      const productPagination = handleGroupProduct({
        data: products,
        rowsPerPage,
        page,
        searchQuery,
      });

      const response = {
        products: productPagination,
        total: products.length,
      };

      if (response) {
        await dispatch(setData({ data: response, type: 'SET_PRODUCT' }));
        return response;
      }
    } catch (error) {
      handleSnackbar({
        message: 'Get Product Failed!',
        dispatch,
        type: 'error',
      });
      return null;
    }
  };
}

function getProductDetail({ id }) {
  return async (dispatch) => {
    try {
      const response = JSON.parse(window.localStorage.getItem('products'));
      const productFind = response?.products?.find(
        (product) => product._id === id
      );

      if (!!productFind) {
        return productFind;
      }
    } catch (error) {
      handleSnackbar({
        message: 'Get Product Detail Failed!',
        dispatch,
        type: 'error',
      });
      return null;
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
      if (!!response) {
        handleSnackbar({
          message: 'Create Product Success!',
          dispatch,
          type: 'success',
        });
        return response;
      }
    } catch (error) {
      handleSnackbar({
        message: 'Create Product Failed!',
        dispatch,
        type: 'error',
      });
      return null;
    }
  };
}

function productUploadImage({ file }) {
  var formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'product');
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

export const ProductAction = {
  setData,
  getProducts,
  getProductDetail,
  createProduct,
  productUploadImage,
};
