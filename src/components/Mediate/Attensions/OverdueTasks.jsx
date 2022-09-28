// react States
// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

// Images
import fairtraderLogo from "../../../Images/fairtraderLogo.png";
import searchBtn from "../../../Images/searchBtn.png";
import toggleBtn from "../../../Images/toggleBtn.png";
import invoice from "../../../Images/invoice.png";
import resolution from "../../../Images/resolution.png";
import contract from "../../../Images/activeContract.png";
import myWallet from "../../../Images/myWallet.png";
import invoiceDummyPDF from "../../../Images/Invoice/invoiceDummyPDF1.png";
import purchaseHistory from "../../../Images/Invoice/purchaseHistory.png";
import overdueTasksBack from "../../../Images/Invoice/overdueTasksBack.png";
import sendMessageCancel from "../../../Images/Invoice/sendMessageCancel.png";
import invoiceReports from "../../../Images/Invoice/invoiceReports.png";
import activeAttension from "../../../Images/Invoice/activeAttension.png";
import medResRes from "../../../Images/Invoice/medResRes.png";
import overdueTaskSearch from "../../../Images/Invoice/overdueTaskSearch.png";
import sendMessageAdd from "../../../Images/Invoice/sendMessageAdd.png";
import navMessage from "../../../Images/Menu/navMessage.png";
import invoiceBack from "../../../Images/Invoice/invoiceBack.png";
import invoiceUnpaidReject from "../../../Images/Invoice/invoiceUnpaidReject.png";
import addedFilesSndMessage from "../../../Images/Invoice/addedFilesSndMessage.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

// css
import "../../css/Invoice.css";
import "../../css/invoiceCalender.css";
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calenderValue: "",
      viewPDF: false,
      invoiceCoverData: "",
      purchaseHistoryTotalPaid: 0,
      purchaseHistoryTotalUnPaid: 0,
      salesHistoryTotalPaid: 0,
      salesHistoryTotalUnPaid: 0,
      userConnectedEmailValue: "",
      //   furtherDetail: "furtherDetailMessage",
      furtherDetail: false,
    };
  }
  async componentWillMount() {
    this.userAddressHandle();
    // this.userConnectedEmail();
  }
  userConnectedEmail = async () => {
    let connectedUserEmail;
    if (this.props["props"].userAccountEmail.userAccountEmail !== "") {
      connectedUserEmail = this.props["props"].userAccountEmail
        .userAccountEmail;
      console.log(connectedUserEmail);

      setTimeout(() => {
        this.setState({ userConnectedEmailValue: connectedUserEmail });
      }, 500);
    } else {
      setTimeout(this.userConnectedEmail, 250);
    }

    // setInterval(() => {
    //   console.log(this.props["props"].userAccountEmail.userAccountEmail);
    // }, 500);
  };

  userAddressHandle = async () => {
    let userAddres;
    let connectedUserEmail;
    if (
      this.props["props"].UserAccountAddr.userAccountAdd !== "" &&
      this.props["props"].userAccountEmail.userAccountEmail !== ""
    ) {
      userAddres = this.props["props"].UserAccountAddr.userAccountAddr;
      console.log(userAddres);

      connectedUserEmail = this.props["props"].userAccountEmail
        .userAccountEmail;
      console.log(connectedUserEmail);

      axios
        .post(`${process.env.REACT_APP_BASE_URL}invoices`, {
          walletaddress: userAddres,
          email: connectedUserEmail,
        })

        .then((res) => {
          console.log(res.data);
          this.setState({ invoiceCoverData: res.data });
          this.setState({
            purchaseHistoryTotalPaid: res.data.purchaseHistory.data.MyOrders,
          });
          this.setState({
            purchaseHistoryTotalUnPaid: res.data.purchaseHistory.data.unpaid,
          });
          this.setState({
            salesHistoryTotalPaid: res.data.salesHistory.data.paid,
          });
          this.setState({
            salesHistoryTotalUnPaid: res.data.salesHistory.data.unpaid,
          });
        })
        .then((err) => {
          console.log(err);
        });
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  };

  render() {
    let viewPDF;
    if (this.state.viewPDF === true) {
      viewPDF = (
        <div className="viewPDFContainer">
          <div
            className="invoicePDFCloss"
            onClick={() => {
              this.handleClossPDF();
            }}
          >
            <span>X</span>
          </div>
          <img src={invoiceDummyPDF} alt="invoiceDummyPDF" />

          {/* <img src={invoiceDelete} onClick={() => { this.handleClossPDF() }} className='invoicePDFCloss' alt="invoiceDelete" /> */}
        </div>
      );
    }

    return (
      <div className="authMainDiv">
        <div className="topNav">
          <div className="row">
            <div className="col-6">
              <img
                src={fairtraderLogo}
                className="topLogoPic"
                alt="fairtraderLogo"
              />
            </div>
            <div className="col-6">
              <p className="alignEnd">
                <Link to={{ pathname: "/Messages" }}>
                  <img
                    src={navMessage}
                    alt="navMessage"
                    style={{ marginRight: "17px" }}
                  />
                </Link>

                <Link to={{ pathname: "/Menu" }}>
                  <img
                    src={toggleBtn}
                    alt="toggleBtn"
                    style={{ marginRight: "-5px" }}
                  />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <section id="contractTabMenu">
          <div className="contractTabMenuItems">
            <button className="attentionTab">
            <Link to={{ pathname: "/Attention" }}>
            <img src={activeAttension} alt="activeAttension" />
              </Link>
            </button>
            <button className="InvoiceresolutionTab">
            <Link to={{ pathname: "/MedResolution" }}>
                <img src={resolution} alt="resolution" />
              </Link>
            </button>
            <button className="InvoicecontractTab">
            <Link to={{ pathname: "/MyFees" }}>
                <img src={invoice} alt="invoice" />
              </Link>
            </button>
            <button className="InvoicewalletTab">
              <Link to={{ pathname: "/Wallet" }}>
                <img src={myWallet} alt="myWallet" />
              </Link>
            </button>
          </div>
        </section>

        <div
          className="handleMainPage"
          id="AttensionTabBody"
          style={{ height: "680px", width: "100%" }}
        >
          {viewPDF}
          {this.state.furtherDetail === false ? (
            <div>
              <div className="overdueTasksOrderTxt">
                <p style={{ color: "white" }}>Newest</p>
                <p>Oldest</p>
              </div>
              {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
              <div
                className="invoiceBlackDivMainContainer overdueTaskContainer"
                id="invoiceOptions"
                style={{ display: "inherit" }}
              >
                <div className="respondAllTxt">
                  <p>Please respond to all overdue tasks now</p>
                </div>
                {/* <Link to={{ pathname: "/PurchaseHistory" }}> */}
                <div className="attentionRedDiv">
                  <div className="row">
                    <div className="col-3">
                      <img
                        src={medResRes}
                        className="purchaseHistory"
                        alt="medResRes"
                      />
                    </div>
                    <div className="col-7">
                      <table className="invoiceOptionsTable overdueTasksHeading">
                        <tbody>
                          <tr>
                            <th>Case: #123456789</th>
                          </tr>
                          <tr>
                            <td>Reply to Seller:</td>
                            {/* <td>{this.state.purchaseHistoryTotalPaid}</td> */}
                            <td>now</td>
                          </tr>
                          <tr>
                            <td>Overdue:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>02 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={overdueTaskSearch}
                        alt="overdueTaskSearch"
                        className="mediatorSearch"
                        onClick={() => {
                          this.setState({ furtherDetail: true });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* </Link> */}
                {/* <Link to={{ pathname: "/SalesHistory" }}> */}
                <div className="attentionRedDiv">
                  <div className="row">
                    <div className="col-3">
                      <img
                        src={medResRes}
                        className="purchaseHistory"
                        alt="medResRes"
                      />
                    </div>
                    <div className="col-7">
                      <table className="invoiceOptionsTable overdueTasksHeading">
                        <tbody>
                          <tr>
                            <th>Case: #123456799</th>
                          </tr>
                          <tr>
                            <td>Reply to Supervisor:</td>
                            {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                            <td>now</td>
                          </tr>
                          <tr>
                            <td>Overdue:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>02 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={overdueTaskSearch}
                        alt="overdueTaskSearch"
                        className="mediatorSearch"
                        onClick={() => {
                          this.setState({ furtherDetail: true });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* </Link> */}
                {/* <Link to={{ pathname: "/SalesHistory" }}> */}
                <div className="attentionRedDiv">
                  <div className="row">
                    <div className="col-3">
                      <img
                        src={medResRes}
                        className="purchaseHistory"
                        alt="medResRes"
                      />
                    </div>
                    <div className="col-7">
                      <table className="invoiceOptionsTable overdueTasksHeading">
                        <tbody>
                          <tr>
                            <th>Case: #123456799</th>
                          </tr>
                          <tr>
                            <td>Reply to Supervisor:</td>
                            {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                            <td>now</td>
                          </tr>
                          <tr>
                            <td>Overdue:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>32 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={overdueTaskSearch}
                        alt="overdueTaskSearch"
                        className="mediatorSearch"
                        onClick={() => {
                          this.setState({ furtherDetail: true });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* </Link> */}
                {/* <Link to={{ pathname: "/SalesHistory" }}> */}
                <div className="attentionRedDiv">
                  <div className="row">
                    <div className="col-3">
                      <img
                        src={medResRes}
                        className="purchaseHistory"
                        alt="medResRes"
                      />
                    </div>
                    <div className="col-7">
                      <table className="invoiceOptionsTable overdueTasksHeading">
                        <tbody>
                          <tr>
                            <th>Case: #123456799</th>
                          </tr>
                          <tr>
                            <td>Reply to Supervisor:</td>
                            {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                            <td>now</td>
                          </tr>
                          <tr>
                            <td>Overdue:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>07 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={overdueTaskSearch}
                        alt="overdueTaskSearch"
                        className="mediatorSearch"
                        onClick={() => {
                          this.setState({ furtherDetail: true });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* </Link> */}
                <div className="selectResolutionDIv invoiceThreeBtnDiv">
                  <span className="alignStart">
                    <Link to={{ pathname: "/Attention" }}>
                      <img src={overdueTasksBack} alt="overdueTasksBack" />
                    </Link>
                  </span>
                  {/* <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              style={{ width: "200px" }}
            >
              Pay Now
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <Link to={{ pathname: "" }}>
              <img
                src={invoiceUnpaidReject}
                className="floatRight"
                alt="invoiceUnpaidReject"
              />
            </Link>
          </span> */}
                </div>
              </div>
            </div>
          ) : this.state.furtherDetail === true ? (
            <div>
              <div className="overdueTasksOrderTxt">
                <p style={{ color: "white" }}>Case: #123456789</p>
                <p>Case History</p>
              </div>
              {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
              <div
                className="invoiceBlackDivMainContainer overdueTaskContainer"
                id="invoiceOptions"
                style={{ display: "inherit" }}
              >
                <div className="furtherDetailCOntainer">
                  <br />
                  <span
                    className="sendMsgTxtLine"
                    onClick={() => {
                      this.setState({
                        furtherDetail: "furtherDetailSndMessage",
                      });
                    }}
                  >
                    <span className="smallerThanSign">{'>'}</span>{" "}
                    <span>Send Message</span>
                  </span>
                  <hr className="furtherDetailHR" />
                  <span className="smallerThanSign">{'>'}</span>{" "}
                  <span>Add Fee for service</span>
                  <br />
                  <br />
                </div>
                <div className="selectResolutionDIv invoiceThreeBtnDiv">
                  <span className="alignStart">
                    <img
                      src={invoiceBack}
                      alt="invoiceBack"
                      onClick={() => {
                        this.setState({ furtherDetail: false });
                      }}
                    />
                  </span>
                  <span className="invoiceThreeBtn">
                    <p
                      className="selectResolutionBtn alignCenter"
                      style={{ width: "200px" }}
                    >
                      Submit
                    </p>
                  </span>
                  <span className="alignEnd" style={{ float: "right" }}>
                    <Link to={{ pathname: "" }}>
                      <img
                        src={sendMessageCancel}
                        className="floatRight"
                        alt="sendMessageCancel"
                      />
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="overdueTasksOrderTxt">
                <p style={{ color: "white" }}>Case: #123456789</p>
                <p>Case History</p>
              </div>
              {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
              <div
                className="invoiceBlackDivMainContainer overdueTaskContainer"
                id="invoiceOptions"
                style={{ display: "inherit" }}
              >
                <div className="furtherDetailCOntainer">
                  <br />
                  <span className="sendMsgTxtLine">
                    <span className="smallerThanSign">{'>'}</span>{" "}
                    <span>Send Message to Seller</span>
                  </span>
                  <hr className="furtherDetailHR" />
                  <span className="smallerThanSign">{'>'}</span>{" "}
                  <span>Send Message to Buyer</span>
                  <br />
                  <br />
                  <textarea
                    className="SendMessageTxtarea"
                    name=""
                    id=""
                  ></textarea>
                  <p className="addDocsTxt">
                    Add document or photos ( 0 of 5 )
                  </p>
                  <div className="attachFIle">
                    <img src={sendMessageAdd} alt="sendMessageAdd" />
                    <img src={addedFilesSndMessage} alt="addedFilesSndMessage" />
                    <img src={addedFilesSndMessage} alt="addedFilesSndMessage" />
                    <img src={addedFilesSndMessage} alt="addedFilesSndMessage" />
                    <img src={addedFilesSndMessage} alt="addedFilesSndMessage" />
                  </div>
                  <br />
                </div>
                <div className="selectResolutionDIv invoiceThreeBtnDiv">
                  <span className="alignStart">
                    <img
                      src={invoiceBack}
                      alt="invoiceBack"
                      onClick={() => {
                        this.setState({ furtherDetail: true });
                      }}
                    />
                  </span>
                  <span className="invoiceThreeBtn">
                    <p
                      className="selectResolutionBtn alignCenter"
                      style={{ width: "200px" }}
                    >
                      Submit
                    </p>
                  </span>
                  <span className="alignEnd" style={{ float: "right" }}>
                    <Link to={{ pathname: "" }}>
                      <img
                        src={sendMessageCancel}
                        className="floatRight"
                        alt="sendMessageCancel"
                      />
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
