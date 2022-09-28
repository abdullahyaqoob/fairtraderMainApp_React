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
import resolution from "../../Images/activeResolution.png";
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
import invoiceDummyPDF from "../../Images/Invoice/invoiceDummyPDF1.png";
import purchaseHistory from "../../Images/Invoice/purchaseHistory.png";
import salesHistory from "../../Images/Invoice/salesHistory.png";
import createinvoice from "../../Images/Invoice/createinvoice.png";
import medResRes from "../../Images/Invoice/medResRes.png";
import invoiceDropdown from "../../Images/Invoice/invoiceDropdown.png";
import navMessage from "../../Images/Menu/navMessage.png";
import Attension from "../../Images/Invoice/Attension.png";
import medResNewCases from "../../Images/Invoice/medResNewCases.png";
import medResCaseHistory from "../../Images/Invoice/medResCaseHistory.png";
import medResAppeals from "../../Images/Invoice/medResAppeals.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
// import HeaderNav from '../components/HeaderNav.jsx';

// css
import "../css/Resolution.css";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twoPartyOnly: false,
      mutualFriend: false,
      registeredMediator: false,
      openDropdown: false,
      selectedIndustry: "",
      handleSelectMediatorLocation: false,
      handleSelectMediatorTrust: false,
      handleSelectMediatorPrice: false,
      mediatorMagnifierView: false,
      selectedResolutionMediators: [],
      resolutionMediatorSelected: {},
      connectedUserAddr: "",
    };
  }
  async componentWillMount() {}
  render() {
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
        {/* <div className="topNavLinks">
                    <div className="row iconNav">
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
                                <Link to={{ pathname: '/Invoice' }}>
                                    <img
                                        src={invoice}
                                        className='invoiceImg'
                                        alt="invoice.png" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter activeImg">
                                <Link to={{ pathname: '/Resolution' }}>
                                    <img
                                        src={resolution}
                                        className='resolutionImg'
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
          <div
            className="invoiceBlackDivMainContainer"
            id="invoiceOptions"
            style={{ display: "inherit" }}
          >
            <Link to={{ pathname: "/NewCases" }}>
              <div className="invoiceBlackDiv">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={medResNewCases}
                      className="purchaseHistory"
                      alt="medResNewCases"
                    />
                  </div>
                  <div className="col-7">
                    <table className="invoiceOptionsTable">
                      <tbody>
                        <tr>
                          <th>New Cases</th>
                        </tr>
                        <tr>
                          <td>Accept new case</td>
                          {/* <td>{this.state.purchaseHistoryTotalPaid}</td> */}
                          <td>04</td>
                        </tr>
                        <tr>
                          <td>Time left to accept:</td>
                          {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
                          <td style={{ whiteSpace: "nowrap" }}>18 hrs</td>
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
            <Link to={{ pathname: "/CaseHistory" }}>
            <div className="invoiceBlackDiv">
              <div className="row">
                <div className="col-3">
                  <img
                    src={medResCaseHistory}
                    className="salesHistory"
                    alt="medResCaseHistory"
                    style={{marginTop: '6px'}}
                  />
                </div>
                <div className="col-7">
                  <table className="invoiceOptionsTable">
                    <tbody>
                      <tr>
                        <th>Case History</th>
                      </tr>
                      <tr>
                        <td>Active cases</td>
                        {/* <td>{this.state.salesHistoryTotalPaid}</td> */}
                        <td>12</td>
                      </tr>
                      <tr>
                        <td>Action Required:</td>
                        {/* <td>{this.state.salesHistoryTotalUnPaid}</td> */}
                        <td style={{ position: "relative", left: "2px" }}>
                          03
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
            {/* <Link to={{ pathname: "/OverdueTasks" }}> */}
            <div className="invoiceBlackDiv">
              <div className="row">
                <div className="col-3">
                  <img
                    src={medResAppeals}
                    className="purchaseHistory"
                    alt="medResAppeals"
                    style={{marginTop: '6px'}}
                  />
                </div>
                <div className="col-7">
                  <table className="invoiceOptionsTable">
                    <tbody>
                      <tr>
                        <th>Appeals History</th>
                      </tr>
                      <tr>
                        <td>Active appeals</td>
                        {/* <td>{this.state.purchaseHistoryTotalPaid}</td> */}
                        <td>05</td>
                      </tr>
                      <tr>
                        <td>Action required</td>
                        {/* <td>{this.state.purchaseHistoryTotalUnPaid}</td> */}
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
            {/* </Link> */}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
