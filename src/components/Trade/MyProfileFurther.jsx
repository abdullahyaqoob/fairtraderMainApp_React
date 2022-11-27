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
import myProfileNextPage from "../../Images/myProfile/myProfileNextPage.png";
import myProfileEmailIcon from "../../Images/myProfile/myProfileEmailIcon.png";
import myProfileIcon from "../../Images/myProfile/myProfileIcon.png";
import profileFeildEdit from "../../Images/myProfile/profileFeildEdit.png";
import profileAddImg from "../../Images/myProfile/profileAddImg.png";
import profileDelete from "../../Images/myProfile/profileDelete.png";
import myProfileFeildAdd from "../../Images/myProfile/myProfileFeildAdd.png";
import myProfileLanguage from "../../Images/myProfile/myProfileLanguage.png";
import profileUser from "../../Images/myProfile/profileUser.png";
import myProfileMap1 from "../../Images/myProfile/myProfileMap1.png";
import myprofileDropdown from "../../Images/myProfile/myprofileDropdown.png";
import navMessage from "../../Images/Menu/navMessage.png";
import Attension from "../../Images/Invoice/Attension.png";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
// import HeaderNav from '../../components/HeaderNav.jsx';

// css
import "../css/Wallet.css";
import "../css/myProfile.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      profileServices: "",
      profileServicesHandleSection: false,
    };
  }

  async componentDidMount() {
    this.userAddressHandle();

  }
  userAddressHandle = async () => {
    if (
      this.props["props"].UserAccountAddr.userAccountAddr !== "" &&
      this.props["props"].MetamaskStatus.metamaskStatus !== ""
    ) {

      setTimeout(() => {

        console.log(this.props);
        this.setState({
          loggedInAccountAddr: this.props["props"].UserAccountAddr
            .userAccountAddr,
        });
        // this.setState({ loggedInAccountNtw: this.props["props"].UserAccountNtw.userAccountNtw })
        this.setState({
          MetamaskCondition: this.props["props"].MetamaskStatus.metamaskStatus,
        });
        console.log(
          "Props Data: ",
          this.state.loggedInAccountAddr,
          this.state.MetamaskCondition
        );

        if (this.state.MetamaskCondition === true) {
          let userAccount = this.props["props"].UserAccountAddr.userAccountAddr;

          axios
            .post(process.env.REACT_APP_BASE_URL + "user/searchUsers", {
              walletaddress: userAccount,
            })
            .then((res) => {
              let userData = res.data.data[0];
              this.setState({ userData });
              console.log(this.state.userData);

              if (userData.language != "") {
                document.getElementById("myProfileFrtLang").value =
                  userData.language;
              }
              if (userData.website != "") {
                document.getElementById("myProfileFrtWebsite").value =
                  userData.website;
              }
              if (userData.phoneno != 0) {
                document.getElementById("myProfileFrtPhoneNmbr").value =
                  userData.phoneno;
              }
              if (userData.facebook != "") {
                document.getElementById("myProfileFrtFacebookPage").value =
                  userData.facebook;
              }
              if (userData.bio != "") {
                document.getElementById("myProfileFrtBio").value =
                  userData.bio;
              }
              if (userData.providing != "") {
                document.getElementById("myProfileFrtServices").value =
                  userData.providing;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 1);
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  }

  profileServicesHandle = async (e) => {
    this.setState({ profileServices: e });
    document.getElementById("myProfileFrtServices").value = e;
    this.setState({ profileServicesHandleSection: false });
  };

  myProfileFurtherSubmitHandler = async (e) => {
    let myProfileFrtLang = document.getElementById(
      "myProfileFrtLang"
    ).value;
    let myProfileFrtWebsite = document.getElementById("myProfileFrtWebsite")
      .value;
    let myProfileFrtPhoneNmbr = document.getElementById("myProfileFrtPhoneNmbr")
      .value;
    let myProfileFrtFacebookPage = document.getElementById(
      "myProfileFrtFacebookPage"
    ).value;
    let myProfileFrtBio = document.getElementById(
      "myProfileFrtBio"
    ).value;
    let myProfileFrtServices = document.getElementById("myProfileFrtServices")
      .value;

    if (myProfileFrtServices === "") {
      alert("Please First enter Services you provide");
    } else if (this.state.userData.industry === "") {
      alert("Please First enter Industry. (from the prev page)");
    } else if (myProfileFrtLang === "") {
      alert("Please First enter Language");
    } else if (myProfileFrtWebsite === "") {
      alert("Please First enter your website");
    } else if (myProfileFrtPhoneNmbr === "") {
      alert("Please First enter your phone number");
    } else if (myProfileFrtFacebookPage === "") {
      alert("Please First enter your facebook link");
    } else if (myProfileFrtBio === "") {
      alert("Please First enter Bio");
    } else {
      console.log(
        myProfileFrtLang,
        myProfileFrtWebsite,
        myProfileFrtPhoneNmbr,
        myProfileFrtFacebookPage,
        myProfileFrtBio,
        myProfileFrtServices
      );
      // Update User Profile
      axios
        .put(`${process.env.REACT_APP_BASE_URL}user/createOrUpdateUser`, {
          walletaddress: this.state.loggedInAccountAddr,
          industry: this.state.userData.industry,
          language: myProfileFrtLang,
          website: myProfileFrtWebsite,
          phoneno: myProfileFrtPhoneNmbr,
          facebook: myProfileFrtFacebookPage,
          bio: myProfileFrtBio,
          providing: myProfileFrtServices,
        })

        .then((res) => {
          console.log(res);
          toast.success("Successfully, Profile Updated", {
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
            <h2 className="myPaymentHeading">My Profile</h2>
          </center>

          <div className="paymentDivContainer">
            <div
              className="myProfileFeildsContainer"
              style={{ marginTop: "-15px" }}
            >
              <div className="resolutionOptionstoggle myProfileFeild">
                <span className="alignStart">
                  <input
                    id="myProfileFrtLang"
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    placeholder="Language"
                    style={{ marginTop: "1px" }}
                  />
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginLeft: "-8px" }}
                >
                  {/* <img src={myProfileFeildAdd} style={{ marginTop: '0px', marginLeft: '7px', marginRight: '10px' }} className='floatRight' alt="myProfileFeildAdd" /> */}
                  <img
                    src={profileFeildEdit}
                    style={{ marginTop: "0px" }}
                    className="floatRight"
                    alt="profileFeildEdit"
                  />
                </span>
              </div>

              <div className="resolutionOptionstoggle myProfileFeild">
                <span className="alignStart">
                  <input
                    id="myProfileFrtWebsite"
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    placeholder="Website"
                    style={{ marginTop: "1px" }}
                  />
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginLeft: "-8px" }}
                >
                  {/* <img src={myProfileFeildAdd} style={{ marginTop: '0px', marginLeft: '7px', marginRight: '10px' }} className='floatRight' alt="myProfileFeildAdd" /> */}
                  <img
                    src={profileFeildEdit}
                    style={{ marginTop: "0px" }}
                    className="floatRight"
                    alt="profileFeildEdit"
                  />
                </span>
              </div>

              <div className="resolutionOptionstoggle myProfileFeild">
                <span className="alignStart">
                  <input
                    id="myProfileFrtPhoneNmbr"
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    placeholder="Phone Number"
                    style={{ marginTop: "1px" }}
                  />
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginLeft: "-8px" }}
                >
                  {/* <img src={myProfileFeildAdd} style={{ marginTop: '0px', marginLeft: '7px', marginRight: '10px' }} className='floatRight' alt="myProfileFeildAdd" /> */}
                  <img
                    src={profileFeildEdit}
                    style={{ marginTop: "0px" }}
                    className="floatRight"
                    alt="profileFeildEdit"
                  />
                </span>
              </div>

              <div className="resolutionOptionstoggle myProfileFeild">
                <span className="alignStart">
                  <input
                    id="myProfileFrtFacebookPage"
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    placeholder="Facebook Page"
                    style={{ marginTop: "1px" }}
                  />
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginLeft: "-8px" }}
                >
                  {/* <img src={myProfileFeildAdd} style={{ marginTop: '0px', marginLeft: '7px', marginRight: '10px' }} className='floatRight' alt="myProfileFeildAdd" /> */}
                  <img
                    src={profileFeildEdit}
                    style={{ marginTop: "0px" }}
                    className="floatRight"
                    alt="profileFeildEdit"
                  />
                </span>
              </div>

              <div className="resolutionOptionstoggle myProfileFeild">
                <span className="alignStart">
                  <input
                    id="myProfileFrtBio"
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    placeholder="Bio"
                    style={{ marginTop: "1px" }}
                  />
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginLeft: "-8px" }}
                >
                  {/* <img src={myProfileFeildAdd} style={{ marginTop: '0px', marginLeft: '7px', marginRight: '10px' }} className='floatRight' alt="myProfileFeildAdd" /> */}
                  <img
                    src={profileFeildEdit}
                    style={{ marginTop: "0px" }}
                    className="floatRight"
                    alt="profileFeildEdit"
                  />
                </span>
              </div>

              <div
                className="resolutionOptionstoggle myProfileFeild"
                onClick={() => {
                  if (this.state.profileServicesHandleSection === false) {
                    this.setState({ profileServicesHandleSection: true });
                  } else {
                    this.setState({ profileServicesHandleSection: false });
                  }
                }}
              >
                <span className="alignStart">
                  <input
                    id="myProfileFrtServices"
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    disabled
                    placeholder="Services"
                    style={{ marginTop: "1px" }}
                  />
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginRight: "-10px" }}
                >
                  <img
                    src={myProfileFeildAdd}
                    style={{
                      marginTop: "0px",
                      marginLeft: "0px",
                      marginRight: "10px",
                    }}
                    className="floatRight"
                    alt="myProfileFeildAdd"
                  />
                  {/* <img src={profileFeildEdit} style={{ marginTop: '0px' }} className='floatRight' alt="profileFeildEdit" /> */}
                </span>
              </div>
              {this.state.profileServicesHandleSection === true ? (
                <div className="resolutionOptionstoggle myProfileFeild myProfileFurtherServices">
                  <h4
                    onClick={() => {
                      this.profileServicesHandle("Goods");
                    }}
                  >
                    Goods
                  </h4>
                  <h4
                    onClick={() => {
                      this.profileServicesHandle("Services");
                    }}
                  >
                    Services
                  </h4>
                  <h4
                    onClick={() => {
                      this.profileServicesHandle("Mediator");
                    }}
                  >
                    Mediator
                  </h4>
                </div>
              ) : (
                ""
              )}

              {/* <p className="myProfileFeildsDiscription">
                Other fields can be added in this place which will help explain
                a person business or services and how to find them
              </p> */}
            </div>

            <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
              <span className="alignStart">
                <Link to={{ pathname: "/MyProfile" }}>
                  <img src={invoiceBack} alt="invoiceBack" />
                </Link>
              </span>

              <div className="selectResolutionBtnDiv">
                <p
                  className="selectResolutionBtn alignCenter"
                  style={{ width: "95%" }}
                  onClick={() => this.myProfileFurtherSubmitHandler()}
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
