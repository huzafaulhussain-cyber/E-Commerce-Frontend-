import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAILURE,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST
} from "./ActionType";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
    case GET_ALL_REVIEWS_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, reviews: [...state.reviews, action.payload], error: null };

    case GET_ALL_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload, error: null };

    case CREATE_REVIEW_FAILURE:
    case GET_ALL_REVIEWS_FAILURE:
      return { ...state, loading: false, error: action.payload };

        case DELETE_REVIEW_REQUEST:
        return { ...state, loading: true };

    case DELETE_REVIEW_SUCCESS:
        return {
            ...state,
            loading: false,
            // Jo ID delete hui, usay list se filter karke nikaal do
            reviews: state.reviews.filter((item) => item._id !== action.payload),
        };

    case DELETE_REVIEW_FAILURE:
        return { ...state, loading: false, error: action.payload };

 
    default:
      return state;
  }
};