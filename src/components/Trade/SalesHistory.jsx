// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

// import { Worker } from "@react-pdf-viewer/core";
// // import the main compohnent
// import { Viewer } from "@react-pdf-viewer/core";

// // import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css'

import CreateInvoice from './CreateInvoice'

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
import salesHistoryDelete from "../../Images/Invoice/salesHistoryDelete.png";
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

import axios from "axios";

class PurchaseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createInvoice: false,
      invoiceUnpaidOrder: false,
      invoicePaidBtn: false,
      invoicePaymentStopped: false,
      userAccountAddress: "",
      invoicePurchaseHistoryUnpaidData: [],
      invoicePurchaseHistorypaidData: [],
      magnifierViewUser: {},
      searchUserMagnifierViewUnpaid: false,
      searchUserMagnifierViewPaid: false,
      totalAmountVarUnpaid: 0,
      totalAmountVarPaid: 0,
      magnifierViewUserViewPDF: false,
      purchasehistoryPaidBtn: false,
      resolutionSelectedPaid: false,
      contractSelectedPaid: false,
      ViewAddNotePaid: false,
      editInvoiceHandler: false,
      propData: {}
    };
  }
  componentDidMount() {
    this.userAddressHandle();
  }

  mapFunctionAmountUnpaid = (value) => {
    console.log(value.Amount);
    this.setState({
      totalAmountVarUnpaid:
        Number(this.state.totalAmountVarUnpaid) + Number(value.Amount),
    });
  };

  mapFunctionAmountPaid = (value) => {
    console.log(value.Amount);
    this.setState({
      totalAmountVarPaid:
        Number(this.state.totalAmountVarPaid) + Number(value.Amount),
    });
  };

  userAddressHandle = async () => {
    let userAddres;
    if (this.props["props"].UserAccountAddr.userAccountAdd !== "") {
      userAddres = this.props["props"].UserAccountAddr.userAccountAddr;
      console.log(userAddres);

      axios
        .post(`${process.env.REACT_APP_BASE_URL}invoices/salesHistory/unpaid`, {
          walletaddress: userAddres,
        })

        .then((res) => {
          console.log(res.data.data);
          this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
          res.data.data.map(this.mapFunctionAmountUnpaid);
        })
        .catch((err) => {
          console.log(err);

          window.location = "Invoice";
        });

      axios
        .post(`${process.env.REACT_APP_BASE_URL}invoices/salesHistory/paid`, {
          walletaddress: userAddres,
        })

        .then((res) => {
          console.log(res.data.data);
          this.setState({ invoicePurchaseHistorypaidData: res.data.data });
          res.data.data.map(this.mapFunctionAmountPaid);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  };

  render() {
    let invoiceUnpaidBtn = (
      <div className="selectResolutionDIv invoiceThreeBtnDiv">
        <span className="alignStart">
          <Link to={{ pathname: "/Invoice" }}>
            <img src={invoiceBack} alt="invoiceBack" />
          </Link>
        </span>
      </div>
    );

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
            <Link to={{ pathname: "/Invoice" }}>
              <img src={invoiceBack} alt="invoiceBack" />
            </Link>
          </span>
        </div>
      );
    }

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
      invoicePaymentStoppedProfileImg = (
        <img
          src={invoicePaymentStopped}
          className="floatRight"
          alt="invoicePaymentStopped"
          onClick={() => {
            // document.getElementById("resolutionSelectedPaid").style.display =
            //   "none";
            this.setState({ resolutionSelectedPaid: false });

            // document.getElementById("ViewAddNotePaid").style.display = "none";
            // document.getElementById("ViewAddNotePaid").style.display = "none";
            this.setState({ ViewAddNotePaid: false });

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
            // document.getElementById("resolutionSelectedPaid").style.display =
            //   "none";
            this.setState({ resolutionSelectedPaid: false });

            // document.getElementById("ViewAddNotePaid").style.display = "none";
            // document.getElementById("ViewAddNotePaid").style.display = "none";
            this.setState({ ViewAddNotePaid: false });

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

    let invoiceGetOptionsBtn;
    if (this.state.invoicePaidBtn === true) {
      invoiceGetOptionsBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={invoiceBack}
              alt="invoiceBack"
              onClick={() => {
                this.setState({ searchUserMagnifierViewUnpaid: false });
                this.setState({ searchUserMagnifierViewPaid: false });
                this.setState({ invoiceUnpaidOrder: false });
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

    function purchaseHitoryDateFormat(e) {
      let date = new Date(e);
      let formatedDate = `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;
      return formatedDate;
    }

    //PDFjs worker from an external cdn

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
                      #{this.state.magnifierViewUser.id}
                    </p>
                  </div>

                  <div className="profileBoxBody">
                    <span>
                      <b>{this.state.magnifierViewUser.customername}</b>
                    </span>
                    <br />
                    {/* <span>{this.state.magnifierViewUser.customeraddress}</span> */}
                    <span>{this.state.magnifierViewUser.customeraddress}</span>
                    {/* <span>{this.state.magnifierViewUser.customer name}</span> */}
                    <br />
                    <span>Newtown 3709</span>
                    <br />
                    <br />
                    <h6 style={{ color: "#c62127" }}>Construction Work</h6>
                    <h6>
                      Total <span style={{ color: "lightgrey" }}>.</span>$
                      {this.state.magnifierViewUser.Amount}USD
                    </h6>
                  </div>
                  <div
                    className="profileBoxBottom"
                    onClick={() => {
                      this.setState({ magnifierViewUserViewPDF: true });
                    }}
                  >
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
                    {this.state.magnifierViewUser.payment}
                    {/* 18/10/2021 */}
                  </div>
                </div>

                <div
                  className="row invoiceProfileRightSection"
                  onClick={() => {
                    this.setState({ invoicePaidBtn: false });
                    // document.getElementById(
                    //   "contractSelectedPaid"
                    // ).style.display = "none";
                    this.setState({ contractSelectedPaid: false });

                    document.getElementById(
                      "invoiceStopPaymentContent"
                    ).style.display = "none";
                    // document.getElementById(
                    //   "resolutionSelectedPaid"
                    // ).style.display = "inherit";
                    this.setState({ resolutionSelectedPaid: true });

                    // document.getElementById("ViewAddNotePaid").style.display =
                    //   "none";
                    this.setState({ ViewAddNotePaid: false });
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
                    // document.getElementById(
                    //   "resolutionSelectedPaid"
                    // ).style.display = "none";
                    this.setState({ resolutionSelectedPaid: false });

                    document.getElementById(
                      "invoiceStopPaymentContent"
                    ).style.display = "none";
                    // document.getElementById(
                    //   "contractSelectedPaid"
                    // ).style.display = "inherit";
                    this.setState({ contractSelectedPaid: true });

                    // document.getElementById("ViewAddNotePaid").style.display =
                    //   "none";
                    this.setState({ ViewAddNotePaid: false });
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
                    // document.getElementById(
                    //   "resolutionSelectedPaid"
                    // ).style.display = "none";
                    this.setState({ resolutionSelectedPaid: false });

                    document.getElementById(
                      "invoiceStopPaymentContent"
                    ).style.display = "none";
                    // document.getElementById("ViewAddNotePaid").style.display =
                    //   "inherit";
                    this.setState({ ViewAddNotePaid: true });

                    // document.getElementById(
                    //   "contractSelectedPaid"
                    // ).style.display = "none";
                    this.setState({ contractSelectedPaid: false });
                  }}
                >
                  <div className="col-4">
                    <img src={invoiceUnpaidEdit} alt="invoiceUnpaidEdit" />
                  </div>
                  <div className="col-8" style={{ color: "#33CC66" }}>
                    View / Add
                    <br />
                    Notes
                  </div>
                </div>
              </div>
            </div>
            {this.state.resolutionSelectedPaid === true ? (
              <div
                // id="resolutionSelectedPaid"
                className="resolutionSelected"
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
                          Resolution
                          <br />
                          Selected
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-3"
                    onClick={() => {
                      this.setState({ invoicePaidBtn: true });
                      // document.getElementById(
                      //   "resolutionSelectedPaid"
                      // ).style.display = "none";
                      this.setState({ resolutionSelectedPaid: false });

                      // document.getElementById("ViewAddNotePaid").style.display =
                      //   "none";
                      this.setState({ ViewAddNotePaid: false });

                      // document.getElementById(
                      //   "contractSelectedPaid"
                      // ).style.display = "none";
                      this.setState({ contractSelectedPaid: false });
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
                      {/* <p>Software Development</p> */}
                      <p>{this.state.magnifierViewUser.mediatorIndustry}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <h3>
                        <b>Mediator:</b>
                      </h3>
                    </div>
                    <div className="col-8">
                      <p>{this.state.magnifierViewUser.mediator}</p>
                      {/* <p>Random</p> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <h3>
                        <b>Location:</b>
                      </h3>
                    </div>
                    <div className="col-8">
                      <p>{this.state.magnifierViewUser.customeraddress}</p>
                      {/* <p>Melbourne 3000</p> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <h3>
                        <b>Language:</b>
                      </h3>
                    </div>
                    <div className="col-8">
                      <p>{this.state.magnifierViewUser.mediatorLanguage}</p>
                      {/* <p>Chinese, English</p> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <h3>
                        <b>Response:</b>
                      </h3>
                    </div>
                    <div className="col-8">
                      <p>{this.state.magnifierViewUser.responsetime} days</p>
                      {/* <p>3 days</p> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <h3>
                        <b>Appeal:</b>
                      </h3>
                    </div>
                    <div className="col-8">
                      <p>{this.state.magnifierViewUser.apealtime} days</p>
                      {/* <p>7 days</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div id="invoiceStopPaymentContent" style={{ display: "none" }}>
              <p style={{ color: "pink" }}>
                Pay the Gas fee in your wallet to stop the payment release.
              </p>
              <p>
                It may be better to first try and settle the dispute will the
                seller before stopping payment release.
              </p>
            </div>
            {this.state.ViewAddNotePaid === true ? (
              <div
                // id="ViewAddNotePaid"
                className="InvoiceAddNote InvoiceAddNotepaid"
              // style={{ display: "none" }}
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
                      // document.getElementById(
                      //   "resolutionSelectedPaid"
                      // ).style.display = "none";
                      this.setState({ resolutionSelectedPaid: false });

                      // document.getElementById("ViewAddNotePaid").style.display =
                      //   "none";
                      this.setState({ ViewAddNotePaid: false });

                      // document.getElementById(
                      //   "contractSelectedPaid"
                      // ).style.display = "none";
                      this.setState({ contractSelectedPaid: false });
                    }}
                  >
                    <img src={invoiceAddNoteCross} alt="invoiceAddNoteCross" />
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
            ) : (
              ""
            )}

            {this.state.contractSelectedPaid === true ? (
              <div
                // id="contractSelectedPaid"
                className="contractSelected"
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
                      // document.getElementById(
                      //   "resolutionSelectedPaid"
                      // ).style.display = "none";
                      this.setState({ resolutionSelectedPaid: false });

                      // document.getElementById("ViewAddNotePaid").style.display =
                      //   "none";
                      this.setState({ ViewAddNotePaid: false });

                      // document.getElementById(
                      //   "contractSelectedPaid"
                      // ).style.display = "none";
                      this.setState({ contractSelectedPaid: false });
                    }}
                  >
                    <img src={invoiceAddNoteCross} alt="invoiceAddNoteCross" />
                  </div>
                </div>
                <div className="ResolutionSelectedBodyTxt">
                  <div className="row">
                    <div className="col-6">
                      <div
                        className="row"
                        onClick={() =>
                          this.setState({
                            magnifierViewUserViewPDF: "contractTerms",
                          })
                        }
                      >
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
                      <div
                        className="row"
                        onClick={() =>
                          this.setState({
                            magnifierViewUserViewPDF:
                              "contractProductCondition",
                          })
                        }
                      >
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
                      <div
                        className="row"
                        onClick={() =>
                          this.setState({
                            magnifierViewUserViewPDF: "contractReturnPolicy",
                          })
                        }
                      >
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
                      <div
                        className="row"
                        onClick={() =>
                          this.setState({
                            magnifierViewUserViewPDF: "contractViewOthers",
                          })
                        }
                      >
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
            ) : (
              ""
            )}
            {this.state.contractSelectedPaid === false &&
              this.state.resolutionSelectedPaid === false &&
              this.state.ViewAddNotePaid === false ? (
              <div className="selectResolutionDIv invoiceThreeBtnDiv">
                <span className="alignStart">
                  <Link to={{ pathname: "/Invoice" }}>
                    <img src={invoiceBack} alt="invoiceBack" />
                  </Link>
                </span>
                <span className="invoiceThreeBtn">
                  {" "}
                  <p
                    className="selectResolutionBtn alignCenter"
                    style={{ width: "200px" }}
                    onClick={() => {
                      this.setState({ editInvoiceHandler: true })
                      this.setState({ propData: this.state.magnifierViewUser })
                    }}


                  >
                    Edit Invoice
                  </p>
                </span>
                <span className="alignEnd" style={{ float: "right" }}>
                  <Link to={{ pathname: "" }}>
                    <img
                      style={{ marginRight: "5px" }}
                      src={salesHistoryDelete}
                      className="floatRight"
                      alt="salesHistoryDelete"
                    />
                  </Link>
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
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
            src={`${process.env.REACT_APP_BASE_URL}${this.state.magnifierViewUser.termsandconditionsfile}`}
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
            src={`${process.env.REACT_APP_BASE_URL}${this.state.magnifierViewUser.attachfiles}`}
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
            src={`${process.env.REACT_APP_BASE_URL}${this.state.magnifierViewUser.warrantyfile}`}
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
            src={`${process.env.REACT_APP_BASE_URL}${this.state.magnifierViewUser.invoicefile}`}
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
            src={`${process.env.REACT_APP_BASE_URL}${this.state.magnifierViewUser.invoicefile}`}
            height="500px"
            width="100%"
          />
        </div>
      );
    }

    return (
      <>
        {!this.state.editInvoiceHandler ?
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
              <div id="invoicePurchaseHistory">
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
                          this.setState({ resolutionSelectedPaid: false });
                          this.setState({ ViewAddNotePaid: false });
                          this.setState({ contractSelectedPaid: false });
                        }}
                      >
                        Paid <span style={{ color: "#059b34" }}>__</span>
                      </span>
                      <span style={{ color: "black" }}>Disputes</span>
                    </p>
                    <div className="invoiceBlackContainer invoiceOrderBlackDiv">
                      {this.state.searchUserMagnifierViewUnpaid === false ? (
                        <>
                          {this.state.invoicePurchaseHistoryUnpaidData.length !==
                            0 ? (
                            <div
                              id="invoiceAllUnpaidBoxes"
                              style={{ marginTop: "-18px" }}
                            >
                              {this.state.invoicePurchaseHistoryUnpaidData.map(
                                (val, i) => (
                                  <div
                                    className="invoiceBlackDiv invoiceOrderBlackSubDiv"
                                    // style={{ marginTop: "-5px" }}
                                    onClick={() => {
                                      this.setState({ invoiceUnpaidOrder: true });
                                    }}
                                  >
                                    {val.orderStatusRejected === false ? (
                                      <div className="row">
                                        <div className="col-2">
                                          <img
                                            src={invoiceViewWhite}
                                            alt="invoiceViewWhite"
                                          />
                                        </div>
                                        <div className="col-5 invoiceUnpaidProfile">
                                          <p className="invoiceUnpaidProfileData">
                                            <p className="colorWhite">
                                              <b>{val.customername}</b>
                                            </p>
                                            <p className="colorWhite">#{val.id}</p>
                                            <p className="colorWhite">
                                              {purchaseHitoryDateFormat(
                                                val.createdAt
                                              )}
                                            </p>
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
                                                  this.setState({
                                                    magnifierViewUser: val,
                                                  });
                                                  this.setState({
                                                    searchUserMagnifierViewUnpaid: true,
                                                  });

                                                  this.setState({
                                                    invoicePaidBtn: true,
                                                  });
                                                }}
                                              />
                                            </div>
                                            <p className="colorWhite">
                                              {/* <b>Rejected</b> */}
                                              <br />
                                            </p>
                                            <p className="colorWhite">
                                              {/* <b>USD $1120.78</b> */}
                                              <b>USD ${val.Amount}</b>
                                            </p>
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="row">
                                        <div className="col-2">
                                          <img
                                            src={invoiceViewYellow}
                                            alt="invoiceViewYellow"
                                          />
                                          {/* {val.payment === "" ? (
                                      <img
                                        src={invoiceViewYellow}
                                        alt="invoiceViewYellow"
                                      />
                                    ) : (
                                      <img
                                        src={invoiceViewWhite}
                                        alt="invoiceViewYellow"
                                      />
                                    )} */}
                                        </div>
                                        <div className="col-5 invoiceUnpaidProfile">
                                          <p className="invoiceUnpaidProfileData">
                                            <p>
                                              <b>{val.customername}</b>
                                            </p>
                                            <p>#{val.id}</p>
                                            <p>
                                              {purchaseHitoryDateFormat(
                                                val.createdAt
                                              )}
                                            </p>
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
                                                  this.setState({
                                                    magnifierViewUser: val,
                                                  });
                                                  this.setState({
                                                    searchUserMagnifierViewUnpaid: true,
                                                  });

                                                  this.setState({
                                                    invoicePaidBtn: true,
                                                  });
                                                }}
                                              />
                                            </div>
                                            <p style={{ color: "gold" }}>
                                              <b>Rejected</b>
                                            </p>
                                            <p>
                                              {/* <b>USD $1120.78</b> */}
                                              <b>USD ${val.Amount}</b>
                                            </p>
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}

                              <div className="invoiceUnpaidTotal">
                                <p className="invoiceUnpaidTotalTxt">
                                  Total (USD){" "}
                                  <span style={{ color: "black" }}>.</span>{" "}
                                  {/* $2,512.98 */}$
                                  {this.state.totalAmountVarUnpaid}
                                </p>
                              </div>

                              {invoiceUnpaidBtn}
                            </div>
                          ) : (
                            <>
                              <div
                                className="invoiceBlackDiv invoiceOrderBlackSubDiv"
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
                              {invoiceUnpaidBtn}
                            </>
                          )}
                        </>
                      ) : (
                        <>{magnifierViewUserUI}</>
                      )}

                      {/* <div
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
                    </div> */}

                      {/* Purchase History unpaid click to paid section */}
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

                      {/* {invoiceUnPaidSearchBtn} */}
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
                        this.setState({ resolutionSelectedPaid: false });
                        this.setState({ ViewAddNotePaid: false });
                        this.setState({ contractSelectedPaid: false });
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
                    {this.state.searchUserMagnifierViewPaid === false ? (
                      <div id="invoiceUnPaidSection">
                        {/* <div id="invoiceAllUnpaidBoxes" style={{ display: 'none' }}> */}
                        {this.state.invoicePurchaseHistorypaidData.length !== 0 ? (
                          <div
                            id="invoiceAllUnpaidBoxes"
                            style={{ marginTop: "-18px" }}
                          >
                            {this.state.invoicePurchaseHistorypaidData.map(
                              (val, i) => (
                                <div
                                  className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite"
                                  // style={{ marginTop: "-5px" }}
                                  onClick={() => {
                                    this.setState({ invoiceUnpaidOrder: true });
                                  }}
                                >
                                  <div className="row">
                                    <div className="col-2">
                                      <img
                                        src={invoiceViewWhite}
                                        alt="invoiceViewYellow"
                                      />
                                    </div>
                                    <div className="col-5 invoiceUnpaidProfile">
                                      <p className="invoiceUnpaidProfileData">
                                        <p>
                                          <b>{val.customername}</b>
                                        </p>
                                        <p>#{val.id}</p>
                                        <p>
                                          {purchaseHitoryDateFormat(val.createdAt)}
                                        </p>
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
                                              this.setState({
                                                magnifierViewUser: val,
                                              });
                                              this.setState({
                                                searchUserMagnifierViewPaid: true,
                                              });

                                              this.setState({
                                                invoicePaidBtn: true,
                                              });
                                            }}
                                          />
                                        </div>
                                        <p style={{ color: "rgb(182, 255, 182)" }}>
                                          {/* <b>02/11/2022</b> */}
                                          <b>{val.payment}</b>
                                        </p>
                                        <p>
                                          {/* <b>USD $1120.78</b> */}
                                          <b>USD ${val.Amount}</b>
                                        </p>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                            <div className="invoiceUnpaidTotal">
                              <p className="invoiceUnpaidTotalTxt">
                                Total (USD){" "}
                                <span style={{ color: "black" }}>.</span> $
                                {this.state.totalAmountVarPaid}
                              </p>
                            </div>

                            {invoicepaidOptionsBtn}
                          </div>
                        ) : (
                          <>
                            <div
                              className="invoiceBlackDiv invoiceOrderBlackSubDiv"
                              style={{ marginTop: "-5px" }}
                            >
                              <h2
                                style={{ textAlign: "center", paddingTop: "28px" }}
                              >
                                Sorry, You have no records
                              </h2>
                            </div>
                            {invoicepaidOptionsBtn}
                          </>
                        )}
                      </div>
                    ) : (
                      <>{magnifierViewUserUI}</>
                    )}

                    {/* <div
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <CreateInvoice propdata={this.state.propData} />
        }
      </>
    );
  }
}

export default PurchaseHistory;
