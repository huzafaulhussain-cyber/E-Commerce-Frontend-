 import { api } from "../../config/apiConfig";
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE
} from "./ActionType";

export const createReview = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const response = await api.post("/api/reviews/create", reqData);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message });
  }
};

export const getAllReviews = (productId) => async (dispatch) => {
  dispatch({ type: GET_ALL_REVIEWS_REQUEST });
  try {
    const response = await api.get(`/api/reviews/product/${productId}`);
    dispatch({ type: GET_ALL_REVIEWS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_REVIEWS_FAILURE, payload: error.message });
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST }); // Ab ye error nahi dega
  try {
    await api.delete(`/api/reviews/${reviewId}`);
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: reviewId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAILURE,
      payload: error.message,
    });
  }
}; 