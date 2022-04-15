import { connect } from 'react-redux';
import { LogoutUser } from "../redux/login/loginAction";
import AddBeneficiary from "../component/AddBeneficiary";

const mapStateToProps = state => {
    return {
        loginUserInfo: state.user.userInfo,
    }
}

export default connect(
    mapStateToProps
)(AddBeneficiary);



