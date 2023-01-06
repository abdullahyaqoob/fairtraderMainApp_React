// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

import FTPToken from "../../ABIS_CutFeeGiveOrdrId/FTPToken.json";
import EthSwap from "../../ABIS_CutFeeGiveOrdrId/EthSwap.json";
import Web3 from "web3";

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
import sendMessageAdd from "../../Images/Invoice/sendMessageAdd.png";
import addedFilesSndMessage from "../../Images/Invoice/addedFilesSndMessage.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      invoicePurchaseHistoryDisputeData: [],
      magnifierViewUser: {},
      fivePercentOfInvoiceInFTPCrntPrice: 0,
      searchUserMagnifierViewUnpaid: false,
      searchUserMagnifierViewPaid: false,
      mediationStarted: false,
      totalAmountVarUnpaid: 0,
      totalAmountVarPaid: 0,
      senMsgToMedOrSellerTextereaValue: '',
      allMessages: "",
      magnifierViewUserViewPDF: false,
      purchasehistoryPaidBtn: false,
      resolutionSelectedPaid: false,
      contractSelectedPaid: false,
      ViewAddNotePaid: false,
      mediatorSendMsgTo: "Buyer",
      editInvoiceHandler: false,
      propData: {},
      userAccountEmail: '',
      magnifierViewUserIndex: '',
      bnbPriceInUSD: ''

    };
  }
  componentDidMount() {
    this.userAddressHandle();
    this.loadBlockchainData();

    axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")
      .then((res) => {
        console.log(res.data.price);
        let fixedPrice = Number(res.data.price).toFixed(1)
        this.setState({ bnbPriceInUSD: fixedPrice })
      }).then((err) => {
        console.log(err);
      })
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
        // load Blockchain Data
        const web3 = window.web3;

        const networkId = await web3.eth.net.getId();
        // this.setState({ networkId })
        console.log(networkId);
        this.setState({ ethSwapAddressWithConnectedNetworkID: EthSwap.networks[networkId].address })


        // Load EthSwap
        const ethSwapData = EthSwap.networks[networkId];
        if (ethSwapData) {
          const ethSwap = new web3.eth.Contract(
            EthSwap.abi,
            ethSwapData.address
          );
          this.setState({ ethSwap });
        } else {
          window.alert(
            // "Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon."
            "Invalid Network Id. Please select ** Ganache ** from Metamask to Continue. Ethereum Comming Soon."
          );
        }

        // Load Token
        const tokenFTPData = FTPToken.networks[networkId];
        if (tokenFTPData) {
          const FTPTokenVar = new web3.eth.Contract(
            FTPToken.abi,
            tokenFTPData.address
          );
          this.setState({ FTPToken: FTPTokenVar });

          // 7999999
          // let connectedUserBalance = await FTPTokenVar.methods
          //   .balanceOf(this.state.userAddres)
          //   .call();
          // console.log('connectedUserBalanceOfToken', window.web3.utils.fromWei(connectedUserBalance, "Ether"));

        } else {
          window.alert(
            // "Invalid Network Id. Please select ** Binanace ** from Metamask to Continue. Ethereum Comming Soon."
            "Invalid Network Id. Please select ** Ganache ** from Metamask to Continue. Ethereum Comming Soon."
          );
        }
      }
    } else {
      setTimeout(() => {
        this.loadBlockchainData();
      }, 250);
    }
  };

  mapFunctionAmountUnpaid = (value) => {
    console.log(value.Amount);
    this.setState({
      totalAmountVarUnpaid:
        Number(this.state.totalAmountVarUnpaid) + Number(value.Amount),
    });
  };

  sendMsgToSeller = async () => {
    let addNoteTextereaValue = document.getElementById("addNoteTexterea").value
    if (addNoteTextereaValue === "") {
      toast.error("Please, first add note", {
        position: "top-right",
      });
    } else {
      if (this.state.magnifierViewUser.customeremail !== "" && this.state.magnifierViewUser.id !== "") {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}message/createMsg`, {
            senderEmail: this.state.userAccountEmail,
            receiverEmail: this.state.magnifierViewUser.customeremail,
            message: addNoteTextereaValue,
            orderId: this.state.magnifierViewUser.id,
            invoiceName: this.state.magnifierViewUser.invoiceName
          })
          .then((res) => {
            console.log(res);
            toast.success("Message Sent to Buyer", {
              position: "top-right",
            });
            document.getElementById("addNoteTexterea").value = ""
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }

  mapFunctionAmountPaid = (value) => {
    console.log(value.Amount);
    this.setState({
      totalAmountVarPaid:
        Number(this.state.totalAmountVarPaid) + Number(value.Amount),
    });
  };


  handleSendMessageToMed = () => {
    let mediatorMsgField = this.state.senMsgToMedOrSellerTextereaValue
    console.log('mediatorMsgField', mediatorMsgField);
    if (mediatorMsgField === "" || mediatorMsgField === undefined) {
      toast.error("Please type some message", {
        position: "top-right",
      });
    } else {
      if (this.state.mediatorSendMsgTo === "Buyer") {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}message/createMsg`, {
            senderEmail: this.state.userAccountEmail,
            receiverEmail: this.state.magnifierViewUser.customeremail,
            message: mediatorMsgField,
            orderId: this.state.magnifierViewUser.id,
            invoiceName: this.state.magnifierViewUser.invoiceName
          })
          .then((res) => {
            toast.success("Message Sent to Buyer", {
              position: "top-right",
            });
            document.getElementById("senMsgToMedOrSellerTextereaValue").value = ""
            this.setState({ senMsgToMedOrSellerTextereaValue: "" })
          }).catch((err) => {
            console.log(err);
          })
      } else {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}message/getMedEmailForMsg`, {
            mediatorId: this.state.magnifierViewUser.mediator
          })
          .then((res) => {
            if (res.data !== "") {
              axios
                .post(`${process.env.REACT_APP_BASE_URL}message/mediatorSendMsg`, {
                  senderEmail: this.state.userAccountEmail,
                  receiverEmail: res.data,
                  message: mediatorMsgField,
                  orderId: this.state.magnifierViewUser.id,
                  invoiceName: this.state.selectedJob.invoiceName
                })
                .then((res) => {
                  toast.success("Message Sent to Mediator", {
                    position: "top-right",
                  });
                  document.getElementById("senMsgToMedOrSellerTextereaValue").value = ""
                }).catch((err) => {
                  console.log(err);
                })
            }
          }).catch((err) => {
            console.log(err);
          })
      }
    }
  }

  formatTheCreatedAtDate(e) {
    let newDateDate = new Date(e).toLocaleString()
    return newDateDate.substring(0, 10)
  }
  async showSelectedUserMsgs(e) {
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
        orderId: e
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

      }).catch((err) => {
        console.log(err);
      })
  }

  handleStartMediation = async () => {
    console.log(this.state.magnifierViewUser);
    console.log(this.state.fivePercentOfInvoiceInFTPCrntPrice);
    if (this.state.magnifierViewUser.mediation === false && this.state.fivePercentOfInvoiceInFTPCrntPrice !== 0) {
      this.state.FTPToken.methods
        .approve(
          this.state.ethSwapAddressWithConnectedNetworkID,
          // Amount
          // window.web3.utils.toWei("1", "Ether")
          window.web3.utils.toWei(this.state.fivePercentOfInvoiceInFTPCrntPrice.toString(), "Ether")
        )
        .send({ from: this.state.userAddres })
        .on("transactionHash", (hash) => {
          setTimeout(() => {
            this.state.ethSwap.methods
              .payFeeForMediator(
                window.web3.utils.toWei(this.state.fivePercentOfInvoiceInFTPCrntPrice.toString(), "Ether"),
                // window.web3.utils.toWei('1', "Ether"),
                "seller",
                this.state.magnifierViewUserIndex,
                this.state.magnifierViewUser.customerWalletAddress
              )
              .send({
                from: this.state.userAddres,
              })
              .on("transactionHash", async (hash) => {
                let setMediatorMediatonsCompleted = false;

                // Server side work

                await axios
                  .post(`${process.env.REACT_APP_BASE_URL}mediationAndAppeals/setMediatorsMediations`, {
                    mediator: this.state.magnifierViewUser.mediator,
                    whoStarted: this.state.userAccountEmail
                  })

                  .then((res) => {
                    console.log(res);
                    setMediatorMediatonsCompleted = true;
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                axios
                  .put(`${process.env.REACT_APP_BASE_URL}order/orderStartMediation`, {
                    orderId: this.state.magnifierViewUser.id,
                    mediationStatus: true,
                    whoStartMediation: "seller"
                  })

                  .then((res) => {
                    navigationFUnc()
                    function navigationFUnc() {
                      console.log(setMediatorMediatonsCompleted);
                      if (setMediatorMediatonsCompleted === true) {
                        setTimeout(() => {
                          window.location = "SalesHistory";
                        }, 2000);

                        toast.success("Successfully, Started", {
                          position: "top-right",
                        });
                      } else {
                        setTimeout(navigationFUnc, 250);
                      }
                    }
                    // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
                  })
                  .catch((err) => {
                    console.log(err);
                  });

              });
          }, 2000);
        })
    } else {
      toast.error("Already, Started", {
        position: "top-right",
      });
    }
  };

  handleSuperMediationInvolved = async () => {
    this.state.FTPToken.methods
      .approve(
        this.state.ethSwapAddressWithConnectedNetworkID,
        // Amount
        // window.web3.utils.toWei("1", "Ether")
        window.web3.utils.toWei(this.state.fivePercentOfInvoiceInFTPCrntPrice, "Ether")
      )
      .send({ from: this.state.userAddres })
      .on("transactionHash", (hash) => {
        console.log(this.state.magnifierViewUserIndex);
        console.log(this.state.magnifierViewUser.customerWalletAddress);
        console.log(this.state.ethSwapAddressWithConnectedNetworkID);
        setTimeout(() => {
          this.state.ethSwap.methods
            .payFeeForSuperMediator(
              // window.web3.utils.toWei(this.state.fivePercentOfInvoiceInFTPCrntPrice, "Ether"),
              window.web3.utils.toWei('1', "Ether"),
              "seller",
              this.state.magnifierViewUserIndex,
              this.state.magnifierViewUser.customerWalletAddress
            )
            .send({
              from: this.state.userAddres,
            })
            .on("transactionHash", async (hash) => {
              console.log(this.state.magnifierViewUser.id);
              let setMediatorMediatonsCompleted = false;
              // Server side work
              await axios
                .post(`${process.env.REACT_APP_BASE_URL}mediationAndAppeals/setMediatorsAppeals`, {
                  mediator: this.state.magnifierViewUser.mediator,
                  whoStarted: this.state.userAccountEmail
                })

                .then((res) => {
                  console.log(res);
                  setMediatorMediatonsCompleted = true;
                })
                .catch((err) => {
                  console.log(err);
                });

              axios
                .post(`${process.env.REACT_APP_BASE_URL}mediate/superMediatorInvolved`, {
                  orderId: this.state.magnifierViewUser.id,
                  whoCalled: "seller"
                })

                .then((res) => {
                  console.log(res);
                  navigationFUnc()
                  function navigationFUnc() {
                    console.log(setMediatorMediatonsCompleted);
                    if (setMediatorMediatonsCompleted === true) {
                      setTimeout(() => {
                        window.location = "SalesHistory";
                      }, 2000);

                      toast.success("Successfully, Involved", {
                        position: "top-right",
                      });
                    } else {
                      setTimeout(navigationFUnc, 250);
                    }
                  }
                  // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        }, 2000);
      })
  }


  findFeeOfApeal = () => {
    axios
      .get(`${process.env.REACT_APP_FTP_Detail_URL}`)
      .then((ftpDetail) => {
        console.log('FTP DETAIL', ftpDetail.data);
        let ftpPrice = ftpDetail.data.lastPrice;

        axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")
          .then((res) => {
            let orderAmount = this.state.magnifierViewUser.Amount;
            let orderAmountInUSDT = orderAmount * res.data.price;
            let orderAmountFivePercent = orderAmountInUSDT / 100 * 5;
            let ftpInOneDollor = 1 / Number(ftpPrice);
            let fivePercentOfInvoiceInFTP = ftpInOneDollor * orderAmountFivePercent;
            this.setState({ fivePercentOfInvoiceInFTPCrntPrice: fivePercentOfInvoiceInFTP.toFixed(0) })
          }).catch((err) => {
            console.log(err);
          })

        console.log(ftpPrice);



      }).catch((err) => {
        console.log(err);
      })
  }
  userAddressHandle = async () => {
    let userAddres;
    let connectedUserEmail;
    if (this.props["props"].UserAccountAddr.userAccountAddr !== "" &&
      this.props["props"].userAccountEmail.userAccountEmail !== "") {
      userAddres = this.props["props"].UserAccountAddr.userAccountAddr;
      console.log(userAddres);
      this.setState({ userAddres })

      connectedUserEmail = this.props["props"].userAccountEmail
        .userAccountEmail;
      console.log(connectedUserEmail);
      this.setState({ userAccountEmail: connectedUserEmail })

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

      axios
        .post(`${process.env.REACT_APP_BASE_URL}invoices/salesHistory/disputes`, {
          walletaddress: userAddres,
        })

        .then((res) => {
          console.log(res.data.data);
          this.setState({ invoicePurchaseHistoryDisputeData: res.data.data });
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
    let currenctDate;
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    currenctDate = `${date}/${month < 10 ? `0${month}` : `${month}`}/${year}`

    let invoiceUnpaidBtn = (
      <div className="selectResolutionDIv invoiceThreeBtnDiv">
        <span className="alignStart">
          <Link to={{ pathname: "/Invoice" }}>
            <img src={invoiceBack} alt="invoiceBack" />
          </Link>
        </span>
      </div>
    );

    let sendMsgBtn = <div className="selectResolutionDIv invoiceThreeBtnDiv">
      <span className="alignStart">
        <img
          src={invoiceBack}
          alt="invoiceBack"
          onClick={() => {
            this.setState({ mediationStarted: false })
            this.setState({ resolutionSelectedPaid: false })
            this.setState({ invoicePaidBtn: true });
          }}
        />
      </span>
      <span className="invoiceThreeBtn">
        {this.state.mediationStarted === "startRes" ?
          <p
            className="selectResolutionBtn alignCenter"
            onClick={() => {
              this.handleSendMessageToMed();
            }}
            style={{ width: "200px" }}
          >
            Send Message
          </p>
          : <p
            className="selectResolutionBtn alignCenter"
            onClick={() => {
              this.setState({ mediationStarted: "startRes" })
            }}
            style={{ width: "200px" }}
          >
            Send Message
          </p>}
      </span>
    </div>

    let invoiceDisputeOptionsBtn;

    if (this.state.invoiceUnpaidOrder === true) {
      invoiceDisputeOptionsBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <Link to={{ pathname: "/Invoice" }}>
              <img src={invoiceBack} alt="invoiceBack" />
            </Link>
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => {
              }}
              style={{ width: "210px" }}
            >
              Apeal Decision?
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <img
              onClick={() => {
                toast.warning("Comming soon!")
              }}
              src={invoiceUnpaidReject}
              className="floatRight"
              alt="invoiceUnpaidReject"
            />
          </span>
        </div>
      );
    } else if (this.state.invoiceUnpaidOrder === false) {
      invoiceDisputeOptionsBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <Link to={{ pathname: "/Invoice" }}>
              <img src={invoiceBack} alt="invoiceBack" />
            </Link>
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => {
              }}
              style={{ width: "210px" }}
            >
              Select Invoice
            </p>
          </span>
        </div>
      );
    }



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
              }}
              style={{ width: "210px" }}
            >
              Edit Invoice
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
    } else if (this.state.invoiceUnpaidOrder === "paidInvoicePressed") {
      invoicepaidOptionsBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <img src={invoiceBack} alt="invoiceBack" />
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              style={{ width: "210px" }}
            >
              Invoice Paid
            </p>
          </span>
        </div>
      )
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
            {this.state.magnifierViewUser.payment}
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
    if (this.state.mediationStarted === "showAllMessages") {
      magnifierViewUserUI =
        <>
          <div className="messageView" style={{ marginTop: '-12px' }}>
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
              : <div
                className="attentionRedDiv"
                style={{ marginTop: "10px" }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    paddingTop: "28px",
                  }}
                >
                  This case has no messages
                </h2>
              </div>}
            {/* {this.state.wantToOpenMsg.message} */}
          </div>

          {sendMsgBtn}

        </>
    } else if (this.state.mediationStarted === "startRes") {
      magnifierViewUserUI =
        <>
          <div className="furtherDetailCOntainer" style={{ width: '100%', borderColor: '#21FFFE' }}>
            <br />
            <span className="sendMsgTxtLine">

              {this.state.mediatorSendMsgTo === "Mediator" ?
                <>
                  <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Buyer" }) }} className="smallerThanSign">{">"}</span>{" "}
                  <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Buyer" }) }}>Send Message to Buyer</span>
                </>
                :
                <>
                  <span style={{ color: 'white' }} className="smallerThanSign">{">"}</span>{" "}
                  <span style={{ color: 'white' }}>Send Message to Buyer</span>
                </>
              }
            </span>
            <hr className="furtherDetailHR" />
            {/* <span className="smallerThanSign">{">"}</span>{" "} */}
            {this.state.mediatorSendMsgTo === "Buyer" ?
              <>
                <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Mediator" }) }} className="smallerThanSign">{">"}</span>{" "}
                <span style={{ color: '#53ccf8' }} onClick={() => { this.setState({ mediatorSendMsgTo: "Mediator" }) }}>Send Message to Mediator</span>
              </>
              :
              <>
                <span style={{ color: 'white' }} className="smallerThanSign">{">"}</span>{" "}
                <span style={{ color: 'white' }}>Send Message to Mediator</span>
              </>
            }
            <br />
            <br />
            <textarea
              className="SendMessageTxtarea"
              id="senMsgToMedOrSellerTextereaValue"
              onChange={(e) => {
                this.setState({ senMsgToMedOrSellerTextereaValue: e.target.value })
              }}
            ></textarea>
            <p className="addDocsTxt">
              Add document or photos ( 0 of 5 )
            </p>
            <div className="attachFIle">
              <img src={sendMessageAdd} alt="sendMessageAdd" />
              <img
                src={addedFilesSndMessage}
                alt="addedFilesSndMessage"
              />
              <img
                src={addedFilesSndMessage}
                alt="addedFilesSndMessage"
              />
              <img
                src={addedFilesSndMessage}
                alt="addedFilesSndMessage"
              />
              <img
                src={addedFilesSndMessage}
                alt="addedFilesSndMessage"
              />
            </div>
            <br />
          </div>

          {sendMsgBtn}

        </>
    } else if (this.state.magnifierViewUserViewPDF === false) {
      magnifierViewUserUI = (
        <div>
          <div id="invoiceUnpaidSearch" style={{ marginTop: "-8px" }}>
            {/* <div id="invoiceUnpaidSearch" style={{ display: 'inherit', marginTop: '-8px' }}> */}

            <div className="row salesHistoryMagnifierContent">
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
                      {Number(this.state.magnifierViewUser.Amount * this.state.bnbPriceInUSD).toFixed(1)}USD
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
                    {!this.state.magnifierViewUser.orderStatusStopeed ?
                      <img src={invoiceUnpaidAlarm} alt="invoiceUnpaidAlarm" />
                      :
                      <img src={invoicePaymentStoppedIcon} alt="invoicePaymentStoppedIcon" />
                    }
                  </div>
                  <div className="col-8">
                    {!this.state.magnifierViewUser.orderStatusStopeed ?
                      "Pay On"
                      : "Payment"
                    }

                    <br />
                    {!this.state.magnifierViewUser.orderStatusStopeed ?
                      this.state.magnifierViewUser.payment
                      : "Stopped"
                    }

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
                    if (this.state.magnifierViewUser.mediation === false) {
                      this.setState({ resolutionSelectedPaid: true });
                    }

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
                    {this.state.magnifierViewUser.mediation === false ?
                      <p>
                        Resolution
                        <br />
                        Selected
                      </p>
                      :
                      <p onClick={() => {
                        this.setState({ mediationStarted: "showAllMessages" })

                        this.showSelectedUserMsgs(this.state.magnifierViewUser.id)

                        setInterval(() => {
                          this.showSelectedUserMsgs(this.state.magnifierViewUser.id)
                        }, 50000);
                      }}>
                        Resolution
                        <br />
                        in progress
                      </p>
                    }
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
                        {this.state.magnifierViewUser.mediation === false ?
                          <p className="resolutionSelectedTxt">
                            Resolution
                            <br />
                            Selected
                          </p>
                          :
                          <p className="resolutionSelectedTxt">
                            Resolution
                            <br />
                            started
                          </p>
                        }
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
            {this.state.magnifierViewUser.orderStatusStopeed === true && this.state.magnifierViewUser.mediation === false && this.state.ViewAddNotePaid === false & this.state.contractSelectedPaid === false && this.state.resolutionSelectedPaid === false ?
              <div id="invoiceStopPaymentContent">
                <p style={{ color: "pink" }}>
                  To start the mediation process you will
                  need to pay XX FTP in your wallet.
                </p>
                <p>
                  You can purchase the FTP in My Wallet
                  tab if you do not have the tokens
                  required to start the Resolution process.
                </p>
              </div>
              :
              ""
            }
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
                className="InvoiceAddNote InvoiceAddNotepaid addNoteBackground"
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
                            provide feedback to Buyer
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
                    <b>{currenctDate}</b>
                  </h3>
                  <textarea
                    className="viewAddNoteTexterea viewAddNoteTextereaPaid addNoteTexterea"
                    name=""
                    id="addNoteTexterea"
                  ></textarea>
                  <center>
                    <button onClick={this.sendMsgToSeller}>Send Message</button>
                  </center>
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
                  {this.state.magnifierViewUser.judgedCase === true ?
                    <>
                      {this.state.magnifierViewUser.superMediationInvolved === false ?
                        <p
                          className="selectResolutionBtn alignCenter"
                          style={{ width: "200px" }}
                          onClick={() => {
                            this.handleSuperMediationInvolved()
                          }}
                        >
                          Pay {this.state.fivePercentOfInvoiceInFTPCrntPrice} FTP Now
                        </p>
                        :
                        <p
                          className="selectResolutionBtn alignCenter"
                          style={{ width: "200px" }}
                          onClick={() => {
                          }}
                        >
                          Super Med Involved
                        </p>
                      }
                    </>
                    : this.state.magnifierViewUser.mediation === true ?
                      <p
                        className="selectResolutionBtn alignCenter"
                        style={{ width: "200px" }}
                        onClick={() => {
                          this.setState({ mediationStarted: "startRes" })
                        }}
                      >
                        {/* Not judged till */}
                        Send Message
                      </p>
                      : this.state.magnifierViewUser.paidstatus === false ?
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
                        : this.state.magnifierViewUser.orderStatusStopeed === true || this.state.magnifierViewUser.orderStatusStopeed === "1" ?
                          <p
                            className="selectResolutionBtn alignCenter"
                            onClick={() => {
                              this.setState({ mediationStarted: true })

                              // axios call
                              this.handleStartMediation()
                            }}
                            style={{ width: "200px" }}
                          >
                            Start Mediation
                          </p>
                          : <p
                            className="selectResolutionBtn alignCenter"
                            style={{ width: "200px" }}
                          >
                            Invoice Paid
                          </p>
                  }
                </span>
                {this.state.magnifierViewUser.paidstatus === false ?
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
                  : ""}
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
                            "invoiceOptionDisputes"
                          ).style.display = "none";
                          document.getElementById(
                            "invoiceOptionsPaid"
                          ).style.display = "inherit";


                          this.setState({
                            invoicePaidBtn: false,
                            invoiceUnpaidOrder: false,
                            searchUserMagnifierViewUnpaid: false,
                            searchUserMagnifierViewPaid: false,
                            resolutionSelectedPaid: false,
                            ViewAddNotePaid: false,
                            contractSelectedPaid: false,
                          });
                        }}
                      >
                        Paid <span style={{ color: "#059b34" }}>__</span>
                      </span>
                      <span style={{ color: "black" }}
                        onClick={() => {
                          document.getElementById(
                            "invoicePaidOptions"
                          ).style.display = "none";
                          document.getElementById(
                            "invoiceOptionDisputes"
                          ).style.display = "inherit";
                          document.getElementById(
                            "invoiceOptionsPaid"
                          ).style.display = "none";


                          this.setState({
                            invoicePaidBtn: false,
                            invoiceUnpaidOrder: false,
                            searchUserMagnifierViewUnpaid: false,
                            searchUserMagnifierViewPaid: false,
                            resolutionSelectedPaid: false,
                            ViewAddNotePaid: false,
                            contractSelectedPaid: false,
                          });
                        }}
                      >Disputes</span>
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
                                              <b>USD ${Number(val.Amount * this.state.bnbPriceInUSD).toFixed(1)}</b>
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
                                              <b>USD ${Number(val.Amount * this.state.bnbPriceInUSD).toFixed(1)}</b>
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
                                  {Number(this.state.totalAmountVarUnpaid * this.state.bnbPriceInUSD).toFixed(1)}
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
                  {this.state.mediationStarted === "showAllMessages" || this.state.mediationStarted === "startRes" ?
                    <p className="invoiceTabsRow" style={{ marginTop: '-10px', marginBottom: '-20px' }}>
                      <p style={{ textAlign: 'start', marginLeft: '20px', color: 'white' }}>
                        Resolution Number: #{this.state.magnifierViewUser.id}
                      </p>
                    </p>
                    :
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
                            "invoiceOptionDisputes"
                          ).style.display = "none";
                          document.getElementById(
                            "invoicePaidOptions"
                          ).style.display = "inherit";


                          this.setState({
                            invoicePaidBtn: false,
                            invoiceUnpaidOrder: false,
                            searchUserMagnifierViewUnpaid: false,
                            searchUserMagnifierViewPaid: false,
                            resolutionSelectedPaid: false,
                            ViewAddNotePaid: false,
                            contractSelectedPaid: false,
                          });
                        }}
                      >
                        Unpaid <span style={{ color: "#059b34" }}>__</span>
                      </span>
                      <span style={{ color: "white" }}>
                        Paid <span style={{ color: "#059b34" }}>__</span>
                      </span>
                      <span style={{ color: "black" }}
                        onClick={() => {
                          document.getElementById(
                            "invoicePaidOptions"
                          ).style.display = "none";
                          document.getElementById(
                            "invoiceOptionDisputes"
                          ).style.display = "inherit";
                          document.getElementById(
                            "invoiceOptionsPaid"
                          ).style.display = "none";


                          this.setState({
                            invoicePaidBtn: false,
                            invoiceUnpaidOrder: false,
                            searchUserMagnifierViewUnpaid: false,
                            searchUserMagnifierViewPaid: false,
                            resolutionSelectedPaid: false,
                            ViewAddNotePaid: false,
                            contractSelectedPaid: false,
                          });
                        }}
                      >Disputes</span>
                    </p>
                  }
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
                                    if (val.paidstatus === false) {
                                      this.setState({ invoiceUnpaidOrder: true });
                                    } else {
                                      this.setState({ invoiceUnpaidOrder: "paidInvoicePressed" });
                                    }
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
                                        {val.orderStatusStopeed === true ?
                                          <p style={{ color: "gold" }}>
                                            <b>Payment</b>
                                          </p>
                                          :
                                          <p style={{ color: "rgb(182, 255, 182)" }}>
                                            <b>Pay On:</b>
                                          </p>
                                        }
                                        <div className="invoiceUnpaidSearch">
                                          <img
                                            src={searchWhite}
                                            alt=""
                                            onClick={() => {
                                              this.findFeeOfApeal()
                                              this.setState({ magnifierViewUserIndex: i })

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
                                        {val.orderStatusStopeed === true ?
                                          <p style={{ color: "gold" }}>
                                            <b>Stopped</b>
                                          </p>
                                          :
                                          <p style={{ color: "rgb(182, 255, 182)" }}>
                                            <b>{val.payment}</b>
                                          </p>
                                        }
                                        <p>
                                          {/* <b>USD $1120.78</b> */}
                                          <b>USD ${Number(val.Amount * this.state.bnbPriceInUSD).toFixed(1)}</b>
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
                                {Number(this.state.totalAmountVarPaid * this.state.bnbPriceInUSD).toFixed(1)}
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

                  </div>
                </div>


                <div
                  className="invoiceBlackDivMainContainer"
                  id="invoiceOptionDisputes"
                  style={{ display: "none" }}
                > {this.state.mediationStarted === "showAllMessages" || this.state.mediationStarted === "startRes" ?
                  <p className="invoiceTabsRow" style={{ marginTop: '-10px', marginBottom: '-20px' }}>
                    <p style={{ textAlign: 'start', marginLeft: '20px', color: 'white' }}>
                      Resolution Number: #{this.state.magnifierViewUser.id}
                    </p>
                  </p>
                  :
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
                          "invoiceOptionDisputes"
                        ).style.display = "none";
                        document.getElementById(
                          "invoicePaidOptions"
                        ).style.display = "inherit";


                        this.setState({
                          invoicePaidBtn: false,
                          invoiceUnpaidOrder: false,
                          searchUserMagnifierViewUnpaid: false,
                          searchUserMagnifierViewPaid: false,
                          resolutionSelectedPaid: false,
                          ViewAddNotePaid: false,
                          contractSelectedPaid: false,
                        });
                      }}
                    >
                      Unpaid <span style={{ color: "#059b34" }}>__</span>
                    </span>
                    <span style={{ color: "black" }}
                      onClick={() => {
                        document.getElementById(
                          "invoicePaidOptions"
                        ).style.display = "none";
                        document.getElementById(
                          "invoiceOptionDisputes"
                        ).style.display = "none";
                        document.getElementById(
                          "invoiceOptionsPaid"
                        ).style.display = "inherit";


                        this.setState({
                          invoicePaidBtn: false,
                          invoiceUnpaidOrder: false,
                          searchUserMagnifierViewUnpaid: false,
                          searchUserMagnifierViewPaid: false,
                          resolutionSelectedPaid: false,
                          ViewAddNotePaid: false,
                          contractSelectedPaid: false,
                        });
                      }}>
                      Paid <span style={{ color: "#059b34" }}>__</span>
                    </span>
                    <span style={{ color: "white" }}>Disputes</span>
                  </p>
                  }
                  <div className="invoiceBlackContainer invoiceOrderBlackDiv">
                    {this.state.searchUserMagnifierViewPaid === false ? (
                      <div id="invoiceUnPaidSection">
                        {/* <div id="invoiceAllUnpaidBoxes" style={{ display: 'none' }}> */}
                        {this.state.invoicePurchaseHistoryDisputeData.length !== 0 ? (
                          <div
                            id="invoiceAllUnpaidBoxes"
                            style={{ marginTop: "-18px" }}
                          >
                            {this.state.invoicePurchaseHistoryDisputeData.map(
                              (val, i) => (
                                <div
                                  className="invoiceBlackDiv invoiceOrderBlackSubDiv invoiceOrderBlackSubDivColorWhite disputeORdersSubDivs"
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
                                        {/* {val.judgedCase === false ?
                                      <p>
                                        Review
                                      </p>
                                      :
                                      <p style={{ color: "yellow" }}>
                                        <b>Finalised</b>
                                      </p>
                                    } */}
                                        {val.judgedCase === false ?
                                          <p>
                                            Review
                                          </p>
                                          : val.judgedCase === true && val.superMediationInvolved === false ?
                                            <p style={{ color: "yellow" }}>
                                              <b>Finalised</b>
                                            </p>
                                            : val.superMediationInvolved === true && val.superJudgedCase === false ?
                                              <p style={{ color: "red" }}>
                                                <b>Appealed</b>
                                              </p>
                                              : <p style={{ color: "yellow" }}>
                                                <b>Finalised</b>
                                              </p>
                                        }
                                        {/* <p style={{ color: "rgb(182, 255, 182)" }}> */}

                                        <div className="invoiceUnpaidSearch">
                                          <img
                                            src={searchWhite}
                                            alt=""
                                            onClick={() => {
                                              this.findFeeOfApeal()
                                              this.setState({ magnifierViewUserIndex: i })

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
                                        {/* {val.judgedCase === false ?
                                      <p style={{ fontSize: '13px' }}>
                                        in progress
                                      </p>
                                      :
                                      <p style={{ color: "yellow", fontSize: '13px' }}>
                                        Appeal: {val.apealtime} days
                                      </p>
                                    } */}
                                        {val.judgedCase === false ?
                                          <p style={{ fontSize: '13px' }}>
                                            in progress
                                          </p>
                                          : val.judgedCase === true && val.superMediationInvolved === false ?
                                            <p style={{ color: "yellow", fontSize: '13px' }}>
                                              Appeal: {val.apealtime} days
                                            </p>
                                            : val.superMediationInvolved === true && val.superJudgedCase === false ?
                                              <p style={{ color: "red", fontSize: '13px' }}>
                                                Super Med
                                              </p>
                                              : <p style={{ color: "yellow", fontSize: '13px' }}>
                                                Revoked
                                              </p>
                                        }
                                        <p>
                                          {/* <b>USD $1120.78</b> */}
                                          <b>USD ${Number(val.Amount * this.state.bnbPriceInUSD).toFixed(1)}</b>
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
                                {Number(this.state.totalAmountVarPaid * this.state.bnbPriceInUSD).toFixed(1)}
                              </p>
                            </div>

                            {invoiceDisputeOptionsBtn}
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
            <ToastContainer />
          </div>
          : <CreateInvoice propdata={this.state.propData} businessName={this.props["props"].userBusinessname.userBusinessname} />
        }
      </>
    );
  }
}

export default PurchaseHistory;
