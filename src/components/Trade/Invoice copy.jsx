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
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleAddInvoice: false,
      attachInvoiceFileName: "",
      paymentCalender: false,
      ProfileSelectedFileQual: "",
      calenderValue: "",
      formatedCalenderValue: "",
      viewPDF: false,
      createInvoice: false,
      invoiceUnpaidOrder: false,
      invoiceOrderHistoryBtn: false,
      invoicePaidBtn: false,
      invoicePaymentStopped: false,
      userAccountAddress: "",
    };
  }
  async componentWillMount() {}
  userAddressHandle = async () => {
    let userAddres;
    if (this.props["props"].UserAccountAddr.userAccountAdd !== "") {
      userAddres = this.props["props"].UserAccountAddr.userAccountAddr;
      console.log(userAddres);

      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}user/searchUsersByWallet/${userAddres} `
        )

        .then((res) => {
          console.log(res);
        })
        .then((err) => {
          console.log(err);
        });
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  };

  createInvoiceHandler = async (e) => {
    let createInvoiceName = document.getElementById("createInvoiceName").value;
    let createInvoiceAddr = document.getElementById("createInvoiceAddr").value;
    let createInvoiceEmail = document.getElementById("createInvoiceEmail")
      .value;
    let createInvoiceWallet = document.getElementById("createInvoiceWallet")
      .value;

    console.log(
      createInvoiceName,
      createInvoiceAddr,
      createInvoiceEmail,
      createInvoiceWallet
    );
    console.log(this.state.calenderValue);

    if (
      createInvoiceEmail === "" ||
      this.state.formatedCalenderValue === "" ||
      this.state.ProfileSelectedFileQual === ""
    ) {
      alert("Please First enter Create Invoice Information");
    } else {
      let createAddInvoiceFile = this.state.ProfileSelectedFileQual;
      console.log(
        "this.state.formatedCalenderValue",
        this.state.formatedCalenderValue
      );

      // requests for sending this selected file

      let userAccountAddress = this.props["props"].UserAccountAddr
        .userAccountAddr;

      var formData = new FormData();
      formData.append("sellerwalletaddress", userAccountAddress);
      formData.append("customername", createInvoiceName);
      formData.append("customeraddress", createInvoiceAddr);
      formData.append("customeremail", createInvoiceEmail);
      formData.append("customerwalletaddress", createInvoiceWallet);
      formData.append("invoicefile", createAddInvoiceFile);
      formData.append("payment", this.state.formatedCalenderValue);
      // this.state.formatedCalenderValue

      await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "invoices/createInvoice",
        data: formData,
        onUploadProgress: (uploadEvent) => {
          this.setState({
            profileImgProgress:
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%",
          });
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("profileImgProgress", this.state.profileImgProgress);
          console.log("File Sended Response: ", res);
        })
        .catch((err) => {
          // this.$toasted.error("Cannot able to attach this file.");
          console.log("error", err);
          // this.fileSelectionLoading = false;
        });
    }
  };

  handleSelectDate() {
    var dateObj = this.state.calenderValue;
    if (dateObj !== "") {
      var month = dateObj.toLocaleString("default", { month: "short" });
      var day = dateObj.getDate();
      var year = dateObj.getFullYear();

      var newdate = day + " " + month + " " + year;
      console.log(newdate);
      this.setState({ formatedCalenderValue: newdate });

      this.setState({ paymentCalender: false });
    } else {
      toast.error("First, Select the Date", {
        position: "top-right",
      });
    }
  }
  onInvoiceFileSelect = async (e) => {
    // console.log("event", e);
    // this.AllImageFiles = e.target.files;

    if (e.target.files[0].size > 5000000) {
      this.$toasted.error("File size must be smaller than 5 MB");
    } else {
      console.log("Selected Image File: ", e.target.files[0]);
      this.setState({ ProfileSelectedFileQual: e.target.files[0] });
    }
  };

  handleViewPDF() {
    this.setState({ viewPDF: true });
    document.getElementById("invoiceBlackContainer").style.display = "none";
  }
  handleClossPDF() {
    this.setState({ viewPDF: false });
    document.getElementById("invoiceBlackContainer").style.display = "inherit";
  }

  render() {
    let invoicePaymentStoppedProfileImg;
    let invoicePaymentStoppedpayStopPayBtn;
    let invoicepaymentStopBtnTxt;
    if (this.state.invoicePaymentStopped === false) {
      invoicePaymentStoppedpayStopPayBtn = (
        <div className="row invoiceProfileRightSection">
          <div className="col-4">
            <img src={invoiceUnpaidAlarm} alt="invoiceUnpaidAlarm" />
          </div>
          <div className="col-8">
            Pay On
            <br />
            18/10/2021
          </div>
        </div>
      );
      this.userAddressHandle();
      invoicePaymentStoppedProfileImg = (
        <img
          src={invoicePaymentStopped}
          className="floatRight"
          alt="invoicePaymentStopped"
          onClick={() => {
            document.getElementById("resolutionSelectedPaid").style.display =
              "none";
            document.getElementById("ViewAddNotePaid").style.display = "none";
            document.getElementById("ViewAddNotePaid").style.display = "none";
            document.getElementById("invoiceStopPaymentContent").style.display =
              "inherit";
            this.setState({ invoicePaymentStopped: true });
          }}
        />
      );
      invoicepaymentStopBtnTxt = (
        <p
          className="selectResolutionBtn alignCenter"
          onClick={() => {
            this.setState({ invoicePaymentStopped: true });
          }}
          style={{ width: "200px" }}
        >
          Release Payment
        </p>
      );
    } else {
      invoicePaymentStoppedpayStopPayBtn = (
        <div className="row invoiceProfileRightSection">
          <div className="col-4">
            <img src={invoicePaymentStoppedIcon} alt="invoicePaymentStopped" />
          </div>
          <div className="col-8">
            Payment
            <br />
            Stopped
          </div>
        </div>
      );
      invoicePaymentStoppedProfileImg = (
        <img
          src={invoicePayNow}
          className="floatRight"
          alt="invoicePayNow"
          onClick={() => {
            document.getElementById("resolutionSelectedPaid").style.display =
              "none";
            document.getElementById("ViewAddNotePaid").style.display = "none";
            document.getElementById("ViewAddNotePaid").style.display = "none";
            document.getElementById("invoiceStopPaymentContent").style.display =
              "inherit";
          }}
        />
      );
      invoicepaymentStopBtnTxt = (
        <p
          className="selectResolutionBtn alignCenter"
          onClick={() => {
            this.setState({ invoicePaymentStopped: true });
          }}
          style={{ width: "200px" }}
        >
          Start Mediation
        </p>
      );
    }

    let invoiceMainPage;
    if (this.state.createInvoice === false) {
      invoiceMainPage = (
        <div className="invoiceBlackContainer" id="invoiceBlackContainer">
          <p className="invoiceFirstLine">
            <img
              src={invoiceProfile}
              className="alignStart"
              style={{ float: "left" }}
              alt="walletFirstParaIcon"
            />
            <span className="invoiceFeildsTxt">ABC Services</span>
            <span className="invoiceFirstToken">#180040</span>
            <img
              src={invoiceSetting}
              style={{ marginTop: "2px" }}
              className="floatRight"
              alt="walletGreaterSign"
            />
          </p>

          <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
            <span className="alignStart">
              <img
                src={invoiceName}
                alt="mapIcon"
                style={{ marginTop: "-1px", marginRight: "10px" }}
              />
              <input
                type="InvoiceinvoiceFields"
                className="mutualFriendInput invoiceFields"
                placeholder="enter customer name"
              />
            </span>
            <span
              className="alignEnd"
              style={{ float: "right", marginRight: "-8px" }}
            >
              <img
                src={invoiceLink}
                style={{ marginTop: "0px" }}
                className="floatRight"
                alt="walletGreaterSign"
              />
            </span>
          </div>

          <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
            <span className="alignStart">
              <img
                src={invoiceMap}
                alt="mapIcon"
                style={{
                  marginTop: "-1px",
                  marginRight: "11px",
                  marginLeft: "2px",
                }}
              />
              <input
                type="InvoiceinvoiceFields"
                className="mutualFriendInput invoiceFields"
                placeholder="enter customer address"
              />
            </span>
            <span
              className="alignEnd"
              style={{ float: "right", marginRight: "-8px" }}
            >
              <img
                src={invoiceLink}
                style={{ marginTop: "0px" }}
                className="floatRight"
                alt="walletGreaterSign"
              />
            </span>
          </div>

          <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
            <span className="alignStart">
              <img
                src={invoiceEmail}
                alt="mapIcon"
                style={{ marginTop: "-1px", marginRight: "10px" }}
              />
              <input
                type="InvoiceinvoiceFields"
                className="mutualFriendInput invoiceFields"
                placeholder="enter customer email"
              />
            </span>
            <span
              className="alignEnd"
              style={{ float: "right", marginRight: "-8px" }}
            >
              <img
                src={invoiceLink}
                style={{ marginTop: "0px" }}
                className="floatRight"
                alt="walletGreaterSign"
              />
            </span>
          </div>

          <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
            <span className="alignStart">
              <img
                src={invoiceWallet}
                alt="mapIcon"
                style={{
                  marginTop: "-1px",
                  marginRight: "10px",
                  marginLeft: "2px",
                }}
              />
              <input
                type="InvoiceinvoiceFields"
                className="mutualFriendInput invoiceFields"
                placeholder="enter customer wallet"
                style={{ width: "65%" }}
              />
            </span>
            <span
              className="alignEnd"
              style={{ float: "right", marginRight: "-8px" }}
            >
              <img
                src={invoiceLink}
                style={{ marginTop: "0px" }}
                className="floatRight"
                alt="walletGreaterSign"
              />
            </span>
          </div>

          <div className="row">
            <div className="col-6">
              <div
                className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds"
                style={{ width: "107%" }}
                onClick={() => {
                  this.setState({ handleAddInvoice: false });
                  if (this.state.paymentCalender === true) {
                    this.setState({ paymentCalender: false });
                  } else {
                    this.setState({ paymentCalender: true });
                  }
                }}
              >
                <span className="alignStart">
                  <img
                    src={invoiceCalender}
                    alt="mapIcon"
                    style={{
                      marginTop: "-1px",
                      marginRight: "10px",
                      marginLeft: "2px",
                    }}
                  />
                  <b style={{ position: "relative", top: "1px" }}>
                    {formatedCalenderValueUI}
                  </b>
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginRight: "-8px" }}
                >
                  <img
                    src={invoicePaymentArrow}
                    style={{ marginTop: "9px" }}
                    className="floatRight"
                    alt="walletGreaterSign"
                  />
                </span>
              </div>
            </div>
            <div className="col-6">
              <div
                className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds"
                style={{ width: "107%", marginLeft: "-12px" }}
                onClick={() => {
                  this.setState({ paymentCalender: false });
                  if (this.state.handleAddInvoice === true) {
                    this.setState({ handleAddInvoice: false });
                  } else {
                    this.setState({ handleAddInvoice: true });
                  }
                }}
              >
                {attachedInvoice}
              </div>
            </div>
          </div>
          {paymentCalender}
          {addInvoice}
          {invoiceBtn}
        </div>
      );
    } else {
      invoiceMainPage = (
        <div className="invoiceBlackDivMainContainer">
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
                  <tr>
                    <th>Purchase History</th>
                  </tr>
                  <tr>
                    <td>Purchased:</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Unpaid:</td>
                    <td>02</td>
                  </tr>
                </table>
              </div>
              <div className="col-2 invoiceDropdown">
                <img src={invoiceDropdown} alt="invoiceDropdown" />
              </div>
            </div>
          </div>
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
                  <tr>
                    <th>Sales History</th>
                  </tr>
                  <tr>
                    <td>Invoice Paid:</td>
                    <td>30</td>
                  </tr>
                  <tr>
                    <td>Invoice Unpaid:</td>
                    <td>22</td>
                  </tr>
                </table>
              </div>
              <div className="col-2 invoiceDropdown">
                <img src={invoiceDropdown} alt="invoiceDropdown" />
              </div>
            </div>
          </div>
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
                  <tr>
                    <th>Create Invoice</th>
                  </tr>
                  <tr>
                    <td>Create a new invoice or upload your PDF Invoice</td>
                  </tr>
                </table>
              </div>
              <div className="col-2 invoiceDropdown">
                <img src={invoiceDropdown} alt="invoiceDropdown" />
              </div>
            </div>
          </div>
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
                  <tr>
                    <th>Reports</th>
                  </tr>
                  <tr>
                    <td>Annual Report</td>
                  </tr>
                  <tr>
                    <td>Quote Monitor</td>
                  </tr>
                </table>
              </div>
              <div className="col-2 invoiceDropdown">
                <img src={invoiceDropdown} alt="invoiceDropdown" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    let attachedInvoice;
    if (this.state.attachInvoiceFileName === "") {
      attachedInvoice = (
        <div>
          <span className="alignStart">
            <span
              style={{
                fontWeight: "normal",
                marginLeft: "6px",
                fontSize: "17px",
              }}
            >
              <b>Add Invoice</b>
            </span>
          </span>
          <span
            className="alignEnd"
            style={{ float: "right", marginRight: "-8px" }}
          >
            <img
              src={invoiceAdd}
              style={{ marginTop: "-1px" }}
              className="floatRight"
              alt="walletGreaterSign"
            />
          </span>
        </div>
      );
    } else {
      attachedInvoice = (
        <div>
          <span className="alignStart">
            <span
              style={{
                fontWeight: "normal",
                marginLeft: "4px",
                fontSize: "16px",
              }}
            >
              <b>Update Invoice</b>
            </span>
          </span>
          <span
            className="alignEnd"
            style={{ float: "right", marginRight: "-8px" }}
          >
            <img
              src={invoicePDF}
              style={{ marginTop: "-1px" }}
              className="floatRight"
              alt="walletGreaterSign"
            />
          </span>
        </div>
      );
    }

    let invoiceBtn;
    if (this.state.paymentCalender === true) {
      invoiceBtn = "";
    } else if (
      this.state.formatedCalenderValue !== "" &&
      this.state.attachInvoiceFileName !== ""
    ) {
      invoiceBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img src={invoiceDelete} alt="mapIcon" />
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => {
                this.handleViewPDF();
              }}
              style={{ width: "200px" }}
            >
              View PDF
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <Link to={{ pathname: "/Resolution" }}>
              <img
                src={invoiceNextResolution}
                className="floatRight"
                alt="walletGreaterSign"
              />
            </Link>
          </span>
        </div>
      );
    } else {
      invoiceBtn = (
        <div className="selectResolutionDIv">
          <div className="selectResolutionBtnDiv">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => this.createInvoiceHandler()}
            >
              Enter Information
            </p>
          </div>
        </div>
      );
    }

    let invoiceUnpaidSelectedOptionBtn;
    if (this.state.invoiceUnpaidOrder === true) {
      invoiceUnpaidSelectedOptionBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={invoiceBack}
              alt="invoiceBack"
              onClick={() => {
                document.getElementById("invoiceAllUnpaidBoxes").style.display =
                  "inherit";
                document.getElementById(
                  "invoiceUnpaidSelectedOption"
                ).style.display = "none";
              }}
            />
          </span>
          <span className="invoiceThreeBtn">
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
          </span>
        </div>
      );
    } else if (this.state.invoiceUnpaidOrder === false) {
      invoiceUnpaidSelectedOptionBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={invoiceBack}
              alt="invoiceBack"
              onClick={() => {
                document.getElementById("invoiceAllUnpaidBoxes").style.display =
                  "inherit";
                document.getElementById(
                  "invoiceUnpaidSelectedOption"
                ).style.display = "none";
              }}
            />
          </span>
        </div>
      );
    }

    let invoiceUnpaidBtn;
    if (this.state.invoiceUnpaidOrder === true) {
      invoiceUnpaidBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img src={invoiceBack} alt="invoiceBack" />
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => {
                document.getElementById(
                  "invoiceUnpaidSelectedOption"
                ).style.display = "inherit";
                document.getElementById("invoiceAllUnpaidBoxes").style.display =
                  "none";
              }}
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
          </span>
        </div>
      );
    } else if (this.state.invoiceUnpaidOrder === false) {
      invoiceUnpaidBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={invoiceBack}
              alt="invoiceBack"
              onClick={() => {
                document.getElementById("invoiceOptions").style.display =
                  "inherit";
                document.getElementById(
                  "invoicePurchaseHistory"
                ).style.display = "none";
              }}
            />
          </span>
        </div>
      );
    }

    let invoicepaidOptionsBtn;
    if (this.state.invoiceUnpaidOrder === true) {
      invoicepaidOptionsBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img src={invoiceBack} alt="invoiceBack" />
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => {
                document.getElementById(
                  "invoiceUnpaidSelectedOption"
                ).style.display = "inherit";
                document.getElementById("invoiceAllUnpaidBoxes").style.display =
                  "none";
              }}
              style={{ width: "200px" }}
            >
              View Options
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
      );
    } else if (this.state.invoiceUnpaidOrder === false) {
      invoicepaidOptionsBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={invoiceBack}
              alt="invoiceBack"
              onClick={() => {
                document.getElementById("invoiceOptions").style.display =
                  "inherit";
                document.getElementById(
                  "invoicePurchaseHistory"
                ).style.display = "none";
              }}
            />
          </span>
        </div>
      );
    }

    let invoiceOrderHistoryBtn;
    if (this.state.invoiceOrderHistoryBtn === false) {
      invoiceOrderHistoryBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={invoiceBack}
              alt="invoiceBack"
              onClick={() => {
                this.setState({ invoiceUnpaidOrder: false });
                document.getElementById("invoiceUnpaidSearch").style.display =
                  "none";
                document.getElementById("invoiceAllUnpaidBoxes").style.display =
                  "inherit";
              }}
            />
          </span>
          <span className="invoiceThreeBtn">
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
          </span>
        </div>
      );
    } else if (this.state.invoiceOrderHistoryBtn === true) {
      invoiceOrderHistoryBtn = "";
    }

    let invoiceGetOptionsBtn;
    if (this.state.invoicePaidBtn === true) {
      invoiceGetOptionsBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={invoiceBack}
              alt="invoiceBack"
              onClick={() => {
                this.setState({ invoiceUnpaidOrder: false });
                document.getElementById("invoiceUnpaidSearch").style.display =
                  "none";
                document.getElementById("invoiceAllUnpaidBoxes").style.display =
                  "inherit";
              }}
            />
          </span>
          <span className="invoiceThreeBtn">{invoicepaymentStopBtnTxt}</span>
          <span className="alignEnd" style={{ float: "right" }}>
            <Link to={{ pathname: "" }}>{invoicePaymentStoppedProfileImg}</Link>
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

    let formatedCalenderValueUI;
    if (this.state.formatedCalenderValue === "") {
      formatedCalenderValueUI = "Payment";
    } else {
      formatedCalenderValueUI = this.state.formatedCalenderValue;
    }

    let paymentCalender;
    if (this.state.paymentCalender === true) {
      paymentCalender = (
        <div>
          <div className="row paymentCalender">
            <div className="col-6 paymentCalender1">
              <div className="row" style={{ marginLeft: "-8px" }}>
                <div className="col-3 invoiceDarkAdd">
                  <img
                    src={invoicePaymentGreenArow}
                    alt="invoiceAttachDarkArrow"
                  />
                </div>
                <div className="col-9">
                  <h6 className="addInvoiceDark" style={{ color: "#21fefe" }}>
                    Auto Release
                  </h6>
                </div>
              </div>
              <center>
                <img
                  src={invoiceAttachHR}
                  className="invoiceAttachHR"
                  alt="invoiceAttachHR"
                />
              </center>
              <div
                className="row invoiceLightAdd"
                style={{ marginLeft: "-8px" }}
              >
                <div className="col-3 invoiceDarkAdd">
                  <img
                    src={invoicePaymentWightArow}
                    alt="invoiceAttachLightArrow"
                  />
                </div>
                <div className="col-9">
                  <h6
                    className="addInvoiceDark"
                    style={{ color: "#fff" }}
                    onClick={() => {
                      this.setState({ formatedCalenderValue: "On Delivery" });
                      this.setState({ paymentCalender: false });
                    }}
                  >
                    Upon Delivery
                  </h6>
                </div>
              </div>
              <center>
                <button
                  className="paymentButton"
                  onClick={() => {
                    this.handleSelectDate();
                  }}
                >
                  Select Date
                </button>
              </center>
            </div>
            <div className="col-6 paymentCalender2">
              <Calendar
                // activeStartDate={new Date(2017, 0, 1)}
                formatShortWeekday={(locale, date) =>
                  ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
                }
                onChange={(date) => {
                  this.setState({ calenderValue: date });
                  console.log(date);
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    let addInvoice;
    if (this.state.handleAddInvoice === true) {
      addInvoice = (
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <div className="resolutionOptionstoggle invoiceAdd">
              <div className="row">
                <div className="col-3 invoiceDarkAdd">
                  <img
                    src={invoiceAttachDarkArrow}
                    alt="invoiceAttachDarkArrow"
                  />
                </div>
                <div className="col-9">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      this.onInvoiceFileSelect(e);
                      this.state.handleAddInvoice = false;
                    }}
                    style={{ display: "none" }}
                    id="invoiceFIleAttach"
                    name="file"
                  />

                  <h6
                    className="addInvoiceDark"
                    onClick={() => {
                      document.getElementById("invoiceFIleAttach").click();
                    }}
                  >
                    Attach Invoice
                  </h6>
                </div>
              </div>
              <center>
                <img
                  src={invoiceAttachHR}
                  className="invoiceAttachHR"
                  alt="invoiceAttachHR"
                />
              </center>
              <div className="row invoiceLightAdd">
                <div className="col-3 invoiceDarkAdd">
                  <img
                    src={invoiceAttachLightArrow}
                    alt="invoiceAttachLightArrow"
                  />
                </div>
                <div className="col-9">
                  <h6 className="addInvoiceDark" style={{ color: "#4D4D4D" }}>
                    Create Invoice
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    let invoiceUnPaidSearchBtn;
    invoiceUnPaidSearchBtn = (
      <div
        id="invoiceUnpaidSearch"
        style={{ display: "none", marginTop: "-8px" }}
      >
        {/* <div id="invoiceUnpaidSearch" style={{ display: 'inherit', marginTop: '-8px' }}> */}

        <div className="row">
          <div className="col-6">
            <div className="profileBox">
              <div className="profileBoxHeader">
                <span style={{ position: "absolute" }}>No:</span>
                <p style={{ textAlign: "end" }}>#260018</p>
              </div>

              <div className="profileBoxBody">
                <span>
                  <b>ABC Supplies</b>
                </span>
                <br />
                <span>ABC Street</span>
                <br />
                <span>Newtown 3709</span>
                <br />
                <br />
                <h6 style={{ color: "#c62127" }}>Construction Work</h6>
                <h6>
                  Total <span style={{ color: "lightgrey" }}>.</span>$1234.56USD
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
                <img src={invoiceUnpaidAlarm} alt="invoiceUnpaidAlarm" />
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
                this.setState({ invoiceOrderHistoryBtn: true });
                document.getElementById("contractSelected").style.display =
                  "none";
                document.getElementById("resolutionSelected").style.display =
                  "inherit";
                document.getElementById("ViewAddNote").style.display = "none";
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
                this.setState({ invoiceOrderHistoryBtn: true });
                document.getElementById("resolutionSelected").style.display =
                  "none";
                document.getElementById("contractSelected").style.display =
                  "inherit";
                document.getElementById("ViewAddNote").style.display = "none";
              }}
            >
              <div className="col-4">
                <img src={invoiceUnpaidContract} alt="invoiceUnpaidContract" />
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
                this.setState({ invoiceOrderHistoryBtn: true });
                document.getElementById("resolutionSelected").style.display =
                  "none";
                document.getElementById("ViewAddNote").style.display =
                  "inherit";
                document.getElementById("contractSelected").style.display =
                  "none";
              }}
            >
              <div className="col-4">
                <img src={invoiceUnpaidEdit} alt="invoiceUnpaidEdit" />
              </div>
              <div className="col-8" style={{ color: "#32C764" }}>
                View / Add
                <br />
                Notes
              </div>
            </div>
          </div>
        </div>

        <div
          id="resolutionSelected"
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
                this.setState({ invoiceOrderHistoryBtn: false });
                document.getElementById("contractSelected").style.display =
                  "none";
                document.getElementById("resolutionSelected").style.display =
                  "none";
              }}
            >
              <img src={invoiceAddNoteCross} alt="invoiceAddNoteCross" />
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
          id="ViewAddNote"
          className="InvoiceAddNote"
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
                    <span style={{ fontSize: "14px", fontWeight: "normal" }}>
                      provide feedback to Seller
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-3"
              onClick={() => {
                this.setState({ invoiceOrderHistoryBtn: false });
                document.getElementById("contractSelected").style.display =
                  "none";
                document.getElementById("resolutionSelected").style.display =
                  "none";
                document.getElementById("ViewAddNote").style.display = "none";
              }}
            >
              <img src={invoiceAddNoteCross} alt="invoiceAddNoteCross" />
            </div>
          </div>
          <div className="ResolutionSelectedBodyTxt">
            <h3>
              <b>18/02/20222</b>
            </h3>
            <textarea className="viewAddNoteTexterea" name="" id=""></textarea>

            <center>
              <button
                className="addNoteBtn"
                onClick={() => {
                  this.setState({ invoiceOrderHistoryBtn: false });
                  document.getElementById("contractSelected").style.display =
                    "none";
                  document.getElementById("resolutionSelected").style.display =
                    "none";
                  document.getElementById("ViewAddNote").style.display = "none";
                }}
              >
                Send Message
              </button>
            </center>
          </div>
        </div>

        <div
          id="contractSelected"
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
                this.setState({ invoiceOrderHistoryBtn: false });
                document.getElementById("contractSelected").style.display =
                  "none";
                document.getElementById("resolutionSelected").style.display =
                  "none";
                document.getElementById("ViewAddNote").style.display = "none";
              }}
            >
              <img src={invoiceAddNoteCross} alt="invoiceAddNoteCross" />
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

        {invoiceOrderHistoryBtn}
      </div>
    );

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
        {/* <div className="topNavLinks" >
                    <div className="row iconNav">
                        <div className="col-3">
                            <p className="alignCenter activeImg activeImgInvoice">
                                <Link to={{ pathname: '/Invoice' }}>
                                    <img
                                        src={invoice}
                                        className='invoiceImg'
                                        alt="invoice.png" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
                                <Link to={{ pathname: '/Resolution' }}>
                                    <img
                                        src={resolution}
                                        className='resolutionImg'
                                        style={{ width: '81px', marginTop: '-1px', marginLeft: '-5px' }}
                                        alt="resolution" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
                                <Link to={{ pathname: '/Contract' }}>
                                    <img
                                        src={contract}
                                        className='contractImg'
                                        alt="contract" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
                                <Link to={{ pathname: '/Wallet' }}>
                                    <img
                                        src={myWallet}
                                        className='mywalletImg'
                                        alt="wallet" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div> */}

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
            <div
              className="invoiceBlackDiv"
              onClick={() => {
                document.getElementById("invoiceOptions").style.display =
                  "none";
                document.getElementById(
                  "invoicePurchaseHistory"
                ).style.display = "inherit";
              }}
            >
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
                        <td>Purchased:</td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td>Unpaid:</td>
                        <td>02</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={invoiceDropdown} alt="invoiceDropdown" />
                </div>
              </div>
            </div>
            <div
              className="invoiceBlackDiv"
              onClick={() => {
                document.getElementById("invoiceOptions").style.display =
                  "none";
                document.getElementById(
                  "invoicePurchaseHistory"
                ).style.display = "inherit";
              }}
            >
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
                        <td>30</td>
                      </tr>
                      <tr>
                        <td>Invoice Unpaid:</td>
                        <td>22</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={invoiceDropdown} alt="invoiceDropdown" />
                </div>
              </div>
            </div>
            <div
              className="invoiceBlackDiv"
              onClick={() => {
                document.getElementById("invoiceOptions").style.display =
                  "none";
                document.getElementById("invoiceBlackContainer").style.display =
                  "inherit";
              }}
            >
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
                        <td>Create a new invoice or upload your PDF Invoice</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 invoiceDropdown">
                  <img src={invoiceDropdown} alt="invoiceDropdown" />
                </div>
              </div>
            </div>
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
          <div id="invoicePurchaseHistory" style={{ display: "none" }}>
            {/* <div id='invoicePurchaseHistory' style={{ display: 'inherit' }}> */}
            <div id="invoicePaidOptions">
              <div className="invoiceBlackDivMainContainer" id="invoiceOptions">
                <p className="invoiceTabsRow">
                  <span>
                    Order History: <span style={{ color: "#059b34" }}>__</span>
                  </span>
                  <span>
                    Unpaid <span style={{ color: "#059b34" }}>__</span>
                  </span>
                  <span
                    style={{ color: "black" }}
                    onClick={() => {
                      document.getElementById(
                        "invoicePaidOptions"
                      ).style.display = "none";
                      document.getElementById(
                        "invoiceOptionsPaid"
                      ).style.display = "inherit";
                    }}
                  >
                    Paid <span style={{ color: "#059b34" }}>__</span>
                  </span>
                  <span style={{ color: "black" }}>Disputes</span>
                </p>
                <div className="invoiceBlackContainer invoiceOrderBlackDiv">
                  {/* <div id="invoiceAllUnpaidBoxes" style={{ display: 'none' }}> */}
                  <div id="invoiceAllUnpaidBoxes">
                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv"
                      style={{ marginTop: "-5px" }}
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img
                            src={invoiceViewYellow}
                            alt="invoiceViewYellow"
                          />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>Mr Smith</b>
                            </p>
                            <p>#22037</p>
                            <p>20/08/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>Unpaid</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchYellow}
                                alt=""
                                onClick={() => {
                                  document.getElementById(
                                    "invoiceAllUnpaidBoxes"
                                  ).style.display = "none";
                                  document.getElementById(
                                    "invoiceUnpaidSearch"
                                  ).style.display = "inherit";
                                }}
                              />
                            </div>
                            <p>
                              <b>Rejected</b>
                            </p>
                            <p>
                              <b>USD $1120.78</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv"
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img
                            src={invoiceViewYellow}
                            alt="invoiceViewYellow"
                          />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>Wong Supplies</b>
                            </p>
                            <p>#220449</p>
                            <p>06/09/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>Unpaid</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchYellow}
                                alt=""
                                onClick={() => {
                                  document.getElementById(
                                    "invoiceAllUnpaidBoxes"
                                  ).style.display = "none";
                                  document.getElementById(
                                    "invoiceUnpaidSearch"
                                  ).style.display = "inherit";
                                }}
                              />
                            </div>
                            <p>
                              <b>Rejected</b>
                            </p>
                            <p>
                              <b>USD $322.00</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p className="colorWhite">
                              <b>XYZ Goods</b>
                            </p>
                            <p className="colorWhite">#223578</p>
                            <p className="colorWhite">12/10/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p className="colorWhite">
                              <b>Unpaid</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchWhite}
                                alt=""
                                onClick={() => {
                                  document.getElementById(
                                    "invoiceAllUnpaidBoxes"
                                  ).style.display = "none";
                                  document.getElementById(
                                    "invoiceUnpaidSearch"
                                  ).style.display = "inherit";
                                }}
                              />
                            </div>
                            <p className="colorWhite">
                              <b>12/10/2022</b>
                            </p>
                            <p className="colorWhite">
                              <b>USD $126.00</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p className="colorWhite">
                              <b>WBP Services</b>
                            </p>
                            <p className="colorWhite">#224580</p>
                            <p className="colorWhite">18/11/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p className="colorWhite">
                              <b>Unpaid</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchWhite}
                                alt=""
                                onClick={() => {
                                  document.getElementById(
                                    "invoiceAllUnpaidBoxes"
                                  ).style.display = "none";
                                  document.getElementById(
                                    "invoiceUnpaidSearch"
                                  ).style.display = "inherit";
                                }}
                              />
                            </div>
                            <p className="colorWhite">
                              <b>Delivery</b>
                            </p>
                            <p className="colorWhite">
                              <b>USD $864.50</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="invoiceUnpaidTotal">
                      <p className="invoiceUnpaidTotalTxt">
                        Total (USD) <span style={{ color: "black" }}>.</span>{" "}
                        $2,512.98
                      </p>
                    </div>
                    {invoiceUnpaidBtn}
                  </div>

                  <div
                    id="invoiceUnpaidSelectedOption"
                    style={{ display: "none" }}
                  >
                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                      style={{ marginTop: "-5px", backgroundColor: "#006633" }}
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>XYZ Goods</b>
                            </p>
                            <p>#223578</p>
                            <p>12/10/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>Unpaid</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchWhite}
                                alt=""
                                onClick={() => {
                                  document.getElementById(
                                    "invoiceAllUnpaidBoxes"
                                  ).style.display = "none";
                                  document.getElementById(
                                    "invoiceUnpaidSearch"
                                  ).style.display = "inherit";
                                }}
                              />
                            </div>
                            <p>
                              <b>12/10/2022</b>
                            </p>
                            <p>
                              <b>USD $126.00</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="selectedOptionTxt">
                      <p>
                        Pay the Gas fee in your wallet and ensure you have
                        sufficient funds in your wallet.
                      </p>
                      <br />
                      <p style={{ color: "white" }}>
                        The Seller will be notified and the status of the
                        invoice will change to "paid" in the Seller's wallet.
                      </p>
                    </div>

                    {invoiceUnpaidSelectedOptionBtn}
                  </div>

                  {invoiceUnPaidSearchBtn}
                </div>
              </div>
            </div>

            <div
              className="invoiceBlackDivMainContainer"
              id="invoiceOptionsPaid"
              style={{ display: "none" }}
            >
              <p className="invoiceTabsRow">
                <span>
                  Order History: <span style={{ color: "#059b34" }}>__</span>
                </span>
                <span
                  style={{ color: "black" }}
                  onClick={() => {
                    document.getElementById(
                      "invoiceOptionsPaid"
                    ).style.display = "none";
                    document.getElementById(
                      "invoicePaidOptions"
                    ).style.display = "inherit";
                  }}
                >
                  Unpaid <span style={{ color: "#059b34" }}>__</span>
                </span>
                <span style={{ color: "white" }}>
                  Paid <span style={{ color: "#059b34" }}>__</span>
                </span>
                <span style={{ color: "black" }}>Disputes</span>
              </p>
              <div className="invoiceBlackContainer invoiceOrderBlackDiv">
                <div id="invoiceUnPaidSection">
                  {/* <div id="invoiceAllUnpaidBoxes" style={{ display: 'none' }}> */}
                  <div id="invoiceAllUnpaidBoxes">
                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                      style={{ marginTop: "-5px" }}
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>Mr Smith</b>
                            </p>
                            <p>#22037</p>
                            <p>20/08/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p style={{ color: "rgb(182, 255, 182)" }}>
                              <b>Pay On:</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchWhite}
                                alt=""
                                onClick={() => {
                                  this.setState({ invoicePaidBtn: true });
                                  document.getElementById(
                                    "invoicePaidSearchBtn"
                                  ).style.display = "inherit";
                                  document.getElementById(
                                    "invoiceUnPaidSection"
                                  ).style.display = "none";
                                }}
                              />
                            </div>
                            <p style={{ color: "rgb(182, 255, 182)" }}>
                              <b>02/11/2022</b>
                            </p>
                            <p>
                              <b>USD $1120.78</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>Wong Supplies</b>
                            </p>
                            <p>#220449</p>
                            <p>06/09/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p style={{ color: "rgb(182, 255, 182)" }}>
                              <b>Pay On:</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchWhite}
                                alt=""
                                onClick={() => {
                                  this.setState({ invoicePaidBtn: true });
                                  document.getElementById(
                                    "invoicePaidSearchBtn"
                                  ).style.display = "inherit";
                                  document.getElementById(
                                    "invoiceUnPaidSection"
                                  ).style.display = "none";
                                }}
                              />
                            </div>
                            <p style={{ color: "rgb(182, 255, 182)" }}>
                              <b>Delivery</b>
                            </p>
                            <p>
                              <b>USD $322.00</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>XYZ Goods</b>
                            </p>
                            <p>#223578</p>
                            <p>12/10/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p style={{ color: "rgb(182, 255, 182)" }}>
                              <b>Pay On:</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchWhite}
                                alt=""
                                onClick={() => {
                                  this.setState({ invoicePaidBtn: true });
                                  document.getElementById(
                                    "invoicePaidSearchBtn"
                                  ).style.display = "inherit";
                                  document.getElementById(
                                    "invoiceUnPaidSection"
                                  ).style.display = "none";
                                }}
                              />
                            </div>
                            <p style={{ color: "rgb(182, 255, 182)" }}>
                              <b>12/10/2022</b>
                            </p>
                            <p>
                              <b>USD $126.00</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      <div className="row">
                        <div className="col-2">
                          <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                        </div>
                        <div className="col-5 invoiceUnpaidProfile">
                          <p className="invoiceUnpaidProfileData">
                            <p>
                              <b>WBP Services</b>
                            </p>
                            <p>#224580</p>
                            <p>18/11/2022</p>
                          </p>
                        </div>
                        <div className="col-5">
                          <p className="invoiceUnpaidProfileData">
                            <p style={{ color: "gold" }}>
                              <b>Payment</b>
                            </p>
                            <div className="invoiceUnpaidSearch">
                              <img
                                src={searchWhite}
                                alt=""
                                onClick={() => {
                                  this.setState({ invoicePaidBtn: true });
                                  document.getElementById(
                                    "invoicePaidSearchBtn"
                                  ).style.display = "inherit";
                                  document.getElementById(
                                    "invoiceUnPaidSection"
                                  ).style.display = "none";
                                }}
                              />
                            </div>
                            <p style={{ color: "gold" }}>
                              <b>Stopped</b>
                            </p>
                            <p>
                              <b>USD $864.50</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="invoiceUnpaidTotal">
                      <p className="invoiceUnpaidTotalTxt">
                        Total (USD) <span style={{ color: "black" }}>.</span>{" "}
                        $2,512.98
                      </p>
                    </div>
                    {invoicepaidOptionsBtn}
                  </div>
                </div>

                <div
                  className="hello"
                  id="invoicePaidSearchBtn"
                  style={{ display: "none" }}
                >
                  <div id="invoiceUnpaidSearch" style={{ marginTop: "-8px" }}>
                    {/* <div id="invoiceUnpaidSearch" style={{ display: 'inherit', marginTop: '-8px' }}> */}

                    <div className="row">
                      <div className="col-6">
                        <div className="profileBox">
                          <div className="profileBoxHeader">
                            <span style={{ position: "absolute" }}>No:</span>
                            <p style={{ textAlign: "end" }}>#260018</p>
                          </div>

                          <div className="profileBoxBody">
                            <span>
                              <b>ABC Supplies</b>
                            </span>
                            <br />
                            <span>ABC Street</span>
                            <br />
                            <span>Newtown 3709</span>
                            <br />
                            <br />
                            <h6 style={{ color: "#c62127" }}>
                              Construction Work
                            </h6>
                            <h6>
                              Total{" "}
                              <span style={{ color: "lightgrey" }}>.</span>
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
                        {invoicePaymentStoppedpayStopPayBtn}
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
                        It may be better to first try and settle the dispute
                        will the seller before stopping payment release.
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

                <div
                  id="invoiceUnpaidSelectedOption"
                  style={{ display: "none" }}
                >
                  <div
                    className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                    style={{ marginTop: "-5px", backgroundColor: "#006633" }}
                    onClick={() => {
                      this.setState({ invoiceUnpaidOrder: true });
                    }}
                  >
                    <div className="row">
                      <div className="col-2">
                        <img src={invoiceViewWhite} alt="invoiceViewYellow" />
                      </div>
                      <div className="col-5 invoiceUnpaidProfile">
                        <p className="invoiceUnpaidProfileData">
                          <p>
                            <b>XYZ Goods</b>
                          </p>
                          <p>#223578</p>
                          <p>12/10/2022</p>
                        </p>
                      </div>
                      <div className="col-5">
                        <p className="invoiceUnpaidProfileData">
                          <p>
                            <b>Unpaid</b>
                          </p>
                          <div className="invoiceUnpaidSearch">
                            <img
                              src={searchWhite}
                              alt=""
                              onClick={() => {
                                document.getElementById(
                                  "invoiceAllUnpaidBoxes"
                                ).style.display = "none";
                                document.getElementById(
                                  "invoiceUnpaidSearch"
                                ).style.display = "inherit";
                              }}
                            />
                          </div>
                          <p>
                            <b>12/10/2022</b>
                          </p>
                          <p>
                            <b>USD $126.00</b>
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="selectedOptionTxt">
                    <p>
                      Pay the Gas fee in your wallet and ensure you have
                      sufficient funds in your wallet.
                    </p>
                    <br />
                    <p style={{ color: "white" }}>
                      The Seller will be notified and the status of the invoice
                      will change to "paid" in the Seller's wallet.
                    </p>
                  </div>

                  {invoiceUnpaidSelectedOptionBtn}
                </div>
              </div>
            </div>
          </div>

          <div
            className="invoiceBlackContainer"
            id="invoiceBlackContainer"
            style={{ display: "none" }}
          >
            <p className="invoiceFirstLine">
              <img
                src={invoiceProfile}
                className="alignStart"
                style={{ float: "left" }}
                alt="walletFirstParaIcon"
              />
              <span className="invoiceFeildsTxt">ABC Services</span>
              <span className="invoiceFirstToken">#180040</span>
              <img
                src={invoiceSetting}
                style={{ marginTop: "2px" }}
                className="floatRight"
                alt="walletGreaterSign"
              />
            </p>

            <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
              <span className="alignStart">
                <img
                  src={invoiceName}
                  alt="mapIcon"
                  style={{ marginTop: "-1px", marginRight: "10px" }}
                />
                <input
                  id="createInvoiceName"
                  type="InvoiceinvoiceFields"
                  className="mutualFriendInput invoiceFields"
                  placeholder="enter customer name"
                />
              </span>
              <span
                className="alignEnd"
                style={{ float: "right", marginRight: "-8px" }}
              >
                <img
                  src={invoiceLink}
                  style={{ marginTop: "0px" }}
                  className="floatRight"
                  alt="walletGreaterSign"
                />
              </span>
            </div>

            <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
              <span className="alignStart">
                <img
                  src={invoiceMap}
                  alt="mapIcon"
                  style={{
                    marginTop: "-1px",
                    marginRight: "11px",
                    marginLeft: "2px",
                  }}
                />
                <input
                  id="createInvoiceAddr"
                  type="InvoiceinvoiceFields"
                  className="mutualFriendInput invoiceFields"
                  placeholder="enter customer address"
                />
              </span>
              <span
                className="alignEnd"
                style={{ float: "right", marginRight: "-8px" }}
              >
                <img
                  src={invoiceLink}
                  style={{ marginTop: "0px" }}
                  className="floatRight"
                  alt="walletGreaterSign"
                />
              </span>
            </div>

            <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
              <span className="alignStart">
                <img
                  src={invoiceEmail}
                  alt="mapIcon"
                  style={{ marginTop: "-1px", marginRight: "10px" }}
                />
                <input
                  id="createInvoiceEmail"
                  type="InvoiceinvoiceFields"
                  className="mutualFriendInput invoiceFields"
                  placeholder="enter customer email"
                />
              </span>
              <span
                className="alignEnd"
                style={{ float: "right", marginRight: "-8px" }}
              >
                <img
                  src={invoiceLink}
                  style={{ marginTop: "0px" }}
                  className="floatRight"
                  alt="walletGreaterSign"
                />
              </span>
            </div>

            <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
              <span className="alignStart">
                <img
                  src={invoiceWallet}
                  alt="mapIcon"
                  style={{
                    marginTop: "-1px",
                    marginRight: "10px",
                    marginLeft: "2px",
                  }}
                />
                <input
                  id="createInvoiceWallet"
                  type="InvoiceinvoiceFields"
                  className="mutualFriendInput invoiceFields"
                  placeholder="enter customer wallet"
                  style={{ width: "65%" }}
                />
              </span>
              <span
                className="alignEnd"
                style={{ float: "right", marginRight: "-8px" }}
              >
                <img
                  src={invoiceLink}
                  style={{ marginTop: "0px" }}
                  className="floatRight"
                  alt="walletGreaterSign"
                />
              </span>
            </div>

            <div className="row">
              <div className="col-6">
                <div
                  className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds"
                  style={{ width: "107%" }}
                  onClick={() => {
                    this.setState({ handleAddInvoice: false });
                    if (this.state.paymentCalender === true) {
                      this.setState({ paymentCalender: false });
                    } else {
                      this.setState({ paymentCalender: true });
                    }
                  }}
                >
                  <span className="alignStart">
                    <img
                      src={invoiceCalender}
                      alt="mapIcon"
                      style={{
                        marginTop: "-1px",
                        marginRight: "10px",
                        marginLeft: "2px",
                      }}
                    />
                    <b style={{ position: "relative", top: "1px" }}>
                      {formatedCalenderValueUI}
                    </b>
                  </span>
                  <span
                    className="alignEnd"
                    style={{ float: "right", marginRight: "-8px" }}
                  >
                    <img
                      src={invoicePaymentArrow}
                      style={{ marginTop: "9px" }}
                      className="floatRight"
                      alt="walletGreaterSign"
                    />
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div
                  className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds"
                  style={{ width: "107%", marginLeft: "-12px" }}
                  onClick={() => {
                    this.setState({ paymentCalender: false });
                    if (this.state.handleAddInvoice === true) {
                      this.setState({ handleAddInvoice: false });
                    } else {
                      this.setState({ handleAddInvoice: true });
                    }
                  }}
                >
                  {attachedInvoice}
                </div>
              </div>
            </div>
            {paymentCalender}
            {addInvoice}
            {invoiceBtn}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
