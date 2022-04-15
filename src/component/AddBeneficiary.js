import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { apiURL } from "./apiurl";


const AddBeneficiary = (props) => {

    const loginUser = props.loginUserInfo.accountHolderName;

    const [beneficiaryDetails, setBeneficiaryDetails] = useState({
        beneficiaryAccountNumber: "",
        beneficiaryAccountHolderName: "",
        beneficiaryAccountType: "",
        beneficiaryAccountIFSC: "",
    });

    const [beneficiaryList, setBeneficiaryList] = useState([])
    useEffect(() => {
        getBeneficiaryList()
    }, [])

    const getBeneficiaryList = () => {
        axios.get(`${apiURL}/beneficiaryList/?loginUserBeneficiary=${loginUser}`).then(res => {
            setBeneficiaryList(res.data)
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBeneficiaryDetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleBeneficiarySudmit = (e) => {
        e.preventDefault();

        const beneficiaryDetail = {
            loginUserBeneficiary: loginUser,
            beneficiaryAccountNumber: beneficiaryDetails.beneficiaryAccountNumber,
            beneficiaryAccountHolderName: beneficiaryDetails.beneficiaryAccountHolderName,
            beneficiaryAccountType: beneficiaryDetails.beneficiaryAccountType,
            beneficiaryAccountIFSC: beneficiaryDetails.beneficiaryAccountIFSC
        }

        axios.post(`${apiURL}/beneficiaryList`, beneficiaryDetail).then(res => {
            getBeneficiaryList()
            setBeneficiaryDetails(prevState => ({
                ...prevState,
                beneficiaryAccountNumber: "",
                beneficiaryAccountHolderName: "",
                beneficiaryAccountType: "",
                beneficiaryAccountIFSC: "",
            }))
            e.target.reset()
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div className="panel panel-info">
            <div className="panel-heading">
                <div className="panel-title">
                    <div className="row">
                        <div className="col-xs-6">
                            <h5><span className="glyphicon glyphicon-user"></span> Add Beneficiary</h5>
                        </div>
                        <div className="col-xs-6">
                            <h5>
                                <NavLink className="nav-link" to="/account-summary">
                                    <span className="glyphicon glyphicon-add"></span> Back
								</NavLink>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="panel-body">

                <div className="col-sm-6">
                    <form onSubmit={handleBeneficiarySudmit}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Account Number</label>
                            <div className="col-sm-6">
                                <input type="text" readonly className="form-control" name="beneficiaryAccountNumber"
                                    value={beneficiaryDetails.beneficiaryAccountNumber}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Account Holder Name</label>
                            <div className="col-sm-6">
                                <input type="text" readonly className="form-control" name="beneficiaryAccountHolderName"
                                    value={beneficiaryDetails.beneficiaryAccountHolderName}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Account Type</label>
                            <div className="col-sm-6">
                                <select className="form-control" defaultValue={beneficiaryDetails.beneficiaryAccountType}
                                    onChange={handleChange} name="beneficiaryAccountType">
                                    <option value=""></option>
                                    <option value="Saving">Saving</option>
                                    <option value="Current">Current</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">IFSC Code</label>
                            <div className="col-sm-6">
                                <input type="text" list="ifscCode" className="form-control" name="beneficiaryAccountIFSC"
                                    onChange={handleChange} />
                                <datalist id="ifscCode" defaultValue={beneficiaryDetails.beneficiaryAccountIFSC}>
                                    <option></option>
                                    <option>HDFC000011</option>
                                    <option>HDFC000012</option>
                                    <option>HDFC000013</option>
                                </datalist>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Add</button>
                    </form>
                </div>
                <div className="col-sm-6">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>Name</th>
                                <th>Account No</th>
                                <th>IFSC Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beneficiaryList.map((data, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.beneficiaryAccountHolderName}</td>
                                        <td>{data.beneficiaryAccountNumber}</td>
                                        <td>{data.beneficiaryAccountIFSC}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AddBeneficiary;



