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
import action from "../../../Images/Invoice/action.png";
import navMessage from "../../../Images/Menu/navMessage.png";
import invoiceBack from "../../../Images/Invoice/invoiceBack.png";
import invoiceUnpaidReject from "../../../Images/Invoice/invoiceUnpaidReject.png";
import mediatorSearch from "../../../Images/resolutionMediator/mediatorSearch.png";

import judgeCaseAddedFile from "../../../Images/Invoice/judgeCaseAddedFile.png";
import judgeCaseViewExample from "../../../Images/Invoice/judgeCaseViewExample.png";
import judgeCaseAdd from "../../../Images/Invoice/judgeCaseAdd.png";
import judgeCaseEdit from "../../../Images/Invoice/judgeCaseEdit.png";
import judgeCaseBlackDropdown from "../../../Images/Invoice/judgeCaseBlackDropdown.png";
import searchRed from "../../../Images/Invoice/searchRed.png";
import invoiceUnpaidResolutionYellow from "../../../Images/Invoice/invoiceUnpaidResolutionYellow.png";
import invoiceUnpaidContract from "../../../Images/Invoice/invoiceUnpaidContract.png";
import overdueTasksAddNote from "../../../Images/Invoice/overdueTasksAddNote.png";
import invoiceUnpaidAlarm from "../../../Images/Invoice/invoiceUnpaidAlarm.png";
import resolutionSelectedResolution from "../../../Images/Invoice/resolutionSelectedResolution.png";
import Attension from "../../../Images/Invoice/Attension.png";
import invoiceAddNoteCross from "../../../Images/Invoice/invoiceAddNoteCross.png";
import invoiceContractDocuments from "../../../Images/Invoice/invoiceContractDocuments.png";
import invoiceContractDocumentsTerms from "../../../Images/Invoice/invoiceContractDocumentsTerms.png";
import invoiceContractDocumentsOther from "../../../Images/Invoice/invoiceContractDocumentsOther.png";
import invoiceAddNote from "../../../Images/Invoice/invoiceAddNote.png";
import invoiceTransactionHistory from "../../../Images/Invoice/invoiceTransactionHistory.png";
import invoicePaymentStopped from "../../../Images/Invoice/invoicePaymentStopped.png";
import overdueTasksBack from "../../../Images/Invoice/overdueTasksBack.png";
import addFeeEdit from "../../../Images/Invoice/addFeeEdit.png";
import medResRes from "../../../Images/Invoice/medResRes.png";
import medResNewCasesSearch from "../../../Images/Invoice/medResNewCasesSearch.png";
import medResNewCasesReject from "../../../Images/Invoice/medResNewCasesReject.png";
import sendMessageCancel from "../../../Images/Invoice/sendMessageCancel.png";
import sendMessageAdd from "../../../Images/Invoice/sendMessageAdd.png";
import addedFilesSndMessage from "../../../Images/Invoice/addedFilesSndMessage.png";

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
      // furtherDetail: "judgeCase",
      furtherDetail: false,
      jobSelected: false,
      invoicePaidBtn: true,
      whoPaysServiceFee: false,
      whoPaysServiceFeeTxt: "",
      judgeCaseBuyerReceive: false,
      magnifierViewUserViewPDF: false,
      judgeCaseBuyerReceiveValue: "100%",
      caseHistoryAllData: '',
      selectedJob: '',
      allChatOfBuyerSellerMediator: '',
      allMessages: '',
      mediatorSendMsgTo: 'Seller',
      userAccountEmail: ''
    };
  }
  async componentWillMount() {
    this.userAddressHandle();
  }

  handleNumberHours(e) {
    if (e.target.value > 99 || e.target.value === 0) {
      toast.error("Response time must be between 0-99", {
        position: "top-right",
      });
      this.handleNumberHoursRef.value = "";
    }
  }
  formatTheCreatedAtDate(e) {
    let newDateDate = new Date(e).toLocaleString()
    return newDateDate.substring(0, 10)
  }
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
      this.setState({ userAccountEmail: connectedUserEmail })

      axios
        .post(`${process.env.REACT_APP_BASE_URL}mediate/caseHistory`, {
          mediatorEmail: connectedUserEmail
        })

        .then((res) => {
          console.log(res);
          this.setState({ caseHistoryAllData: res.data })
          console.log(this.state.caseHistoryAllData);
        }).catch((err) => {
          console.log(err);
        })
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  };

  async takeAllChatOfBuyerSellerMediator() {
    if (this.state.selectedJob === "") {
      setTimeout(() => {
        this.takeAllChatOfBuyerSellerMediator()
      }, 250);
    } else {
      console.log(this.state.selectedJob);

      let allMessagesWithoutFilter;
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}message/getAllSecondPersonEmailsMessages`, {
          orderId: this.state.selectedJob.id
        })

        .then((res) => {
          let respData = res.data

          console.log(respData);



          respData.sort(function (a, b) { return a.id - b.id });
          allMessagesWithoutFilter = respData;

          this.setState({ allChatOfBuyerSellerMediator: allMessagesWithoutFilter })

        }).catch((err) => {
          console.log(err);
        })

      // await axios
      //   .post(`${process.env.REACT_APP_BASE_URL}message/getMedEmailForMsg`, {
      //     mediatorId: this.state.selectedJob.mediator
      //   })

      //   .then((res) => {
      //     console.log(res.data);
      //     this.setState({ mediatorEmail: res.data })

      //     let answerOfMap = [];
      //     let userAccountEmail = this.state.userAccountEmail;
      //     if (userAccountEmail !== res.data) {
      //       allMessagesWithoutFilter.map(function (value, index) {
      //         if (value.senderEmail === userAccountEmail || value.receiverEmail === userAccountEmail) {
      //           answerOfMap.push(value)
      //         }
      //       })
      //       this.setState({ allMessages: answerOfMap })
      //     } else {
      //     this.setState({ allMessages: allMessagesWithoutFilter })
      //   }
      //   }).catch((err) => {
      //     console.log(err);
      //   })


      // axios
      //   .post(`${process.env.REACT_APP_BASE_URL}message/getMedEmailForMsg`, {
      //     mediatorId: this.state.selectedJob.mediator
      //   })
      //   .then(async (res) => {
      //     console.log(res.data);

      //     let buyerSellerChat;
      //     let mediatorSellerChat;
      //     let mediatorCustomerChat;

      //     await axios
      //       .post(`${process.env.REACT_APP_BASE_URL}message/getAllSecondPersonEmailsMessages`, {
      //         istEmail: this.state.selectedJob.sellerEmail,
      //         secEmail: this.state.selectedJob.customeremail,
      //       })

      //       .then((res) => {
      //         console.log(res.data);
      //         buyerSellerChat = res.data
      //       }).catch((err) => {
      //         console.log(err);
      //       })

      //     await axios
      //       .post(`${process.env.REACT_APP_BASE_URL}message/getAllSecondPersonEmailsMessages`, {
      //         istEmail: this.state.selectedJob.sellerEmail,
      //         secEmail: res.data,
      //       })

      //       .then((res) => {
      //         console.log(res.data);
      //         mediatorSellerChat = res.data
      //       }).catch((err) => {
      //         console.log(err);
      //       })


      //     await axios
      //       .post(`${process.env.REACT_APP_BASE_URL}message/getAllSecondPersonEmailsMessages`, {
      //         istEmail: this.state.selectedJob.customeremail,
      //         secEmail: res.data,
      //       })

      //       .then((res) => {
      //         console.log(res.data);
      //         mediatorCustomerChat = res.data
      //       }).catch((err) => {
      //         console.log(err);
      //       })

      //     Array.prototype.push.apply(buyerSellerChat, mediatorSellerChat, mediatorCustomerChat);

      //     buyerSellerChat.sort(function (a, b) { return a.id - b.id });
      //     console.log(buyerSellerChat);

      //     this.setState({ allChatOfBuyerSellerMediator: buyerSellerChat })

      //   }).catch((err) => {
      //     console.log(err);
      //   })
    }
  }

  caseHistoryFeePayHandle(e) {
    this.setState({ whoPaysServiceFeeTxt: e });
    this.setState({ whoPaysServiceFee: false });
  }
  caseHistoryJudgeCaseBuyerReceiveHanlder(e) {
    this.setState({ judgeCaseBuyerReceiveValue: e });
    this.setState({ judgeCaseBuyerReceive: false });
  }
  handleMediatorSndMsg() {
    let mediatorMsg = document.getElementById("SendMessageTxtareaForMed").value;
    let selectedJob = this.state.selectedJob;
    let mediatorSendMsgTo = this.state.mediatorSendMsgTo;

    if (mediatorMsg !== "") {

      let receiverEmail;
      if (mediatorSendMsgTo === "Seller") {
        receiverEmail = selectedJob.sellerEmail
      } else if (mediatorSendMsgTo === "Buyer") {
        receiverEmail = selectedJob.customeremail
      }

      axios
        .post(`${process.env.REACT_APP_BASE_URL}message/mediatorSendMsg`, {
          senderEmail: this.state.userAccountEmail,
          receiverEmail: receiverEmail,
          message: mediatorMsg,
          orderId: selectedJob.id
        })
        .then((res) => {
          toast.success(`Message Sent to ${mediatorSendMsgTo}`, {
            position: "top-right",
          });
          document.getElementById("SendMessageTxtareaForMed").value = ""
        }).catch((err) => {
          console.log(err);
        })
    } else {
      toast.error("First type some message", {
        position: "top-right",
      });
    }
  }
  // SendMessageTxtareaForMed
  render() {

    let magnifierViewUserUI;
    if (this.state.magnifierViewUserViewPDF === false) {
      magnifierViewUserUI = (
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
                      #{this.state.selectedJob.id}
                    </p>
                  </div>

                  <div className="profileBoxBody">
                    <span>
                      {/* <b>{this.state.magnifierViewUser.customername}</b> */}
                      <b>{this.state.selectedJob.customername}</b>
                    </span>
                    <br />
                    <span>
                      <b>{this.state.selectedJob.customeraddress}</b>
                      {/* {this.state.magnifierViewUser.customeraddress} */}
                    </span>
                    <br />
                    <span>Newtown 3709</span>
                    <br />
                    <br />
                    <h6 style={{ color: "#c62127" }}>
                      {this.state.selectedJob.mediatorIndustry} Work
                    </h6>
                    <h6>
                      Total{" "}
                      <span style={{ color: "lightgrey" }}>.</span>
                      ${this.state.selectedJob.Amount}USD
                    </h6>
                  </div>
                  <div className="profileBoxBottom"
                    onClick={() => {
                      this.setState({ magnifierViewUserViewPDF: true });
                    }}>
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
                    {this.state.selectedJob.payment}
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
            {this.state.invoicePaidBtn === true ?
              <div style={{ fontSize: "15px", marginLeft: '5px', lineHeight: '10px', marginTop: '10px' }}>
                <div className="row">
                  <div className="col-4">
                    <p><b>Seller:</b></p>
                  </div>
                  <div className="col-5">
                    <p>{this.state.selectedJob.sellerEmail}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Country:</p>
                  </div>
                  <div className="col-5">
                    <p>{this.state.selectedJob.customeraddress}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Trust Score:</p>
                  </div>
                  <div className="col-5">
                    <p>88%</p>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <p><b>Buyer:</b></p>
                  </div>
                  <div className="col-5">
                    <p>{this.state.selectedJob.customeremail}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Country:</p>
                  </div>
                  <div className="col-5">
                    <p>{this.state.selectedJob.customeraddress}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Trust Score:</p>
                  </div>
                  <div className="col-5">
                    <p>88%</p>
                  </div>
                </div>
              </div>
              : ""}
            {this.state.invoicePaidBtn === true ?
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
                      this.setState({ furtherDetail: "judgeCase" });
                    }}
                    style={{ width: "200px" }}
                  >
                    Judge Case
                  </p>
                </span>
                <span className="alignEnd" style={{ float: "right" }}>
                  <Link to={{ pathname: "" }}>
                    <img
                      src={action}
                      className="floatRight"
                      alt="action"
                      onClick={() => {
                        this.setState({ furtherDetail: "secAction" });
                      }}
                    />
                  </Link>
                </span>
              </div>
              : ""}
          </div>
        </div>
      )

    } else if (this.state.magnifierViewUserViewPDF === "contractTerms") {
      magnifierViewUserUI = (
        <div className="MagnifierViewPDFIFrame">
          <span
            onClick={() => {
              this.setState({ magnifierViewUserViewPDF: true });
            }}
          >
            X
          </span>
          <iframe
            src={`${process.env.REACT_APP_BASE_URL}${this.state.selectedNewCase.termsandconditionsfile}`}
            height="500px"
            width="100%"
          />
        </div>
      );
    } else if (
      this.state.magnifierViewUserViewPDF === "contractProductCondition"
    ) {
      magnifierViewUserUI = (
        <div className="MagnifierViewPDFIFrame">
          <span
            onClick={() => {
              this.setState({ magnifierViewUserViewPDF: true });
            }}
          >
            X
          </span>
          <iframe
            src={`${process.env.REACT_APP_BASE_URL}${this.state.selectedJob.attachfiles}`}
            height="500px"
            width="100%"
          />
        </div>
      );
    } else if (this.state.magnifierViewUserViewPDF === "contractReturnPolicy") {
      magnifierViewUserUI = (
        <div className="MagnifierViewPDFIFrame">
          <span
            onClick={() => {
              this.setState({ magnifierViewUserViewPDF: true });
            }}
          >
            X
          </span>
          <iframe
            src={`${process.env.REACT_APP_BASE_URL}${this.state.selectedJob.warrantyfile}`}
            height="500px"
            width="100%"
          />
        </div>
      );
    } else if (this.state.magnifierViewUserViewPDF === "contractViewOthers") {
      magnifierViewUserUI = (
        <div className="MagnifierViewPDFIFrame">
          <span
            onClick={() => {
              this.setState({ magnifierViewUserViewPDF: true });
            }}
          >
            X
          </span>
          <iframe
            src={`${process.env.REACT_APP_BASE_URL}${this.state.selectedJob.invoicefile}`}
            height="500px"
            width="100%"
          />
        </div>
      );
    } else {
      magnifierViewUserUI = (
        <div className="MagnifierViewPDFIFrame">
          <span
            onClick={() => {
              this.setState({ magnifierViewUserViewPDF: false });
            }}
          >
            X
          </span>
          <iframe
            src={`${process.env.REACT_APP_BASE_URL}${this.state.selectedJob.invoicefile}`}
            height="500px"
            width="100%"
          />
        </div>
      );
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
                <p>Overdue</p>
                <p style={{ color: "white" }}>To Action</p>
                <p>Newest</p>
                <p>Oldest</p>
              </div>
              {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
              <div
                className="invoiceBlackDivMainContainer overdueTaskContainer"
                id="invoiceOptions"
                style={{ display: "inherit" }}
              >
                <div className="respondAllTxt">
                  {this.state.caseHistoryAllData.length !== 0 ?
                    <p style={{ color: "#00ccff" }}>
                      There are {this.state.caseHistoryAllData.length} Active cases
                    </p>
                    :
                    <p style={{ color: "#00ccff" }}>
                      There are 0 Active cases
                    </p>

                  }
                  {/* There are new jobs waiting fro you */}
                </div>
                {/* <Link to={{ pathname: "/PurchaseHistory" }}> */}

                {this.state.caseHistoryAllData.length !==
                  0 ?
                  <div>
                    {this.state.caseHistoryAllData.map((value, index) => (
                      <div
                        className="attentionRedDiv medResBlueDIv caseHistoryHoverRed"
                        onClick={() => {
                          this.setState({ jobSelected: true })
                          this.setState({ selectedJob: value })
                        }}
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
                                  <th>Case: #{value.id}</th>
                                </tr>
                                <tr>
                                  <td>Reply to Seller</td>
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
                                this.takeAllChatOfBuyerSellerMediator()

                                this.setState({ furtherDetail: true });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  : (
                    <div
                      className="attentionRedDiv medResBlueDIv"
                      style={{ marginTop: "-5px" }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          paddingTop: "28px",
                        }}
                      >
                        Sorry, You have no records
                      </h2>
                    </div>
                  )}

                <div className="selectResolutionDIv invoiceThreeBtnDiv">
                  <span className="alignStart">
                    <Link to={{ pathname: "/MedResolution" }}>
                      <img src={invoiceBack} alt="invoiceBack" />
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ) : this.state.furtherDetail === true ? (
            <>
              <div className="overdueTasksOrderTxt">
                <p>Case: #{this.state.selectedJob.id}</p>
                <p
                  style={{ color: "white" }}
                  onClick={() => {
                    this.setState({ furtherDetail: "firstAction" });
                  }}
                >
                  Case History
                </p>
              </div>
              <div
                className="invoiceBlackContainer invoiceOrderBlackDiv"
                style={{ marginTop: "-10px" }}
              >
                {magnifierViewUserUI}

              </div>
            </>
          ) : this.state.furtherDetail === "firstAction" ? (
            <>
              <div className="overdueTasksOrderTxt">
                <p>Case: #{this.state.selectedJob.id}</p>
                <p style={{ color: "white" }}>Case History</p>
              </div>
              <div
                className="invoiceBlackContainer invoiceOrderBlackDiv caseHistoryContainer"
                style={{ marginTop: "-10px", paddingTop: "-20px" }}
              >

                {this.state.allChatOfBuyerSellerMediator.length !== 0 ?
                  <div>
                    {this.state.allChatOfBuyerSellerMediator.map((val, i) => (
                      <>
                        {this.state.selectedJob.sellerEmail === val.senderEmail ?
                          <div className="messageSenderSellToBuy">
                            {val.mediatorInvolved === "1" && this.state.selectedJob.sellerEmail === val.senderEmail ?
                              <h5>{this.formatTheCreatedAtDate(val.createdAt)} Seller to <span style={{ color: 'red' }}>Mediator</span></h5>
                              : val.mediatorInvolved === "1" && this.state.selectedJob.customeremail === val.senderEmail ?
                                <h5>{this.formatTheCreatedAtDate(val.createdAt)} Buyer to <span style={{ color: 'red' }}>Mediator</span></h5>
                                : val.mediatorInvolved === "1" && this.state.selectedJob.sellerEmail !== val.senderEmail && this.state.selectedJob.customeremail === val.receiverEmail ?
                                  <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Buyer</h5>
                                  : val.mediatorInvolved === "1" && this.state.selectedJob.customeremail !== val.senderEmail ?
                                    <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Seller</h5>
                                    :
                                    <h5>{this.formatTheCreatedAtDate(val.createdAt)} Seller to Buyer</h5>
                            }
                            <h3>{val.message}</h3>
                          </div>
                          : <div className="messageSenderBuyToSell">
                            {val.mediatorInvolved === "1" && this.state.selectedJob.sellerEmail === val.senderEmail ?
                              <h5>{this.formatTheCreatedAtDate(val.createdAt)} Seller to <span style={{ color: 'red' }}>Mediator</span></h5>
                              : val.mediatorInvolved === "1" && this.state.selectedJob.customeremail === val.senderEmail ?
                                <h5>{this.formatTheCreatedAtDate(val.createdAt)} Buyer to <span style={{ color: 'red' }}>Mediator</span></h5>
                                : val.mediatorInvolved === "1" && this.state.selectedJob.sellerEmail !== val.senderEmail && this.state.selectedJob.customeremail === val.receiverEmail ?
                                  <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Buyer</h5>
                                  : val.mediatorInvolved === "1" && this.state.selectedJob.customeremail !== val.senderEmail ?
                                    <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Seller</h5>
                                    :
                                    <h5>{this.formatTheCreatedAtDate(val.createdAt)} Buyer to Seller</h5>
                            }
                            <h3>{val.message}</h3>
                          </div>
                        }
                      </>
                    ))}
                  </div>
                  : ""}

                {/* <div style={{ marginTop: "-25px", color: "rgb(102, 255, 0)" }}>
                  <h6>12/01/2022 Buyer to Mediator</h6>

                  <p>
                    Please help. Seller stopped taking my calls and will not
                    come to work. The job is half ﬁnished please see attached
                    photos.
                  </p>
                </div>
                <div style={{ color: "yellow" }}>
                  <div className="flexSpaceBtw">
                    <h6>12/01/2022 Buyer to Mediator</h6>
                    <h6 className="caseHistoryFirstActionRightTxt">- 03hr</h6>
                  </div>
                  <p>
                    Please help. Seller stopped taking my calls and will not
                    come to work. The job is half ﬁnished please see attached
                    photos.
                  </p>
                </div>
                <div style={{ color: "rgb(255, 0, 119)" }}>
                  <div className="flexSpaceBtw">
                    <h6>12/01/2022 Buyer to Mediator</h6>
                    <h6>- 03hr</h6>
                  </div>

                  <p>
                    Please help. Seller stopped taking my calls and will not
                    come to work. The job is half ﬁnished please see attached
                    photos.
                  </p>
                </div> */}



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
                    onClick={() => {
                      this.setState({ furtherDetail: "judgeCase" });
                    }}
                    // style={{ width: "200px", borderColor: "#1A9AFE", color: '#1A9AFE' }}
                    style={{ width: "200px" }}
                  >
                    Judge Case
                  </p>
                </span>
                <span className="alignEnd" style={{ float: "right" }}>
                  <Link to={{ pathname: "" }}>
                    <img
                      src={action}
                      className="floatRight"
                      alt="action"
                      onClick={() => {
                        this.setState({ furtherDetail: "secAction" });
                      }}
                    />
                  </Link>
                </span>
              </div>
            </>
          ) : this.state.furtherDetail === "secAction" ? (
            <>
              <div>
                <div className="overdueTasksOrderTxt">
                  <p style={{ color: "white" }}>Case: #{this.state.selectedJob.id}</p>
                  <p
                    onClick={() => {
                      this.setState({ furtherDetail: "firstAction" });
                    }}
                  >
                    Case History
                  </p>
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
                      style={{ color: "white" }}
                      onClick={() => {
                        this.setState({
                          furtherDetail: "furtherDetailSndMessage",
                        });
                      }}
                    >
                      <span className="smallerThanSign">{">"}</span>{" "}
                      <span>Send Message</span>
                    </span>
                    <hr className="furtherDetailHR" />
                    <span
                      onClick={() => {
                        this.setState({
                          furtherDetail: "furtherDetailAddFee",
                        });
                      }}
                    >
                      <span className="smallerThanSign">{">"}</span>{" "}
                      <span>Add Fee for service</span>
                    </span>
                    <br />
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
                          src={invoiceUnpaidReject}
                          className="floatRight"
                          alt="invoiceUnpaidReject"
                        />
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : this.state.furtherDetail === "furtherDetailSndMessage" ? (
            <div>
              <div className="overdueTasksOrderTxt">
                <p style={{ color: "white" }}>Case: #{this.state.selectedJob.id}</p>
                <p
                  onClick={() => {
                    this.setState({ furtherDetail: "firstAction" });
                  }}
                >
                  Case History
                </p>
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

                    {this.state.mediatorSendMsgTo === "Buyer" ?
                      <>
                        <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Seller" }) }} className="smallerThanSign">{">"}</span>{" "}
                        <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Seller" }) }}>Send Message to Seller</span>
                      </>
                      :
                      <>
                        <span style={{ color: 'white' }} className="smallerThanSign">{">"}</span>{" "}
                        <span style={{ color: 'white' }}>Send Message to Seller</span>
                      </>
                    }
                  </span>
                  <hr className="furtherDetailHR" />
                  {/* <span className="smallerThanSign">{">"}</span>{" "} */}
                  {this.state.mediatorSendMsgTo === "Seller" ?
                    <>
                      <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Buyer" }) }} className="smallerThanSign">{">"}</span>{" "}
                      <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Buyer" }) }}>Send Message to Buyer</span>
                    </>
                    :
                    <>
                      <span style={{ color: 'white' }} className="smallerThanSign">{">"}</span>{" "}
                      <span style={{ color: 'white' }}>Send Message to Buyer</span>
                    </>
                  }
                  <br />
                  <br />
                  <textarea
                    className="SendMessageTxtarea"
                    name=""
                    id="SendMessageTxtareaForMed"
                  ></textarea>
                  <p className="addDocsTxt">
                    Add document or photos ( 0 of 5 )
                  </p>
                  <div className="attachFIle">
                    <img src={sendMessageAdd} alt="sendMessageAdd" />
                    <img
                      src={addedFilesSndMessage}
                      alt="addedFilesSndMessage"
                    />
                    <img
                      src={addedFilesSndMessage}
                      alt="addedFilesSndMessage"
                    />
                    <img
                      src={addedFilesSndMessage}
                      alt="addedFilesSndMessage"
                    />
                    <img
                      src={addedFilesSndMessage}
                      alt="addedFilesSndMessage"
                    />
                  </div>
                  <br />
                </div>
                <div className="selectResolutionDIv invoiceThreeBtnDiv">
                  <span className="alignStart">
                    <img
                      src={invoiceBack}
                      alt="invoiceBack"
                      onClick={() => {
                        this.setState({ furtherDetail: "secAction" });
                      }}
                    />
                  </span>
                  <span className="invoiceThreeBtn">
                    <p
                      className="selectResolutionBtn alignCenter"
                      style={{ width: "200px" }}
                      onClick={() => { this.handleMediatorSndMsg() }}
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
          ) : this.state.furtherDetail === "furtherDetailAddFee" ? (
            <>
              <div>
                <div className="overdueTasksOrderTxt">
                  <p style={{ color: "white" }}>Case: #{this.state.selectedJob.id}</p>
                  <p
                    onClick={() => {
                      this.setState({ furtherDetail: "firstAction" });
                    }}
                  >
                    Case History
                  </p>
                </div>
                {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
                <div
                  className="invoiceBlackDivMainContainer overdueTaskContainer"
                  id="invoiceOptions"
                  style={{ display: "inherit" }}
                >
                  <div className="furtherDetailCOntainer">
                    <br />
                    <h5 className="addFeeHeadingTxt">Add Fee for service</h5>
                    <div
                      className="addFeeDiv"
                      onClick={() => {
                        this.setState({ whoPaysServiceFee: true });
                      }}
                    >
                      {this.state.whoPaysServiceFeeTxt === "" ? (
                        <h6>Who Pays the service fee?</h6>
                      ) : (
                        <h6>{this.state.whoPaysServiceFeeTxt}</h6>
                      )}
                      <img src={addFeeEdit} alt={addFeeEdit} />
                    </div>
                    {this.state.whoPaysServiceFee === false ? (
                      <>
                        <div className="addFeeDiv">
                          <input
                            placeholder="0"
                            type="addFeeRateInputFeild"
                            name=""
                            id="addFeeRateInputFeild"
                            className="addFeeRateInputFeild"
                            onChange={(e) => {
                              this.handleNumberHours(e);
                            }}
                            ref={(handleNumberHoursRef) =>
                              (this.handleNumberHoursRef = handleNumberHoursRef)
                            }
                          />
                          <p className="addFeeInputPlaceHolder">hrs</p>
                          {/* <img src={} alt={} /> */}
                          <label htmlFor="addFeeRateInputFeild">
                            <img src={addFeeEdit} alt={addFeeEdit} />
                          </label>
                        </div>
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
                      </>
                    ) : (
                      <div
                        className="addFeeBigDiv"
                        style={{ marginBottom: "170px" }}
                      >
                        <span
                          className="sendMsgTxtLine caseHistoryFeePayDiv"
                          onClick={() => {
                            this.caseHistoryFeePayHandle(
                              "Buyer & Seller pay 50% each"
                            );
                          }}
                        >
                          <span className="smallerThanSign">{">"}</span>{" "}
                          <span>Buyer & Seller pay 50% each</span>
                        </span>
                        <hr className="furtherDetailHR" />

                        <span
                          className="sendMsgTxtLine caseHistoryFeePayDiv"
                          onClick={() => {
                            this.caseHistoryFeePayHandle(
                              "Buyer to pay (Seller not responsive)"
                            );
                          }}
                        >
                          <span className="smallerThanSign">{">"}</span>{" "}
                          <span>Buyer to pay (Seller not responsive)</span>
                        </span>
                        <hr className="furtherDetailHR" />

                        <span
                          className="sendMsgTxtLine caseHistoryFeePayDiv"
                          onClick={() => {
                            this.caseHistoryFeePayHandle(
                              "Seller to pay (Buyer not responsive)"
                            );
                          }}
                        >
                          <span className="smallerThanSign">{">"}</span>{" "}
                          <span>Seller to pay (Buyer not responsive)</span>
                        </span>
                      </div>
                    )}
                    <br />
                  </div>
                  <div className="selectResolutionDIv invoiceThreeBtnDiv">
                    <span className="alignStart">
                      <img
                        src={invoiceBack}
                        alt="invoiceBack"
                        onClick={() => {
                          this.setState({ furtherDetail: "secAction" });
                        }}
                      />
                    </span>
                    <span className="invoiceThreeBtn">
                      <p
                        className="selectResolutionBtn alignCenter"
                        style={{ width: "200px" }}
                        onClick={() => {
                          this.setState({
                            furtherDetail: "caseHistorySubmited",
                          });
                        }}
                      >
                        Submit
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
                </div>
              </div>
            </>
          ) : this.state.furtherDetail === "caseHistorySubmited" ? (
            <>
              <div className="overdueTasksOrderTxt">
                <p>Case: #{this.state.selectedJob.id}</p>
                <p style={{ color: "white" }}>Case History</p>
              </div>
              <div
                className="invoiceBlackContainer invoiceOrderBlackDiv caseHistoryContainer"
                style={{ marginTop: "-10px", paddingTop: "0px" }}
              >
                <div style={{ color: "yellow" }}>
                  <div className="flexSpaceBtw">
                    <h6>12/01/2022 Buyer to Mediator</h6>
                    <h6 className="caseHistoryFirstActionRightTxt">- 03hr</h6>
                  </div>
                  <div className="flexSpaceBtw casetHistoryFinal">
                    <h6>Amount</h6>
                    <h6 className="caseHistoryFirstActionRightTxt">$10 USD</h6>
                  </div>
                  <p className="whiteRevied">
                    Review the case and assign steps to resolve the despute will
                    require 1 hours of work at my nominated hourly rate of
                    $20USD.
                  </p>
                </div>
              </div>

              <div className="selectResolutionDIv invoiceThreeBtnDiv">
                <span className="alignStart">
                  <img
                    src={invoiceBack}
                    alt="invoiceBack"
                    onClick={() => {
                      this.setState({ furtherDetail: "furtherDetailAddFee" });
                    }}
                  />
                </span>
                <span className="invoiceThreeBtn">
                  <p
                    className="selectResolutionBtn alignCenter"
                    onClick={() => {
                      this.setState({ furtherDetail: "judgeCase" });
                    }}
                    style={{ width: "200px" }}
                  >
                    Judge Case
                  </p>
                </span>
                <span className="alignEnd" style={{ float: "right" }}>
                  <Link to={{ pathname: "" }}>
                    <img
                      src={invoicePaymentStopped}
                      className="floatRight"
                      alt="invoicePaymentStopped"
                      onClick={() => {
                        // this.setState({ furtherDetail: "secAction" });
                      }}
                    />
                  </Link>
                </span>
              </div>
            </>
          ) : this.state.furtherDetail === "judgeCase" ? (
            <>
              <div>
                <div className="overdueTasksOrderTxt">
                  <p>Case: #{this.state.selectedJob.id}</p>

                  <p
                    style={{ color: "white" }}
                    onClick={() => {
                      this.setState({ furtherDetail: "firstAction" });
                    }}
                  >
                    Case History
                  </p>
                </div>
                {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
                <div
                  className="invoiceBlackDivMainContainer overdueTaskContainer"
                  id="invoiceOptions"
                  style={{ display: "inherit" }}
                >
                  <div className="furtherDetailCOntainer judgeCaseContainer">
                    <br />
                    <h5 className="addFeeHeadingTxt">
                      Are you ready to make a decision?
                    </h5>
                    <div className="flexSpaceBtw">
                      <h5 className="addFeeHeadingTxt">
                        Is a Refund Required?
                      </h5>
                      <div
                        className="onoffswitch contractonoffswitch contractSwithSwitchWhole"
                        style={{ marginRight: "-10px", marginTop: "-5px" }}
                      >
                        <input
                          type="checkbox"
                          name="onoffswitch"
                          className="onoffswitch-checkbox"
                          id="caseHistoryJudge"
                          tabIndex="0"
                        />
                        <label
                          className="onoffswitch-label contractSwithOneLabel"
                          htmlFor="caseHistoryJudge"
                        >
                          <span className="onoffswitch-inner caseHistoryJudgeInner"></span>
                          <span
                            className="onoffswitch-switch contractSwithSwitch"
                            style={{
                              marginTop: "2px",
                              marginRight: "6px",
                              width: "21px",
                              height: "21px",
                            }}
                          ></span>
                        </label>
                      </div>
                    </div>
                    <div
                      className="addFeeDiv"
                      onClick={() => {
                        this.setState({ whoPaysServiceFee: true });
                      }}
                    >
                      <div className="row caseHistoryJudgeBox">
                        <div className="col-8">
                          <h6>Buyer to recive %</h6>
                        </div>
                        <div
                          className="col-4 caseHistoryPercentCont"
                          onClick={() => {
                            if (this.state.judgeCaseBuyerReceive === true) {
                              this.setState({ judgeCaseBuyerReceive: false });
                            } else {
                              this.setState({ judgeCaseBuyerReceive: true });
                            }
                          }}
                        >
                          {/* <img src={} alt={} /> */}
                          <p className="percentTxt">
                            {this.state.judgeCaseBuyerReceiveValue}
                          </p>
                          <img src={judgeCaseBlackDropdown} style={{ marginTop: '-1px', marginRight: '-10px' }} alt="judgeCaseBlackDropdown" />
                        </div>
                      </div>
                    </div>
                    {this.state.judgeCaseBuyerReceive === true ? (
                      <div
                        className="addFeeBigDiv judgeCaseBuyerRecivePop"
                        style={{ marginBottom: "170px" }}
                      >
                        <span
                          className="sendMsgTxtLine caseHistoryFeePayDiv"
                          onClick={() => {
                            this.caseHistoryJudgeCaseBuyerReceiveHanlder(
                              "100%"
                            );
                          }}
                        >
                          <span className="smallerThanSign">{">"}</span>{" "}
                          <span>100% of invoice</span>
                        </span>
                        <hr className="furtherDetailHR" />

                        <span
                          className="sendMsgTxtLine caseHistoryFeePayDiv"
                          onClick={() => {
                            this.caseHistoryJudgeCaseBuyerReceiveHanlder("50%");
                          }}
                        >
                          <span className="smallerThanSign">{">"}</span>{" "}
                          <span>50% - 50% of the invoice</span>
                        </span>
                        <hr className="furtherDetailHR" />

                        <span
                          className="sendMsgTxtLine caseHistoryFeePayDiv"
                        // onClick={() => {
                        //   this.caseHistoryJudgeCaseBuyerReceiveHanlder(
                        //     "Seller to pay (Buyer not responsive)"
                        //   );
                        // }}
                        >
                          <div className="row">
                            <div className="col-6">
                              <span>
                                <span className="smallerThanSign">{">"}</span>{" "}
                                Enter Percentage
                              </span>
                            </div>
                            <div className="col-6">
                              <input
                                type="text"
                                ref={(enterPercent) =>
                                  (this.enterPercent = enterPercent)
                                }
                                className="enterPercentBuyerRceiveInputFIled"
                                onChange={(e) => {
                                  if (
                                    e.target.value > 100 ||
                                    e.target.value === 0
                                  ) {
                                    toast.error(
                                      "Response time must be between 0-100",
                                      {
                                        position: "top-right",
                                      }
                                    );
                                    this.enterPercent.value = "100";
                                    this.setState({
                                      judgeCaseBuyerReceiveValue: "100" + "%",
                                    });
                                  } else {
                                    this.setState({
                                      judgeCaseBuyerReceiveValue:
                                        e.target.value + "%",
                                    });
                                  }
                                }}
                              />
                            </div>
                          </div>
                          {/* <span className="smallerThanSign">{">"}</span>{" "}
                          <span>Enter Percentage</span> */}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}

                    <h5
                      className="addFeeHeadingTxt"
                      style={{ marginTop: "20px" }}
                    >
                      Enter reason for decision
                    </h5>
                    <div
                      className="addFeeDiv"
                      onClick={() => {
                        this.setState({ whoPaysServiceFee: true });
                      }}
                    >
                      <div className="row caseHistoryJudgeBox">
                        <div className="col-10">
                          <h6>Upload Report or type notes</h6>
                        </div>
                        <div className="col-2 caseHistorydisicion" style={{ marginTop: '-8px' }}>
                          <img src={judgeCaseEdit} style={{ marginLeft: '-5px' }} alt={judgeCaseEdit} />
                          <img src={judgeCaseAdd} style={{ marginLeft: '8px' }} alt={judgeCaseAdd} />
                        </div>
                      </div>
                    </div>
                    <div
                      className="attachFIle judgeCaseUploadFIles"
                      style={{ marginTop: "20px" }}
                    >
                      <img src={judgeCaseViewExample} alt="judgeCaseViewExample" />
                      <img src={judgeCaseAddedFile} alt="judgeCaseAddedFile" />
                    </div>
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
                        onClick={() => {
                          this.setState({
                            furtherDetail: "judgeCaseSubmited",
                          });
                        }}
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
            </>
          ) : this.state.furtherDetail === "judgeCaseSubmited" ? (
            <>
              <div>
                <div className="overdueTasksOrderTxt">
                  <p>Case: #123456789</p>
                  <p
                    style={{ color: "white" }}
                    onClick={() => {
                      this.setState({ furtherDetail: "firstAction" });
                    }}
                  >
                    Case History
                  </p>
                </div>
                {/* <div className="invoiceBlackDivMainContainer" id='invoiceOptions' style={{ display: 'none' }}> */}
                <div
                  className="invoiceBlackDivMainContainer overdueTaskContainer"
                  id="invoiceOptions"
                  style={{ display: "inherit" }}
                >
                  <div className="judgeCaseSubmitedistRow colorBlueCaseSubmited">
                    <h5>Total in USD:</h5>
                    <h5>$1246.78</h5>
                  </div>
                  <div className="judgeCaseSubmitedistRow colorBlueCaseSubmited">
                    <h5>Total in BNB:</h5>
                    <h5>2.5</h5>
                  </div>
                  <div className="judgeCaseSubmitedistRow colorBlueCaseSubmited">
                    <h5>Appeal Time</h5>
                    <h5>07 days</h5>
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
                    <h5>Refund in USD</h5>
                    <h5>$1246.78</h5>
                  </div>

                  <div className="judgeCaseSubmitedistRow">
                    <h5>Refund in BNB</h5>
                    <h5>2.5</h5>
                  </div>

                  <br />
                  <div className="judgeCaseSubmitedistRow">
                    <h5>
                      <b>SELLER</b>
                    </h5>
                  </div>
                  <div className="judgeCaseSubmitedistRow">
                    <h5>ABC Services Pty Ltd</h5>
                  </div>

                  <div className="judgeCaseSubmitedistRow">
                    <h5>Pay USD</h5>
                    <h5>$0.00</h5>
                  </div>

                  <div className="judgeCaseSubmitedistRow">
                    <h5>Pay in BNB</h5>
                    <h5>0.0</h5>
                  </div>

                  <center>
                    <button className="msgBtn">
                      Press <b>Submit</b> to apply
                    </button>
                  </center>
                  <div className="selectResolutionDIv invoiceThreeBtnDiv">
                    <span className="alignStart">
                      <img
                        src={invoiceBack}
                        alt="invoiceBack"
                        onClick={() => {
                          this.setState({ furtherDetail: "judgeCase" });
                        }}
                      />
                    </span>
                    <span className="invoiceThreeBtn">
                      <p
                        className="selectResolutionBtn alignCenter"
                        style={{ width: "200px" }}
                        onClick={() => {
                          this.setState({
                            // furtherDetail: "judgeCaseSubmited",
                          });
                        }}
                      >
                        Submit
                      </p>
                    </span>
                    <span className="alignEnd" style={{ float: "right" }}>
                      <Link to={{ pathname: "" }}>
                        <img
                          src={sendMessageCancel}
                          alt="sendMessageCancel"
                          className="floatRight"
                        />
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>hell</h1>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
