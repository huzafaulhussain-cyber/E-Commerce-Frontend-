import {
  GET_PRODUCT_RATING_REQUEST,
  GET_PRODUCT_RATING_SUCCESS,
  GET_PRODUCT_RATING_FAILURE
} from "./ActionType";

const initialState = {
  ratingsData: null, // Isme average, total count, distribution ayega
  loading: false,
  error: null,
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_RATING_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PRODUCT_RATING_SUCCESS:
      return { ...state, loading: false, ratingsData: action.payload, error: null };

    case GET_PRODUCT_RATING_FAILURE:
      return { ...state, loading: false, error: action.payload };

  
   
    default:
      return state;
  }
};