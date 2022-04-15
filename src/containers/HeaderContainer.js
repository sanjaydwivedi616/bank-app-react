import { connect } from 'react-redux';
import { LogoutUser } from "../redux/login/loginAction";
import Header from "../component/Header";

const mapStateToProps = state => {
    return {
        userLoginStatus: state.user.loginStatus,
        userName: state.user.userName,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handelLogout: (data) => dispatch(LogoutUser(data))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Header)



