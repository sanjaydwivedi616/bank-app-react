import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    const handalLogoutUser = () => {
        props.handelLogout(false)
    }
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink to="/" className="navbar-brand"><b>BANK APP</b></NavLink>
                </div>
                {props.userLoginStatus === true ?
                    <>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/account-summary">Account Info</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/HOCComponent">HOCComponent</NavLink>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav pull-right" >
                            <li className="nav-item user-name">
                                <NavLink className="nav-link" to="/">{props.userName}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={handalLogoutUser}>Logout
                                        <i className="fa fa-sign-out" aria-hidden="true" title="Logout"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </> :
                    <ul className="nav navbar-nav pull-right" >
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Login</NavLink>
                        </li>
                    </ul>}
            </div>
        </nav>
    )
}
export default Header;