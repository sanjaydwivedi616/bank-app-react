import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAILD } from "./loginType"

let loginData = {
    userInfo : {},
    userName: "",
    loginStatus: false,
    errorMsg: ""
}

const loginReducer = (state = loginData, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                userName: action.payload.id,
                userInfo  : action.payload.userInfo,
                loginStatus: true
            }
        case LOGIN_FAILD:
            return {
                ...state,
                errorMsg: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                loginStatus: action.payload,
                errorMsg: ""
            }
        default:
            return state
    }
}

export default loginReducer;
