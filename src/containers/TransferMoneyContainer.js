import { connect } from 'react-redux';
import TransferMoney from "../component/TransferMoney";

const mapStateToProps = state => {
    return {
        loginUserInfo: state.user.userInfo,
        loginUser: state.user,
    }
}

export default connect(
    mapStateToProps
)(TransferMoney);



