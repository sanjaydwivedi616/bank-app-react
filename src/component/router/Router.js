import React, { lazy, Suspense } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import Loader from "../Loader";
const LoginContainer = lazy(() => import("../../containers/LoginContainer"));
const AddBeneficiaryContainer = lazy(() => import("../../containers/AddBeneficiaryContainer"));
const TransferMoneyContainer = lazy(() => import("../../containers/TransferMoneyContainer"));
const AccountSummaryContainer = lazy(() => import("../../containers/AccountSummaryContainer"));
const PageNotFound = lazy(() => import("../../component/PageNotFound"));
const HOCComponent = lazy(() => import("../HOCComponent"));

const Router = (props) => {
  const history = useHistory();
  if (props.userLoginStatus === false) {
    history.push("/")
  }

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={LoginContainer}></Route>
        {props.userLoginStatus === true ?
          <>
            <Route path="/account-summary" component={AccountSummaryContainer}></Route>
            <Route path="/add-beneficiary" component={AddBeneficiaryContainer}></Route>
            <Route path="/transfer-money" component={TransferMoneyContainer}></Route>
            <Route path="/HOCComponent" component={HOCComponent}></Route>
          </> : null}
          <Route path="**" component={PageNotFound}></Route>
      </Switch>
    </Suspense>
  )
}

const mapStateToProps = state => {
  return {
    userLoginStatus: state.user.loginStatus
  }
}

export default connect(
  mapStateToProps
)(Router);