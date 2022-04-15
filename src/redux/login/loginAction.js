import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAILD } from "./loginType";
import axios from 'axios'
import  {apiURL}  from "../../component/apiurl";

export const loginUser = (data) => {
    return (dispatch => {
        axios.get(`${apiURL}/userList/${data.userID}`).then(res => {
            if (res.data.id === data.userID && res.data.Password === data.password) {
                dispatch(updateUserDetail(res.data));
            } else {
                dispatch(faildLoginUer())
            }
        }).catch(() => {
            dispatch(faildLoginUer())
        })
    })
}

export const faildLoginUer = () => {
    return {
        type: LOGIN_FAILD,
        payload: "User name or password invalid"
    }
}

export const updateUserDetail = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const LogoutUser = (data) => {
    return {
        type: LOGOUT,
        payload: data
    }
}
