import axios from 'axios';
import config from '../../config';

function setData({ data, type }) {
  return {
    type: type,
    data: data,
  };
}

function getProducts({ page = 0, pageSize = 10, filter = {} }) {
  return async (dispatch) => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${config.getUrlMasterData()}/product/list`,
        data: {
          page,
          pageSize,
          filter,
        },
      });

      if (result?.data?.data) {
        dispatch(setData({ data: result.data.data, type: 'SET_PRODUCT' }));
        return result.data.data;
      }
    } catch (error) {
      // console.log(error);
    }
  };
}

function getProductsByCategory({
  page = 0,
  pageSize = 10,
  categoryId,
  collectionId,
  isDisplayProduct,
}) {
  return async (dispatch) => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${config.getUrlMasterData()}/product/list`,
        data: {
          page,
          pageSize,
          filter: { categoryId, collectionId, isDisplayProduct },
        },
      });

      if (result?.data?.data) {
        await dispatch(
          setData({ data: result.data.data, type: 'SET_PRODUCT_BY_CATEGORY' })
        );
        return result.data.data;
      }
      return result.data.data;
    } catch (error) {
      // console.log(error);
    }
  };
}

function getProductsDisplay({ page = 0, pageSize = 10, filter }) {
  return async (dispatch) => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${config.getUrlMasterData()}/product/list`,
        data: {
          page,
          pageSize,
          filter,
        },
      });

      if (result?.data?.data) {
        dispatch(
          setData({ data: result.data.data, type: 'SET_PRODUCT_DISPLAY' })
        );
        return result.data.data;
      }
    } catch (error) {
      // console.log(error);
    }
  };
}

function getProductDetail({ id }) {
  return async (dispatch) => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${config.getUrlMasterData()}/product/${id}/detail`,
      });

      if (result?.data?.data) {
        dispatch(setData({ data: result.data.data, type: 'SET_PRODUCT' }));
        return result.data.data;
      }
    } catch (error) {
      // console.log(error);
    }
  };
}

export const ProductAction = {
  setData,
  getProducts,
  getProductDetail,
  getProductsByCategory,
  getProductsDisplay,
};
