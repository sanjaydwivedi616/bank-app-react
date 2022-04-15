import React, { Component, useContext, useState } from "react";

import { UserNameList, UserInfo } from "./UserContaxt";

class HOCComponent extends Component {
    state = {
        userName: ""
    }

    handleEmail = (event) => {
        this.setState({ userName: event.target.value })
    }

    submitForm = (event) => {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <input type="email" className="form-control userName" id="userName" placeholder="Enter email" name="userName" onChange={this.handleEmail} />

                <button type="submit" className="btn btn-primary" onClick={(event) => this.submitForm(event)} id="submitBtn">Submit</button>
                <p className="text">Hello Text</p>
            </div >
        )
    }
}


/* function HOCComponent(){
    const user = useContext(UserNameList)
    const info = useContext(UserInfo)
    return(
        <div>
        <UserNameList.Consumer>
                {
                    user =>{
                        return  <p>Hello {user.name}</p>
                    }
                }
            </UserNameList.Consumer>
            <p>Hello {user.name} and {user.age}</p>
            <p>{info.office} and {info.location}</p> 
            </div>
    )
}
 */
export default HOCComponent;
