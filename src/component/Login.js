import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login = (props) => {

    const history = useHistory();

    const [userLoginDetails, setuserLoginDetails] = useState({
        userName: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState('')

    if (props.userLoginStatus === true) {
        history.push("/account-summary")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserLoginDetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userLoginDetails.userName === "") {
            setErrorMsg("Fill user name")
            return;
        } else if (userLoginDetails.password === "") {
            setErrorMsg("Fill Password")
            return;
        } else {
            setErrorMsg('')
            const data = {
                userID: userLoginDetails.userName,
                password: userLoginDetails.password
            }
            props.loginUserValidetion(data);
        }
    }

    return (
        <div className="login-form">
            <p className="error-red-color">{errorMsg}</p>
            <p className="error-red-color">{props.userLoginFail}</p>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="control-label ">User Name</label>
                    <input type="text" className="form-control" placeholder="User Name" name="userName"
                        value={userLoginDetails.userName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="control-label ">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password"
                        value={userLoginDetails.password} onChange={handleChange} />
                </div>
                <div className="row form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Login;
