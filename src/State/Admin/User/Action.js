import { api } from "../../../config/apiConfig";
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,    DELETE_USER_SUCCESS

} from "./ActionType";

export const getAllCustomers = () => async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });
    try {
        const { data } = await api.get("/api/users");
        console.log("All Customers:", data);
        dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USERS_FAILURE, payload: error.message });
    }
};

export const deleteCustomer = (userId) => async (dispatch) => {
    try {
        await api.delete(`/api/users/${userId}`);
        console.log("User Deleted:", userId);
        
        // Redux Store se bhi hatao
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
        
    } catch (error) {
        console.log("Error deleting user", error);
    }
};
