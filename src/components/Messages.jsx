// react States
// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";


import FTPToken from "../ABIS_CutFeeGiveOrdrId/FTPToken.json";
import EthSwap from "../ABIS_CutFeeGiveOrdrId/EthSwap.json";
import Web3 from "web3";


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
import invoicePaymentStopped from "../Images/Invoice/invoicePaymentStopped.png";
import invoiceBack from "../Images/Invoice/invoiceBack.png";
import contractPrev from "../Images/contract/contractPrev.png";
import contractNext from "../Images/contract/contractNext.png";
// import walletLogo from '../Images/wallet/connectLogo.png';
// import walletLogo from '../Images/wallet/connectLogo.png';
// import walletLogo from '../Images/wallet/connectLogo.png';
import navMessage from "../Images/Menu/navMessage.png";
import messagesAttension from "../Images/Invoice/messagesAttension.png";

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import axios from "axios";
// components
// import HeaderNav from '../components/HeaderNav.jsx';

// css
import "./css/Wallet.css";
import "./css/Menu.css";
import "./css/Messages.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultView: "All",
      userAccountEmail: "",
      allMessages: "",
      allMessagesMailer: "",
      wantToOpenMsgOfUser: '',
      chatReceiverEmail: '',
      replyTo: "",
      replyToWhich: '',
      mediatorEmail: '',
      orderDetail: '',
      selectedJob: '',
      mediatorFeeObj: {},
      bnbPriceInUSD: '',
      mediatorFeeInUSD: '',
      mediatorOrder: {}
    };
  }
  async componentWillMount() {
    this.userConnectedEmail();
  }
  formateMediatorFeeDate(e) {
    var diff = (new Date() - new Date(e).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
    // return newDateDate.substring(0, 10)
  }
  formatTheCreatedAtDate(e) {
    let newDateDate = new Date(e).toLocaleString()
    return newDateDate.substring(0, 10)
  }
  // takeTheSecondPersonEmail(e) {
  //   if (e.senderEmail !== this.state.userAccountEmail) {
  //     return e.senderEmail;
  //   } else if (e.receiverEmail !== this.state.userAccountEmail) {
  //     return e.receiverEmail;
  //   }
  // }
  getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', { month: 'long' });
  }

  createdAtDate(e) {
    let dateOfDate = new Date(e)
    let getMonthInNumber = dateOfDate.getMonth()
    let getDate = dateOfDate.getDate()
    let nameOfTheMonth = this.getMonthName(getMonthInNumber)

    console.log(nameOfTheMonth);
    return (`${getDate}-${nameOfTheMonth.substring(0, 3)}`);
  }

  mountedAxiosCallsForMessages = async () => {
    console.log('getAllSecondPersonEmails', this.state.userAccountEmail);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}message/getAllSecondPersonEmails`, {
        userEmail: this.state.userAccountEmail
      })

      .then((res) => {
        this.setState({ allMessagesMailer: res.data })
        console.log(this.state.allMessagesMailer);
        if (res.data.length === 0) {
          setTimeout(this.mountedAxiosCallsForMessages, 250);
        }
      }).catch((err) => {
        console.log(err);
      })
  }


  userConnectedEmail = async () => {
    let connectedUserEmail;
    if (this.props["props"].userAccountEmail.userAccountEmail !== "") {
      connectedUserEmail = this.props["props"].userAccountEmail
        .userAccountEmail;
      this.setState({ userAccountEmail: connectedUserEmail })
      console.log(this.state.userAccountEmail);

      this.mountedAxiosCallsForMessages()

      axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")
        .then((res) => {
          this.setState({ bnbPriceInUSD: res.data.price })
        }).catch((err) => {
          console.log(err);
        })

      setInterval(() => {
        this.mountedAxiosCallsForMessages()
      }, 50000);

    } else {
      setTimeout(this.userConnectedEmail, 250);
    }
  }

  async handleMediatorFees() {
    let SelectedOrder = this.state.mediatorOrder;

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
    // load Blockchain Data
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
    }

    console.log(SelectedOrder);
    console.log(SelectedOrder.customerWalletAddress);
    const AllOrdersOfSeller = await ethSwap.methods
      .getAllOrdersOfOneUser(SelectedOrder.customerWalletAddress)
      .call();

    console.log("AllOrdersOfSeller", AllOrdersOfSeller);

    let stateSlectedData = SelectedOrder;
    let wantToSelectedOrder;
    let wantToSelectedOrderID;

    AllOrdersOfSeller.filter(function (value, index) {
      console.log(index);

      if (value._orderId === stateSlectedData.id.toString()) {
        wantToSelectedOrder = value;
        wantToSelectedOrderID = index;
      }
    })

    console.log('wantToSelectedOrder', wantToSelectedOrder);
    console.log('wantToSelectedOrder', wantToSelectedOrderID);

    let userAccountt = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userAccount = userAccountt[0];

    let _index = Number(wantToSelectedOrderID);
    console.log(_index);

    let whoPaidMedFee;
    if (this.state.userAccountEmail === SelectedOrder.customeremail) {
      whoPaidMedFee = "buyer"
    } else {
      whoPaidMedFee = "seller"
    }
    ethSwap.methods
      .payMediatorFee(
        _index,
        SelectedOrder.customerWalletAddress,
        whoPaidMedFee,
        SelectedOrder.MediatorFeeInBNB
      )
      .send({
        value: window.web3.utils.toWei((SelectedOrder.MediatorFeeInBNB).toString(), "Ether"),
        from: userAccount
      })
      .on("transactionHash", async (hash) => {
        console.log("hash", hash);

        await axios
          .post(`${process.env.REACT_APP_BASE_URL}order/mediatorFeeAccepted`, {
            orderId: this.state.mediatorFeeObj.OrderId
          })

          .then((res) => {
            console.log(res);
            toast.success("Mediator Fee accepted", {
              position: "top-right",
            });
            setTimeout(() => {
              window.location.reload()        
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          })
      });

  }

  sentMessageHandler() {
    console.log(this.state.wantToOpenMsgOfUser);
    console.log(this.state.replyToWhich);
    console.log(this.state.orderDetail);


    let messageTextareaTxt = document.getElementById("messageTextareaTxt").value
    if (messageTextareaTxt !== "") {

      let RequestURL;
      let receiverEmail;
      if (this.state.replyToWhich === "Mediator") {
        RequestURL = "mediatorSendMsg"
        receiverEmail = this.state.mediatorEmail
      } else if (this.state.replyToWhich === "Seller") {
        receiverEmail = this.state.orderDetail.sellerEmail
        RequestURL = "createMsg"
      } else {
        receiverEmail = this.state.orderDetail.customeremail
        RequestURL = "createMsg"
      }
      axios
        .post(`${process.env.REACT_APP_BASE_URL}message/${RequestURL}`, {
          senderEmail: this.state.userAccountEmail,
          receiverEmail: receiverEmail,
          message: messageTextareaTxt,
          orderId: this.state.wantToOpenMsgOfUser.OrderName
        })

        .then((res) => {
          toast.success("Message Sent", {
            position: "top-right",
          });

          document.getElementById("messageTextareaTxt").value = ""
        }).catch((err) => {
          console.log(err);
        })
      // } else {
      //   console.log(options);

      //   axios
      //     .post(`${process.env.REACT_APP_BASE_URL}message/mediatorSendMsg`, options)

      //     .then((res) => {
      //       toast.success("Message Sent to Mediator", {
      //         position: "top-right",
      //       });

      //       document.getElementById("messageTextareaTxt").value = ""
      //       document.getElementById("messageToTxtFeild").value = ""
      //     }).catch((err) => {
      //       console.log(err);
      //     })
      // }


    } else {
      toast.error("Please first type some message", {
        position: "top-right",
      });
    }
  }

  async showSelectedUserMsgs(e) {
    console.log(e);
    let userAccountEmail = this.state.userAccountEmail;
    let allMessagesWithoutFilter;
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}message/getAllSecondPersonEmailsMessages`, {
        orderId: e
      })

      .then((res) => {
        let respData = res.data

        console.log(respData);



        respData.sort(function (a, b) { return a.id - b.id });
        allMessagesWithoutFilter = respData;
        if (respData.length === 0) {
          setTimeout(this.showSelectedUserMsgs, 250);
        }
        this.setState({ chatReceiverEmail: res.data[0].receiverEmail })
      }).catch((err) => {
        console.log(err);
      })



    await axios
      .post(`${process.env.REACT_APP_BASE_URL}message/getOrderDetailByOrderId`, {
        orderId: this.state.wantToOpenMsgOfUser.OrderName
      })

      .then(async (res) => {
        console.log(res.data);
        this.setState({ orderDetail: res.data })
        this.setState({ selectedJob: res.data })


        await axios
          .post(`${process.env.REACT_APP_BASE_URL}message/getMedEmailForMsg`, {
            mediatorId: res.data.mediator
          })

          .then((res) => {
            console.log(res.data);
            this.setState({ mediatorEmail: res.data })

            let answerOfMap = [];
            if (userAccountEmail !== res.data) {
              allMessagesWithoutFilter.map(function (value, index) {
                if ((value.senderEmail === userAccountEmail || value.receiverEmail === userAccountEmail) && value.mediatorFeeMsg === false) {
                  answerOfMap.push(value)
                }
              })
              this.setState({ allMessages: answerOfMap })
            } else {
              this.setState({ allMessages: allMessagesWithoutFilter })
            }
          }).catch((err) => {
            console.log(err);
          })




        if (this.state.userAccountEmail === res.data.sellerEmail) {
          this.setState({
            replyTo: <p
              className="selectResolutionBtn alignCenter messageBtn"
              onClick={() => {
                this.setState({ defaultView: "Sent" })
              }}
              style={{ width: "220px" }}
            >
              <span onClick={() => {
                this.setState({ replyToWhich: "Buyer" })
              }}>Reply to Buyer </span> <span onClick={() => {
                this.setState({ replyToWhich: "Mediator" })
              }}> / Med</span>
            </p>
          })
        } else if (this.state.userAccountEmail === res.data.customeremail) {
          this.setState({
            replyTo: <p
              className="selectResolutionBtn alignCenter messageBtn"
              onClick={() => {
                this.setState({ defaultView: "Sent" })
              }}
              style={{ width: "220px" }}
            >
              <span onClick={() => {
                this.setState({ replyToWhich: "Seller" })
              }}>Reply to Seller </span> <span onClick={() => {
                this.setState({ replyToWhich: "Mediator" })
              }}> / Med</span>
            </p>
          })
        } else {
          this.setState({
            replyTo: <p
              className="selectResolutionBtn alignCenter messageBtn"
              style={{ width: "220px" }}
            >
              Med Can't Reply
            </p>
          })
        }

      }).catch((err) => {
        console.log(err);
      })


  }

  render() {
    let messageBtnUI;
    if (this.state.defaultView === "All") {
      messageBtnUI = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={contractPrev}
              alt="contractPrev"
              style={{ width: '50px' }}
              onClick={() => {
              }}
            />
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter messageBtn"
              onClick={() => {
              }}
              style={{ width: "200px" }}
            >
              Delete Message
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <img
              src={contractNext}
              className="floatRight"
              style={{ width: '52px' }}
              alt="contractNext"
              onClick={() => {
              }}
            />
          </span>
        </div>
      )
    } else if (this.state.defaultView === "mediatorFeeSection") {
      messageBtnUI = ""
    } else if (this.state.defaultView === "Sent") {
      messageBtnUI = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={contractPrev}
              alt="contractPrev"
              style={{ width: '50px' }}
              onClick={() => {
                this.setState({ defaultView: "All" })
              }}
            />
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter messageBtn"
              onClick={() => {
                this.sentMessageHandler()
              }}
              style={{ width: "200px" }}
            >
              Sent Message
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <img
              src={contractNext}
              className="floatRight"
              style={{ width: '52px' }}
              alt="contractNext"
              onClick={() => {
              }}
            />
          </span>
        </div>
      )
    } else {
      messageBtnUI = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img
              src={contractPrev}
              alt="contractPrev"
              style={{ width: '50px' }}
              onClick={() => {
                this.setState({ defaultView: "All" })
              }}
            />
          </span>
          <span className="invoiceThreeBtn">
            {this.state.replyTo}
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <img
              src={contractNext}
              className="floatRight"
              style={{ width: '52px' }}
              alt="contractNext"
              onClick={() => {
              }}
            />
          </span>
        </div>
      )
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

        <div className="handleMainPage" id="messageTabBody">
          <div>
            <div className="overdueTasksOrderTxt">
              <p style={{ color: "white" }}>My Messages:</p>
              <p style={{ color: "white" }} onClick={() => { this.setState({ defaultView: "All" }) }}>All</p>

              {/* {this.state.defaultView === "All" || this.state.defaultView === "View" ?
                <p style={{ color: "white" }} onClick={() => { this.setState({ defaultView: "All" }) }}>All</p>
                :
                <p onClick={() => { this.setState({ defaultView: "All" }) }}>All</p>
              } */}
              <p onClick={() => {
                toast.warning("Comming Soon", {
                  position: "top-right"
                })
              }}>Unread</p>
              <p onClick={() => {
                toast.warning("Comming Soon", {
                  position: "top-right"
                })
              }}>Recived</p>
              <p onClick={() => {
                toast.warning("Comming Soon", {
                  position: "top-right"
                })
              }}>Sent</p>
            </div>
          </div>
          <div
            className="invoiceBlackDivMainContainer overdueTaskContainer messagesMainContianer"
            id="invoiceOptions"
            style={{ display: "inherit", borderRadius: "0px" }}
          >

            {this.state.defaultView === "All" ?
              <div className="WholeMessageContainer">
                {/* Table Head */}
                <div className="messagesDiv" style={{ marginBottom: "5px" }}>
                  <div className="messageindex"></div>
                  <div className="messagealert">
                    <img src={messagesAttension} alt="messagesAttension" style={{ marginTop: '-3px' }} />
                  </div>
                  <div className="messagefrom">
                    {/* <span>From</span> */}
                    <span>Order ID</span>
                  </div>
                  <div className="messagedate">
                    <span>Date</span>
                  </div>
                </div>
                {this.state.allMessagesMailer.length !==
                  // 0 ?
                  0 ?
                  <div>
                    {this.state.allMessagesMailer.map(
                      (value, i) => (
                        <div>
                          <div className="messagesDiv messagesVl" onClick={() => {
                            if (value.message !== undefined) {
                              this.setState({
                                mediatorFeeObj: value,
                                defaultView: "mediatorFeeSection",
                              })
                              axios.post(`${process.env.REACT_APP_BASE_URL}message/getOrderDetailByOrderId`, {
                                "orderId": value.OrderId
                              })
                                .then((order) => {
                                  console.log(order.data);
                                  this.setState({ mediatorOrder: order.data })
                                  let mediatorFeeInUSD = this.state.bnbPriceInUSD * order.data.MediatorFeeInBNB

                                  this.setState({ mediatorFeeInUSD })
                                }).catch((err) => {
                                  console.log(err);
                                })
                            } else {
                              this.setState({
                                wantToOpenMsgOfUser: value,
                                defaultView: "View",

                              })
                              this.showSelectedUserMsgs(value.OrderName)

                              setInterval(() => {
                                this.showSelectedUserMsgs(this.state.wantToOpenMsgOfUser.OrderName)
                              }, 50000);
                            }
                          }}>
                            <div className="messageindex">
                              <label class="container">
                                <input type="checkbox" id="messageIndex1"></input>
                                <span class="checkmark"></span>
                              </label>
                            </div>
                            <div className="messagealert">
                              {value.mediatorInvolved === true ?
                                <img src={messagesAttension} alt="messagesAttension" style={{ marginTop: '-2px' }} />
                                : ""}
                              {value.message !== undefined ?
                                <img src={messagesAttension} alt="messagesAttension" style={{ marginTop: '-2px' }} />
                                : ""}
                            </div>
                            <div className="messagefrom">
                              <label htmlFor="messageIndex1">
                                {/* <span>{this.takeTheSecondPersonEmail(value)}</span> */}
                                <span>{value.OrderName}</span>
                              </label>
                            </div>
                            <div className="messagedate" style={{ whiteSpace: 'nowrap' }}>
                              <span>{this.createdAtDate(value.date)}</span>
                            </div>
                          </div>
                          <hr className="messagesHR" />
                        </div>
                      ))}
                  </div> : <div
                    className="attentionRedDiv"
                    style={{ marginTop: "10px" }}
                  >
                    <h2
                      style={{
                        textAlign: "center",
                        paddingTop: "28px",
                      }}
                    >
                      You have no messages
                    </h2>
                  </div>
                }

                {/* <hr className="messagesHR" /> */}
              </div>
              : this.state.defaultView === "Sent" ?
                <div>
                  {/* Table Head */}
                  <div className="messagesDiv" style={{ marginBottom: "5px" }}>
                    <div className="messageindex">To:</div>
                    <div className="messagefrom" style={{ width: '89%' }}>
                      {this.state.replyToWhich === "Seller" ?
                        <input type="InvoiceinvoiceFields" value={this.state.orderDetail.sellerEmail} placeholder="Email Address" id="messageToTxtFeild" className="messageToTxtFeild" />
                        : this.state.replyToWhich === "Buyer" ?
                          <input type="InvoiceinvoiceFields" value={this.state.orderDetail.customeremail} placeholder="Email Address" id="messageToTxtFeild" className="messageToTxtFeild" />
                          :
                          <input type="InvoiceinvoiceFields" value={this.state.mediatorEmail} placeholder="Email Address" id="messageToTxtFeild" className="messageToTxtFeild" />
                      }
                    </div>
                  </div>
                  <textarea name="" id="messageTextareaTxt" className="messageTextarea"></textarea>
                </div>
                : this.state.defaultView === "mediatorFeeSection" ?
                  <>
                    <div className="overdueTasksOrderTxt">
                      <p style={{ color: 'white' }}>Case: #{this.state.mediatorFeeObj.OrderId}</p>
                    </div>
                    <div
                      className="invoiceBlackContainer invoiceOrderBlackDiv caseHistoryContainer"
                      style={{ marginTop: "-10px", paddingTop: "0px" }}
                    >
                      <div style={{ color: "yellow" }}>
                        <div className="flexSpaceBtw">
                          <h6>{this.state.mediatorFeeObj.date.substring(0, 10)} Pay Fee For Service</h6>
                          {/* <h6 className="caseHistoryFirstActionRightTxt">- 03hr</h6> */}
                          <h6 className="caseHistoryFirstActionRightTxt" style={{ whiteSpace: 'nowrap' }}>
                            - {this.formateMediatorFeeDate(this.state.mediatorFeeObj.date)}hr</h6>
                        </div>
                        <div className="flexSpaceBtw casetHistoryFinal">
                          <h6 style={{ fontWeight: 'normal' }}>Amount</h6>
                          {/* <h6 className="caseHistoryFirstActionRightTxt">$10 USD</h6> */}
                          <h6 className="caseHistoryFirstActionRightTxt" style={{ fontWeight: 'normal' }}>
                            ${this.state.mediatorFeeInUSD} USD
                          </h6>
                        </div>
                        <p className="whiteRevied">
                          {this.state.mediatorFeeObj.message}
                        </p>
                        <br />
                        <center>
                          {this.state.mediatorOrder.mediatorFeeAccepted === false ?
                            <p
                              className="selectResolutionBtn alignCenter"
                              onClick={() => { this.handleMediatorFees() }}
                              style={{ width: "200px" }}
                            >
                              Pay {this.state.mediatorFeeInUSD / this.state.bnbPriceInUSD} BNB Fee
                            </p>

                            :
                            <p
                              className="selectResolutionBtn alignCenter"
                              style={{ width: "200px" }}
                            >
                              Already Fee Paid
                            </p>
                          }

                        </center>
                      </div>
                    </div>

                    <div className="selectResolutionDIv invoiceThreeBtnDiv">
                      <span className="alignStart">
                        <img
                          src={invoiceBack}
                          alt="invoiceBack"
                          onClick={() => {
                            this.setState({ defaultView: "All" });
                          }}
                        />
                      </span>
                    </div>
                  </>
                  : <div>
                    <div className="messageView">
                      {this.state.allMessages.length !== 0 ?
                        <div>
                          {this.state.allMessages.map((val, i) => (
                            <>
                              {this.state.orderDetail.sellerEmail === val.senderEmail ?
                                <div className="messageSenderSellToBuy">
                                  {val.mediatorInvolved === "1" && this.state.orderDetail.sellerEmail === val.senderEmail ?
                                    <h5>{this.formatTheCreatedAtDate(val.createdAt)} Seller to <span style={{ color: 'red' }}>Mediator</span></h5>
                                    : val.mediatorInvolved === "1" && this.state.orderDetail.customeremail === val.senderEmail ?
                                      <h5>{this.formatTheCreatedAtDate(val.createdAt)} Buyer to <span style={{ color: 'red' }}>Mediator</span></h5>
                                      : val.mediatorInvolved === "1" && this.state.orderDetail.sellerEmail !== val.senderEmail && this.state.selectedJob.customeremail === val.receiverEmail ?
                                        <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Buyer</h5>
                                        : val.mediatorInvolved === "1" && this.state.orderDetail.customeremail !== val.senderEmail ?
                                          <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Seller</h5>
                                          : val.superMediatorInvolved === "1" && this.state.orderDetail.sellerEmail !== val.senderEmail && this.state.selectedJob.customeremail === val.receiverEmail ?
                                            <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Super Mediator</span> to Buyer</h5>
                                            : val.superMediatorInvolved === "1" && this.state.orderDetail.customeremail !== val.senderEmail ?
                                              <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Super Mediator</span> to Seller</h5>
                                              :
                                              <h5>{this.formatTheCreatedAtDate(val.createdAt)} Seller to Buyer</h5>
                                  }
                                  <h3>{val.message}</h3>
                                </div>
                                : <div className="messageSenderBuyToSell">
                                  {val.mediatorInvolved === "1" && this.state.orderDetail.sellerEmail === val.senderEmail ?
                                    <h5>{this.formatTheCreatedAtDate(val.createdAt)} Seller to <span style={{ color: 'red' }}>Mediator</span></h5>
                                    : val.mediatorInvolved === "1" && this.state.orderDetail.customeremail === val.senderEmail ?
                                      <h5>{this.formatTheCreatedAtDate(val.createdAt)} Buyer to <span style={{ color: 'red' }}>Mediator</span></h5>
                                      : val.mediatorInvolved === "1" && this.state.orderDetail.sellerEmail !== val.senderEmail && this.state.selectedJob.customeremail === val.receiverEmail ?
                                        <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Buyer</h5>
                                        : val.mediatorInvolved === "1" && this.state.orderDetail.customeremail !== val.senderEmail ?
                                          <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Mediator</span> to Seller</h5>
                                          : val.superMediatorInvolved === "1" && this.state.orderDetail.sellerEmail !== val.senderEmail && this.state.selectedJob.customeremail === val.receiverEmail ?
                                            <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Super Mediator</span> to Buyer</h5>
                                            : val.superMediatorInvolved === "1" && this.state.orderDetail.customeremail !== val.senderEmail ?
                                              <h5>{this.formatTheCreatedAtDate(val.createdAt)} <span style={{ color: 'red' }}>Super Mediator</span> to Seller</h5>
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
                      {/* {this.state.wantToOpenMsg.message} */}
                    </div>
                  </div>}
            {messageBtnUI}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
