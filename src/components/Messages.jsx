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
// import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultView: "All",
      userAccountEmail: "",
      allMessages: "",
      allMessagesMailer: "",
      wantToOpenMsgOfUser: ''
    };
  }
  async componentWillMount() {
    this.userConnectedEmail();
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

      setInterval(() => {
        this.mountedAxiosCallsForMessages()
      }, 50000);

    } else {
      setTimeout(this.userConnectedEmail, 250);
    }
  }

  sentMessageHandler() {
    console.log(this.state.wantToOpenMsgOfUser);
    // return
    if (document.getElementById("messageToTxtFeild").value !== "") {
      let messageToTxtFeild = document.getElementById("messageToTxtFeild").value
      let messageTextareaTxt = document.getElementById("messageTextareaTxt").value
      let options = {
        senderEmail: this.state.userAccountEmail,
        receiverEmail: messageToTxtFeild,
        message: messageTextareaTxt
      }

      if (this.state.wantToOpenMsgOfUser.mediatorInvolved === false || this.state.wantToOpenMsgOfUser === "") {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}message/createMsg`, options)

          .then((res) => {
            toast.success("Message Sent", {
              position: "top-right",
            });

            document.getElementById("messageTextareaTxt").value = ""
            document.getElementById("messageToTxtFeild").value = ""
          }).catch((err) => {
            console.log(err);
          })
      } else {
        console.log(options);

        axios
          .post(`${process.env.REACT_APP_BASE_URL}message/mediatorSendMsg`, options)

          .then((res) => {
            toast.success("Message Sent to Mediator", {
              position: "top-right",
            });

            document.getElementById("messageTextareaTxt").value = ""
            document.getElementById("messageToTxtFeild").value = ""
          }).catch((err) => {
            console.log(err);
          })
      }


    } else {
      toast.error("Please first type the recipient email", {
        position: "top-right",
      });
    }
  }

  async showSelectedUserMsgs(e) {
    console.log(e);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}message/getAllSecondPersonEmailsMessages`, {
        istEmail: this.state.userAccountEmail,
        secEmail: e,
      })

      .then((res) => {
        console.log(res.data);
        let respData = res.data
        respData.sort(function (a, b) { return a.id - b.id });
        this.setState({ allMessages: respData })
        if (respData.length === 0) {
          setTimeout(this.showSelectedUserMsgs, 250);
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
            <p
              className="selectResolutionBtn alignCenter messageBtn"
              onClick={() => {
                this.setState({ defaultView: "Sent" })
              }}
              style={{ width: "200px" }}
            >
              Reply
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
              {this.state.defaultView === "All" || this.state.defaultView === "View" ?
                <p style={{ color: "white" }} onClick={() => { this.setState({ defaultView: "All" }) }}>All</p>
                :
                <p onClick={() => { this.setState({ defaultView: "All" }) }}>All</p>
              }
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
              {this.state.defaultView === "Sent" ?
                <p style={{ color: "white" }} onClick={() => { this.setState({ defaultView: "Sent" }); this.setState({ wantToOpenMsgOfUser: "" }) }}>Sent</p>
                :
                <p onClick={() => { this.setState({ defaultView: "Sent" }); this.setState({ wantToOpenMsgOfUser: "" }) }}>Sent</p>
              }
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
                    <span>From</span>
                  </div>
                  <div className="messagedate">
                    <span>Date</span>
                  </div>
                </div>

                {/* Table BODY */}
                {/* <div className="dummyTableMessageBOdy">
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
                </div> */}


                {/* {this.state.allMessages.map(((val, index) => {
                  <div>
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
                           <span>{this.takeTheSecondPersonEmail(val)}</span>
                        </label>
                      </div>
                      <div className="messagedate">
                        <span>09 Jul</span>
                      </div>
                    </div>
                    <hr className="messagesHR" />
                  </div>
                }))
                } */}
                {this.state.allMessagesMailer.length !==
                  // 0 ?
                  0 ?
                  <div>
                    {this.state.allMessagesMailer.map(
                      (value, i) => (
                        <div>
                          <div className="messagesDiv messagesVl" onClick={() => {
                            this.setState({ wantToOpenMsgOfUser: value })
                            this.setState({ defaultView: "View" })

                            this.showSelectedUserMsgs(value.user)

                            setInterval(() => {
                              this.showSelectedUserMsgs(this.state.wantToOpenMsgOfUser.user)
                            }, 50000);
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
                            </div>
                            <div className="messagefrom">
                              <label htmlFor="messageIndex1">
                                {/* <span>{this.takeTheSecondPersonEmail(value)}</span> */}
                                <span>{value.user}</span>
                              </label>
                            </div>
                            <div className="messagedate" style={{ whiteSpace: 'nowrap' }}>
                              <span>{this.createdAtDate(value.time)}</span>
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
                      {this.state.wantToOpenMsgOfUser.user !== "" ?
                        <input type="InvoiceinvoiceFields" value={this.state.wantToOpenMsgOfUser.user} placeholder="Email Address" id="messageToTxtFeild" className="messageToTxtFeild" />
                        :
                        <input type="InvoiceinvoiceFields" placeholder="Email Address" id="messageToTxtFeild" className="messageToTxtFeild" />
                      }
                    </div>
                  </div>
                  <textarea name="" id="messageTextareaTxt" className="messageTextarea"></textarea>
                </div>
                : <div>
                  <div className="messageView">
                    {this.state.allMessages.length !== 0 ?
                      <div>
                        {this.state.allMessages.map((val, i) => (
                          <>
                            {val.senderEmail === this.state.userAccountEmail ?
                              <div className="messageSenderBuyToSell">
                                {val.mediatorInvolved === "1" ?
                                  <h5>{this.formatTheCreatedAtDate(val.createdAt)} Buyer to Mediator</h5>
                                  :
                                  <h5>{this.formatTheCreatedAtDate(val.createdAt)} Buyer to Seller</h5>
                                }
                                <h3>{val.message}</h3>
                              </div>
                              : <div className="messageSenderSellToBuy">
                                {val.mediatorInvolved === "1" ?
                                  <h5>{this.formatTheCreatedAtDate(val.createdAt)} Mediator to Buyer</h5>
                                  :
                                  <h5>{this.formatTheCreatedAtDate(val.createdAt)} Seller to Buyer</h5>
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
