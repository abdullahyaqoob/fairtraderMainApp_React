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
import resolution from "../../../Images/activeResolution.png";
import contract from "../../../Images/contract.png";
import myWallet from "../../../Images/myWallet.png";
import invoiceDummyPDF from "../../../Images/Invoice/invoiceDummyPDF1.png";
import purchaseHistory from "../../../Images/Invoice/purchaseHistory.png";
import salesHistory from "../../../Images/Invoice/salesHistory.png";
import createinvoice from "../../../Images/Invoice/createinvoice.png";
import invoiceReports from "../../../Images/Invoice/invoiceReports.png";
import invoiceDropdown from "../../../Images/Invoice/invoiceDropdown.png";
import navMessage from "../../../Images/Menu/navMessage.png";
import invoiceBack from "../../../Images/Invoice/invoiceBack.png";
import invoiceUnpaidReject from "../../../Images/Invoice/invoiceUnpaidReject.png";
import mediatorSearch from "../../../Images/resolutionMediator/mediatorSearch.png";

import invoiceViewYellow from "../../../Images/Invoice/invoiceViewYellow.png";
import invoiceViewWhite from "../../../Images/Invoice/invoiceViewWhite.png";
import searchYellow from "../../../Images/Invoice/searchYellow.png";
import searchWhite from "../../../Images/Invoice/searchWhite.png";
import searchRed from "../../../Images/Invoice/searchRed.png";
import invoiceUnpaidResolutionYellow from "../../../Images/Invoice/invoiceUnpaidResolutionYellow.png";
import invoiceUnpaidContract from "../../../Images/Invoice/invoiceUnpaidContract.png";
import invoiceUnpaidEdit from "../../../Images/Invoice/invoiceUnpaidEdit.png";
import invoiceUnpaidAlarm from "../../../Images/Invoice/invoiceUnpaidAlarm.png";
import resolutionSelectedResolution from "../../../Images/Invoice/resolutionSelectedResolution.png";
import Attension from "../../../Images/Invoice/Attension.png";
import invoiceAddNoteCross from "../../../Images/Invoice/invoiceAddNoteCross.png";
import invoiceContractDocuments from "../../../Images/Invoice/invoiceContractDocuments.png";
import invoiceContractDocumentsTerms from "../../../Images/Invoice/invoiceContractDocumentsTerms.png";
import invoiceContractDocumentsOther from "../../../Images/Invoice/invoiceContractDocumentsOther.png";
import invoiceAddNote from "../../../Images/Invoice/invoiceAddNote.png";
import invoiceTransactionHistory from "../../../Images/Invoice/invoiceTransactionHistory.png";
import medResRes from "../../../Images/Invoice/medResRes.png";
import invoicePaymentStopped from "../../../Images/Invoice/invoicePaymentStopped.png";
import medResNewCasesReject from "../../../Images/Invoice/medResNewCasesReject.png";
import medResNewCasesSearch from "../../../Images/Invoice/medResNewCasesSearch.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

// css
import "../../css/Invoice.css";
import "../../css/invoiceCalender.css";
import "../../css/MedResolution.css";
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
      jobSelected: false,
      invoicePaidBtn: true,
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
    let invoiceGetOptionsBtn;
    if (this.state.invoicePaidBtn === true) {
      invoiceGetOptionsBtn = (
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
              onClick={() => {
                this.setState({ invoicePaymentStopped: true });
              }}
              style={{ width: "200px" }}
            >
              Accept Job
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <Link to={{ pathname: "" }}>
              <img
                src={medResNewCasesReject}
                className="floatRight"
                alt="medResNewCasesReject"
                onClick={() => {
                  document.getElementById(
                    "resolutionSelectedPaid"
                  ).style.display = "none";
                  document.getElementById("ViewAddNotePaid").style.display =
                    "none";
                  document.getElementById("ViewAddNotePaid").style.display =
                    "none";
                  document.getElementById(
                    "invoiceStopPaymentContent"
                  ).style.display = "inherit";
                  this.setState({ invoicePaymentStopped: true });
                }}
              />
            </Link>
          </span>
        </div>
      );
    } else {
      invoiceGetOptionsBtn = "";
    }

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
            <button className="ResolutioninvoiceTab">
              <Link to={{ pathname: "/Attention" }}>
              <img src={Attension} alt="Attension" />
              </Link>
            </button>
            <button className="ResolutionresolutionTab">
              <Link to={{ pathname: "/MedResolution" }}>
                <img src={resolution} alt="resolution" />
              </Link>
            </button>
            <button className="ResolutioncontractTab">
            <Link to={{ pathname: "/MyFees" }}>
                <img src={invoice} alt="invoice" />
              </Link>
            </button>
            <button className="ResolutionwalletTab">
              <Link to={{ pathname: "/Wallet" }}>
                <img src={myWallet} alt="myWallet" />
              </Link>
            </button>
          </div>
        </section>

        <div className="handleMainPage" style={{ overflow: "hidden" }}>
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
                  <p style={{ color: "#00ccff" }}>
                    There are new jobs waiting fro you
                  </p>
                </div>
                {/* <Link to={{ pathname: "/PurchaseHistory" }}> */}
                <div
                  className="attentionRedDiv medResBlueDIv"
                  onClick={() => this.setState({ jobSelected: true })}
                >
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
                            <td>Accept Job?</td>
                          </tr>
                          <tr>
                            <td>Time left:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>72 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={medResNewCasesSearch}
                        alt="medResNewCasesSearch"
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
                <div
                  className="attentionRedDiv medResBlueDIv"
                  onClick={() => this.setState({ jobSelected: true })}
                >
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
                            <td>Accept Job?</td>
                          </tr>
                          <tr>
                            <td>Time left:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>48 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={medResNewCasesSearch}
                        alt="medResNewCasesSearch"
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
                <div
                  className="attentionRedDiv medResBlueDIv"
                  onClick={() => this.setState({ jobSelected: true })}
                >
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
                            <td>Accept Job?</td>
                          </tr>
                          <tr>
                            <td>Time left:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>36 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={medResNewCasesSearch}
                        alt="medResNewCasesSearch"
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
                <div
                  className="attentionRedDiv medResBlueDIv"
                  onClick={() => this.setState({ jobSelected: true })}
                >
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
                            <td>Accept Job?</td>
                          </tr>
                          <tr>
                            <td>Time left:</td>
                            {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                            <td>24 hrs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 overdueTasksSerchIcon">
                      <img
                        src={medResNewCasesSearch}
                        alt="medResNewCasesSearch"
                        className="mediatorSearch"
                        onClick={() => {
                          this.setState({ furtherDetail: true });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* </Link> */}
                {this.state.jobSelected === false ? (
                  <div className="selectResolutionDIv invoiceThreeBtnDiv">
                    <span className="alignStart">
                      <Link to={{ pathname: "/MedResolution" }}>
                        <img src={invoiceBack} alt="invoiceBack" />
                      </Link>
                    </span>
                  </div>
                ) : (
                  <div className="selectResolutionDIv invoiceThreeBtnDiv">
                    <span className="alignStart">
                      <Link to={{ pathname: "/MedResolution" }}>
                        <img src={invoiceBack} alt="invoiceBack" />
                      </Link>
                    </span>
                    <span className="invoiceThreeBtn">
                      <p
                        className="selectResolutionBtn alignCenter"
                        style={{ width: "200px" }}
                      >
                        Accept Job
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
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="invoiceBlackContainer invoiceOrderBlackDiv">
              <div className="hello">
                <div id="invoiceUnpaidSearch" style={{ marginTop: "-8px" }}>
                  {/* <div id="invoiceUnpaidSearch" style={{ display: 'inherit', marginTop: '-8px' }}> */}

                  <div className="row">
                    <div className="col-6">
                      <div className="profileBox">
                        <div className="profileBoxHeader">
                          <span style={{ position: "absolute" }}>No:</span>
                          <p style={{ textAlign: "end" }}>
                            {/* #{this.state.magnifierViewUser.id} */}
                            #1245
                          </p>
                        </div>

                        <div className="profileBoxBody">
                          <span>
                            {/* <b>{this.state.magnifierViewUser.customername}</b> */}
                            <b>ABC Services</b>
                          </span>
                          <br />
                          <span>
                            <b>New York</b>
                            {/* {this.state.magnifierViewUser.customeraddress} */}
                          </span>
                          <br />
                          <span>Newtown 3709</span>
                          <br />
                          <br />
                          <h6 style={{ color: "#c62127" }}>
                            Construction Work
                          </h6>
                          <h6>
                            Total <span style={{ color: "lightgrey" }}>.</span>
                            $1234.56USD
                          </h6>
                        </div>
                        <div className="profileBoxBottom">
                          <h5>view PDF</h5>
                          <img
                            className="invoicesearchRed"
                            src={searchRed}
                            alt="searchRed"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row invoiceProfileRightSection">
                        <div className="col-4">
                          <img
                            src={invoiceUnpaidAlarm}
                            alt="invoiceUnpaidAlarm"
                          />
                        </div>
                        <div className="col-8">
                          Pay On
                          <br />
                          18/10/2021
                        </div>
                      </div>

                      <div
                        className="row invoiceProfileRightSection"
                        onClick={() => {
                          this.setState({ invoicePaidBtn: false });
                          document.getElementById(
                            "contractSelectedPaid"
                          ).style.display = "none";
                          document.getElementById(
                            "invoiceStopPaymentContent"
                          ).style.display = "none";
                          document.getElementById(
                            "resolutionSelectedPaid"
                          ).style.display = "inherit";
                          document.getElementById(
                            "ViewAddNotePaid"
                          ).style.display = "none";
                        }}
                      >
                        <div className="col-4">
                          <img
                            src={invoiceUnpaidResolutionYellow}
                            style={{ marginLeft: "-8px" }}
                            alt="invoiceUnpaidResolutionYellow"
                          />
                        </div>
                        <div className="col-8" style={{ color: "#D8C938" }}>
                          Resolution
                          <br />
                          Selected
                        </div>
                      </div>
                      <div
                        className="row invoiceProfileRightSection"
                        onClick={() => {
                          this.setState({ invoicePaidBtn: false });
                          document.getElementById(
                            "resolutionSelectedPaid"
                          ).style.display = "none";
                          document.getElementById(
                            "invoiceStopPaymentContent"
                          ).style.display = "none";
                          document.getElementById(
                            "contractSelectedPaid"
                          ).style.display = "inherit";
                          document.getElementById(
                            "ViewAddNotePaid"
                          ).style.display = "none";
                        }}
                      >
                        <div className="col-4">
                          <img
                            src={invoiceUnpaidContract}
                            alt="invoiceUnpaidContract"
                          />
                        </div>
                        <div className="col-8" style={{ color: "#FF00B3" }}>
                          Contract
                          <br />
                          Documents
                        </div>
                      </div>
                      <div
                        className="row invoiceProfileRightSection"
                        onClick={() => {
                          this.setState({ invoicePaidBtn: false });
                          document.getElementById(
                            "resolutionSelectedPaid"
                          ).style.display = "none";
                          document.getElementById(
                            "invoiceStopPaymentContent"
                          ).style.display = "none";
                          document.getElementById(
                            "ViewAddNotePaid"
                          ).style.display = "inherit";
                          document.getElementById(
                            "contractSelectedPaid"
                          ).style.display = "none";
                        }}
                      >
                        <div className="col-4">
                          <img
                            src={invoiceTransactionHistory}
                            alt="invoiceTransactionHistory"
                          />
                        </div>
                        <div className="col-8" style={{ color: "#00CCFF" }}>
                          Transaction
                          <br />
                          History
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    id="resolutionSelectedPaid"
                    className="resolutionSelected"
                    style={{ display: "none" }}
                  >
                    <div className="row resolutionSelectedRow">
                      <div className="col-9">
                        <div className="row">
                          <div className="col-3">
                            <img
                              src={resolutionSelectedResolution}
                              alt="resolutionSelectedResolution"
                            />
                          </div>
                          <div className="col-9">
                            <p className="resolutionSelectedTxt">
                              Resolution <br /> Selected
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-3"
                        onClick={() => {
                          this.setState({ invoicePaidBtn: true });
                          document.getElementById(
                            "resolutionSelectedPaid"
                          ).style.display = "none";
                          document.getElementById(
                            "ViewAddNotePaid"
                          ).style.display = "none";
                          document.getElementById(
                            "contractSelectedPaid"
                          ).style.display = "none";
                        }}
                      >
                        <img
                          src={invoiceAddNoteCross}
                          alt="invoiceAddNoteCross"
                        />
                      </div>
                    </div>
                    <div className="ResolutionSelectedBodyTxt">
                      <div className="row">
                        <div className="col-4">
                          <h3>
                            <b>Industry:</b>
                          </h3>
                        </div>
                        <div className="col-8">
                          <p>Software Development</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <h3>
                            <b>Mediator:</b>
                          </h3>
                        </div>
                        <div className="col-8">
                          <p>Random</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <h3>
                            <b>Location:</b>
                          </h3>
                        </div>
                        <div className="col-8">
                          <p>Melbourne 3000</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <h3>
                            <b>Language:</b>
                          </h3>
                        </div>
                        <div className="col-8">
                          <p>Chinese, English</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <h3>
                            <b>Response:</b>
                          </h3>
                        </div>
                        <div className="col-8">
                          <p>3 days</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <h3>
                            <b>Appeal:</b>
                          </h3>
                        </div>
                        <div className="col-8">
                          <p>7 days</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    id="invoiceStopPaymentContent"
                    style={{ display: "none" }}
                  >
                    <p style={{ color: "pink" }}>
                      Pay the Gas fee in your wallet to stop the payment
                      release.
                    </p>
                    <p>
                      It may be better to first try and settle the dispute will
                      the seller before stopping payment release.
                    </p>
                  </div>

                  <div
                    id="ViewAddNotePaid"
                    className="InvoiceAddNote InvoiceAddNotepaid"
                    style={{ display: "none" }}
                  >
                    <div className="row resolutionSelectedRow">
                      <div className="col-9">
                        <div className="row">
                          <div className="col-3">
                            <img src={invoiceAddNote} alt="invoiceAddNote" />
                          </div>
                          <div className="col-9">
                            <p className="resolutionSelectedTxt">
                              Add Note
                              <br />
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "normal",
                                }}
                              >
                                provide feedback to Seller
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-3"
                        onClick={() => {
                          this.setState({ invoicePaidBtn: true });
                          document.getElementById(
                            "resolutionSelectedPaid"
                          ).style.display = "none";
                          document.getElementById(
                            "ViewAddNotePaid"
                          ).style.display = "none";
                          document.getElementById(
                            "contractSelectedPaid"
                          ).style.display = "none";
                        }}
                      >
                        <img
                          src={invoiceAddNoteCross}
                          alt="invoiceAddNoteCross"
                        />
                      </div>
                    </div>
                    <div className="ResolutionSelectedBodyTxt">
                      <h3>
                        <b>18/02/20222</b>
                      </h3>
                      <textarea
                        className="viewAddNoteTexterea viewAddNoteTextereaPaid"
                        name=""
                        id=""
                      ></textarea>
                    </div>
                  </div>

                  <div
                    id="contractSelectedPaid"
                    className="contractSelected"
                    style={{ display: "none" }}
                  >
                    <div className="row resolutionSelectedRow">
                      <div className="col-9">
                        <div className="row">
                          <div className="col-3">
                            <img
                              src={invoiceContractDocuments}
                              alt="invoiceContractDocuments"
                            />
                          </div>
                          <div className="col-9">
                            <p className="resolutionSelectedTxt">
                              Contract <br /> Documents
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-3"
                        onClick={() => {
                          this.setState({ invoicePaidBtn: true });
                          document.getElementById(
                            "resolutionSelectedPaid"
                          ).style.display = "none";
                          document.getElementById(
                            "ViewAddNotePaid"
                          ).style.display = "none";
                          document.getElementById(
                            "contractSelectedPaid"
                          ).style.display = "none";
                        }}
                      >
                        <img
                          src={invoiceAddNoteCross}
                          alt="invoiceAddNoteCross"
                        />
                      </div>
                    </div>
                    <div className="ResolutionSelectedBodyTxt">
                      <div className="row">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={invoiceContractDocumentsTerms}
                                alt="invoiceContractDocumentsTerms"
                              />
                            </div>
                            <div className="col-9 invoiceTermsTxt">
                              Terms & <br />
                              Conditions
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={invoiceContractDocumentsOther}
                                alt="invoiceContractDocumentsOther"
                              />
                            </div>
                            <div className="col-9 invoiceTermsTxt">
                              Product
                              <br />
                              Conditions
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={invoiceContractDocumentsTerms}
                                alt="invoiceContractDocumentsTerms"
                              />
                            </div>
                            <div className="col-9 invoiceTermsTxt">
                              Return & <br />
                              Policy
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={invoiceContractDocumentsOther}
                                alt="invoiceContractDocumentsOther"
                              />
                            </div>
                            <div className="col-9 invoiceTermsTxt">
                              View
                              <br />
                              Other
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {invoiceGetOptionsBtn}
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
