 import { api } from "../../config/apiConfig";
import {
  GET_PRODUCT_RATING_REQUEST,
  GET_PRODUCT_RATING_SUCCESS,
  GET_PRODUCT_RATING_FAILURE,
  
} from "./ActionType";

export const getProductRatings = (productId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_RATING_REQUEST });
  try {
    // Agar alag endpoint banaya hai to wo use karo, warna reviews wala hi call karke stats store karo
    const response = await api.get(`/api/ratings/product/${productId}`); 
    dispatch({ type: GET_PRODUCT_RATING_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_RATING_FAILURE, payload: error.message });
  }
};

