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
// import myWallet from '../../Images/wallet/activeWallet.png';
import walletHR from "../../Images/walletHR.png";
import walletContentLogo from "../../Images/walletContentLogo.png";
import walletConnect from "../../Images/wallet/walletConnect.png";
import walletFirstParaIcon from "../../Images/walletFirstParaIcon.png";
import walletSndParaIcon from "../../Images/walletSndParaIcon.png";
import walletThirdParaIcon from "../../Images/walletThirdParaIcon.png";
import walletFourthParaIcon from "../../Images/walletFourthParaIcon.png";

import walletGreaterSign from "../../Images/walletGreaterSign.png";
import mediate_TradeToggle from "../../Images/wallet/mediate_TradeToggle.png";
import walletLogo from "../../Images/wallet/connectLogo.png";
import Attension from "../../Images/Invoice/Attension.png";

import metamaskIcon from "../../Images/wallet/metamaskIcon.png";
import connectStart from "../../Images/wallet/connectStart.png";
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
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twoPartyOnly: false,
      mutualFriend: false,
      registeredMediator: false,
      openDropdown: false,
      selectedIndustry: "",
      walletView: true,
      metamaskStatus: "",
      userViewTradeOrMediate: "",
      // walletView: 'connectWalletPage'
    };
  }
  async componentWillMount() {
    this.setState({
      userViewTradeOrMediate: localStorage.getItem("userViewTradeOrMediate"),
    });
    console.log(localStorage.getItem("userViewTradeOrMediate"));

    this.setState({
      metamaskStatus: await window.ethereum._metamask.isUnlocked(),
    });
    if (this.state.metamaskStatus === true) {
      this.setState({ walletConected: true });
    }
  }

  handleSelectIndustry(e) {
    this.setState({ selectedIndustry: e });
    this.setState({ openDropdown: false });
  }

  render() {
    let walletORmyWalletView;
    if (this.state.walletView === true) {
      walletORmyWalletView = (
        <>
          <div className="pinkContainer">
            {this.state.userViewTradeOrMediate === "trade" ? (
              <div
                onClick={() => {
                  localStorage.setItem("userViewTradeOrMediate", "mediate");
                  this.setState({ userViewTradeOrMediate: "mediate" });
                }}
              >
                <img
                  src={mediate_TradeToggle}
                  alt="mediate_TradeToggle"
                  style={{ marginLeft: "28px" }}
                />
                <p className="connectTxtMediate">MEDIATE</p>
                <div className="row">
                  <div className="col-5">.</div>
                  <div className="col-5 connectTxtTrade">TRADE</div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  localStorage.setItem("userViewTradeOrMediate", "trade");
                  this.setState({ userViewTradeOrMediate: "trade" });
                }}
              >
                <img
                  src={mediate_TradeToggle}
                  alt="mediate_TradeToggle"
                  style={{ marginLeft: "28px" }}
                  className="rotateImg"
                />
                <p className="connectTxtMediate" style={{ color: "#21FFFE" }}>
                  MEDIATE
                </p>
                <div className="row">
                  <div className="col-5">.</div>
                  <div
                    className="col-5 connectTxtTrade"
                    style={{ color: "black" }}
                  >
                    TRADE
                  </div>
                </div>
              </div>
            )}
            <center>
              <div className="selectResolutionBtnDivMyWallet">
                {this.state.metamaskStatus === false ? (
                  <Link to={{ pathname: "/WalletConnectPage" }}>
                    <p className="selectResolutionBtn">Connect Wallet</p>
                  </Link>
                ) : (
                  <p className="selectResolutionBtn">Connected</p>
                )}
              </div>
              <div className="walletMainOptions">
                <p>
                  <span style={{ color: "black" }}>.</span>
                  <span
                    className="pinkHowToUse"
                    onClick={() => {
                      this.setState({ walletView: false });
                    }}
                  >
                    How to use App
                  </span>
                  <span
                    className="alignEnd"
                    style={{ float: "right", color: "#21FFFE" }}
                  >
                    Buy FTP Token
                  </span>
                </p>
              </div>
            </center>
          </div>
        </>
      );
    } else if (this.state.walletView === false) {
      walletORmyWalletView = (
        <>
          <div className="pinkContainer">
            <center>
              <img src={walletContentLogo} alt="walletContentLogo" />
            </center>
            <center>
              <div className="pinkText">
                <p>
                  <span style={{ color: "purple" }}>.</span>
                  <span className="pinkHowToUse">How to use App</span>
                  <span className="alignEnd" style={{ float: "right" }}>
                    Buy FTP Token
                  </span>
                </p>
              </div>
            </center>
          </div>

          <div className="blackContainer">
            {/* <center> */}
            <div className="blackMainContainer">
              <p>
                <img
                  src={walletSndParaIcon}
                  className="alignStart"
                  style={{ float: "left", marginTop: "2px" }}
                  alt="walletFirstParaIcon"
                />
                <span style={{ marginLeft: "17px", color: "#1DCCFF" }}>
                  How to Create & Manage Invoices
                </span>
                <br />
                <span style={{ marginLeft: "17px" }}>
                  Learn how to use Invoicing Options
                </span>
                <img
                  src={walletGreaterSign}
                  className="paraGreaterSign"
                  alt="walletGreaterSign"
                />
                <center>
                  <img src={walletHR} className="walletHR" alt="walletHR" />
                </center>
              </p>
              <p className="walletParaSpaceTop">
                <img
                  src={walletThirdParaIcon}
                  className="alignStart"
                  style={{ float: "left", marginLeft: "-8px" }}
                  alt="walletFirstParaIcon"
                />
                <span className="paraHeading">How to select Mediator</span>
                <br />
                <span style={{ marginLeft: "10px" }}>
                  Learn how to use Mediation Options
                </span>
                <img
                  src={walletGreaterSign}
                  className="paraGreaterSign"
                  alt="walletGreaterSign"
                />
                <center>
                  <img src={walletHR} className="walletHR" alt="walletHR" />
                </center>
              </p>
              <p className="walletParaSpaceTop">
                <img
                  src={walletFourthParaIcon}
                  className="alignStart"
                  style={{ float: "left", marginLeft: "-5px" }}
                  alt="walletFirstParaIcon"
                />
                <span style={{ marginLeft: "14px", color: "#1DCCFF" }}>
                  Learn how to make attach contracts
                </span>
                <br />
                <span style={{ marginLeft: "14px" }}>
                  Learn how to make contracts
                </span>
                <img
                  src={walletGreaterSign}
                  className="paraGreaterSign"
                  alt="walletGreaterSign"
                />
                <center>
                  <img src={walletHR} className="walletHR" alt="walletHR" />
                </center>
              </p>
              <p className="walletParaSpaceTop">
                <img
                  src={walletFirstParaIcon}
                  className="alignStart"
                  style={{
                    float: "left",
                    marginTop: "2px",
                    marginLeft: "-2px",
                  }}
                  alt="walletFirstParaIcon"
                />
                <span style={{ marginLeft: "20px", color: "#1DCCFF" }}>
                  How to use your Wallet Tab
                </span>
                <br />
                <span style={{ marginLeft: "20px" }}>
                  Learn how to buy FTP and use wallet
                </span>
                <img
                  src={walletGreaterSign}
                  className="paraGreaterSign"
                  alt="walletGreaterSign"
                />
              </p>
            </div>
            {/* </center> */}
          </div>
        </>
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
          {this.state.metamaskStatus === false ? (
            <div className="contractTabMenuItems">
              <div className="logo">
                <center>
                  <img
                    src={walletLogo}
                    alt="walletLogo"
                    className="walletLogo"
                  />
                </center>
              </div>

              <button className="WalletwalletTab">
                <Link to={{ pathname: "/WalletConnectPage" }}>
                  <img src={walletConnect} alt="walletConnect" />
                </Link>
              </button>
            </div>
          ) : localStorage.getItem("userViewTradeOrMediate") === "mediate" ? (
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
              <button className="WalletwalletTab">
                <Link to={{ pathname: "/Wallet" }}>
                  <img src={walletConnect} alt="walletConnect" />
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
              <button className="walletcontractTab">
                <Link to={{ pathname: "/Contract" }}>
                  <img src={contract} alt="contract" />
                </Link>
              </button>
              <button className="WalletwalletTab">
                <Link to={{ pathname: "/Wallet" }}>
                  <img src={walletConnect} alt="walletConnect" />
                </Link>
              </button>
            </div>
          )}
        </section>

        <div className="handleMainPage" id="walletTabBody">
          {walletORmyWalletView}
        </div>
      </div>
    );
  }
}

export default App;
