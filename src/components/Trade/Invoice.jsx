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
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
import invoiceAdd from "../../Images/Invoice/invoiceAdd.png";
import invoiceAttachDarkArrow from "../../Images/Invoice/invoiceAttachDarkArrow.png";
import invoiceAttachHR from "../../Images/Invoice/invoiceAttachHR.png";
import invoiceAttachLightArrow from "../../Images/Invoice/invoiceAttachLightArrow.png";
import invoiceCalender from "../../Images/Invoice/invoiceCalender.png";
import invoiceDelete from "../../Images/Invoice/invoiceDelete.png";
import invoiceEmail from "../../Images/Invoice/invoiceEmail.png";
import invoiceLink from "../../Images/Invoice/invoiceLink.png";
import invoiceMap from "../../Images/Invoice/invoiceMap.png";
import invoiceNextResolution from "../../Images/Invoice/invoiceNextResolution.png";
import invoicePaymentArrow from "../../Images/Invoice/invoicePaymentArrow.png";
import invoicePaymentGreenArow from "../../Images/Invoice/invoicePaymentGreenArow.png";
import invoicePaymentWightArow from "../../Images/Invoice/invoicePaymentWightArow.png";
import invoicePDF from "../../Images/Invoice/invoicePDF.png";
import invoiceProfile from "../../Images/Invoice/invoiceProfile.png";
import invoiceSetting from "../../Images/Invoice/invoiceSetting.png";
import invoiceWallet from "../../Images/Invoice/invoiceWallet.png";
import invoiceName from "../../Images/Invoice/invoiceName.png";
import invoiceDummyPDF from "../../Images/Invoice/invoiceDummyPDF1.png";
import purchaseHistory from "../../Images/Invoice/purchaseHistory.png";
import salesHistory from "../../Images/Invoice/salesHistory.png";
import createinvoice from "../../Images/Invoice/createinvoice.png";
import invoiceReports from "../../Images/Invoice/invoiceReports.png";
import invoiceDropdown from "../../Images/Invoice/invoiceDropdown.png";
import invoiceViewYellow from "../../Images/Invoice/invoiceViewYellow.png";
import invoiceViewWhite from "../../Images/Invoice/invoiceViewWhite.png";
import searchYellow from "../../Images/Invoice/searchYellow.png";
import searchWhite from "../../Images/Invoice/searchWhite.png";
import invoiceBack from "../../Images/Invoice/invoiceBack.png";
import invoiceUnpaidReject from "../../Images/Invoice/invoiceUnpaidReject.png";
import searchRed from "../../Images/Invoice/searchRed.png";
import invoiceUnpaidResolutionYellow from "../../Images/Invoice/invoiceUnpaidResolutionYellow.png";
import invoiceUnpaidContract from "../../Images/Invoice/invoiceUnpaidContract.png";
import invoiceUnpaidEdit from "../../Images/Invoice/invoiceUnpaidEdit.png";
import invoiceUnpaidAlarm from "../../Images/Invoice/invoiceUnpaidAlarm.png";
import resolutionSelectedResolution from "../../Images/Invoice/resolutionSelectedResolution.png";
import invoiceAddNoteCross from "../../Images/Invoice/invoiceAddNoteCross.png";
import invoiceContractDocuments from "../../Images/Invoice/invoiceContractDocuments.png";
import invoiceContractDocumentsTerms from "../../Images/Invoice/invoiceContractDocumentsTerms.png";
import invoiceContractDocumentsOther from "../../Images/Invoice/invoiceContractDocumentsOther.png";
import invoiceAddNote from "../../Images/Invoice/invoiceAddNote.png";
import invoiceTransactionHistory from "../../Images/Invoice/invoiceTransactionHistory.png";
import invoicePaymentStopped from "../../Images/Invoice/invoicePaymentStopped.png";
import invoicePayNow from "../../Images/Invoice/invoicePayNow.png";
import invoicePaymentStoppedIcon from "../../Images/Invoice/invoicePaymentStoppedIcon.png";
import navMessage from "../../Images/Menu/navMessage.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Calender
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import axios from "axios";

// components
// import HeaderNav from '../../components/HeaderNav.jsx';

// css
import "../css/Invoice.css";
import "../css/invoiceCalender.css";
import "../css/Attention.css";
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
                <Link to={{ pathname: "/Messages" }}>
                  <img
                    src={navMessage}
                    alt="navMessage"
                    style={{ marginRight: "17px" }}
                  />
                </Link>

                <Link to={{ pathname: "/SearchPage" }}>
                  <img
                    src={searchBtn}
                    alt="searchBtn"
                    style={{ marginRight: "20px" }}
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
            <button className="InvoiceinvoiceTab">
              <Link to={{ pathname: "/Invoice" }}>
                <img src={invoice} alt="invoice" />
              </Link>
            </button>
            <button className="InvoiceresolutionTab">
              <Link to={{ pathname: "/Resolution" }}>
                <img src={resolution} alt="resolution" />
              </Link>
            </button>
            <button className="InvoicecontractTab">
              <Link to={{ pathname: "/Contract" }}>
                <img src={contract} alt="contract" />
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
          id="InvoiceTabBody"
          style={{ height: "680px", width: "100%" }}
        >
          {viewPDF}

          {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
          <div
            className="invoiceBlackDivMainContainer"
            id="invoiceOptions"
            style={{ display: "inherit" }}
          >
            <Link to={{ pathname: "/PurchaseHistory" }}>
              <div className="invoiceBlackDiv">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={purchaseHistory}
                      className="purchaseHistory"
                      alt="purchaseHistory"
                    />
                  </div>
                  <div className="col-7">
                    <table className="invoiceOptionsTable">
                      <tbody>
                        <tr>
                          <th>Purchase History</th>
                        </tr>
                        <tr>
                          <td>My Orders:</td>
                          <td>{this.state.purchaseHistoryTotalPaid}</td>
                        </tr>
                        <tr>
                          <td>Unpaid:</td>
                          <td>{this.state.purchaseHistoryTotalUnPaid}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-2 invoiceDropdown">
                    <img src={invoiceDropdown} alt="invoiceDropdown" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to={{ pathname: "/SalesHistory" }}>
              <div className="invoiceBlackDiv">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={salesHistory}
                      className="salesHistory"
                      alt="salesHistory"
                    />
                  </div>
                  <div className="col-7">
                    <table className="invoiceOptionsTable">
                      <tbody>
                        <tr>
                          <th>Sales History</th>
                        </tr>
                        <tr>
                          <td>Invoice Paid:</td>
                          <td>{this.state.salesHistoryTotalPaid}</td>
                        </tr>
                        <tr>
                          <td>Invoice Unpaid:</td>
                          <td>{this.state.salesHistoryTotalUnPaid}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-2 invoiceDropdown">
                    <img src={invoiceDropdown} alt="invoiceDropdown" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to={{ pathname: "/CreateInvoice" }}>
              <div className="invoiceBlackDiv">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={createinvoice}
                      className="purchaseHistory"
                      alt="createinvoice"
                    />
                  </div>
                  <div className="col-7">
                    <table className="invoiceOptionsTable">
                      <tbody>
                        <tr>
                          <th>Create Invoice</th>
                        </tr>
                        <tr>
                          <td>
                            Create a new invoice or upload your PDF Invoice
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-2 invoiceDropdown">
                    <img src={invoiceDropdown} alt="invoiceDropdown" />
                  </div>
                </div>
              </div>
            </Link>
            <div className="invoiceBlackDiv">
              <div className="row">
                <div className="col-3">
                  <img
                    src={invoiceReports}
                    className="purchaseHistory"
                    alt="invoiceReports"
                  />
                </div>
                <div className="col-7">
                  <table className="invoiceOptionsTable">
                    <tbody>
                      <tr>
                        <th>Reports</th>
                      </tr>
                      <tr>
                        <td>Annual Report</td>
                      </tr>
                      <tr>
                        <td>Quote Monitor</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={invoiceDropdown} alt="invoiceDropdown" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
