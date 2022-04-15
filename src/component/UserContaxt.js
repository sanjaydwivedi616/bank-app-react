
import React, { createContext } from 'react'
import HOCComponent from "../component/HOCComponent";

const user = {
    name: "Sanjay",
    age: 21
};
const info = {
    office: "HCl",
    location: "BLR"
};

export const UserNameList = createContext(user);
export const UserInfo = createContext(info);

function UserContaxt() {
    return (
        <UserNameList.Provider>
            <UserInfo.Provider>
                <HOCComponent />
            </UserInfo.Provider>
        </UserNameList.Provider>
    )
}

export default UserContaxt;