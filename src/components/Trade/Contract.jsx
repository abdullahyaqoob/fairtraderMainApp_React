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
import contract from "../../Images/activeContract.png";
import myWallet from "../../Images/myWallet.png";
import dropdownRegistered from "../../Images/dropdownRegistered.png";
import appeal from "../../Images/contract/appeal.png";
import applyAlllocked from "../../Images/contract/applyAlllocked.png";
import applyAllUnlocked from "../../Images/contract/applyAllUnlocked.png";
import attachFile from "../../Images/contract/attachFile.png";
import contractNext from "../../Images/contract/contractNext.png";
import contractPlus from "../../Images/contract/contractPlus.png";
import contractPrev from "../../Images/contract/contractPrev.png";
import edit from "../../Images/contract/edit.png";
import responseTime from "../../Images/contract/responseTime.png";
import warrenty from "../../Images/contract/warrenty.png";
import navMessage from "../../Images/Menu/navMessage.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
// import HeaderNav from '../../components/HeaderNav.jsx';

// css
import "../css/Contract.css";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractSellerFirstFeil: "",
      contractWarrantyFeil: "",
      contractAttachFeil: "",
      applyAllInvoice: false,
      acceptFTPterms: false,
    };
  }
  async componentWillMount() {
    this.userAddressHandle();
  }

  userAddressHandle = async () => {
    let userAddres;
    if (this.props["props"].UserAccountAddr.userAccountAddr !== "") {
      userAddres = this.props["props"].UserAccountAddr.userAccountAddr;
      console.log(userAddres);
      this.setState({ connectedUserAddr: userAddres });

      console.log(localStorage.getItem(userAddres + "invoiceId"));

      if (localStorage.getItem(userAddres + "invoiceId") === null) {
        toast.error("Please first Create your Invoice", {
          position: "top-right",
        });

        setTimeout(() => {
          window.location = "Invoice";
        }, 2000);
      }
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  };

  contractSellerFirstFeil() {
    var name = document.getElementById("contractSellerFirstFeil");
    if (name.files.item(0).size > "5242880") {
      console.log("large");

      toast.error("Invoice must be smaller than 5 MB", {
        position: "top-right",
      });
    } else {
      this.setState({ contractSellerFirstFeil: name.files.item(0) });
      console.log(name.files.item(0));
      toast.success("File Selected", {
        position: "top-right",
      });
      // alert('Selected file: ' + name.files.item(0).size);
      // alert('Selected file: ' + name.files.item(0).type);
    }
  }
  contractWarrantyFeil() {
    var name = document.getElementById("contractWarrantyFeil");
    if (name.files.item(0).size > "5242880") {
      console.log("large");
      toast.error("Invoice must be smaller than 5 MB", {
        position: "top-right",
      });
    } else {
      this.setState({ contractWarrantyFeil: name.files.item(0) });
      console.log(name.files.item(0));
      toast.success("File Selected", {
        position: "top-right",
      });
      // alert('Selected file: ' + name.files.item(0).size);
      // alert('Selected file: ' + name.files.item(0).type);
    }
  }
  contractAttachFeil() {
    var name = document.getElementById("contractAttachFeil");
    if (name.files.item(0).size > "5242880") {
      console.log("large");
      toast.error("Invoice must be smaller than 5 MB", {
        position: "top-right",
      });
    } else {
      this.setState({ contractAttachFeil: name.files.item(0) });
      console.log(name.files.item(0));
      toast.success("File Selected", {
        position: "top-right",
      });
      // alert('Selected file: ' + name.files.item(0).size);
      // alert('Selected file: ' + name.files.item(0).type);
    }
  }
  hanlderesponseTIme(e) {
    if (e.target.value > 9 || e.target.value === 0) {
      toast.error("Response time must be between 0-9", {
        position: "top-right",
      });
      this.responseTImeRef.value = "";
    }
  }
  hanldeAppealTIme(e) {
    if (e.target.value > 9 || e.target.value === 0) {
      toast.error("Appeal time must be between 0-9", {
        position: "top-right",
      });
      this.hanldeAppealTImeRef.value = "";
    }
  }

  contractHandler = async () => {
    console.log(this.responseTImeRef.value);
    console.log(this.hanldeAppealTImeRef.value);
    console.log(this.state.acceptFTPterms);
    console.log(this.state.applyAllInvoice);
    console.log("contractAttachFeil", this.state.contractAttachFeil);
    console.log("contractWarrantyFeil", this.state.contractWarrantyFeil);
    console.log("contractSellerFirstFeil", this.state.contractSellerFirstFeil);

    if (
      this.state.contractSellerFirstFeil === "" ||
      this.state.acceptFTPterms === "" ||
      this.responseTImeRef.value === "" ||
      this.hanldeAppealTImeRef.value === ""
    ) {
      toast.error("Please First enter Contract Information", {
        position: "top-right",
      });
    } else {
      // requests for sending this selected file
      let userAccountAddress = this.state.connectedUserAddr;

      var formData = new FormData();
      formData.append(
        "termsandconditionsfile",
        this.state.contractSellerFirstFeil
      );
      formData.append("warrantyfile", this.state.contractWarrantyFeil);
      formData.append("responsetime", this.responseTImeRef.value);
      formData.append("attachfiles", this.state.contractAttachFeil);
      formData.append("apealtime", this.hanldeAppealTImeRef.value);
      formData.append("ftpterms", this.state.acceptFTPterms);
      formData.append("applytoallinvoices", this.state.applyAllInvoice);
      formData.append("sellerwalletaddress", userAccountAddress);

      let InvoiceIDSotre = localStorage.getItem(
        userAccountAddress + "invoiceId"
      );

      await axios({
        method: "post",
        url:
          process.env.REACT_APP_BASE_URL +
          "contract/createContract/" +
          InvoiceIDSotre,
        data: formData,
        onUploadProgress: (uploadEvent) => {
          this.setState({
            profileImgProgress:
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%",
          });
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("profileImgProgress", this.state.profileImgProgress);
          console.log("File Sended Response: ", res);

          // alert("Successfull Created Contract!")
          toast.success("Successfull Created Contract!", {
            position: "top-right",
          });
          setTimeout(() => {
            window.location = "Invoice";
          }, 2000);
        })
        .catch((err) => {
          // this.$toasted.error("Cannot able to attach this file.");
          console.log("error", err);
          // this.fileSelectionLoading = false;
        });
    }
  };

  render() {
    let contractFirstInputFeild;
    if (this.state.contractSellerFirstFeil !== "") {
      contractFirstInputFeild = (
        <img style={{ marginTop: "-5px" }} src={attachFile} alt="mapIcon" />
      );
    } else {
      contractFirstInputFeild = (
        <span className="alignStart">Seller's Terms & Conditions</span>
      );
    }

    let contractWaranty;
    if (this.state.contractWarrantyFeil !== "") {
      contractWaranty = (
        <img style={{ marginTop: "0px" }} src={warrenty} alt="mapIcon" />
      );
    } else {
      contractWaranty = (
        <span className="alignStart warrantyTxtAccept">PDF, PNG, JPG</span>
      );
    }

    let attachFileContent;
    if (this.state.contractAttachFeil !== "") {
      attachFileContent = (
        <img style={{ marginTop: "0px" }} src={attachFile} alt="attachFile" />
      );
    } else {
      attachFileContent = (
        <span className="alignStart warrantyTxtAccept">PDF, PNG, JPG</span>
      );
    }

    let myonoffswitchContract2;
    if (this.state.applyAllInvoice === false) {
      myonoffswitchContract2 = (
        <img
          className="applyInvoices"
          src={applyAllUnlocked}
          alt="applyAllUnlocked"
        />
      );
    } else {
      myonoffswitchContract2 = (
        <img
          className="applyInvoices"
          src={applyAlllocked}
          alt="applyAllUnlocked"
        />
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
        {/* <div className="topNavLinks">
                    <div className="row iconNav">
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
                                <Link to={{ pathname: '/Invoice' }}>
                                    <img
                                        src={invoice}
                                        className='invoiceImg'
                                        alt="invoice.png" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
                                <Link to={{ pathname: '/Resolution' }}>
                                    <img
                                        src={resolution}
                                        className='resolutionImg'
                                        style={{ width: '81px', marginTop: '-1px', marginLeft: '-12px' }}
                                        alt="resolution" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter activeImg activeImgContract">
                                <Link to={{ pathname: '/Contract' }}>
                                    <img
                                        src={contract}
                                        className='contractImg'
                                        alt="contract" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
                                <Link to={{ pathname: '/Wallet' }}>
                                    <img
                                        src={myWallet}
                                        className='mywalletImg'
                                        alt="wallet" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div> */}

        <section id="contractTabMenu">
          <div class="contractTabMenuItems">
            <button class="ContractinvoiceTab">
              <Link to={{ pathname: "/Invoice" }}>
                <img src={invoice} alt="invoice" />
              </Link>
            </button>
            <button class="ContractresolutionTab">
              <Link to={{ pathname: "/Resolution" }}>
                <img src={resolution} alt="resolution" />
              </Link>
            </button>
            <button class="ContractcontractTab">
              <Link to={{ pathname: "/Contract" }}>
                <img src={contract} alt="contract" />
              </Link>
            </button>
            <button class="ContractwalletTab">
              <Link to={{ pathname: "/Wallet" }}>
                <img src={myWallet} alt="myWallet" />
              </Link>
            </button>
          </div>
        </section>

        <div
          className="handleMainPage handleMainPageContract"
          id="contractTabBody"
        >
          <div className="contractMainPinkContainer">
            <input
              type="file"
              accept="application/pdf"
              onChange={() => {
                this.contractSellerFirstFeil();
                // this.state.handleAddInvoice = false
              }}
              style={{ display: "none" }}
              id="contractSellerFirstFeil"
              name="file"
            />
            <div
              className="resolutionOptionstoggle contractBoxes"
              style={{ marginTop: "6px" }}
              onClick={() => {
                document.getElementById("contractSellerFirstFeil").click();
              }}
            >
              {contractFirstInputFeild}

              <img
                className="contractPlusIcon contractPlusIconfirstFeild"
                src={contractPlus}
                style={{
                  float: "right",
                  marginTop: "-3px",
                  marginRight: "-6px",
                }}
                alt="contractPlus"
              />
            </div>

            <div className="row">
              <div className="col-6">
                <h3 className="headingFeilds">Warranty</h3>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={() => {
                    this.contractWarrantyFeil();
                    // this.state.handleAddInvoice = false
                  }}
                  style={{ display: "none" }}
                  id="contractWarrantyFeil"
                  name="file"
                />
                <div
                  className="resolutionOptionstoggle contractFullFeild"
                  onClick={() => {
                    document.getElementById("contractWarrantyFeil").click();
                  }}
                >
                  {contractWaranty}
                  <span style={{ float: "right" }}>
                    <img
                      className="contractPlusIcon"
                      src={contractPlus}
                      alt="walletGreaterSign"
                    />
                  </span>
                </div>
              </div>
              <div className="col-6">
                <h3 className="headingFeilds headingFeilds2">Response Time</h3>

                <div className="resolutionOptionstoggle contractFullFeild contractFullFeild2">
                  <span className="alignStart">
                    <img
                      className="contractTimeIconFirst"
                      src={responseTime}
                      alt="mapIcon"
                    />
                    {/* <span>3 Days</span> */}
                    <input
                      type="number"
                      className="mutualFriendInput invoiceFields contractRspTm"
                      ref={(responseTImeRef) =>
                        (this.responseTImeRef = responseTImeRef)
                      }
                      placeholder="3"
                      onChange={(e) => {
                        this.hanlderesponseTIme(e);
                      }}
                    />
                    <span
                      className="ContractTimeDays"
                      style={{ marginLeft: "30px" }}
                    >
                      Days
                    </span>
                  </span>
                  <span
                    className="alignEnd"
                    style={{ float: "right", marginTop: "-2px" }}
                  >
                    <img
                      className="contractResponseTimeIcon"
                      src={edit}
                      alt="walletGreaterSign"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <h3 className="headingFeilds">Attach Files</h3>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={() => {
                    this.contractAttachFeil();
                    // this.state.handleAddInvoice = false
                  }}
                  style={{ display: "none" }}
                  id="contractAttachFeil"
                  name="file"
                />
                <div
                  className="resolutionOptionstoggle contractFullFeild"
                  onClick={() => {
                    document.getElementById("contractAttachFeil").click();
                  }}
                >
                  {attachFileContent}
                  <span style={{ float: "right" }}>
                    <img
                      className="contractPlusIcon"
                      src={contractPlus}
                      alt="walletGreaterSign"
                    />
                  </span>
                </div>
              </div>
              <div className="col-6">
                <h3 className="headingFeilds headingFeilds2">Appeal Time</h3>

                <div className="resolutionOptionstoggle contractFullFeild contractFullFeild2">
                  <span className="alignStart">
                    <img
                      className="contractTimeIconFirst"
                      src={appeal}
                      alt="mapIcon"
                    />
                    <span className="appealTImeDiv">
                      <input
                        type="number"
                        className="mutualFriendInput invoiceFields contractRspTm"
                        ref={(hanldeAppealTImeRef) =>
                          (this.hanldeAppealTImeRef = hanldeAppealTImeRef)
                        }
                        placeholder="3"
                        onChange={(e) => {
                          this.hanldeAppealTIme(e);
                        }}
                      />
                      <span
                        className="ContractTimeDays"
                        style={{ marginLeft: "30px" }}
                      >
                        Days
                      </span>
                    </span>
                  </span>
                  <span
                    className="alignEnd"
                    style={{ float: "right", marginTop: "-2px" }}
                  >
                    <img
                      className="contractResponseTimeIcon"
                      src={edit}
                      alt="walletGreaterSign"
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <h3 className="headingFeilds">Accept FTP Terms?</h3>

                <div className="resolutionOptionstoggle contractFullFeild">
                  <span className="alignStart" style={{ marginLeft: "5px" }}>
                    {" "}
                    Accepted
                    {/* <img
                    src={attachFile}
                    alt="mapIcon"
                /> */}
                    {/* <input type="InvoiceinvoiceFields" className='mutualFriendInput invoiceFields' placeholder="enter customer address" /> */}
                  </span>
                  <span
                    className="alignEnd"
                    style={{ float: "right", paddingTop: "1px" }}
                  >
                    <div
                      className="onoffswitch contractonoffswitch contractSwithSwitchWhole"
                      onClick={() => {
                        if (this.state.acceptFTPterms === false) {
                          setTimeout(() => {
                            this.setState({ acceptFTPterms: true });
                          }, 1);
                        } else {
                          setTimeout(() => {
                            this.setState({ acceptFTPterms: false });
                          }, 1);
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        className="onoffswitch-checkbox"
                        id="myonoffswitchContract1"
                        tabIndex="0"
                      />
                      <label
                        className="onoffswitch-label contractSwithOneLabel"
                        htmlFor="myonoffswitchContract1"
                      >
                        <span className="onoffswitch-inner contractSwithOneInner"></span>
                        <span className="onoffswitch-switch contractSwithSwitch"></span>
                      </label>
                    </div>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <h3 className="headingFeilds headingFeilds2">
                  Apply to all invoices?
                </h3>

                <div className="resolutionOptionstoggle contractFullFeild contractFullFeild2">
                  <span className="alignStart" style={{ marginLeft: "5px" }}>
                    {myonoffswitchContract2}
                  </span>
                  <span
                    className="alignEnd"
                    style={{ float: "right", paddingTop: "1px" }}
                  >
                    <div
                      className="onoffswitch contractonoffswitch contractSwithSwitchWhole"
                      onClick={() => {
                        if (this.state.applyAllInvoice === false) {
                          setTimeout(() => {
                            this.setState({ applyAllInvoice: true });
                          }, 1);
                        } else {
                          setTimeout(() => {
                            this.setState({ applyAllInvoice: false });
                          }, 1);
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        name="onoffswitch"
                        className="onoffswitch-checkbox"
                        id="myonoffswitchContract2"
                        tabIndex="0"
                      />
                      <label
                        className="onoffswitch-label contractSwithOneLabel"
                        htmlFor="myonoffswitchContract2"
                      >
                        <span className="onoffswitch-inner contractSwithOneInner"></span>
                        <span className="onoffswitch-switch contractSwithSwitch"></span>
                      </label>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="contractBlackContainer">
            <h6 className="alignCenter">FTP Terms & Conditions</h6>
            <p>
              The Seller agrees to carry out all work according to the
              pre-agreed terms made with the Buyer including: quoted price; time
              lines; relevant standards and per any attached Terms and
              Conditions which both parties agreed as fair.
            </p>
            <p>
              The Buyer and Seller agree to pay each 50% of the cost for the
              Mediator to resolve the dispute. The buyer and seller agree to
              provide mediator required information in Response Time in order to
              complete the investigation.
            </p>

            <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
              <span className="alignStart">
                <img src={contractPrev} alt="mapIcon" />
              </span>
              <span className="invoiceThreeBtn contractBTNText">
                <p
                  className="alignCenter contractBtn"
                  style={{ width: "210px" }}
                  onClick={() => this.contractHandler()}
                >
                  Accept & Send
                </p>
              </span>
              <span className="alignEnd" style={{ float: "right" }}>
                <Link to={{ pathname: "/Resolution" }}>
                  <img
                    src={contractNext}
                    className="floatRight"
                    alt="walletGreaterSign"
                  />
                </Link>
              </span>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
