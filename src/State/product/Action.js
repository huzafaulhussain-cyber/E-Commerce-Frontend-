import { api } from "../../config/apiConfig";
import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  const {
    color, sizes, minPrice, maxPrice, minDiscount, // 'size' ko 'sizes' kiya
    category, stock, sort, pageNumber, pageSize,
  } = reqData;

  try {
    const queryParams = new URLSearchParams({
      color: color || "",
      sizes: sizes || "", // Backend 'sizes' mang raha hai
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 1000000,
      minDiscount: minDiscount || 0,
      category: category || "",
      stock: stock || "",
      sort: sort || "",
      pageNumber: pageNumber || 1,
      pageSize: pageSize || 20
    }).toString();

    const { data } = await api.get(`/api/products?${queryParams}`);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};


export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const productId = reqData.productId || reqData;
  console.log('productId id found', productId);
  try {
    const { data } = await api.get(`/api/products/${productId}`);
    console.log("Success! Product Data:", data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("API Error Catch:", error.message);
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCTS_REQUEST });
  try {
    const { data } = await api.post(`/api/admin/products/`, product);
    console.log("Success! Create Product :", data);
    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
    return Promise.resolve(data);
  } catch (error) {
    console.log("API Error Catch:", error.message);
    dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
    return Promise.reject(error);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCTS_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/products/${productId}`);
    console.log("Success! Delete Product :", data);
    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: productId });
  } catch (error) {
    console.log("API Error Catch:", error.message);
    dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
  }
};