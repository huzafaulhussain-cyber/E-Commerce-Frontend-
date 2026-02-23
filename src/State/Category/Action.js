import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_NAV_REQUEST, GET_NAV_SUCCESS, GET_NAV_FAILURE,
  GET_LIST_REQUEST, GET_LIST_SUCCESS, GET_LIST_FAILURE
} from "./ActionType";

export const getNavigation = () => async (dispatch) => {
  dispatch({ type: GET_NAV_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/categories/navigation`);
      dispatch({ type: GET_NAV_SUCCESS, payload: data }); 
  } catch (error) {
    dispatch({ type: GET_NAV_FAILURE, payload: error.message });
  }
};

export const createCategory = (catData) => async (dispatch) => {
  try {
    await axios.post(`${API_BASE_URL}/api/categories/add`, catData);
    alert("Category Created!");
    dispatch(getNavigation());  
  } catch (error) {
    alert("Error creating category!");
  }
};

export const getCategoryList = (query) => async (dispatch) => {
  dispatch({ type: GET_LIST_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/categories/list?${query}`);
    dispatch({ type: GET_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_LIST_FAILURE, payload: error.message });
  }
};

export const updateLogo = (logoUrl) => async (dispatch) => {
  try {
     await axios.post(`${API_BASE_URL}/api/settings/update-logo`, { logo: logoUrl });
    dispatch(getNavigation());  
  } catch (error) {
    console.log("Logo update fail:", error);
  }
};   