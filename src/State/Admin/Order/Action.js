import { api } from "../../../config/apiConfig";
import {
    CANCEL_ORDERS_FAILURE,
    CANCEL_ORDERS_REQUEST,
    CANCEL_ORDERS_SUCCESS,
    CONFIRMED_ORDERS_FAILURE,
    CONFIRMED_ORDERS_REQUEST,
    CONFIRMED_ORDERS_SUCCESS,
    DELETE_ORDERS_FAILURE,
    DELETE_ORDERS_SUCCESS,
    DELIVERED_ORDERS_FAILURE,
    DELIVERED_ORDERS_REQUEST,
    DELIVERED_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    SHIP_ORDERS_FAILURE,
    SHIP_ORDERS_REQUEST,
    SHIP_ORDERS_SUCCESS,
} from "./ActionType";

// 1. Get All Orders (Admin)
export const getOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDERS_REQUEST });
        const { data } = await api.get(`/api/admin/order`);
        console.log("All Orders:", data);
        dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
    }
};

// 2. Get Specific User Orders (Admin) - 👇 YEH RAHA WO FUNCTION
export const getOrdersByUser = (userId) => async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST }); // Loading start
    try {
        // API path check karlena backend se match kare
        const { data } = await api.get(`/api/admin/order/user/${userId}`);
        console.log("User Orders:", data);
        dispatch({ type: GET_ORDERS_SUCCESS, payload: data }); // Ye 'adminOrder.orders' update karega
    } catch (error) {
        dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
    }
};

// 3. Confirm Order
export const confirmOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: CONFIRMED_ORDERS_REQUEST });
        const { data } = await api.put(`/api/admin/order/${orderId}/confirm`);
        dispatch({ type: CONFIRMED_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CONFIRMED_ORDERS_FAILURE, payload: error.message });
    }
};

// 4. Ship Order
export const shipOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: SHIP_ORDERS_REQUEST });
        const { data } = await api.put(`/api/admin/order/${orderId}/ship`);
        dispatch({ type: SHIP_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SHIP_ORDERS_FAILURE, payload: error.message });
    }
};

// 5. Deliver Order
export const deliveredOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: DELIVERED_ORDERS_REQUEST });
        const { data } = await api.put(`/api/admin/order/${orderId}/deliver`);
        dispatch({ type: DELIVERED_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELIVERED_ORDERS_FAILURE, payload: error.message });
    }
};

// 6. Cancel Order
export const cancelOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDERS_REQUEST });
        const { data } = await api.put(`/api/admin/order/${orderId}/cancel`);
        dispatch({ type: CANCEL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CANCEL_ORDERS_FAILURE, payload: error.message });
    }
};

// 7. Delete Order
export const deleteOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDERS_SUCCESS, payload: orderId });
        await api.delete(`/api/admin/order/${orderId}/delete`);
    } catch (error) {
        dispatch({ type: DELETE_ORDERS_FAILURE, payload: error.message });
        dispatch(getOrders());
    }
};