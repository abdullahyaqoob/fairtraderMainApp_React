// react States
// import { useEffect, useState } from 'react'
import { useContext, useEffect, useState } from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

import EthSwap from "../ABIS_CutFeeGiveOrdrId/EthSwap.json";

import Web3 from "web3";

// Images
import fairtraderLogo from "../Images/fairtraderLogo.png";
import searchBtn from "../Images/searchBtn.png";
import invoice from "../Images/invoice.png";
import resolution from "../Images/resolution.png";
import contract from "../Images/contract.png";
import myWallet from "../Images/myWallet.png";
import menuActive from "../Images/Menu/menuActive.png";
import invoiceViewYellow from "../Images/Invoice/invoiceViewYellow.png";
import searchWhite from "../Images/Invoice/searchWhite.png";
import searchYellow from "../Images/Invoice/searchYellow.png";
import invoiceViewWhite from "../Images/Invoice/invoiceViewWhite.png";
import navMessage from "../Images/Menu/navMessage.png";
import Attension from "../Images/Invoice/Attension.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
// import HeaderNav from '../components/HeaderNav.jsx';

// css
import "./css/Wallet.css";
import "./css/myProfile.css";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      profileImgProgress: "",
      loggedInAccountAddr: "",
      loggedInAccountNtw: "",
      MetamaskCondition: "",
      ProfileSelectedFileQual: "",
      allWithdraws: '',
      ethSwap: '',
    };
  }

  async componentDidMount() {

    this.userAddressHandle();
    this.loadBlockchainData();

  }

  loadBlockchainData = async () => {
    let MetamaskStatus;
    if (this.props["props"].MetamaskStatus.metamaskStatus !== "") {
      MetamaskStatus = this.props["props"].MetamaskStatus.metamaskStatus;
      console.log(MetamaskStatus);
      if (MetamaskStatus === true) {
        // load WEB3
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          window.alert(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }

      }
    } else {
      setTimeout(() => {
        this.loadBlockchainData();
      }, 250);
    }
  };
  userAddressHandle = async () => {
    let userAddres;
    let connectedUserEmail;
    if (
      this.props["props"].UserAccountAddr.userAccountAddr !== "" &&
      this.props["props"].userAccountEmail.userAccountEmail !== ""
    ) {
      userAddres = this.props["props"].UserAccountAddr.userAccountAddr;
      console.log(userAddres);
      this.setState({ userAddres });

      connectedUserEmail = this.props["props"].userAccountEmail
        .userAccountEmail;
      console.log(connectedUserEmail);
      this.setState({ userAccountEmail: connectedUserEmail })

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}order/ableToWithdrawCases`,
          {
            userEmail: connectedUserEmail,
          }
        )

        .then((res) => {
          console.log(res.data);
          let allWithdraws = res.data;

          axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")


            .then((bnbPrice) => {
              console.log(bnbPrice.data);
              allWithdraws.map(function (val, i) {
                let sellerPercent = 100 - val.buyerTakeFund;
                let refundPriceInUSDOfBuyer = val.Amount * bnbPrice.data.price / 100 * val.buyerTakeFund;
                let refundPriceInUSDOfSeller = val.Amount * bnbPrice.data.price / 100 * sellerPercent;
                if (val.buyerWalletAddress === userAddres) {
                  val.Amount = refundPriceInUSDOfBuyer.toFixed(2);
                } else {
                  val.Amount = refundPriceInUSDOfSeller.toFixed(2);
                }
              })
              this.setState({ allWithdraws: allWithdraws });
            })
            .catch((err) => {
              console.log(err);
            })

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  };

  //   callSmartContractWithdrawDisputeCash = async () => {
  //     console.log('called');
  //     this.state.ethSwap.methods
  //     .userWithdrawTheirDisputesOrdersCash(
  //       // e.buyerWalletAddress, x
  //       "0xc2Ddb3e0cb46A0A61518494dc45B11780976218b", 1
  //     )
  //     .send({
  //       from: this.state.userAddres,
  //     })
  //     .on("transactionHash", (hash) => {
  //       console.log("hash", hash);
  //     });
  // }

  render() {

    function purchaseHitoryDateFormat(e) {
      let date = new Date(e);
      let formatedDate = `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;
      return formatedDate;
    }
    function purchaseHitoryDateFormat(e) {
      let date = new Date(e);
      let formatedDate =
        `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()} T ${date.getUTCHours()}:${date.getUTCMinutes()}`;
      return formatedDate;
    }
    function timeRemainHanlde(e, x, z) {

      // return 
      // <p style={{ color: '#3bff00' }}
      //   onClick={async () => {

      //     console.log(e);


      //     let whoWithDrawedUser;
      //     if (z === e.buyerWalletAddress) {
      //       whoWithDrawedUser = "buyer"
      //     } else {
      //       whoWithDrawedUser = "seller"
      //     }
      //     console.log(z);
      //     console.log(whoWithDrawedUser);

      //     axios
      //       .post(`${process.env.REACT_APP_BASE_URL}mediate/orderWithDrawed`, {
      //         orderId: e.orderId,
      //         whoWithDrawed: whoWithDrawedUser,
      //       })

      //       .then((res) => {
      //         console.log(res);
      //         setTimeout(() => {
      //           window.location.reload();
      //         }, 2000);

      //         toast.success("Successfully, WithDrawed", {
      //           position: "top-right",
      //         });
      //         // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   }}>WithDraw
      // </p>


      console.log(e);
      let appealEndDate = e.appealEndDate;

      if (new Date() >= new Date(appealEndDate)) {
        return <p style={{ color: '#3bff00' }}
          onClick={async () => {
            // this.callSmartContractWithdrawDisputeCash()
            console.log('called');


            const web3 = window.web3;

            const networkId = await web3.eth.net.getId();
            // this.setState({ networkId })
            console.log(networkId);

            // Load EthSwap
            const ethSwapData = EthSwap.networks[networkId];
            let ethSwap;
            if (ethSwapData) {
              ethSwap = new web3.eth.Contract(
                EthSwap.abi,
                ethSwapData.address
              );


              let userAccountt = await window.ethereum.request({
                method: "eth_requestAccounts",
              });


              ethSwap.methods
                .userWithdrawTheirDisputesOrdersCash(
                  e.buyerWalletAddress, x
                  // "0xc2Ddb3e0cb46A0A61518494dc45B11780976218b", 0
                )
                .send({
                  from: userAccountt[0]
                })
                .on("transactionHash", (hash) => {
                  console.log("hash", hash);

                  let whoWithDrawedUser;
                  if (z === e.buyerWalletAddress) {
                    whoWithDrawedUser = "buyer"
                  } else {
                    whoWithDrawedUser = "seller"
                  }


                  axios
                    .post(`${process.env.REACT_APP_BASE_URL}mediate/orderWithDrawed`, {
                      orderId: e.orderId,
                      whoWithDrawed: whoWithDrawedUser,
                    })

                    .then((res) => {
                      console.log(res);
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);

                      toast.success("Successfully, WithDrawed", {
                        position: "top-right",
                      });
                      // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                });
            }
          }
          }>
          <b>WithDraw</b></p >
      } else {
        const start = new Date().getTime();
        const end = new Date(appealEndDate).getTime();

        let timeInHours = Math.floor((new Date(end) - new Date(start)) / 1000 / 3600);
        console.log("timeInHours", timeInHours);
        return <p>Time Remain: {timeInHours}h</p>
      }
    }
    return (
      <div className="authMainDiv" >
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
            <h2 className="myPaymentHeading">WithDraws</h2>
          </center>

          <div className="paymentDivContainer">
            {this.state.allWithdraws.length !==
              0 ? (
              <div
                id="invoiceAllUnpaidBoxes"
                style={{ marginTop: "-18px" }}>
                {this.state.allWithdraws.map(
                  (val, i) => (
                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv"
                      // style={{ marginTop: "-5px" }}
                      onClick={() => {
                        this.setState({ SelectedOrder: val });
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
                      {val.orderStatusRejected === false ? (
                        <div className="row">
                          <div className="col-2">
                            <img
                              src={invoiceViewWhite}
                              alt="invoiceViewYellow"
                            />
                          </div>
                          <div className="col-5 invoiceUnpaidProfile">
                            <p className="invoiceUnpaidProfileData">
                              <p className="colorWhite">
                                <b>{val.customername.substring(0, 15)}</b>
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
                                <b>
                                  {purchaseHitoryDateFormat(
                                    val.payment
                                  )}
                                </b>
                                {/* <b>Rejected</b> */}
                                <b></b>
                                {/* <br /> */}
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
                          </div>
                          <div className="col-5 invoiceUnpaidProfile">
                            <p className="invoiceUnpaidProfileData">
                              <p>
                                <b>Case No.: {val.orderId}</b>
                              </p>
                              <p>Judged Time:</p>
                              <p>Amount: ${val.Amount}</p>


                            </p>
                          </div>
                          <div className="col-5" style={{ marginLeft: '-10px' }}>
                            <p className="invoiceUnpaidProfileData">
                              <p>Apeal Time: {val.apeealTime} D</p>
                              <p title="Judge Date">{purchaseHitoryDateFormat(val.JudgedTime)}</p>
                              {val.buyerWalletAddress === this.state.userAddres ?
                                <p style={{ color: 'yellow' }}>
                                  {val.superJudgedCase === true ?
                                    "Payment Released"
                                    : val.whoCalledSuperMed !== "" ?
                                      "Appealed"
                                      :
                                      val.buyerWidthdrawed === true ?
                                        "Withdrawed"
                                        : timeRemainHanlde(val, i, this.state.userAddres)
                                  }
                                </p>
                                : <p style={{ color: 'yellow' }}>
                                  {val.superJudgedCase === true ?
                                    "Payment Released"
                                    : val.whoCalledSuperMed !== "" ?
                                      "Appealed"
                                      :
                                      val.sellerWidthdrawed === true ?
                                        "Withdrawed"
                                        : timeRemainHanlde(val, i, this.state.userAddres)
                                  }
                                </p>
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
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
                {/* {invoiceUnpaidBtn} */}
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
