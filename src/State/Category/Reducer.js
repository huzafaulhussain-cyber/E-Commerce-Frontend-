import { GET_NAV_REQUEST, GET_NAV_SUCCESS, GET_NAV_FAILURE } from "./ActionType"; // ✅ Duplicate imports hata diye

const initialState = {
  categories: [],
  logo: null, // ✅ Logo ki initial state
  loading: false,
  error: null
};

// State/Category/Reducer.js

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAV_REQUEST:
      return { ...state, loading: true };

    case GET_NAV_SUCCESS:
      return {
        ...state,
        loading: false,
        // Backend ab categories aur logo dono bhej raha hai
        categories: action.payload.categories || [], 
        logo: action.payload.logo || null,
        error: null
      };

    case GET_NAV_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};