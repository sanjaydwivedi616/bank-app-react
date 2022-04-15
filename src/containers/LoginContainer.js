import { connect } from 'react-redux';
import { loginUser } from "../redux/login/loginAction";
import Login from "../component/Login";

const mapStateToProps = state => {
    return {
        userLoginStatus: state.user.loginStatus,
        userLoginFail: state.user.errorMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUserValidetion: (data) => dispatch(loginUser(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)



