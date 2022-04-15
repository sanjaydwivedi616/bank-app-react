import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { apiURL } from "./apiurl";

const TransferMoney = (props) => {

    const loginUser = props.loginUserInfo.accountHolderName;
    const loginUserInfo = props.loginUserInfo;

    const [transactionHistry, setTransactionHistry] = useState([]);
    const [beneficiaryList, setBeneficiaryList] = useState([]);
    const [transferMoney, setTransferMoney] = useState({
        selectBeneficiary: "",
        amountTransfer: "",
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setTransferMoney(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const getTransactionHistry = () => {
        try {
            axios.get(`${apiURL}/TransactionSummary/?loginUserBeneficiary=${loginUser}`).then(res => {
                console.log("tran histry", res.data)
                setTransactionHistry(res.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    //geting beneficiary List 
    useEffect(() => {
        axios.get(`${apiURL}/beneficiaryList/?loginUserBeneficiary=${loginUser}`).then(res => {
            setBeneficiaryList(res.data)
        })
        getTransactionHistry();
    }, [])

    const handleTransferMoney = async (e) => {
        e.preventDefault();

        const debitAmountdata = {
            loginUserBeneficiary: loginUser,
            amountCreditFrom: transferMoney.selectBeneficiary,
            amountTransfer: transferMoney.amountTransfer,
            comment: transferMoney.comment,
            DateTime: new Date(),
            transactionType: "D",
        }

        const creditAmountdata = {
            loginUserBeneficiary: transferMoney.selectBeneficiary,
            amountCreditFrom: loginUser,
            amountTransfer: transferMoney.amountTransfer,
            comment: transferMoney.comment,
            DateTime: new Date(),
            transactionType: "C",
        }


        // amount sender api
        try {
            const getUser = await axios.get(`${apiURL}/userList/${loginUserInfo.accountHolderName}`);
            const updateLoginUserBl = Object.assign({}, getUser.data, {
                userInfo: {
                    ...getUser.data.userInfo,
                    accountBalance: (loginUserInfo.accountBalance - transferMoney.amountTransfer)
                }
            });
            await axios.patch(`${apiURL}/userList/${loginUserInfo.accountHolderName}`, updateLoginUserBl)

            // amount reciever api
            const getToAccount = await axios.get(`${apiURL}/userList/${transferMoney.selectBeneficiary}`)
            const sendToUserAmount = Object.assign({}, getToAccount.data, {
                userInfo: {
                    ...getToAccount.data.userInfo,
                    accountBalance: (parseInt(getToAccount.data.userInfo.accountBalance) + parseInt(transferMoney.amountTransfer))
                }
            });
            await axios.patch(`${apiURL}/userList/${getToAccount.data.id}`, sendToUserAmount);

        } catch (error) {
            console.log(error);
        }

        //Transaction Summary
        try {
            await axios.post(`${apiURL}/TransactionSummary`, debitAmountdata);
            setTimeout(() => {
                axios.post(`${apiURL}/TransactionSummary`, creditAmountdata)
            }, 2000);

            getTransactionHistry();

            setTransferMoney(prevState => ({
                ...prevState,
                selectBeneficiary: "",
                amountTransfer: "",
                comment: "",
            }))
            e.target.reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="panel panel-info">
            <div className="panel-heading">
                <div className="panel-title">
                    <div className="row">
                        <div className="col-xs-6">
                            <h5><i className="fa fa-money"></i> Transfer Money</h5>
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
                    <form onSubmit={handleTransferMoney}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Select Beneficiary : </label>
                            <div className="col-sm-6">
                                <select className="form-control" defaultValue={transferMoney.selectBeneficiary}
                                    onChange={handleChange} name="selectBeneficiary">
                                    <option></option>
                                    {beneficiaryList.map((list) => {
                                        return (
                                            <option value={list.beneficiaryAccountHolderName}>
                                                {list.beneficiaryAccountHolderName}
                                            ({list.beneficiaryAccountNumber})
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Amount : </label>
                            <div className="col-sm-6">
                                <input type="text" readonly className="form-control" name="amountTransfer"
                                    value={transferMoney.amountTransfer}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Comment : </label>
                            <div className="col-sm-6">
                                <input type="text" readonly className="form-control" name="comment"
                                    value={transferMoney.comment}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Send</button>
                    </form>
                </div>

                <div className="col-sm-6">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sl.No</th>
                                <th>To Name</th>
                                <th>Credit/Debit</th>
                                <th>date/time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionHistry.map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{index + 1}.</td>
                                        <td>{data.amountCreditFrom}</td>
                                        {
                                            data.transactionType === "D" ?
                                                <td className="debit-color">{data.amountTransfer} <i class="fa fa-arrow-up"></i></td>
                                                : <td className="credit-color"> {data.amountTransfer} <i class="fa fa-arrow-down"></i></td>
                                        }
                                        <td>{data.DateTime}</td>
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

export default TransferMoney;
