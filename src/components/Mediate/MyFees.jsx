// react States
// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

// Images
import fairtraderLogo from "../../Images/fairtraderLogo.png";
import searchBtn from "../../Images/searchBtn.png";
import toggleBtn from "../../Images/toggleBtn.png";
import invoice from "../../Images/activeInvoice.png";
import resolution from "../../Images/resolution.png";
import Attension from "../../Images/Invoice/Attension.png";
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
import invoiceDummyPDF from "../../Images/Invoice/invoiceDummyPDF1.png";
import purchaseHistory from "../../Images/Invoice/purchaseHistory.png";
import salesHistory from "../../Images/Invoice/salesHistory.png";
import activeMyFees from "../../Images/Invoice/activeMyFees.png";
import myFeesPaidInvoices from "../../Images/Invoice/myFeesPaidInvoices.png";
import myFeesUnPaidInvoices from "../../Images/Invoice/myFeesUnPaidInvoices.png";
import myFeesDisputeInvoices from "../../Images/Invoice/myFeesDisputeInvoices.png";
import myFeesYellowDropdown from "../../Images/Invoice/myFeesYellowDropdown.png";
import myFeesReports from "../../Images/Invoice/myFeesReports.png";
import invoiceDropdown from "../../Images/Invoice/invoiceDropdown.png";
import navMessage from "../../Images/Menu/navMessage.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Calender
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import axios from "axios";

// components
// import HeaderNav from '../components/HeaderNav.jsx';

// css
import "../css/Invoice.css";
import "../css/invoiceCalender.css";
import "../css/myFees.css";
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calenderValue: "",
      viewPDF: false,
      createInvoice: false,
      invoicePaymentStopped: false,
      userAccountAddress: "",
      invoiceCoverData: "",
      purchaseHistoryTotalPaid: 0,
      purchaseHistoryTotalUnPaid: 0,
      salesHistoryTotalPaid: 0,
      salesHistoryTotalUnPaid: 0,
      userConnectedEmailValue: "",
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
              <img src={activeMyFees} alt="activeMyFees" />
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

          {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
          <div
            className="invoiceBlackDivMainContainer"
            id="invoiceOptions"
            style={{ display: "inherit" }}
          >
            <Link to={{ pathname: "/PaidFees" }}>
              <div className="invoiceBlackDiv">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={myFeesPaidInvoices}
                      className="purchaseHistory"
                      alt="myFeesPaidInvoices"
                    />
                  </div>
                  <div className="col-7">
                    <table className="invoiceOptionsTable myFeesTableHeading">
                      <tbody>
                        <tr>
                          <th>Paid Fees</th>
                        </tr>
                        <tr>
                          <td>Invoice paid</td>
                          <td>48</td>
                          {/* <td>{this.state.purchaseHistoryTotalPaid}</td> */}
                        </tr>
                        <tr>
                          <td>Total in USD</td>
                          {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                          <td>$777.48</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-2 invoiceDropdown">
                    <img src={myFeesYellowDropdown} alt="myFeesYellowDropdown" />
                  </div>
                </div>
              </div>
            </Link>
            {/* <Link to={{ pathname: "/SalesHistory" }}> */}
            <div className="invoiceBlackDiv">
              <div className="row">
                <div className="col-3">
                  <img
                    src={myFeesUnPaidInvoices}
                    className="salesHistory"
                    alt="myFeesUnPaidInvoices"
                  />
                </div>
                <div className="col-7">
                  <table className="invoiceOptionsTable myFeesTableHeading">
                    <tbody>
                      <tr>
                        <th>Unpaid Fees</th>
                      </tr>
                      <tr>
                        <td>Awaiting release:</td>
                        {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                        <td>12</td>
                      </tr>
                      <tr>
                        <td>Total in USD:</td>
                        {/* <td>{this.state.salesHistoryTotalUnPaid}</td> */}
                        <td>528.40</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={myFeesYellowDropdown} alt="myFeesYellowDropdown" />
                </div>
              </div>
            </div>
            {/* </Link> */}

            {/* <Link to={{ pathname: "/SalesHistory" }}> */}
            <div className="invoiceBlackDiv">
              <div className="row">
                <div className="col-3">
                  <img
                    src={myFeesDisputeInvoices}
                    className="salesHistory"
                    alt="myFeesDisputeInvoices"
                  />
                </div>
                <div className="col-7">
                  <table className="invoiceOptionsTable myFeesTableHeading">
                    <tbody>
                      <tr>
                        <th>Disputed Fees</th>
                      </tr>
                      <tr>
                        <td>Disputed cases:</td>
                        {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                        <td>02</td>
                      </tr>
                      <tr>
                        <td>Total in USD:</td>
                        {/* <td>{this.state.salesHistoryTotalUnPaid}</td> */}
                        <td>$230.22</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={myFeesYellowDropdown} alt="myFeesYellowDropdown" />
                </div>
              </div>
            </div>
            {/* </Link> */}

            {/* <Link to={{ pathname: "/SalesHistory" }}> */}
            <div className="invoiceBlackDiv">
              <div className="row">
                <div className="col-3">
                  <img
                    src={myFeesReports}
                    className="salesHistory"
                    alt="myFeesReports"
                  />
                </div>
                <div className="col-7">
                  <table className="invoiceOptionsTable myFeesTableHeading">
                    <tbody>
                      <tr>
                        <th>Reports</th>
                      </tr>
                      <tr>
                        <td>Annual Report</td>
                        {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={myFeesYellowDropdown} alt="myFeesYellowDropdown" />
                </div>
              </div>
            </div>
            {/* </Link> */}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
