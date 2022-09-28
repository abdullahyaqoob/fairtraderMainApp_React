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
import invoice from "../../../Images/activeInvoice.png";
import resolution from "../../../Images/resolution.png";
import Attension from "../../../Images/Invoice/Attension.png";
import contract from "../../../Images/contract.png";
import myWallet from "../../../Images/myWallet.png";
import invoiceDummyPDF from "../../../Images/Invoice/invoiceDummyPDF1.png";
import myFeesCases from "../../../Images/Invoice/myFeesCases.png";
import salesHistory from "../../../Images/Invoice/salesHistory.png";
import createinvoice from "../../../Images/Invoice/createinvoice.png";
import myFeesSearch from "../../../Images/Invoice/myFeesSearch.png";
import invoiceViewYellow from "../../../Images/Invoice/invoiceViewWhite.png";
import searchYellow from "../../../Images/Invoice/searchYellow.png";
import myFeesYellowBack from "../../../Images/Invoice/myFeesYellowBack.png";
import navMessage from "../../../Images/Menu/navMessage.png";
import invoiceBack from "../../../Images/Invoice/invoiceBack.png";
import invoiceUnpaidReject from "../../../Images/Invoice/invoiceUnpaidReject.png";
import mediatorSearch from "../../../Images/resolutionMediator/mediatorSearch.png";

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
            <button
              className="ResolutioninvoiceTab"
              style={{ borderBottomRightRadius: "0px" }}
            >
              <Link to={{ pathname: "/Attention" }}>
              <img src={Attension} alt="Attension" />
              </Link>
            </button>
            <button
              className="InvoiceresolutionTab"
              style={{ borderBottomLeftRadius: "0px" }}
            >
              <Link to={{ pathname: "/MedResolution" }}>
                <img src={resolution} alt="resolution" />
              </Link>
            </button>
            <button className="myFeesActiveTab">
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
          id="myFeesTabBody"
          style={{ height: "680px", width: "100%" }}
        >
          {viewPDF}
          {this.state.furtherDetail === false ? (
            <div>
              <div className="overdueTasksOrderTxt">
                <p style={{ color: "white" }}>Paid Fees:</p>
                <p>
                  <span style={{ color: "white" }}>Newest</span>{" "}
                  <span style={{ color: "rgb(23, 231, 4)" }}>__</span>{" "}
                  <span>Oldest</span>
                </p>
              </div>
              {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
              <div
                className="invoiceBlackDivMainContainer overdueTaskContainer"
                id="invoiceOptions"
                style={{ display: "inherit" }}
              >
                <div
                  className="invoiceBlackDiv invoiceOrderBlackSubDiv myFeesBoxes"
                  onClick={() => {
                    // this.setState({ invoiceUnpaidOrder: true });
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <img src={myFeesCases} alt="myFeesCases" />
                    </div>
                    <div className="col-5 invoiceUnpaidProfile">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Case No</b>
                        </p>
                        <p>#123456789</p>
                        <p>15/11/2022</p>
                      </p>
                    </div>
                    <div className="col-5">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Paid</b>
                        </p>
                        <div className="invoiceUnpaidSearch">
                        <img src={myFeesSearch} alt="" onClick={() => {this.setState({furtherDetail: true})}} />
                        </div>
                        <p>
                          <b>24/12/2022</b>
                        </p>
                        <p>
                          <b>USD $20</b>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="invoiceBlackDiv invoiceOrderBlackSubDiv myFeesBoxes"
                  onClick={() => {
                    // this.setState({ invoiceUnpaidOrder: true });
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <img src={myFeesCases} alt="myFeesCases" />
                    </div>
                    <div className="col-5 invoiceUnpaidProfile">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Case No</b>
                        </p>
                        <p>#123456789</p>
                        <p>15/11/2022</p>
                      </p>
                    </div>
                    <div className="col-5">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Paid</b>
                        </p>
                        <div className="invoiceUnpaidSearch">
                        <img src={myFeesSearch} alt="" onClick={() => {this.setState({furtherDetail: true})}} />
                        </div>
                        <p>
                          <b>24/12/2022</b>
                        </p>
                        <p>
                          <b>USD $90</b>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="invoiceBlackDiv invoiceOrderBlackSubDiv myFeesBoxes"
                  onClick={() => {
                    // this.setState({ invoiceUnpaidOrder: true });
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <img src={myFeesCases} alt="myFeesCases" />
                    </div>
                    <div className="col-5 invoiceUnpaidProfile">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Case No</b>
                        </p>
                        <p>#123456789</p>
                        <p>15/11/2022</p>
                      </p>
                    </div>
                    <div className="col-5">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Paid</b>
                        </p>
                        <div className="invoiceUnpaidSearch">
                        <img src={myFeesSearch} alt="" onClick={() => {this.setState({furtherDetail: true})}} />
                        </div>
                        <p>
                          <b>24/12/2022</b>
                        </p>
                        <p>
                          <b>USD $210</b>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="invoiceBlackDiv invoiceOrderBlackSubDiv myFeesBoxes"
                  onClick={() => {
                    // this.setState({ invoiceUnpaidOrder: true });
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <img src={myFeesCases} alt="myFeesCases" />
                    </div>
                    <div className="col-5 invoiceUnpaidProfile">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Case No</b>
                        </p>
                        <p>#123456789</p>
                        <p>15/11/2022</p>
                      </p>
                    </div>
                    <div className="col-5">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Paid</b>
                        </p>
                        <div className="invoiceUnpaidSearch">
                          <img src={myFeesSearch} alt="myFeesSearch" onClick={() => {this.setState({furtherDetail: true})}} />
                        </div>
                        <p>
                          <b>24/12/2022</b>
                        </p>
                        <p>
                          <b>USD $50</b>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="invoiceUnpaidTotal"
                  style={{ marginRight: "20px" }}
                >
                  <p className="invoiceUnpaidTotalTxt">
                    Total (USD) <span style={{ color: "black" }}>.</span>{" "}
                    $2,512.98
                  </p>
                </div>

                <div className="selectResolutionDIv invoiceThreeBtnDiv">
                  <span className="alignStart">
                    <Link to={{ pathname: "/MyFees" }}>
                      <img src={myFeesYellowBack} alt="myFeesYellowBack" />
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
               

               <div
                  className="invoiceBlackDiv invoiceOrderBlackSubDiv myFeesBoxes" style={{backgroundColor: '#4B4B4D'}}
                  onClick={() => {
                    // this.setState({ invoiceUnpaidOrder: true });
                  }}
                >
                  <div className="row">
                    <div className="col-2">
                      <img src={myFeesCases} alt="myFeesCases" />
                    </div>
                    <div className="col-5 invoiceUnpaidProfile">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Case No</b>
                        </p>
                        <p>#123456789</p>
                        <p>15/11/2022</p>
                      </p>
                    </div>
                    <div className="col-5">
                      <p className="invoiceUnpaidProfileData">
                        <p>
                          <b>Paid</b>
                        </p>
                        <div className="invoiceUnpaidSearch">
                        <img src={myFeesSearch} alt="" onClick={() => {this.setState({furtherDetail: true})}} />
                        </div>
                        <p>
                          <b>24/12/2022</b>
                        </p>
                        <p>
                          <b>USD $210</b>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>

                <br />
                <div className="judgeCaseSubmitedistRow">
                  <h5>
                    <b>BUYER</b>
                  </h5>
                </div>
                <div className="judgeCaseSubmitedistRow">
                  <h5>ABC Services Pty Ltd</h5>
                </div>

                <div className="judgeCaseSubmitedistRow">
                  <h5>Paid</h5>
                  <h5>$10.USD</h5>
                </div>

                <div className="judgeCaseSubmitedistRow">
                  <h5>date</h5>
                  <h5>20/11/2022</h5>
                </div>

                <br />
                <div className="judgeCaseSubmitedistRow">
                  <h5>
                    <b>SELLER</b>
                  </h5>
                </div>
                <div className="judgeCaseSubmitedistRow">
                  <h5>Mrs Jones</h5>
                </div>

                <div className="judgeCaseSubmitedistRow">
                  <h5>Pay USD</h5>
                  <h5>$10 USD</h5>
                </div>

                <div className="judgeCaseSubmitedistRow">
                  <h5>Pay in BNB</h5>
                  <h5>20/11/2022</h5>
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
                      View Case
                    </p>
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
