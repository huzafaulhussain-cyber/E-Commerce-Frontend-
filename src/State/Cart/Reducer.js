import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM__FAILURE, REMOVE_CART_ITEM__REQUEST, REMOVE_CART_ITEM__SUCCESS, UPDATE_CART_ITEM__FAILURE, UPDATE_CART_ITEM__REQUEST, UPDATE_CART_ITEM__SUCCESS } from "./ActionType"

const initialState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
            return { ...state, loading: true, error: null }
        case ADD_ITEM_TO_CART_SUCCESS:
            return { ...state, cartItems: [...state.cartItems, action.payload.cartItems], loading: false }
        case ADD_ITEM_TO_CART_FAILURE:
            return { ...state, loading: false, error: action.payload.error }
        case GET_CART_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_CART_SUCCESS:
            return {
                ...state,
                cartItems: action.payload.cartItems,
                cart: action.payload,
                loading: false
            }
        case GET_CART_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case REMOVE_CART_ITEM__REQUEST:
        case UPDATE_CART_ITEM__REQUEST:
            return { ...state, loading: true, error: null }
       case UPDATE_CART_ITEM__SUCCESS:
            return {
                ...state,
                 cartItems: state.cartItems.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
                updatedCartItems: action.payload, 
                loading: false
            }

        case REMOVE_CART_ITEM__SUCCESS:
            return {
                ...state,
                 cartItems: state.cartItems.filter((item) => item._id !== action.payload),
                deleteCartItems: action.payload,
                loading: false
            }
        case REMOVE_CART_ITEM__FAILURE:
        case UPDATE_CART_ITEM__FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state


    }
}