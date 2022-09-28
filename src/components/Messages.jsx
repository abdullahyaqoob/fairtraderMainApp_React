// react States
// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

// Images
import fairtraderLogo from "../Images/fairtraderLogo.png";
import searchBtn from "../Images/searchBtn.png";
import toggleBtn from "../Images/toggleBtn.png";
import invoice from "../Images/invoice.png";
import resolution from "../Images/resolution.png";
import contract from "../Images/contract.png";
import Attension from "../Images/Invoice/Attension.png";
import myWallet from "../Images/myWallet.png";
import walletHR from "../Images/walletHR.png";
import menuActive from "../Images/Menu/menuActive.png";
import dropdownRegistered from "../Images/dropdownRegistered.png";
import walletFirstParaIcon from "../Images/walletFirstParaIcon.png";
import walletSndParaIcon from "../Images/walletSndParaIcon.png";
import walletThirdParaIcon from "../Images/walletThirdParaIcon.png";
import walletFourthParaIcon from "../Images/walletFourthParaIcon.png";

import walletGreaterSign from "../Images/walletGreaterSign.png";
import mediate_TradeToggle from "../Images/wallet/mediate_TradeToggle.png";
import walletLogo from "../Images/wallet/connectLogo.png";

import metamaskIcon from "../Images/wallet/metamaskIcon.png";
import menuHelp from "../Images/Menu/menuHelp.png";
import menuThemeColor from "../Images/Menu/menuThemeColor.png";
import menuPaymentIcon from "../Images/Menu/menuPaymentIcon.png";
import menuProfileIcon from "../Images/Menu/menuProfileIcon.png";
// import walletLogo from '../Images/wallet/connectLogo.png';
// import walletLogo from '../Images/wallet/connectLogo.png';
// import walletLogo from '../Images/wallet/connectLogo.png';
import navMessage from "../Images/Menu/navMessage.png";
import messagesAttension from "../Images/Invoice/messagesAttension.png";

// Toast
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// components
// import HeaderNav from '../components/HeaderNav.jsx';

// css
import "./css/Wallet.css";
import "./css/Menu.css";
import "./css/Messages.css";
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                {localStorage.getItem("userViewTradeOrMediate") !==
                "mediate" ? (
                  <Link to={{ pathname: "/SearchPage" }}>
                    <img
                      src={searchBtn}
                      alt="searchBtn"
                      style={{ marginRight: "20px" }}
                    />
                  </Link>
                ) : (
                  ""
                )}
                <Link to={{ pathname: "/Menu" }}>
                  <img
                    src={menuActive}
                    alt="menuActive"
                    style={{ marginRight: "-5px" }}
                  />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <section id="contractTabMenu">
          {localStorage.getItem("userViewTradeOrMediate") === "mediate" ? (
            <div className="contractTabMenuItems">
              <button className="walletcontractTab AlertTabNoNadius">
                <Link to={{ pathname: "/Attention" }}>
                <img src={Attension} alt="Attension" />
                </Link>
              </button>
              <button className="walletResolutionTab">
                <Link to={{ pathname: "/MedResolution" }}>
                  <img src={resolution} alt="resolution" />
                </Link>
              </button>
              <button className="walletInvoiceTab">
                <Link to={{ pathname: "/MyFees" }}>
                  <img src={invoice} alt="invoice" />
                </Link>
              </button>
              <button className="MenuwalletTab">
                <Link to={{ pathname: "/Wallet" }}>
                  <img src={myWallet} alt="myWallet" />
                </Link>
              </button>
            </div>
          ) : (
            <div className="contractTabMenuItems">
              <button className="walletInvoiceTab">
                <Link to={{ pathname: "/Invoice" }}>
                  <img src={invoice} alt="invoice" />
                </Link>
              </button>
              <button className="walletResolutionTab">
                <Link to={{ pathname: "/Resolution" }}>
                  <img src={resolution} alt="resolution" />
                </Link>
              </button>
              <button className="MenucontractTab">
                <Link to={{ pathname: "/Contract" }}>
                  <img src={contract} alt="contract" />
                </Link>
              </button>
              <button className="MenuwalletTab">
                <Link to={{ pathname: "/Wallet" }}>
                  <img src={myWallet} alt="myWallet" />
                </Link>
              </button>
            </div>
          )}
        </section>

        <div className="handleMainPage" id="walletTabBody">
          <div>
            <div className="overdueTasksOrderTxt">
              <p style={{ color: "white" }}>My Messages:</p>
              <p style={{ color: "white" }}>All</p>
              <p>Unread</p>
              <p>Recived</p>
              <p>Sent</p>
            </div>
          </div>
          <div
            className="invoiceBlackDivMainContainer overdueTaskContainer messagesMainContianer"
            id="invoiceOptions"
            style={{ display: "inherit", borderRadius: "0px" }}
          >
            {/* Table Head */}
            <div className="messagesDiv" style={{ marginBottom: "5px" }}>
              <div className="messageindex"></div>
              <div className="messagealert">
                <img src={messagesAttension} alt="messagesAttension" style={{marginTop: '-2px'}} />
              </div>
              <div className="messagefrom">
                <span>From</span>
              </div>
              <div className="messagedate">
                <span>Date</span>
              </div>
            </div>

            {/* Table BODY */}
            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex1"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex1">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>

            <hr className="messagesHR" />

            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex2"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              <img src={messagesAttension} alt="messagesAttension" style={{marginTop: '-5px'}} />
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex2">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>
            <hr className="messagesHR" />

            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex3"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert"></div>
              <div className="messagefrom">
                <label htmlFor="messageIndex3">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>
            <hr className="messagesHR" />
            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex1"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex1">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>

            <hr className="messagesHR" />

            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex1"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex1">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>

            <hr className="messagesHR" />

            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex1"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex1">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>

            <hr className="messagesHR" />

            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex1"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex1">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>

            <hr className="messagesHR" />

            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex1"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex1">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>

            <hr className="messagesHR" />
            <div className="messagesDiv messagesVl">
              <div className="messageindex">
                <label class="container">
                  <input type="checkbox" id="messageIndex1"></input>
                  <span class="checkmark"></span>
                </label>
              </div>
              <div className="messagealert">
              </div>
              <div className="messagefrom">
                <label htmlFor="messageIndex1">
                  <span>ABC Goods</span>
                </label>
              </div>
              <div className="messagedate">
                <span>09 Jul</span>
              </div>
            </div>

            <hr className="messagesHR" />


          </div>
        </div>
      </div>
    );
  }
}

export default App;
