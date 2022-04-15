import React from 'react'
import { NavLink } from 'react-router-dom'

function AccountSummary(props) {

	const loginUser = props.loginUserInfo;

	return (
		<div className="panel panel-info">
			<div className="panel-heading">
				<div className="panel-title">
					<div className="row">
						<div className="col-xs-6">
							<h5><span className="glyphicon glyphicon-user"></span> Account Info</h5>
						</div>
						<div className="col-xs-3">
							<h5>
								<NavLink className="nav-link" to="/add-beneficiary">
									<span className="glyphicon glyphicon-plus"></span> Add Beneficiary
								</NavLink>
							</h5>
						</div>
						<div className="col-xs-3">
							<h5>
								<NavLink className="nav-link" to="/transfer-money">
									<i className="fa fa-money" aria-hidden="true"></i> Transfer Money
								</NavLink>
							</h5>
						</div>
					</div>
				</div>
			</div>

			<div className="panel-body">
				<div className="col-xs-3">
					<h4 className="product-name"><strong>Account Number</strong></h4><h4><small>{loginUser.accountNumber}</small></h4>
				</div>
				<div className="col-xs-3">
					<h4 className="product-name"><strong>Account Holder Name</strong></h4>
					<h4><small>{loginUser.accountHolderName}</small></h4>
				</div>
				<div className="col-xs-3">
					<h4 className="product-name"><strong>Account Type</strong></h4>
					<h4><small>{loginUser.accountType}</small></h4>
				</div>
				<div className="col-xs-3">
					<h4 className="product-name"><strong>IFSC Code</strong></h4>
					<h4><small>{loginUser.ifscCode}</small></h4>
				</div>
			</div>
			<div className="panel-footer">
				<div className="row text-center">
					<div className="col-xs-12">
						<h4 className="text-right">Account Balance - <strong>{loginUser.accountBalance}.00</strong></h4>
					</div>
				</div>
			</div>
		</div>
	)
}


export default AccountSummary;
