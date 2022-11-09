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
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
import Attension from "../../Images/Invoice/Attension.png";
import walletHR from "../../Images/walletHR.png";
import menuActive from "../../Images/Menu/menuActive.png";
import dropdownRegistered from "../../Images/dropdownRegistered.png";
import walletFirstParaIcon from "../../Images/walletFirstParaIcon.png";
import walletSndParaIcon from "../../Images/walletSndParaIcon.png";
import walletThirdParaIcon from "../../Images/walletThirdParaIcon.png";
import walletFourthParaIcon from "../../Images/walletFourthParaIcon.png";

import walletGreaterSign from "../../Images/walletGreaterSign.png";
import mediate_TradeToggle from "../../Images/wallet/mediate_TradeToggle.png";
import walletLogo from "../../Images/wallet/connectLogo.png";

import metamaskIcon from "../../Images/wallet/metamaskIcon.png";
import menuHelp from "../../Images/Menu/menuHelp.png";
import menuThemeColor from "../../Images/Menu/menuThemeColor.png";
import menuPaymentIcon from "../../Images/Menu/menuPaymentIcon.png";
import menuProfileIcon from "../../Images/Menu/menuProfileIcon.png";
// import walletLogo from '../../Images/wallet/connectLogo.png';
// import walletLogo from '../../Images/wallet/connectLogo.png';
// import walletLogo from '../../Images/wallet/connectLogo.png';
import navMessage from "../../Images/Menu/navMessage.png";

// Toast
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// components
// import HeaderNav from '../../components/HeaderNav.jsx';

// css
import "../css/Wallet.css";
import "../css/Menu.css";
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() { }

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
                {localStorage.getItem("userViewTradeOrMediate") !==
                  "mediate" ? (
                  <>
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
                  </>
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
          <br />
          <div className="menuBox">
            <div className="row">
              <div className="col-2">
                <img src={menuHelp} alt="menuHelp" />
              </div>
              <div className="col-10">
                <h2>Help</h2>
                <p>Learn how to use the FTP App</p>
              </div>
            </div>
          </div>
          <div className="menuBox">
            <div className="row">
              <div className="col-2">
                <img src={menuThemeColor} alt="menuThemeColor" />
              </div>
              <div className="col-10">
                <h2>Screen Colour</h2>
                <p>Select your current color scheme</p>
              </div>
            </div>
          </div>

          <Link
            to={{ pathname: "/MyPayment" }}
            style={{ textDecoration: "none" }}
          >
            <div className="menuBox">
              <div className="row">
                <div className="col-2">
                  <img src={menuPaymentIcon} alt="menuPaymentIcon" />
                </div>
                <div className="col-10">
                  <h2>My Payment</h2>
                  <p>Select your payment option</p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to={{ pathname: "/MyProfile" }}
            style={{ textDecoration: "none" }}
          >
            <div className="menuBox">
              <div className="row">
                <div className="col-2">
                  <img src={menuProfileIcon} alt="menuProfileIcon" />
                </div>
                <div className="col-10">
                  <h2>My Profile</h2>
                  <p>How will other people find you?</p>
                </div>
              </div>
            </div>
          </Link>
          {localStorage.getItem("userViewTradeOrMediate") === "trade" ? (
            <Link
              to={{ pathname: "/Assets" }}
              style={{ textDecoration: "none" }}
            >
              <div className="menuBox">
                <div className="row">
                  <div className="col-2">
                    <img src={menuPaymentIcon} alt="menuPaymentIcon" />
                  </div>
                  <div className="col-10">
                    <h2>Withdraw Assets</h2>
                    <p>All Assets which you have to withdraw</p>
                  </div>
                </div>
              </div>
            </Link>
          ) : (<Link
            to={{ pathname: "/MedAssets" }}
            style={{ textDecoration: "none" }}
          >
            <div className="menuBox">
              <div className="row">
                <div className="col-2">
                  <img src={menuPaymentIcon} alt="menuPaymentIcon" />
                </div>
                <div className="col-10">
                  <h2>Withdraw Assets</h2>
                  <p>All Assets which you have to withdraw</p>
                </div>
              </div>
            </div>
          </Link>)}
        </div>
      </div>
    );
  }
}

export default App;
