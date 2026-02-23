// import axios from "axios";
// import { API_BASE_URL } from "../../config/apiConfig";
// import {
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAILURE,
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   GET_USER_REQUEST,
//   GET_USER_SUCCESS,
//   GET_USER_FAILURE,
//   LOGOUT,
// } from "./ActionType";

// /* ===================== REGISTER ===================== */

// const registerRequest = () => ({ type: REGISTER_REQUEST });
// const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
// const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

// export const register = (userData, navigate) => async (dispatch) => {
//   dispatch(registerRequest());
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/auth/signup`,
//       userData
//     );

//     const data = response.data;

//     if (data.jwt) {
//       localStorage.setItem("jwt", data.jwt);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
//       dispatch(registerSuccess(data));
//       navigate("/");
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message ||
//       "Registration failed";
//     dispatch(registerFailure(errorMessage));
//   }
// };

// /* ===================== LOGIN ===================== */

// export const login = (userData, navigate) => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });

//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/auth/signin`,
//       userData
//     );

//     const data = response.data; // jwt + user

//     if (data.jwt) {
//       localStorage.setItem("jwt", data.jwt);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

//       dispatch({ type: LOGIN_SUCCESS, payload: data });

//       const role = data.role || data.user?.role;

//       if (role === "ADMIN") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message ||
//       "Login failed";

//     dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
//   }
// };

// /* ===================== GET USER ===================== */

// const getUserRequest = () => ({ type: GET_USER_REQUEST });
// const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
// const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

// export const getUser = () => async (dispatch) => {
//   dispatch(getUserRequest());

//   try {
//     const response = await axios.get(
//       `${API_BASE_URL}/api/users/profile`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       }
//     );

//     dispatch(getUserSuccess(response.data));
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message ||
//       "Failed to get user";

//     dispatch(getUserFailure(errorMessage));

//     if (error.response?.status === 401) {
//       localStorage.clear();
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }
// };

// /* ===================== LOGOUT ===================== */

// export const logout = () => (dispatch) => {
//   localStorage.clear();
//   delete axios.defaults.headers.common["Authorization"];
//   dispatch({ type: LOGOUT });
// };

import axios from 'axios'
import { API_BASE_URL } from '../../config/apiConfig'
import { 
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGOUT 
} from './ActionType'

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
        const user = response.data
        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt)
            dispatch({ type: REGISTER_SUCCESS, payload: user })
        }
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.message })
    }
}

export const login = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData)
        const data = response.data 
        if (data.jwt) {
            localStorage.setItem('jwt', data.jwt)
            dispatch({ type: LOGIN_SUCCESS, payload: data })
            
            // Role check kar ke navigate karna
            const role = data.user?.role || data.role;
            if (role === "ADMIN") {
                navigate("/admin")
            } else {
                navigate("/")
            }
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message })
    }
}

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        dispatch({ type: GET_USER_SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.message })
    }
}

// export const logout = () => (dispatch) => {
//     dispatch({ type: LOGOUT })
//     localStorage.clear()
// }

export const logout = () => (dispatch) => {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: LOGOUT });
    window.location.href = "/"; 
};