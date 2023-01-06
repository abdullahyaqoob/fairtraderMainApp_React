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

// Calender
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

class CreateInvoice extends Component {
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
      handleViewPDF: false,
      propHendledData: '',
      userBusinessname: 'Business Name'
    };
  }

  componentDidMount() {
    let propData = this.props.propdata
    if (propData !== undefined) {
      console.log('entered', propData);
      this.setState({ propHendledData: propData })

      document.getElementById("createInvoiceName").value = propData.customername
      document.getElementById("createInvoiceNameOrderName").value = propData.invoiceName
      document.getElementById("createInvoiceAddr").value = propData.customeraddress
      document.getElementById("createInvoiceEmail").value = propData.customeremail
      document.getElementById("createInvoiceAmount").value = propData.Amount
      // this.setState({ ProfileSelectedFileQual: propData.invoicefile })
      this.setState({ formatedCalenderValue: propData.payment })

      // console.log("Selected Image File: ", propData.invoicefile);
      console.log("formatedCalenderValue: ", propData.payment);
    }

    this.userHandleBusinessName();
  }

  userHandleBusinessName = async () => {
    console.log(this.props["props"]);
    console.log(this.props.businessName);
    if (this.props["props"] === undefined) {
      if (this.props.businessName !== undefined) {
        this.setState({ userBusinessname: this.props.businessName })
      } else {
        setTimeout(this.userHandleBusinessName, 250);
      }
    } else {
      if (this.props["props"].userBusinessname.userBusinessname !== "") {
        this.setState({ userBusinessname: this.props["props"].userBusinessname.userBusinessname })
      } else {
        setTimeout(this.userHandleBusinessName, 250);
      }
    }

  }

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
    e.preventDefault();
    // console.log("event", e);
    // this.AllImageFiles = e.target.files;

    if (e.target.files[0].size > 5000000) {
      this.$toasted.error("File size must be smaller than 5 MB");
    } else {
      console.log("Selected Image File: ", e.target.files[0]);
      this.setState({ ProfileSelectedFileQual: e.target.files[0] });
    }
  };

  updateInvoiceHandler = async () => {
    let createInvoiceAmount = document.getElementById("createInvoiceAmount")
      .value;
    let propHendledData = this.state.propHendledData;
    console.log("update", propHendledData);
    if (this.state.ProfileSelectedFileQual === "" || createInvoiceAmount === "" || this.state.formatedCalenderValue === "") {
      this.$toasted.error("Invalid Request");
    } else {
      // requests for sending this selected file

      var formData = new FormData();
      formData.append("orderId", propHendledData.id);
      formData.append("invoiceId", propHendledData.invoiceId);
      formData.append("invoiceAmount", createInvoiceAmount);
      formData.append("invoicefile", this.state.ProfileSelectedFileQual);
      formData.append("payment", this.state.formatedCalenderValue);

      axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "order/orderAndInvoiceEdit",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("File Sended Response: ", res);

          setTimeout(() => {
            window.location = "Invoice";
          }, 2000);

          toast.success("Successfully Invoice Edited", {
            position: "top-right",
          });

        })
        .catch((err) => {
          this.$toasted.error("Invoice file not edited.");
          console.log("error", err);
        });
    }
  }

  createInvoiceHandler = async (e) => {
    console.log('repeated');
    if (this.props["props"].userAccountEmail.userAccountEmail !== "") {
      let createInvoiceName = document.getElementById("createInvoiceName").value;
      let createInvoiceNameOrderName = document.getElementById("createInvoiceNameOrderName").value;
      let createInvoiceAddr = document.getElementById("createInvoiceAddr").value;
      let createInvoiceEmail = document.getElementById("createInvoiceEmail")
        .value;
      let createInvoiceAmount = document.getElementById("createInvoiceAmount")
        .value;

      console.log(
        createInvoiceName,
        createInvoiceNameOrderName,
        createInvoiceAddr,
        createInvoiceEmail,
        createInvoiceAmount
      );
      console.log(this.state.calenderValue);
      console.log("Selected Image File: ", this.state.ProfileSelectedFileQual);

      if (
        createInvoiceEmail === "" ||
        createInvoiceName === "" ||
        createInvoiceNameOrderName === "" ||
        createInvoiceAmount === "" ||
        this.state.formatedCalenderValue === "" ||
        this.state.ProfileSelectedFileQual === ""
      ) {
        toast.error("Please First enter Create Invoice Information", {
          position: "top-right",
        });
      } else {
        let createAddInvoiceFile = this.state.ProfileSelectedFileQual;
        console.log(
          "this.state.formatedCalenderValue",
          this.state.formatedCalenderValue
        );

        // requests for sending this selected file

        let userAccountAddress = this.props["props"].UserAccountAddr
          .userAccountAddr;
        let userAccountEmail = this.props["props"].userAccountEmail
          .userAccountEmail;

        if (userAccountEmail !== "") {
          console.log("addedCorstOrigions");

          var formData = new FormData();
          formData.append("sellerwalletaddress", userAccountAddress);
          formData.append("customername", createInvoiceName);
          formData.append("invoiceName", createInvoiceNameOrderName);
          formData.append("customerAmount", createInvoiceAmount);
          formData.append("customeraddress", createInvoiceAddr);
          formData.append("customeremail", createInvoiceEmail);
          formData.append("sellerEmail", userAccountEmail);
          // formData.append("customerwalletaddress", createInvoiceWallet);
          formData.append("invoicefile", createAddInvoiceFile);
          formData.append("payment", this.state.formatedCalenderValue);
          // this.state.formatedCalenderValue

          axios({
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
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "X-Requested-With, Content-Type, X-Token-Auth,Authorization",
              "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              console.log("profileImgProgress", this.state.profileImgProgress);
              console.log("File Sended Response: ", res);
              localStorage.setItem(
                userAccountAddress + "invoiceId",
                res.data.invoiceId
              );

              setTimeout(() => {
                window.location = "Resolution";
              }, 1000);

              toast.success("Successfully Invoice Created", {
                position: "top-right",
              });

              // alert("Success, Go to Resolution Tab")
            })
            .catch((err) => {
              // this.$toasted.error("Cannot able to attach this file.");
              console.log("error", err);
              // this.fileSelectionLoading = false;
            });
        } else {
          console.log(this.props["props"].userAccountEmail
            .userAccountEmail);
          console.log("seller email is null");
        }
      }
    } else {
      window.location.reload()
      setTimeout(() => {
        toast.warning('Error in Invoice, Please create again')
      }, 2000);
    }
  };

  render() {
    let formatedCalenderValueUI;
    if (this.state.formatedCalenderValue === "") {
      formatedCalenderValueUI = "Payment";
    } else {
      formatedCalenderValueUI = this.state.formatedCalenderValue;
    }

    let attachedInvoice;
    if (this.state.ProfileSelectedFileQual === "") {
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
    } else if (this.state.ProfileSelectedFileQual !== "") {
      invoiceBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              onClick={() => this.setState({ ProfileSelectedFileQual: "" })}
              src={invoiceDelete}
              alt="mapIcon"
            />
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => {
                this.setState({ handleViewPDF: true });
                document.getElementById("invoiceBLackContainer").style.display =
                  "none";
              }}
              style={{ width: "200px" }}
            >
              View PDF
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            {this.state.propHendledData === '' ?
              <img
                src={invoiceNextResolution}
                onClick={() => this.createInvoiceHandler()}
                className="floatRight"
                alt="walletGreaterSign"
              />
              : <img
                src={invoiceNextResolution}
                onClick={() => this.updateInvoiceHandler()}
                className="floatRight"
                alt="walletGreaterSign"
              />}
          </span>
        </div>
      );
    } else {
      invoiceBtn = (
        <div className="selectResolutionDIv">
          <div className="selectResolutionBtnDiv">
            <p className="selectResolutionBtn alignCenter">Enter Information</p>
          </div>
        </div>
      );
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
                  <h6
                    className="addInvoiceDark"
                    style={{ color: "#21fefe" }}
                    onClick={() => {
                      this.setState({ formatedCalenderValue: "Payment" });
                      // this.setState({ formatedCalenderValue: "On Delivery" });
                      // this.setState({ paymentCalender: false });
                    }}
                  >
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
            {this.state.formatedCalenderValue === "On Delivery" ? (
              ""
            ) : (
              <div className="col-6 paymentCalender2" id="paymentCalenderBox">
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
            )}
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
        {/* {this.state.handleViewPDF === false ? */}
        <div
          className="handleMainPage"
          id="InvoiceTabBody"
          style={{ height: "680px", width: "100%" }}
        >
          {this.state.handleViewPDF === true ? (
            <div className="viewPDFContainer" style={{ height: "70vh" }}>
              <div
                className="invoicePDFCloss"
                onClick={() => {
                  this.setState({ handleViewPDF: false });
                  document.getElementById(
                    "invoiceBLackContainer"
                  ).style.display = "initial";
                }}
              >
                <span>X</span>
              </div>
              <img src={invoiceDummyPDF} alt="invoiceDummyPDF" />

              {/* <img src={invoiceDelete} onClick={() => { this.handleClossPDF() }} className='invoicePDFCloss' alt="invoiceDelete" /> */}
            </div>
          ) : (
            ""
          )}

          <div id="invoiceBLackContainer">
            <div className="invoiceBlackContainer createInvoiceBlackContainer createInvoiceBlackContainerMain" id="invoiceBlackContainer">
              <p className="invoiceFirstLine">
                <img
                  src={invoiceProfile}
                  className="alignStart"
                  style={{ float: "left" }}
                  alt="walletFirstParaIcon"
                />
                <span className="invoiceFeildsTxt">{this.state.userBusinessname}</span>
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
                  {this.state.propHendledData === '' ?
                    <input
                      id="createInvoiceName"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter customer name"
                    /> : <input
                      id="createInvoiceName"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter customer name"
                      disabled
                    />}


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
                    src={invoiceName}
                    alt="mapIcon"
                    style={{ marginTop: "-1px", marginRight: "10px" }}
                  />
                  {this.state.propHendledData === '' ?
                    <input
                      id="createInvoiceNameOrderName"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter invoice name"
                    /> : <input
                      id="createInvoiceNameOrderName"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter invoice name"
                      disabled
                    />}


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

                  {this.state.propHendledData === '' ?
                    <input
                      id="createInvoiceAddr"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter customer address"
                    /> : <input
                      id="createInvoiceAddr"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter customer address"
                      disabled
                    />}



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

                  {this.state.propHendledData === '' ?
                    <input
                      id="createInvoiceAmount"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="Amount in BNB"
                    /> :
                    <input
                      id="createInvoiceAmount"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="Amount in BNB"
                    />}



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
                  {this.state.propHendledData === '' ?
                    <input
                      id="createInvoiceEmail"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter customer email"
                    /> :
                    <input
                      id="createInvoiceEmail"
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="enter customer email"
                      disabled
                    />}
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

              {/* <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds">
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
            </div> */}

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
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default CreateInvoice;
