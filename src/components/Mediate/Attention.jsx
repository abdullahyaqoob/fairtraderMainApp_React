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
import invoice from "../../Images/invoice.png";
import resolution from "../../Images/resolution.png";
import contract from "../../Images/activeContract.png";
import myWallet from "../../Images/myWallet.png";
import invoiceDummyPDF from "../../Images/Invoice/invoiceDummyPDF1.png";
import purchaseHistory from "../../Images/Invoice/purchaseHistory.png";
import salesHistory from "../../Images/Invoice/salesHistory.png";
import activeAttension from "../../Images/Invoice/activeAttension.png";
import createinvoice from "../../Images/Invoice/createinvoice.png";
import overdueTasks from "../../Images/Invoice/overdueTasks.png";
import jobQueue from "../../Images/Invoice/jobQueue.png";
import attensionYellowDropdown from "../../Images/Invoice/attensionYellowDropdown.png";
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
      this.props["props"].UserAccountAddr.userAccountAddr !== "" &&
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
                {/* <Link to={{ pathname: "/Messages" }}>
                  <img
                    src={navMessage}
                    alt="navMessage"
                    style={{ marginRight: "17px" }}
                  />
                </Link> */}
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
              className="attentionTab"
              style={{ borderTopLeftRadius: "0px" }}
            >
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

          {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
          <div
            className="invoiceBlackDivMainContainer"
            id="invoiceOptions"
            style={{ display: "inherit" }}
          >
            <Link to={{ pathname: "/OverdueTasks" }}>
              <div className="invoiceBlackDiv">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={overdueTasks}
                      className="purchaseHistory"
                      alt="overdueTasks"
                    />
                  </div>
                  <div className="col-7">
                    <table className="invoiceOptionsTable attentionTableHeading">
                      <tbody>
                        <tr>
                          <th>Overdue Tasks</th>
                        </tr>
                        <tr>
                          <td>Reply to mediation:</td>
                          <td>{this.state.purchaseHistoryTotalPaid}</td>
                        </tr>
                        <tr>
                          <td>Reply to supervisor:</td>
                          <td>{this.state.purchaseHistoryTotalUnPaid}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-2 invoiceDropdown">
                    <img src={attensionYellowDropdown} alt="attensionYellowDropdown" />
                  </div>
                </div>
              </div>
            </Link>
            {/* <Link to={{ pathname: "/SalesHistory" }}> */}
            <div className="invoiceBlackDiv">
              <div className="row">
                <div className="col-3">
                  <img
                    src={jobQueue}
                    className="salesHistory"
                    alt="jobQueue"
                  />
                </div>
                <div className="col-7">
                  <table className="invoiceOptionsTable attentionTableHeading">
                    <tbody>
                      <tr>
                        <th>Job Quene</th>
                      </tr>
                      <tr>
                        <td>Accept new work:</td>
                        {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>New Jobs:</td>
                        {/* <td>{this.state.salesHistoryTotalUnPaid}</td> */}
                        <td style={{ position: "relative", left: "2px" }}>
                          03
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={attensionYellowDropdown} alt="attensionYellowDropdown" />
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
