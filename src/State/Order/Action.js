import { api } from "../../config/apiConfig";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS,     GET_ORDER_HISTORY_REQUEST,
    GET_ORDER_HISTORY_SUCCESS,
    GET_ORDER_HISTORY_FAILURE,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const { data } = await api.post(`/api/orders/`, reqData.address)
        console.log("Create Order Response Data:", data);
        if (data._id) {
            reqData.navigate(`/checkout?step=2&order_id=${data._id}`)
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message })
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    console.log("OrderId:", orderId);
    try {
        dispatch({ type: GET_ORDER_BY_ID_REQUEST })
        const { data } = await api.get(`/api/orders/${orderId}`)
        console.log("API Response Data:", data);
        console.log("Data Type:", typeof data, Array.isArray(data) ? "Array" : "Object");
        
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        console.error("Error fetching order:", error);
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message })
    }
}

export const getOrderHistory = (reqData) => async (dispatch) => {
  dispatch({ type: GET_ORDER_HISTORY_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/user`);
    console.log("Order History Data:", data);
    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_HISTORY_FAILURE,
      payload: error.message,
    });
  }
};