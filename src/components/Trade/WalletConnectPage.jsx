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
import myWallet from "../../Images/wallet/walletConnect.png";
import walletHR from "../../Images/walletHR.png";
import walletContentLogo from "../../Images/walletContentLogo.png";
import dropdownRegistered from "../../Images/dropdownRegistered.png";
import walletFirstParaIcon from "../../Images/walletFirstParaIcon.png";
import walletSndParaIcon from "../../Images/walletSndParaIcon.png";
import walletThirdParaIcon from "../../Images/walletThirdParaIcon.png";
import walletFourthParaIcon from "../../Images/walletFourthParaIcon.png";

import walletGreaterSign from "../../Images/walletGreaterSign.png";
import mediate_TradeToggle from "../../Images/wallet/mediate_TradeToggle.png";
import walletLogo from "../../Images/wallet/connectLogo.png";
import navMessage from "../../Images/Menu/navMessage.png";

import metamaskIcon from "../../Images/wallet/metamaskIcon.png";
import connectStart from "../../Images/wallet/connectStart.png";
// import walletLogo from '../../Images/wallet/connectLogo.png';
// import walletLogo from '../../Images/wallet/connectLogo.png';
// import walletLogo from '../../Images/wallet/connectLogo.png';

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
      metamaskStatus: "",
      walletConected: false,
    };
  }

  async componentWillMount() {
    this.setState({
      metamaskStatus: await window.ethereum._metamask.isUnlocked(),
    });
    if (this.state.metamaskStatus === true) {
      this.setState({ walletConected: true });
    }
  }
  handleMetamaskConnect = async () => {
    let walletStatus = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(walletStatus[0]);
    if (walletStatus[0] !== "") {
      this.setState({ walletConected: true });
    }
  };

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
                  <img src={myWallet} alt="myWallet" />
                  {/* <img src={walletConnect} alt="walletConnect" /> */}
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
                  <img src={myWallet} alt="myWallet" />
                  {/* <img src={walletConnect} alt="walletConnect" /> */}
                </Link>
              </button>
            </div>
          )}
        </section>

        <div className="handleMainPage" id="walletTabBody">
          <center>
            <div className="connectWalletContainer">
              <h2>Connect Your Wallet</h2>
              <span
                className="walletConnectCross"
                onClick={() => {
                  this.setState({ walletView: true });
                }}
              >
                X
              </span>
              <hr className="hrConnect" />

              <div className="metamaskRow">
                <h2
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textAlign: "start",
                  }}
                >
                  <img src={metamaskIcon} alt="metamaskIcon" />
                  <b>Metamask Wallet</b>
                  <img
                    src={connectStart}
                    alt="connectStart"
                    style={{ marginTop: "-5px" }}
                  />
                </h2>
                <p>
                  Fair Trader works best with Metamask wallet on all
                  blockchains. Other wallets will be added in the near future.
                </p>

                <p>
                  To download Metamask wallet for your browser{" "}
                  <a target="_blank" href="https://www.metamask.io/">
                    Click Here
                  </a>
                </p>
              </div>
              <center>
                <div className="selectResolutionBtnDivMyWallet">
                  {this.state.walletConected === false ? (
                    <p
                      className="selectResolutionBtn"
                      onClick={() => this.handleMetamaskConnect()}
                    >
                      Connect Wallet
                    </p>
                  ) : (
                    <p className="selectResolutionBtn">Connected</p>
                  )}
                </div>
                <div className="walletMainOptions">
                  <p>
                    <span style={{ color: "black" }}>.</span>
                    <Link to={{ pathname: "/Wallet" }}>
                      <span className="pinkHowToUse">How to use App</span>
                    </Link>
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
          </center>
        </div>
      </div>
    );
  }
}

export default App;
