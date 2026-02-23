import { 
    GET_USERS_REQUEST, 
    GET_USERS_SUCCESS, 
    GET_USERS_FAILURE , DELETE_USER_SUCCESS 
} from "./ActionType";

const initialState = {
    users: [],
    loading: false,
    error: null
};

export const adminUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: null };
        case GET_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
             case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                 users: state.users.filter((user) => user._id !== action.payload) 
            };
    }
};