import { connect } from 'react-redux';
import { LogoutUser } from "../redux/login/loginAction";
import AccountSummary from "../component/AccountSummary";


const mapStateToProps = state => {
    return {
        loginUserInfo: state.user.userInfo,
    }
}

export default connect(
    mapStateToProps
)(AccountSummary)



