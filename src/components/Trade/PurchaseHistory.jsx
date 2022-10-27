// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

import FTPToken from "../../ABIS_CutFeeGiveOrdrId/FTPToken.json";
import EthSwap from "../../ABIS_CutFeeGiveOrdrId/EthSwap.json";

import Web3 from "web3";

// Images
import fairtraderLogo from "../../Images/fairtraderLogo.png";
import searchBtn from "../../Images/searchBtn.png";
import toggleBtn from "../../Images/toggleBtn.png";
import invoice from "../../Images/activeInvoice.png";
import resolution from "../../Images/resolution.png";
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
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
import invoiceLink from "../../Images/Invoice/invoiceLink.png";
import invoiceMap from "../../Images/Invoice/invoiceMap.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

// IPFS INTEGRATION
const ipfsClient = require("ipfs-http-client");
const projectId = "2DQF4jU6gmpIxp2AcOpLKardvUp";
const projectSecret = "db6faf1d3cbf8f03a61d3397719f493b";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
}); // leaving out the arguments will default to these values
// IPFS INTEGRATION ENDED

class PurchaseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createInvoice: false,
      invoiceUnpaidOrder: false,
      invoicePaidBtn: false,
      invoicePaymentStopped: false,
      userAddres: "",
      invoicePurchaseHistoryUnpaidData: [],
      invoicePurchaseHistorypaidData: [],
      magnifierViewUser: {},
      searchUserMagnifierViewUnpaid: false,
      searchUserMagnifierViewPaid: false,
      SelectedOrder: {},
      selectedOrderInvoiceFileIpfs: "",
      selectedOrderTermsFileIpfs: "",
      selectedOrderWarrantyFileIpfs: "",
      userSelectedCurrency: "",
      FTPToken: {},
      ethSwap: {},
      payingStart: false,
      totalAmountVarUnpaid: 0,
      totalAmountVarPaid: 0,
      magnifierViewUserViewPDF: false,
      purchasehistoryPaidBtn: false,
      resolutionSelectedPaid: false,
      contractSelectedPaid: false,
      ViewAddNotePaid: false,
      paymentIsStopped: false,
      mediationStarted: false,
      userAccountEmail: ''
    };
  }
  // handlePayNowFunc1stStep = () => {

  componentDidMount = async () => {
    this.loadBlockchainData();

    this.userAddressHandle();
  };
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
  handleSendMessageToMed = () => {
    let mediatorMsgField = document.getElementById("sendMsgToMed").value
    if (mediatorMsgField === "") {
      toast.error("Please type some message", {
        position: "top-right",
      });
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
                orderId: this.state.magnifierViewUser.id
              })
              .then((res) => {
                toast.success("Message Sent to Mediator", {
                  position: "top-right",
                });
                document.getElementById("sendMsgToMed").value = ""
              }).catch((err) => {
                console.log(err);
              })
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  handlePayNowFunc1stStep = () => {
    document.getElementById("invoiceUnpaidSelectedOption").style.display =
      "inherit";
    document.getElementById("invoiceAllUnpaidBoxes").style.display = "none";
  };
  handlePayNowFunc2ndStep = () => {
    let SelectedOrder = this.state.SelectedOrder;

    this.setState({ payingStart: "working" });

    // CHECKING CURRENCY SELECTED OR NOT OR WHITCH SELECTED
    let userSelectedCurrency = "";

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}user/showSelectedCurrency/${this.props["props"].UserAccountAddr.userAccountAddr}`
      )
      .then(async (res) => {
        userSelectedCurrency = res.data.currencySelected;
        console.log(res.data.currencySelected);
        this.setState({ userSelectedCurrency: res.data.currencySelected });

        // iF NOT THEN SELECT FIRT
        if (res.data.currencySelected === "") {
          toast.error("Please First Select My Payment option", {
            position: "top-right",
          });
          setTimeout(() => {
            window.location = "MyPayment"
          }, 2000);
        } else {
          // const url = 'http://localhost:5000/Images/User/1659596483933.jpg'
          const attachfilesURL = `${process.env.REACT_APP_BASE_URL}${SelectedOrder.attachfiles}`;
          console.log(attachfilesURL);
          const attachfilesFileName = SelectedOrder.attachfiles;
          let attachfilesFullFile;

          await fetch(attachfilesURL).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            const file = new File([blob], attachfilesFileName, { contentType });
            // access file here
            console.log(file);
            attachfilesFullFile = file;
          });

          const termsandconditionsfileURL = `${process.env.REACT_APP_BASE_URL}${SelectedOrder.termsandconditionsfile}`;
          const termsandconditionsfileFileName =
            SelectedOrder.termsandconditionsfile;
          let termsandconditionsfileFullFile;

          await fetch(termsandconditionsfileURL).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            const file = new File([blob], termsandconditionsfileFileName, {
              contentType,
            });
            // access file here
            console.log(file);
            termsandconditionsfileFullFile = file;
          });

          const invoicefileURL = `${process.env.REACT_APP_BASE_URL}${SelectedOrder.invoicefile}`;
          const invoicefileFileName = SelectedOrder.invoicefile;
          let invoicefileFullFile;

          await fetch(invoicefileURL).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            const file = new File([blob], invoicefileFileName, { contentType });
            // access file here
            console.log(file);
            invoicefileFullFile = file;

            const reader = new window.FileReader();
            reader.readAsArrayBuffer(attachfilesFullFile);
            reader.onloadend = () => {
              console.log(Buffer(reader.result));
              ipfs.add(Buffer(reader.result), (error, result) => {
                console.log("Ipfs result", result);
                console.log("Ipfs result Error", error);
                if (error) {
                  console.error(error);
                  return;
                }

                this.setState({
                  selectedOrderWarrantyFileIpfs: result[0].hash,
                });
                console.log(
                  "selectedOrderWarrantyFileIpfs",
                  this.state.selectedOrderWarrantyFileIpfs
                );

                // another One (SECOND)

                const reader2 = new window.FileReader();
                reader2.readAsArrayBuffer(termsandconditionsfileFullFile);
                reader2.onloadend = () => {
                  console.log(Buffer(reader2.result));
                  ipfs.add(Buffer(reader2.result), (error, result) => {
                    console.log("Ipfs result2", result);
                    console.log("Ipfs result2 Error", error);
                    if (error) {
                      console.error(error);
                      return;
                    }

                    this.setState({
                      selectedOrderTermsFileIpfs: result[0].hash,
                    });

                    console.log(
                      "selectedOrderTermsFileIpfs",
                      this.state.selectedOrderTermsFileIpfs
                    );

                    // ANOTHER ONE (third)

                    const reader3 = new window.FileReader();
                    reader3.readAsArrayBuffer(invoicefileFullFile);
                    reader3.onloadend = () => {
                      console.log(Buffer(reader3.result));
                      ipfs.add(Buffer(reader3.result), (error, result) => {
                        console.log("Ipfs result3", result);
                        console.log("Ipfs result3 Error", error);
                        if (error) {
                          console.error(error);
                          return;
                        }

                        this.setState({
                          selectedOrderInvoiceFileIpfs: result[0].hash,
                        });
                        console.log(
                          "selectedOrderInvoiceFileIpfs",
                          this.state.selectedOrderInvoiceFileIpfs
                        );
                        this.callSmartContract();
                      });
                    };
                  });
                };
              });
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  sendMsgToSeller = async () => {
    let addNoteTextereaValue = document.getElementById("addNoteTexterea").value
    if (addNoteTextereaValue === "") {
      toast.error("Please, first add note", {
        position: "top-right",
      });
    } else {
      console.log(addNoteTextereaValue);
      console.log(this.state.SelectedOrder);
      if (this.state.SelectedOrder.sellerEmail !== "" && this.state.SelectedOrder.id !== "") {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}message/createMsg`, {
            senderEmail: this.state.userAccountEmail,
            receiverEmail: this.state.SelectedOrder.sellerEmail,
            message: addNoteTextereaValue,
            orderId: this.state.SelectedOrder.id
          })
          .then((res) => {
            console.log(res);
            toast.success("Message Sent to Seller", {
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
  callRejectHandleFunc = async () => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}order/updateOrderStatusRejected`, {
        orderId: this.state.SelectedOrder.id,
      })

      .then((res) => {
        console.log(res);
        setTimeout(() => {
          window.location = "PurchaseHistory";
        }, 2000);

        toast.success("Successfully, Rejected", {
          position: "top-right",
        });
        // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleStartMediation = async () => {
    if (this.state.magnifierViewUser.mediation === false) {

      // Server side work
      axios
        .put(`${process.env.REACT_APP_BASE_URL}order/orderStartMediation`, {
          orderId: this.state.SelectedOrder.id,
          mediationStatus: true,
        })

        .then((res) => {
          console.log(res);
          // setTimeout(() => {
          //   window.location = "PurchaseHistory";
          // }, 2000);

          toast.success("Successfully, Started", {
            position: "top-right",
          });
          // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Already, Started", {
        position: "top-right",
      });
    }
  };

  callStopHandleFunc = async () => {
    if (this.state.magnifierViewUser.orderStatusStopeed === false && this.state.paymentIsStopped === false) {

      // Client side Work

      document.getElementById(
        "invoiceStopPaymentContent"
      ).style.display = "inherit";
      this.setState({ paymentIsStopped: true })




      // Server side work
      axios
        .put(`${process.env.REACT_APP_BASE_URL}order/updateOrderStatusStop`, {
          orderId: this.state.SelectedOrder.id,
          orderStatus: true,
        })

        .then((res) => {
          console.log(res);
          // setTimeout(() => {
          //   window.location = "PurchaseHistory";
          // }, 2000);

          toast.success("Successfully, Stopped", {
            position: "top-right",
          });
          // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Already, Stopped", {
        position: "top-right",
      });
    }
  };

  callSmartContract = async () => {
    let SelectedOrder = this.state.SelectedOrder;

    if (
      this.state.selectedOrderInvoiceFileIpfs === "" ||
      this.state.selectedOrderTermsFileIpfs === "" ||
      this.state.selectedOrderWarrantyFileIpfs === ""
    ) {
      setTimeout(this.callSmartContract, 300);

      console.log("again");
    } else {
      console.log("completed");

      console.log(this.state.userAddres);
      let userSelectedCurrency = this.state.userSelectedCurrency;
      console.log('userSelectedCurrency', userSelectedCurrency);
      //   //  SMART CONTRACT CALL
      if (userSelectedCurrency === "bnbCoin") {
        this.state.ethSwap.methods
          .buyWithBNB(
            SelectedOrder.id,
            this.state.selectedOrderWarrantyFileIpfs,
            this.state.selectedOrderTermsFileIpfs,
            SelectedOrder.apealtime,
            SelectedOrder.sellerwalletaddress,
            this.state.selectedOrderInvoiceFileIpfs,
            SelectedOrder.customeremail,
            SelectedOrder.mediator,
            false,
            SelectedOrder.friendsemail
          )
          .send({
            // Amount
            // value: "1000000000000000000",
            value: window.web3.utils.toWei(SelectedOrder.Amount, "Ether"),
            from: this.state.userAddres,
          })
          .on("transactionHash", (hash) => {
            console.log("hash", hash);
            this.fncToPayOrder();
          });
      } else if (userSelectedCurrency === "ftpCoin") {
        this.state.token.methods
          .approve(
            this.state.ethSwap.address,
            // Amount
            // window.web3.utils.toWei("1", "Ether")
            window.web3.utils.toWei(SelectedOrder.Amount, "Ether")
          )
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            setTimeout(() => {
              this.state.ethSwap.methods
                .buyWithFTP(
                  SelectedOrder.id,
                  // Amount
                  // "1000000000000000000",
                  window.web3.utils.toWei(SelectedOrder.Amount, "Ether"),
                  this.state.selectedOrderWarrantyFileIpfs,
                  this.state.selectedOrderTermsFileIpfs,
                  SelectedOrder.apealtime,
                  SelectedOrder.sellerwalletaddress,
                  this.state.selectedOrderInvoiceFileIpfs,
                  SelectedOrder.customeremail,
                  SelectedOrder.mediator,
                  false,
                  SelectedOrder.friendsemail
                )
                .send({
                  from: this.state.userSelectedCurrency,
                })
                .on("transactionHash", (hash) => {
                  console.log("hash", hash);
                  this.fncToPayOrder();
                });
            }, 2000);
          });
      } else if (userSelectedCurrency === "usdtCoin") {
        this.state.token.methods
          .approve(
            this.state.ethSwap.address,
            // Amount
            // window.web3.utils.toWei("1", "Ether")
            window.web3.utils.toWei(SelectedOrder.Amount, "Ether")
          )
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            setTimeout(() => {
              this.state.ethSwap.methods
                .buyWithUsdt(
                  SelectedOrder.id,
                  // Amount
                  // "1000000000000000000",
                  window.web3.utils.toWei(SelectedOrder.Amount, "Ether"),
                  this.state.selectedOrderWarrantyFileIpfs,
                  this.state.selectedOrderTermsFileIpfs,
                  SelectedOrder.apealtime,
                  SelectedOrder.sellerwalletaddress,
                  this.state.selectedOrderInvoiceFileIpfs,
                  SelectedOrder.customeremail,
                  SelectedOrder.mediator,
                  false,
                  SelectedOrder.friendsemail
                )
                .send({
                  from: this.state.userSelectedCurrency,
                })
                .on("transactionHash", (hash) => {
                  console.log("hash", hash);
                  this.fncToPayOrder();
                });
            }, 2000);
          });
      }
    }
  };

  fncToPayOrder = async () => {
    console.log('connected User Address,', this.state.userAddres);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}order/updateOrderStatus`, {
        orderId: this.state.SelectedOrder.id,
        customerWalletAddress: this.state.userAddres
      })

      .then((res) => {
        console.log(res);
        this.setState({ payingStart: true });

        toast.success("Successfully, Paid", {
          position: "top-right",
        });
        setTimeout(() => {
          window.location = "Invoice"
        }, 2000);
        // this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  mapFunctionAmountUnpaid = (value) => {
    console.log(value.Amount);
    this.setState({
      totalAmountVarUnpaid:
        Number(this.state.totalAmountVarUnpaid) + Number(value.Amount),
    });
  };

  mapFunctionAmountPaid = (value) => {
    console.log(value.Amount);
    this.setState({
      totalAmountVarPaid:
        Number(this.state.totalAmountVarPaid) + Number(value.Amount),
    });
  };

  userAddressHandle = async () => {
    let userAddres;
    let connectedUserEmail;
    if (
      this.props["props"].UserAccountAddr.userAccountAdd !== "" &&
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
          `${process.env.REACT_APP_BASE_URL}invoices/purchaseHistory/unpaid`,
          {
            email: connectedUserEmail,
          }
        )

        .then((res) => {
          console.log(res.data.data);
          this.setState({ invoicePurchaseHistoryUnpaidData: res.data.data });
          res.data.data.map(this.mapFunctionAmountUnpaid);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}invoices/purchaseHistory/paid`,
          {
            email: connectedUserEmail,
          }
        )

        .then((res) => {
          console.log(res.data.data);
          this.setState({ invoicePurchaseHistorypaidData: res.data.data });
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


    let invoiceUnpaidBtn;
    if (this.state.invoiceUnpaidOrder === true) {
      invoiceUnpaidBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <Link to={{ pathname: "/Invoice" }}>
              <img src={invoiceBack} alt="invoiceBack" />
            </Link>
          </span>
          <span className="invoiceThreeBtn">
            <p
              className="selectResolutionBtn alignCenter"
              onClick={() => this.handlePayNowFunc1stStep()}
              style={{ width: "200px" }}
            >
              Pay Now
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            <Link to={{ pathname: "" }}>
              <img
                src={invoiceUnpaidReject}
                onClick={() => {
                  this.callRejectHandleFunc();
                }}
                className="floatRight"
                alt="invoiceUnpaidReject"
              />
            </Link>
          </span>
        </div>
      );
    } else if (this.state.invoiceUnpaidOrder === false) {
      invoiceUnpaidBtn = (
        <div className="selectResolutionDIv invoiceThreeBtnDiv">
          <span className="alignStart">
            <Link to={{ pathname: "/Invoice" }}>
              <img src={invoiceBack} alt="invoiceBack" />
            </Link>
          </span>
        </div>
      );
    }

    let invoicepaidOptionsBtn;
    if (this.state.invoiceUnpaidOrder === true) {
      invoicepaidOptionsBtn = (
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
                // document.getElementById(
                //   "invoiceUnpaidSelectedOption"
                // ).style.display = "inherit";
                // document.getElementById("invoiceAllUnpaidBoxes").style.display =
                //   "none";
                this.setState({
                  purchasehistoryPaidBtn: true,
                });
                this.setState({
                  magnifierViewUser: this.state.SelectedOrder,
                });
                this.setState({
                  searchUserMagnifierViewPaid: true,
                });

                this.setState({
                  invoicePaidBtn: true,
                });
              }}
              style={{ width: "200px" }}
            >
              View Options
            </p>
          </span>
          <span className="alignEnd" style={{ float: "right" }}>
            {this.state.SelectedOrder.orderStatusStopeed === false ?
              <img
                src={invoicePaymentStopped}
                className="floatRight"
                alt="invoicePaymentStopped"
                onClick={() => {
                  console.log(this.state.SelectedOrder);
                  this.setState({
                    purchasehistoryPaidBtn: true,
                  });
                  this.setState({
                    magnifierViewUser: this.state.SelectedOrder,
                  });
                  this.setState({
                    searchUserMagnifierViewPaid: true,
                  });

                  this.setState({
                    invoicePaidBtn: true,
                  });
                }}
              />
              :
              <img
                src={invoicePayNow}
                onClick={() => {
                  toast.warning("Comming Soon!", {
                    position: "top-right",
                  });
                  // window.location.reload()
                }}
                className="floatRight"
                alt="invoicePayNow"
              />
            }
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
    }

    let invoicePaymentStoppedpayStopPayBtnUI;
    if ((this.state.magnifierViewUser.orderStatusStopeed === false && this.state.paymentIsStopped === false) || this.state.purchasehistoryPaidBtn === false) {
      invoicePaymentStoppedpayStopPayBtnUI = (
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
    } else {
      invoicePaymentStoppedpayStopPayBtnUI = (
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
    }


    let invoicepaymentStopBtnTxt;
    if (this.state.invoicePaymentStopped === false) {

      if ((this.state.magnifierViewUser.orderStatusStopeed === true || this.state.paymentIsStopped === true) && this.state.purchasehistoryPaidBtn === true) {
        invoicepaymentStopBtnTxt = (
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
        );
      } else if (this.state.purchasehistoryPaidBtn !== false) {
        invoicepaymentStopBtnTxt = (
          <p
            className="selectResolutionBtn alignCenter"
            onClick={() => {
              // this.handlePayNowFunc2ndStep();
            }}
            style={{ width: "200px" }}
          >
            View Options
          </p>
        );
      } else if (this.state.payingStart === false) {
        invoicepaymentStopBtnTxt = (
          <p
            className="selectResolutionBtn alignCenter"
            onClick={() => {
              this.handlePayNowFunc2ndStep();
            }}
            style={{ width: "200px" }}
          >
            Pay Now
          </p>
        );
      } else if (this.state.payingStart === true) {
        invoicepaymentStopBtnTxt = (
          <p
            className="selectResolutionBtn alignCenter"
            style={{ width: "200px" }}
          >
            Released
          </p>
        );
      } else {
        invoicepaymentStopBtnTxt = (
          <p
            className="selectResolutionBtn alignCenter"
            style={{ width: "200px" }}
          >
            Working...
          </p>
        );
      }
      // invoicepaymentStopBtnTxt = (
      //   <p
      //     className="selectResolutionBtn alignCenter"
      //     onClick={() => {
      //       this.handlePayNowFunc2ndStep();
      //     }}
      //     style={{ width: "200px" }}
      //   >
      //     {this.state.purchasehistoryPaidBtn !== false
      //       ? "View Options"
      //       : this.state.payingStart === false
      //       ? "Pay Now"
      //       : this.state.payingStart === true
      //       ? "Released"
      //       : "Working..."}
      //   </p>
      // );
    } else {
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
            <Link to={{ pathname: "" }}>
              {this.state.purchasehistoryPaidBtn === false ? (
                <img
                  src={invoiceUnpaidReject}
                  onClick={() => {
                    this.callRejectHandleFunc();
                  }}
                  style={{ marginRight: "6px" }}
                  className="floatRight"
                  alt="invoicePaymentStopped"
                />
              ) : this.state.magnifierViewUser.orderStatusStopeed === true || this.state.paymentIsStopped === true ? (
                <img
                  src={invoicePayNow}
                  onClick={() => {
                    toast.warning("Comming Soon!", {
                      position: "top-right",
                    });
                    // window.location.reload()
                  }}
                  className="floatRight"
                  alt="invoicePayNow"
                />
              ) : (
                <img
                  src={invoicePaymentStopped}
                  onClick={() => {
                    this.callStopHandleFunc();
                  }}
                  style={{ marginRight: "0px" }}
                  className="floatRight"
                  alt="invoicePaymentStopped"
                />
              )}
            </Link>
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
              onClick={() => {
                this.handlePayNowFunc2ndStep();
              }}
            >
              {this.state.payingStart === false
                ? "Pay Now"
                : this.state.payingStart === true
                  ? "Paid"
                  : "Working..."}
            </p>
          </span>
          <span className="lignEnd" style={{ float: "right" }}>
            <img
              onClick={() => this.callRejectHandleFunc()}
              src={invoiceUnpaidReject}
              className="floatRight"
              alt="invoiceUnpaidReject"
            />
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

    let magnifierViewUserUI;
    if (this.state.mediationStarted === "startRes") {
      magnifierViewUserUI =
        <>
          <div className="resolutionOptionstoggle optionChange autoPickedData invoiceFeilds startMediationSndMsg" style={{ marginTop: '-2px' }}>
            <span className="alignStart">
              <input
                id="sendMsgToMed"
                type="InvoiceinvoiceFields"
                className="mutualFriendInput invoiceFields"
                placeholder="Send new message to:"
              />
            </span>
            <span
              className="alignEnd"
              style={{ float: "right", marginRight: "-8px" }}
            >
              <img
                src={invoiceLink}
                style={{ marginTop: "0px" }}
                className="floatRight"
                alt="walletGreaterSign"
              />
            </span>
          </div>
          <div className="sendMsgToMedDIv">
            <p>Timed Response required?</p>

            <div
              className="onoffswitch"
              style={{ marginTop: "-1px", marginRight: "-3px" }}
            >
              <input
                type="checkbox"
                name="onoffswitch"
                className="onoffswitch-checkbox"
                id=""
                tabIndex="0"
              />
              <label
                className="onoffswitch-label onoffswitch-label2"
                htmlFor="myonoffswitch0"
                onClick={() => {
                  toast.warning("Comming Soon!", {
                    position: "top-right",
                  });
                }}
              >
                <span className="onoffswitch-inner onoffswitch-inner2"></span>
                <span className="onoffswitch-switch"></span>
              </label>
            </div>
          </div>
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
            <span className="invoiceThreeBtn">  <p
              className="selectResolutionBtn alignCenter"
              onClick={() => {
                this.handleSendMessageToMed();
              }}
              style={{ width: "200px" }}
            >
              Send Message
            </p></span>
            <span className="alignEnd" style={{ float: "right" }}>
              <img
                src={invoicePayNow}
                onClick={() => {
                  toast.warning("Comming Soon!", {
                    position: "top-right",
                  });
                  // window.location.reload()
                }}
                className="floatRight"
                alt="invoicePayNow"
              />

            </span>
          </div>
        </>
    } else {
      if (this.state.magnifierViewUserViewPDF === false) {
        magnifierViewUserUI = (
          <div className="hello">
            <div id="invoiceUnpaidSearch" style={{ marginTop: "-8px" }}>
              {/* <div id="invoiceUnpaidSearch" style={{ display: 'inherit', marginTop: '-8px' }}> */}

              <div className="row">
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
                      <span>{this.state.magnifierViewUser.customeraddress}</span>
                      <br />
                      <span>Newtown 3709</span>
                      <br />
                      <br />
                      <h6 style={{ color: "#c62127" }}>{this.state.magnifierViewUser.mediatorIndustry} Work</h6>
                      <h6>
                        Total <span style={{ color: "lightgrey" }}>.</span>
                        ${this.state.magnifierViewUser.Amount}USD
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
                  {invoicePaymentStoppedpayStopPayBtnUI}

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
                      this.setState({ resolutionSelectedPaid: true });

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
                    {this.state.magnifierViewUser.mediation === false ?
                      <div className="col-8" style={{ color: "#D8C938" }}>
                        Resolution
                        <br />
                        Selected
                      </div>
                      :
                      <div className="col-8" style={{ color: "#D8C938" }} onClick={() => { this.setState({ mediationStarted: "startRes" }) }}>
                        Resolution
                        <br />
                        Started
                      </div>
                    }
                  </div>
                  <div
                    className="row invoiceProfileRightSection"
                    onClick={() => {
                      this.setState({ invoicePaidBtn: false });
                      this.setState({ resolutionSelectedPaid: false });
                      // document.getElementById(
                      //   "resolutionSelectedPaid"
                      // ).style.display = "none";
                      document.getElementById(
                        "invoiceStopPaymentContent"
                      ).style.display = "none";
                      // document.getElementById(
                      //   "contractSelectedPaid"
                      // ).style.display = "inherit";
                      this.setState({ contractSelectedPaid: true });
                      this.setState({ ViewAddNotePaid: false });

                      // document.getElementById("ViewAddNotePaid").style.display =
                      //   "none";
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
                    {this.state.purchasehistoryPaidBtn === false ? (
                      <>
                        <div className="col-4">
                          <img src={invoiceUnpaidEdit} alt="invoiceUnpaidEdit" />
                        </div>
                        <div className="col-8" style={{ color: "#33CC66" }}>
                          View / Add
                          <br />
                          Notes
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-4">
                          <img
                            src={invoiceTransactionHistory}
                            alt="invoiceTransactionHistory"
                          />
                        </div>
                        <div className="col-8" style={{ color: "#00CCFF" }}>
                          Transaction
                          <br />
                          History
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {this.state.resolutionSelectedPaid === true ? (
                <div
                  // id="resolutionSelectedPaid"
                  className="resolutionSelected"
                // style={{ display: "none" }}
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
                          <p className="resolutionSelectedTxt">
                            Resolution <br /> Selected
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
                      <div className="col-4">
                        <h3>
                          <b>Industry:</b>
                        </h3>
                      </div>
                      <div className="col-8">
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
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
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
                              provide feedback to Seller
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-3"
                      onClick={() => {
                        this.setState({ invoicePaidBtn: true });
                        this.setState({ resolutionSelectedPaid: false });
                        this.setState({ ViewAddNotePaid: false });
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
                // style={{ display: "none" }}
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
                        this.setState({ contractSelectedPaid: false });

                        // document.getElementById("ViewAddNotePaid").style.display =
                        //   "none";
                        this.setState({ ViewAddNotePaid: false });

                        // document.getElementById(
                        //   "contractSelectedPaid"
                        // ).style.display = "none";
                        this.setState({ resolutionSelectedPaid: false });
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

              {invoiceGetOptionsBtn}
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
                        "invoiceOptionsPaid"
                      ).style.display = "inherit";
                      this.setState({ resolutionSelectedPaid: false });
                      this.setState({ contractSelectedPaid: false });
                      this.setState({ ViewAddNotePaid: false });
                      this.setState({ purchasehistoryPaidBtn: true });
                      this.setState({ invoiceUnpaidOrder: false });
                      this.setState({ invoicePaidBtn: true });
                      this.setState({ purchasehistoryPaidBtn: true });
                    }}
                  >
                    Paid <span style={{ color: "#059b34" }}>__</span>
                  </span>
                  <span style={{ color: "black" }}>Disputes</span>
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
                                          <b>{val.customername.substring(0, 15)}</b>
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
                                          {/* <b>Rejected</b> */}
                                          <b></b>
                                          {/* <br /> */}
                                        </p>
                                        <p>
                                          {/* <b>USD $1120.78</b> */}
                                          <b>USD ${val.Amount}</b>
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
                              {this.state.totalAmountVarUnpaid}
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

                  {/* <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv"
                      style={{ marginTop: "-5px" }}
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
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
                              <b>Mr Smith</b>
                            </p>
                            <p>#22037</p>
                            <p>20/08/2022</p>
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
                              <b>Rejected</b>
                            </p>
                            <p>
                              <b>USD $1120.78</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="invoiceBlackDiv invoiceOrderBlackSubDiv"
                      onClick={() => {
                        this.setState({ invoiceUnpaidOrder: true });
                      }}
                    >
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
                              <b>Wong Supplies</b>
                            </p>
                            <p>#220449</p>
                            <p>06/09/2022</p>
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
                              <b>Rejected</b>
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
                            <p className="colorWhite">
                              <b>XYZ Goods</b>
                            </p>
                            <p className="colorWhite">#223578</p>
                            <p className="colorWhite">12/10/2022</p>
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
                                  document.getElementById(
                                    "invoiceAllUnpaidBoxes"
                                  ).style.display = "none";
                                  document.getElementById(
                                    "invoiceUnpaidSearch"
                                  ).style.display = "inherit";
                                }}
                              />
                            </div>
                            <p className="colorWhite">
                              <b>12/10/2022</b>
                            </p>
                            <p className="colorWhite">
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
                            <p className="colorWhite">
                              <b>WBP Services</b>
                            </p>
                            <p className="colorWhite">#224580</p>
                            <p className="colorWhite">18/11/2022</p>
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
                                  document.getElementById(
                                    "invoiceAllUnpaidBoxes"
                                  ).style.display = "none";
                                  document.getElementById(
                                    "invoiceUnpaidSearch"
                                  ).style.display = "inherit";
                                }}
                              />
                            </div>
                            <p className="colorWhite">
                              <b>Delivery</b>
                            </p>
                            <p className="colorWhite">
                              <b>USD $864.50</b>
                            </p>
                          </p>
                        </div>
                      </div>
                    </div> */}

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
                            <p className="noWrapWhiteSpace">
                              <b>{this.state.SelectedOrder.customername}</b>
                              {/* <b>XYZ Goods</b> */}
                            </p>
                            <p className="colorWhite">
                              #{this.state.SelectedOrder.id}
                            </p>
                            {/* <p>#223578</p> */}
                            <p className="colorWhite">
                              {purchaseHitoryDateFormat(
                                this.state.SelectedOrder.createdAt
                              )}
                            </p>
                            {/* <p>12/10/2022</p> */}
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
                              {/* <b>12/10/2022</b> */}{" "}
                              <b>
                                {this.state.SelectedOrder
                                  .orderStatusRejected === false
                                  ? purchaseHitoryDateFormat(
                                    this.state.SelectedOrder.payment
                                  )
                                  : "Rejected"}
                              </b>
                            </p>
                            <p>
                              <b>USD ${this.state.SelectedOrder.Amount}</b>
                              {/* <b>USD $126.00</b> */}
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
              {this.state.mediationStarted === "startRes" ?
                <p className="invoiceTabsRow" style={{ marginTop: '-15px', marginBottom: '-20px' }}>
                  <p style={{ textAlign: 'start', marginLeft: '20px' }}>
                    Invoice:
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
                        "invoicePaidOptions"
                      ).style.display = "inherit";
                      this.setState({ resolutionSelectedPaid: false });
                      this.setState({ ViewAddNotePaid: false });
                      this.setState({ contractSelectedPaid: false });
                      this.setState({ purchasehistoryPaidBtn: false });
                      this.setState({ invoiceUnpaidOrder: false });
                      this.setState({ invoicePaidBtn: true });
                      this.setState({ purchasehistoryPaidBtn: false });
                    }}
                  >
                    Unpaid <span style={{ color: "#059b34" }}>__</span>
                  </span>
                  <span style={{ color: "white" }}>
                    Paid <span style={{ color: "#059b34" }}>__</span>
                  </span>
                  <span style={{ color: "black" }}>Disputes</span>
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
                                this.setState({ SelectedOrder: val });
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
                                    <p className="noWrapWhiteSpace">
                                      <b>{val.customername.substring(0, 15)}</b>
                                    </p>
                                    <p>#{val.id}</p>
                                    <p>
                                      {purchaseHitoryDateFormat(val.createdAt)}
                                    </p>
                                  </p>
                                </div>
                                <div className="col-5">
                                  <p className="invoiceUnpaidProfileData">
                                    <p style={{ color: "rgb(182, 255, 182)" }}>
                                      {!val.orderStatusStopeed ?
                                        <b>Pay On:</b>
                                        : <b style={{ color: 'gold' }}>Payment</b>
                                      }
                                    </p>
                                    <div className="invoiceUnpaidSearch">
                                      <img
                                        src={searchWhite}
                                        alt=""
                                        onClick={() => {
                                          this.setState({
                                            purchasehistoryPaidBtn: true,
                                          });
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
                                    <p style={{ color: "rgb(182, 255, 182)" }}>
                                      {/* <b>02/11/2022</b> */}
                                      {!val.orderStatusStopeed ?
                                        // <b>Pay On:</b>
                                        <b>{val.payment}</b>
                                        : <b style={{ color: 'gold' }}>Stopped</b>
                                      }
                                    </p>
                                    <p>
                                      {/* <b>USD $1120.78</b> */}
                                      <b>USD ${val.Amount}</b>
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
                            {this.state.totalAmountVarPaid}
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
    );
  }
}

export default PurchaseHistory;
