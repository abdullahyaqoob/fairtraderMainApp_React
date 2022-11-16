// react States
// import { useEffect, useState } from 'react'
import { useContext, useEffect, useState } from "react";
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
      profileImgProgress: "",
      loggedInAccountAddr: "",
      loggedInAccountNtw: "",
      MetamaskCondition: "",
      ProfileSelectedFileQual: "",
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
      this.setState({
        loggedInAccountAddr: this.props["props"].UserAccountAddr
          .userAccountAddr,
      });
      // this.setState({ loggedInAccountNtw: this.props["props"].UserAccountNtw.userAccountNtw })
      this.setState({
        MetamaskCondition: this.props["props"].MetamaskStatus.metamaskStatus,
      });
      // console.log('Props Data: ', this.state.loggedInAccountAddr, this.state.loggedInAccountNtw, this.state.MetamaskCondition);
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
            console.log(res.data.data[0]);
            if (res.data.data.length !== 0) {
              if (userData.country !== "") {
                document.getElementById("myProfileCountry").value =
                  userData.country;
              }
              if (userData.city !== "") {
                document.getElementById("myProfileCity").value = userData.city;
              }
              if (userData.zipcode !== 0) {
                document.getElementById("myProfileZipCode").value =
                  userData.zipcode;
              }
              if (userData.language !== "") {
                document.getElementById("myProfileLanguage").value =
                  userData.language;
              }
              if (userData.email !== "") {
                document.getElementById("myProfileEmail").value =
                  userData.email;
              }
              if (userData.industry !== "") {
                document.getElementById("myProfileIndustry").value =
                  userData.industry;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setTimeout(this.userAddressHandle, 250);
    }
  }

  myProfileSubmitHandler = async (e) => {
    let myProfileCountry = document.getElementById("myProfileCountry").value;
    let myProfileCity = document.getElementById("myProfileCity").value;
    let myProfileZipCode = document.getElementById("myProfileZipCode").value;
    let myProfileLanguage = document.getElementById("myProfileLanguage").value;
    let myProfileEmail = document.getElementById("myProfileEmail").value;
    let myProfileIndustry = document.getElementById("myProfileIndustry").value;
    console.log(
      myProfileCountry,
      myProfileCity,
      myProfileZipCode,
      myProfileLanguage,
      myProfileEmail,
      myProfileIndustry
    );

    if (myProfileIndustry === "") {
      toast.error("Please First enter Industry", {
        position: "top-right",
      });
    } else if (myProfileEmail === "") {
      toast.error("Please First enter Email", {
        position: "top-right",
      });
    } else if (myProfileCountry === "") {
      toast.error("Please First enter Country", {
        position: "top-right",
      });
    } else if (myProfileCity === "") {
      toast.error("Please First enter City", {
        position: "top-right",
      });
    } else if (myProfileZipCode === "") {
      toast.error("Please First enter Zip Code", {
        position: "top-right",
      });
    } else {
      let loggedInAccountAddress = this.state.loggedInAccountAddr;
      console.log(loggedInAccountAddress);

      // Update User Profile
      axios
        .put(`${process.env.REACT_APP_BASE_URL}user/createOrUpdateUser`, {
          walletaddress: loggedInAccountAddress,
          country: myProfileCountry,
          city: myProfileCity,
          zipcode: myProfileZipCode,
          language: myProfileLanguage,
          email: myProfileEmail,
          industry: myProfileIndustry,
        })

        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            toast.success("Successfully, Profile Updated", {
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  onProfileImgDelete = async () => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASE_URL + "user/deleteImage",
      data: {
        walletaddress: this.state.loggedInAccountAddr,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onProfileImgSelect = async (e) => {
    // console.log("event", e);
    // this.AllImageFiles = e.target.files;

    if (e.target.files[0].size > 5000000) {
      this.$toasted.error("File size must be smaller than 5 MB");
    } else {
      console.log("Selected Image File: ", e.target.files[0]);
      this.ProfileSelectedFileQual = e.target.files[0];
      let profileImgAdd = e.target.files[0];

      // requests for sending this selected file
      let userAccountAddress = this.props["props"].UserAccountAddr
        .userAccountAddr;
      var formData = new FormData();
      formData.append("walletaddress", userAccountAddress);
      formData.append("image", profileImgAdd);

      await axios({
        method: "put",
        url: process.env.REACT_APP_BASE_URL + "user/uploadImage",
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
          this.componentDidMount();
          // images data collection
        })
        .catch((err) => {
          // this.$toasted.error("Cannot able to attach this file.");
          console.log("error", err);
          // this.fileSelectionLoading = false;
        });
    }
    // Formate of the selected file
    // if (this.ProfileSelectedFileQual.name.length < 10) {
    //     this.istSelectedFileQualName = this.ProfileSelectedFileQual.name;
    // } else {
    //     const selectedFileFirst5ltr = this.ProfileSelectedFileQual.name.substring(
    //         0,
    //         5
    //     );
    //     const selectedFileLast5ltr = this.ProfileSelectedFileQual.name.slice(-5);
    //     this.istSelectedFileQualName =
    //         selectedFileFirst5ltr + " ... " + selectedFileLast5ltr;
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
            <h2 className="myPaymentHeading">My Profile</h2>
          </center>

          <div className="paymentDivContainer">
            <div className="profileDataContainer">
              <div className="row">
                <div className="col-5">
                  {this.state.userData === undefined ||
                    this.state.userData === "" ||
                    this.state.userData.image === "" ? (
                    //  ||this.state.userData.image === "" ||
                    //  this.state.userData.image === "not set" ||
                    //  this.state.userData.image === undefined
                    <div className="profileImgSection">
                      <img src={profileUser} alt="profileUser" />
                    </div>
                  ) : (
                    <div className="profileImgSection">
                      <img
                        src={
                          process.env.REACT_APP_BASE_URL +
                          this.state.userData.image
                        }
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}

                  {/* {this.state.userData === "" ? 
                      <img src={profileUser} alt="profileUser" />
:
                  <div className="profileImgSection">
                    {this.state.userData.image === "" ||
                    this.state.userData.image === "not set" ||
                    this.state.userData.image === undefined ? (
                      <img src={profileUser} alt="profileUser" />
                    ) : (
                      <img
                        src={
                          process.env.REACT_APP_BASE_URL +
                          this.state.userData.image
                        }
                        width="100%"
                        height="100%"
                      />
                    )}
                  </div>
  } */}
                </div>
                <div className="col-7">
                  <div className="myProfileMainLocationBox">
                    <img src={myProfileMap1} alt="myProfileMap1" />
                    <span style={{ zIndex: "99" }}>
                      <input
                        type="text"
                        placeholder="Country"
                        className="myProfileLocation"
                        id="myProfileCountry"
                      />
                    </span>
                    <img src={myprofileDropdown} alt="myprofileDropdown" />
                  </div>
                  <div className="myProfileMainLocationBox">
                    <img src={myProfileMap1} alt="myProfileMap1" />
                    {/* <span style={{ marginLeft: '-65px' }}>City</span> */}
                    <span style={{ zIndex: "99" }}>
                      <input
                        type="text"
                        placeholder="City"
                        className="myProfileLocation"
                        id="myProfileCity"
                      />
                    </span>

                    <img src={myprofileDropdown} alt="myprofileDropdown" />
                  </div>
                  <div className="myProfileMainLocationBox">
                    <img src={myProfileMap1} alt="myProfileMap1" />
                    {/* <span style={{ marginLeft: '-20px' }}>Zip Code</span> */}
                    <span style={{ zIndex: "99" }}>
                      <input
                        type="text"
                        placeholder="Zip Code"
                        className="myProfileLocation"
                        id="myProfileZipCode"
                      />
                    </span>
                    <img src={myprofileDropdown} alt="myprofileDropdown" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-5 profileImgAddSec">
                  <input
                    type="file"
                    onChange={(e) => this.onProfileImgSelect(e)}
                    style={{ display: "none" }}
                    id="myProfileImg"
                    ref="profileImg"
                    accept="image/x-png, image/jpeg, image/jpg"
                  />
                  <img
                    src={profileAddImg}
                    alt="profileAddImg"
                    onClick={() =>
                      document.getElementById("myProfileImg").click()
                    }
                  />
                  <img
                    src={profileDelete}
                    onClick={() => this.onProfileImgDelete()}
                    alt="profileDelete"
                  />
                </div>
                <div className="col-7">
                  <h2 className="myProfileTrustScoreTxt">
                    <b>My Trust Score: 77%</b>
                  </h2>
                </div>
              </div>
            </div>
            <div className="myProfileFeildsContainer">
              <Link to={{ pathname: "/MyProfileFurther" }}>
                <div className="resolutionOptionstoggle myProfileFeild">
                  <span className="alignStart">
                    <img
                      src={myProfileIcon}
                      alt="myProfileIcon"
                      style={{ marginTop: "-1px", marginRight: "10px" }}
                    />
                    <input
                      type="InvoiceinvoiceFields"
                      className="mutualFriendInput invoiceFields"
                      placeholder="My Profile"
                      style={{ marginTop: "1px" }}
                    />
                  </span>
                  <span
                    className="alignEnd"
                    style={{ float: "right", marginLeft: "-8px" }}
                  >
                    <img
                      src={myProfileFeildAdd}
                      style={{ marginTop: "0px" }}
                      className="floatRight"
                      alt="myProfileFeildAdd"
                    />
                  </span>
                </div>
              </Link>

              <div className="resolutionOptionstoggle myProfileFeild">
                <span className="alignStart">
                  <img
                    src={myProfileLanguage}
                    alt="myProfileLanguage"
                    style={{ marginTop: "-1px", marginRight: "10px" }}
                  />
                  <input
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    id="myProfileLanguage"
                    placeholder="English, Chinese"
                    style={{ marginTop: "1px" }}
                  />
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginLeft: "-8px" }}
                >
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
                  <img
                    src={myProfileEmailIcon}
                    alt="myProfileEmailIcon"
                    style={{ marginTop: "-1px", marginRight: "10px" }}
                  />
                  <input
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    placeholder="My Email"
                    id="myProfileEmail"
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
                  <img
                    src={myProfileEmailIcon}
                    alt="myProfileIndustryIcon"
                    style={{ marginTop: "-1px", marginRight: "10px" }}
                  />
                  <input
                    type="InvoiceinvoiceFields"
                    className="mutualFriendInput invoiceFields"
                    placeholder="Industry"
                    id="myProfileIndustry"
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
                  style={{ width: "95%" }}
                  onClick={() => {
                    this.myProfileSubmitHandler();
                  }}
                >
                  Update
                </p>
              </div>
              <span className="alignEnd" style={{ float: "right" }}>
                <Link to={{ pathname: "/MyProfileFurther" }}>
                  <img
                    src={myProfileNextPage}
                    className="floatRight"
                    alt="myProfileNextPage"
                  //  onClick={() => {
                  //     this.setState({ handleSelectMediatorLocation: false })
                  //     this.setState({ handleSelectMediatorTrust: true })
                  // }}
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
