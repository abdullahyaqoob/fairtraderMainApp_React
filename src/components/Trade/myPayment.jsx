// react States
// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

// Images
import fairtraderLogo from "../../Images/fairtraderLogo.png";
import searchBtn from "../../Images/searchBtn.png";
import invoice from "../../Images/invoice.png";
import resolution from "../../Images/resolution.png";
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
import menuActive from "../../Images/Menu/menuActive.png";
import invoiceBack from "../../Images/Invoice/invoiceBack.png";
import paymentTether from "../../Images/Menu/paymentTether.png";
import paymentEth from "../../Images/Menu/paymentEth.png";
import paymentMatic from "../../Images/Menu/paymentMatic.png";
import paymentUsdt from "../../Images/Menu/paymentUsdt.png";
import paymentBnb from "../../Images/Menu/paymentBnb.png";
import paymentFTP from "../../Images/Menu/paymentFTP.png";
// import walletLogo from '../../Images/wallet/connectLogo.png';
import navMessage from "../../Images/Menu/navMessage.png";
import Attension from "../../Images/Invoice/Attension.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
// import HeaderNav from '../../components/HeaderNav.jsx';

import axios from "axios";
// css
import "../css/Wallet.css";
import "../css/myPayment.css";
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddres: "",
      selectedCurrency: "",
    };
  }
  async componentWillMount() {
    this.userAddressHandle();
  }

  userAddressHandle = async () => {

    let userAddres;
    if (
      this.props["props"].UserAccountAddr.userAccountAddr !== "") {
      userAddres = this.props["props"].UserAccountAddr.userAccountAddr;
      console.log(userAddres);
      this.setState({ userAddres });

      console.log(this.props);
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}user/showSelectedCurrency/${userAddres}`
        )

        .then((res) => {
          console.log(res.data);

          if (res.data.currencySelected === "ftpCoin") {
            document.getElementById("ftpCoin").checked = true;
            this.setState({ selectedCurrency: "ftpCoin" });
          } else if (res.data.currencySelected === "bnbCoin") {
            this.setState({ selectedCurrency: "bnbCoin" });
            document.getElementById("bnbCoin").checked = true;
          } else if (res.data.currencySelected === "usdtCoin") {
            this.setState({ selectedCurrency: "usdtCoin" });
            document.getElementById("usdtCoin").checked = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });

    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  };
  updateUserCurrency = () => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}user/userSelectedCryptoCurrency`, {
        walletaddress: this.props["props"].UserAccountAddr.userAccountAddr,
        currencySelected: this.state.selectedCurrency,
      })

      .then((res) => {
        console.log(res.data);
        let whitchCurr;
        if (this.state.selectedCurrency === "ftpCoin") {
          whitchCurr = "FTP";
        } else if (this.state.selectedCurrency === "bnbCoin") {
          whitchCurr = "BNB";
        } else if (this.state.selectedCurrency === "usdtCoin") {
          whitchCurr = "USDT";
        }
        toast.success(whitchCurr + " Selected", {
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSelectedCurrency = (e) => {
    // if (this.state.selectedCurrency === "") {
    if (
      document.getElementById("myonoffswitchPaymentStable").checked === true
    ) {
      if (e !== "usdtCoin") {
        document.getElementById(e).checked = false;
        alert("Stable Coin Selected");
      } else {
        document.getElementById(e).checked = true;
        this.setState({ selectedCurrency: e });
      }
    } else {
      if (document.getElementById(e).checked !== true) {
        document.getElementById(e).checked = false;
      } else {
        this.setState({ selectedCurrency: e });
        document.getElementById(e).checked = true;
      }
    }
    // } else {
    //   alert("Already Currency Selected");
    //   if (
    //     document.getElementById("myonoffswitchPaymentStable").checked === true
    //   ) {
    //     document.getElementById(e).checked = true;
    //   }
    //   document.getElementById(e).checked = false;
    // }
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
          <center>
            <h2 className="myPaymentHeading">My Payment</h2>
          </center>

          <div className="paymentDivContainer">
            <div className="stableCoinSelectionContainer">
              <div className="row">
                <div className="col-2">
                  <img src={paymentTether} alt="paymentTether" />
                </div>
                <div className="col-7">
                  <h2>Select Stable Coin?</h2>
                </div>
                <div className="col-3 stableCoinSlcDiv">
                  <span className="alignEnd" style={{ float: "right" }}>
                    <div
                      className="onoffswitch"
                      style={{ marginTop: "-1px", marginRight: "-3px" }}
                    >
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        className="onoffswitch-checkbox"
                        id="myonoffswitchPaymentStable"
                        tabIndex="0"
                        onClick={() => {
                          if (
                            document.getElementById(
                              "myonoffswitchPaymentStable"
                            ).checked === true
                          ) {
                            document.getElementById("usdtCoin").checked = true;
                            document.getElementById("ethCoin").checked = false;
                            document.getElementById("bnbCoin").checked = false;
                            document.getElementById(
                              "maticCoin"
                            ).checked = false;
                            document.getElementById("ftpCoin").checked = false;
                          } else {
                            document.getElementById("usdtCoin").checked = false;
                          }
                        }}
                      />
                      <label
                        className="onoffswitch-label contractSwithOneLabel"
                        htmlFor="myonoffswitchPaymentStable"
                      >
                        <span className="onoffswitch-inner onoffswitch-inner_Payment"></span>
                        <span className="onoffswitch-switch"></span>
                      </label>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <br />
            <div className="coinsContainer">
              <div className="row">
                <div className="col-6 acceptedTxt">Accepted Payment</div>
                <div className="col-6 supportedTxt">Supported Tokens</div>
              </div>
            </div>
            <hr className="paymentHR" />
            <div className="coinsContainer">
              <div className="row coinsDiv">
                <div className="col-6 oneCoinContainer">
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="ethCoin">
                        <img src={paymentEth} alt="paymentEth" />
                      </label>
                    </div>
                    <div className="col-6">
                      <label htmlFor="ethCoin">
                        <p>ETH</p>
                      </label>
                    </div>
                    <label htmlFor="ethCoin">
                      <div className="col-2">
                        <input
                          type="checkbox"
                          id="ethCoin"
                          onClick={() => {
                            // if (
                            //   document.getElementById(
                            //     "myonoffswitchPaymentStable"
                            //   ).checked === true
                            // ) {
                            //   document.getElementById(
                            //     "ethCoin"
                            //   ).checked = false;
                            //   alert("Stable Coin Selected");
                            // } else {
                            //   document.getElementById("ethCoin").checked = true;
                            // }
                            document.getElementById("ethCoin").checked = false;
                            alert("Comming Soon!");
                          }}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-6 oneCoinContainer">
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="bnbCoin">
                        <img src={paymentBnb} alt="paymentBnb" />
                      </label>
                    </div>
                    <div className="col-6">
                      <label htmlFor="bnbCoin">
                        <p>BNB</p>
                      </label>
                    </div>
                    <label htmlFor="bnbCoin">
                      <div className="col-2">
                        <input
                          type="checkbox"
                          id="bnbCoin"
                          onClick={() => {
                            this.handleSelectedCurrency("bnbCoin");
                          }}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-6 oneCoinContainer">
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="maticCoin">
                        <img src={paymentMatic} alt="paymentMatic" />
                      </label>
                    </div>
                    <div className="col-6">
                      <label htmlFor="maticCoin">
                        <p>MATIC</p>
                      </label>
                    </div>
                    <label htmlFor="maticCoin">
                      <div className="col-2">
                        <input
                          type="checkbox"
                          id="maticCoin"
                          onClick={() => {
                            // if (
                            //   document.getElementById(
                            //     "myonoffswitchPaymentStable"
                            //   ).checked === true
                            // ) {
                            //   document.getElementById(
                            //     "maticCoin"
                            //   ).checked = false;
                            //   alert("Stable Coin Selected");
                            // } else {
                            //   document.getElementById(
                            //     "maticCoin"
                            //   ).checked = true;
                            // }

                            document.getElementById(
                              "maticCoin"
                            ).checked = false;
                            alert("Comming Soon!");
                          }}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-6 oneCoinContainer">
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="ftpCoin">
                        <img src={paymentFTP} alt="paymentFTP" />
                      </label>
                    </div>
                    <div className="col-6">
                      <label htmlFor="ftpCoin">
                        <p>FTP</p>
                      </label>
                    </div>
                    <label htmlFor="ftpCoin">
                      <div className="col-2">
                        <input
                          type="checkbox"
                          id="ftpCoin"
                          onClick={() => {
                            this.handleSelectedCurrency("ftpCoin");
                          }}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-6 oneCoinContainer">
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="usdtCoin">
                        <img src={paymentUsdt} alt="paymentUsdt" />
                      </label>
                    </div>
                    <div className="col-6">
                      <label htmlFor="usdtCoin">
                        <p>USDT</p>
                      </label>
                    </div>
                    <label htmlFor="usdtCoin">
                      <div className="col-2">
                        <input
                          type="checkbox"
                          id="usdtCoin"
                          onClick={() => {
                            this.handleSelectedCurrency("usdtCoin");
                          }}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
              <span className="alignStart">
                <Link to={{ pathname: "/Menu" }}>
                  <img src={invoiceBack} alt="invoiceBack" />
                </Link>
              </span>

              <div className="selectResolutionBtnDiv">
                <p
                  className="selectResolutionBtn alignCenter"
                  onClick={() => this.updateUserCurrency()}
                >
                  Update
                </p>
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
