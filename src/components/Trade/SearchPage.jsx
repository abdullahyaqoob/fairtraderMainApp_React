// react States
// import { useEffect, useState } from 'react'
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link, Route, Switch } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";

import lookup from "country-code-lookup";
// Images
import fairtraderLogo from "../../Images/fairtraderLogo.png";
import searchBtn from "../../Images/searchBtn.png";
import invoice from "../../Images/invoice.png";
import resolution from "../../Images/resolution.png";
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
import toggleBtn from "../../Images/toggleBtn.png";
import invoiceBack from "../../Images/Invoice/invoiceBack.png";
import paymentTether from "../../Images/Menu/paymentTether.png";
import paymentEth from "../../Images/Menu/paymentEth.png";
import paymentMatic from "../../Images/Menu/paymentMatic.png";
import paymentUsdt from "../../Images/Menu/paymentUsdt.png";
import profileUser from "../../Images/myProfile/profileUser.png";
import navMessage from "../../Images/Menu/navMessage.png";
// import walletLogo from '../../Images/wallet/connectLogo.png';
import myProfileNextPage from "../../Images/myProfile/myProfileNextPage.png";
import myProfileIcon from "../../Images/myProfile/myProfileIcon.png";
import profileFeildEdit from "../../Images/myProfile/profileFeildEdit.png";
import profileAddImg from "../../Images/myProfile/profileAddImg.png";
import profileDelete from "../../Images/myProfile/profileDelete.png";
import myProfileFeildAdd from "../../Images/myProfile/myProfileFeildAdd.png";
import myProfileLanguage from "../../Images/myProfile/myProfileLanguage.png";
import searchDrodown from "../../Images/Search/searchDrodown.png";
import searchIndustry from "../../Images/Search/searchIndustry.png";
import searchWallet from "../../Images/Search/searchWallet.png";
import myProfileEmailIcon from "../../Images/myProfile/myProfileEmailIcon.png";
import location1 from "../../Images/resolutionMediator/location1.png";
import Attension from "../../Images/Invoice/Attension.png";
import location8 from "../../Images/resolutionMediator/location8.png";
import mediatorSuggested from "../../Images/resolutionMediator/mediatorSuggested.png";
import mediatorAustraliaFlag from "../../Images/resolutionMediator/mediatorAustraliaFlag.png";
import mediatorSearch from "../../Images/resolutionMediator/mediatorSearch.png";
import appealLeftImg from "../../Images/detailed_view/appealLeftImg.png";
import emailIcon from "../../Images/detailed_view/emailIcon.png";
import faritraderRegisterdSign from "../../Images/detailed_view/faritraderRegisterdSign.png";
import flexlablogo from "../../Images/detailed_view/flexlablogo.png";
import hourlyRateImg from "../../Images/detailed_view/hourlyRateImg.png";
import mediatorLeftImg from "../../Images/detailed_view/mediatorLeftImg.png";
import qualificationLeftImg from "../../Images/detailed_view/qualificationLeftImg.png";
import qualificationRightImgArrow from "../../Images/detailed_view/qualificationRightImgArrow.png";
import telegramIcon from "../../Images/detailed_view/telegramIcon.png";
import websiteIcon from "../../Images/detailed_view/websiteIcon.png";
import mediatorNext from "../../Images/resolutionMediator/mediatorNext.png";
import mediatorPrev from "../../Images/resolutionMediator/mediatorPrev.png";

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// components
// import HeaderNav from '../../components/HeaderNav.jsx';

// css
import '../css/flagIcon.min.css';
import "../css/Search.css";
import "../css/myProfile.css";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookingForSection: false,
      trustScoreSection: false,
      lookingForSectionValue: "",
      trustScoreSectionValue: "",
      searchMediatorPage: false,
      magnifierViewUserData: {},
      serachedMediatorList: [],
    };
  }
  searchValueSections(val) {
    this.setState({ lookingForSectionValue: val });
    this.setState({ lookingForSection: false });
    document.getElementById("servicesInput").value = val;
  }

  trustScoreValueSections(val) {
    this.setState({ trustScoreSectionValue: val });
    this.setState({ trustScoreSection: false });
    document.getElementById("trustScoreInput").value = val;
  }
  async componentWillMount() { }

  searchHandler = async (e) => {
    let searchWalletAddr = document.getElementById("searchWalletAddr").value;
    let searchEmail = document.getElementById("searchEmail").value;
    let searchIndustry = document.getElementById("searchIndustry").value;
    let searchCountry = document.getElementById("searchCountry").value;
    let searchCity = document.getElementById("searchCity").value;
    let searchPostCode = document.getElementById("searchPostCode").value;
    let searchLanguage = document.getElementById("searchLanguage").value;

    console.log(
      searchWalletAddr,
      searchEmail,
      searchIndustry,
      searchCountry,
      searchCity,
      searchPostCode,
      searchLanguage
    );
    console.log(this.state.lookingForSectionValue);
    console.log(this.state.trustScoreSectionValue);

    let requestSearchData = {
      name: "JavaScript",
    };

    if (searchWalletAddr !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        walletaddress: searchWalletAddr,
      });
    }
    if (searchEmail !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        email: searchEmail,
      });
    }
    if (searchIndustry !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        industry: searchIndustry,
      });
    }
    if (searchCountry !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        country: searchCountry,
      });
    }
    if (searchCity !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        city: searchCity,
      });
    }
    if (searchPostCode !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        zipcode: searchPostCode,
      });
    }
    if (searchLanguage !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        language: searchLanguage,
      });
    }
    if (this.state.lookingForSectionValue !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        providing: this.state.lookingForSectionValue,
      });
    }
    if (this.state.trustScoreSectionValue !== "") {
      requestSearchData = Object.assign(requestSearchData, {
        priceperhour: this.state.trustScoreSectionValue,
      });
    }
    delete requestSearchData.name;

    console.log(requestSearchData);

    if (
      (searchWalletAddr === "") &
      (searchEmail === "") &
      (searchIndustry === "") &
      (searchCountry === "") &
      (searchCity === "") &
      (searchPostCode === "") &
      (searchLanguage === "") &
      (this.state.lookingForSectionValue === "") &
      (this.state.trustScoreSectionValue === "")
    ) {
      alert("Please type some search Filters");
    } else {
      await axios
        .post(
          process.env.REACT_APP_BASE_URL + "user/searchUsers",
          requestSearchData
        )
        .then((res) => {
          console.log(res.data);
          this.setState({ serachedMediatorList: res.data.data });
          this.setState({ searchMediatorPage: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    function handleFlag(e) {
      console.log(e);
      let countryCOde = lookup.byCountry(e.country)
      return <span style={{ fontSize: '25px', marginTop: '7px' }} className={`flag-icon flag-icon-${countryCOde.iso2.toLowerCase()}`}></span>
    }

    let resolutionMediatorProfileEmail;
    let resolutionMediatorEmail = this.state.magnifierViewUserData.email
    if (resolutionMediatorEmail !== '') {
      resolutionMediatorProfileEmail =
        <a href={`mailto:${resolutionMediatorEmail}`} target="_blank">
          <img src={emailIcon} alt="emailIcon" />
        </a>
    } else {
      resolutionMediatorProfileEmail =
        <img src={emailIcon} alt="emailIcon" onClick={() => { toast.warning("Not defined") }} />
    }

    let resolutionMediatorProfileWebsite;
    let resolutionMediatorWebsite = this.state.magnifierViewUserData.facebook
    if (resolutionMediatorWebsite !== '') {
      resolutionMediatorProfileWebsite =
        <a href={resolutionMediatorWebsite} target="_blank">
          <img src={websiteIcon} alt="websiteIcon" />
        </a>
    } else {
      resolutionMediatorProfileWebsite =
        <img src={websiteIcon} alt="websiteIcon" onClick={() => { toast.warning("Not defined") }} />
    }


    return (
      <>
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

          <div className="handleMainPage" id="searchTabBody">
            <br />
            <center>
              <h2 className="myPaymentHeading">What are you looking for?</h2>
            </center>

            <div className="paymentDivContainer">
              {this.state.searchMediatorPage === false ? (
                <div className="myProfileFeildsContainer">
                  <div
                    className="resolutionOptionstoggle myProfileFeild"
                    style={{ marginTop: "-5px" }}
                  >
                    <span className="alignStart">
                      <img
                        src={searchWallet}
                        alt="searchWallet"
                        style={{ marginTop: "-1px", marginRight: "10px" }}
                      />
                      <input
                        id="searchWalletAddr"
                        type="InvoiceinvoiceFields"
                        className="mutualFriendInput invoiceFields"
                        placeholder="Search by wallet number"
                        style={{ marginTop: "1px" }}
                      />
                    </span>
                    <span
                      className="alignEnd"
                      style={{ float: "right", marginRight: "-8px" }}
                    >
                      <img
                        src={profileFeildEdit}
                        style={{ marginTop: "0px", marginRight: "10px" }}
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
                        style={{
                          marginTop: "-2px",
                          marginRight: "10px",
                          width: "32px",
                        }}
                      />

                      <input
                        id="searchEmail"
                        type="InvoiceinvoiceFields"
                        className="mutualFriendInput invoiceFields"
                        placeholder="Search by email"
                        style={{ marginTop: "1px" }}
                      />
                    </span>
                    <span
                      className="alignEnd"
                      style={{ float: "right", marginRight: "-8px" }}
                    >
                      <img
                        src={profileFeildEdit}
                        style={{ marginTop: "0px", marginRight: "10px" }}
                        className="floatRight"
                        alt="profileFeildEdit"
                      />
                    </span>
                  </div>

                  <div className="resolutionOptionstoggle myProfileFeild">
                    <span className="alignStart">
                      <img
                        src={searchIndustry}
                        alt="searchIndustry"
                        style={{ marginTop: "-1px", marginRight: "10px" }}
                      />

                      <input
                        id="searchIndustry"
                        type="InvoiceinvoiceFields"
                        className="mutualFriendInput invoiceFields"
                        placeholder="Search Industry"
                        style={{ marginTop: "1px" }}
                      />
                    </span>
                    <span
                      className="alignEnd"
                      style={{ float: "right", marginRight: "-8px" }}
                    >
                      <img
                        src={profileFeildEdit}
                        style={{ marginTop: "0px", marginRight: "10px" }}
                        className="floatRight"
                        alt="profileFeildEdit"
                      />
                    </span>
                  </div>
                  <h4 className="searchDiscription">
                    Choose location and search preferences:
                  </h4>

                  <div className="row">
                    <div className="col-6">
                      <h6 className="searchFeildLabel">Country:</h6>
                      <div className="resolutionOptionstoggle myProfileFeild">
                        <span className="alignStart">
                          <input
                            id="searchCountry"
                            type="InvoiceinvoiceFields"
                            className="mutualFriendInput invoiceFields"
                            placeholder="Australia"
                            style={{ marginTop: "1px" }}
                          />
                        </span>
                        <span
                          className="alignEnd"
                          style={{ float: "right", marginRight: "-8px" }}
                        >
                          <img
                            src={searchDrodown}
                            style={{ marginTop: "0px", marginRight: "4px" }}
                            className="floatRight"
                            alt="profileFeildEdit"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 className="searchFeildLabel">Looking For:</h6>
                      <div
                        className="resolutionOptionstoggle myProfileFeild"
                        onClick={() => {
                          if (this.state.lookingForSection === true) {
                            this.setState({ lookingForSection: false });
                          } else {
                            this.setState({ lookingForSection: true });
                            this.setState({ trustScoreSection: false });
                          }
                        }}
                      >
                        <span className="alignStart">
                          <input
                            id="servicesInput"
                            type="InvoiceinvoiceFields"
                            className="mutualFriendInput invoiceFields"
                            disabled
                            placeholder="Services"
                            style={{ marginTop: "1px" }}
                          />
                        </span>
                        <span
                          className="alignEnd"
                          style={{ float: "right", marginRight: "-8px" }}
                        >
                          <img
                            src={searchDrodown}
                            style={{ marginTop: "0px", marginRight: "4px" }}
                            className="floatRight"
                            alt="profileFeildEdit"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6">
                      {this.state.lookingForSection === true ? (
                        <div className="resolutionOptionstoggle myProfileFeild searchOpenSections">
                          <h3
                            onClick={() => {
                              this.searchValueSections("Goods");
                            }}
                          >
                            Goods
                          </h3>
                          <h3
                            onClick={() => {
                              this.searchValueSections("Services");
                            }}
                          >
                            Services
                          </h3>
                          <h3
                            onClick={() => {
                              this.searchValueSections("Mediator");
                            }}
                          >
                            Mediator
                          </h3>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <h6 className="searchFeildLabel">City:</h6>
                      <div className="resolutionOptionstoggle myProfileFeild">
                        <span className="alignStart">
                          <input
                            id="searchCity"
                            type="InvoiceinvoiceFields"
                            className="mutualFriendInput invoiceFields"
                            placeholder="Melbourne"
                            style={{ marginTop: "1px" }}
                          />
                        </span>
                        <span
                          className="alignEnd"
                          style={{ float: "right", marginRight: "-8px" }}
                        >
                          <img
                            src={searchDrodown}
                            style={{ marginTop: "0px", marginRight: "4px" }}
                            className="floatRight"
                            alt="profileFeildEdit"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 className="searchFeildLabel">Search Preference:</h6>
                      <div
                        className="resolutionOptionstoggle myProfileFeild"
                        onClick={() => {
                          if (this.state.trustScoreSection === true) {
                            this.setState({ trustScoreSection: false });
                          } else {
                            this.setState({ trustScoreSection: true });
                            this.setState({ lookingForSection: false });
                          }
                        }}
                      >
                        <span className="alignStart">
                          <input
                            id="trustScoreInput"
                            type="InvoiceinvoiceFields"
                            className="mutualFriendInput invoiceFields"
                            disabled
                            placeholder="Trust Score"
                            style={{ marginTop: "1px" }}
                          />
                        </span>
                        <span
                          className="alignEnd"
                          style={{ float: "right", marginRight: "-8px" }}
                        >
                          <img
                            src={searchDrodown}
                            style={{ marginTop: "0px", marginRight: "4px" }}
                            className="floatRight"
                            alt="profileFeildEdit"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6">
                      {this.state.trustScoreSection === true ? (
                        <div className="resolutionOptionstoggle myProfileFeild searchOpenSections">
                          <h3
                            onClick={() => {
                              this.trustScoreValueSections("Location");
                            }}
                          >
                            Location
                          </h3>
                          <h3
                            onClick={() => {
                              this.trustScoreValueSections("Price per hour");
                            }}
                          >
                            Price per hour
                          </h3>
                          <h3
                            onClick={() => {
                              this.trustScoreValueSections("Trust score");
                            }}
                          >
                            Trust score
                          </h3>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <h6 className="searchFeildLabel">Post Code:</h6>
                      <div className="resolutionOptionstoggle myProfileFeild">
                        <span className="alignStart">
                          <input
                            id="searchPostCode"
                            type="InvoiceinvoiceFields"
                            className="mutualFriendInput invoiceFields"
                            placeholder="3000"
                            style={{ marginTop: "1px" }}
                          />
                        </span>
                        <span
                          className="alignEnd"
                          style={{ float: "right", marginRight: "-8px" }}
                        >
                          <img
                            src={searchDrodown}
                            style={{ marginTop: "0px", marginRight: "4px" }}
                            className="floatRight"
                            alt="profileFeildEdit"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 className="searchFeildLabel">Language:</h6>
                      <div className="resolutionOptionstoggle myProfileFeild">
                        <span className="alignStart">
                          <input
                            id="searchLanguage"
                            type="InvoiceinvoiceFields"
                            className="mutualFriendInput invoiceFields"
                            placeholder="English"
                            style={{ marginTop: "1px" }}
                          />
                        </span>
                        <span
                          className="alignEnd"
                          style={{ float: "right", marginRight: "-8px" }}
                        >
                          <img
                            src={searchDrodown}
                            style={{ marginTop: "0px", marginRight: "4px" }}
                            className="floatRight"
                            alt="profileFeildEdit"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : this.state.searchMediatorPage === true ? (
                <div className="slcMedBlackContainer serachBasedMediator">
                  {/* <div className="row" style={{backgroundColor: 'red',width: '106.5%'}}> */}
                  <div className="row" style={{ marginTop: "-20px" }}>
                    {this.state.serachedMediatorList.map((value, index) => (
                      <div className="col-6" style={{ marginTop: "20px" }}>
                        {/* <div className="mediatorBlueDiv" onClick={() => { this.handleSelectMediator('location1') }}> */}
                        <div className="mediatorBlueDiv">
                          <div className="mediatorBlackDiv">
                            <img
                              src={mediatorSuggested}
                              id="profileUser"
                              className="mediatorSuggested"
                              alt="mediatorSuggested"
                            />
                            {value.image === "" ? (
                              <img
                                src={profileUser}
                                className="mediatorMainPic"
                                alt="profileUser"
                              />
                            ) : (
                              <img
                                src={
                                  process.env.REACT_APP_BASE_URL + value.image
                                }
                                className="mediatorMainPic"
                                alt={value.image}
                              />
                            )}
                            {/* <img
                              src={mediatorAustraliaFlag}
                              className="mediatorAustraliaFlag"
                              alt="mediatorAustraliaFlag"
                            /> */}
                            <p className="mediatorsInfoTxt" style={{ textAlign: 'center' }}>
                              {value.priceperhour}
                            </p>
                          </div>
                          {/* <img src={mediatorSearch} onClick={() => { this.handleMagnifierView() }} alt="mediatorSearch" className='mediatorSearch' /> */}
                          <img
                            src={mediatorSearch}
                            alt="mediatorSearch"
                            className="mediatorSearch"
                            onClick={() => {
                              this.setState({ magnifierViewUserData: value });
                              this.setState({
                                searchMediatorPage: "magnifier",
                              });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <div
                      className="row pinkConainerMain"
                      style={{ marginTop: "0px" }}
                    >
                      <div className="col-7 MediatorCardContainer">
                        <div className="MediatorCard">
                          <div className="MediatorCardHead">
                            <div className="row">
                              <div className="col-6 MediatorCardImg">
                                {this.state.magnifierViewUserData.image ===
                                  "" ? (
                                  <img
                                    src={profileUser}
                                    alt="MediatorCardImg"
                                    style={{ borderRadius: "12px" }}
                                  />
                                ) : (
                                  <img
                                    src={
                                      process.env.REACT_APP_BASE_URL +
                                      this.state.magnifierViewUserData.image
                                    }
                                    style={{ borderRadius: "12px" }}
                                    alt={this.state.magnifierViewUserData.image}
                                  />
                                )}
                              </div>
                              <div className="col-6 MediatorCardHeadHeading MediatorCardHeadImg">
                                <img
                                  src={faritraderRegisterdSign}
                                  alt="faritraderRegisterdSign"
                                />
                                <h4 className="alignEnd">
                                  {/* {this.state.magnifierViewUserData.providing} */}
                                  {this.state.magnifierViewUserData.providing === "" ?
                                    "Service" : this.state.magnifierViewUserData.providing}
                                  <br />
                                  Provider
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="MediatorCardBottom">
                            <h5 className="mediatorName">
                              {this.state.magnifierViewUserData.industry}
                            </h5>
                            <h4 className="mediatorDisc">
                              {this.state.magnifierViewUserData.buisnessname}
                            </h4>

                            <div className="medeatorDiscBox">
                              <div className="row">
                                <div className="col-4">
                                  <h4>ID:</h4>
                                  <h4>Joined:</h4>
                                  <h4>ZIP:</h4>
                                  {handleFlag(this.state.magnifierViewUserData)}

                                  {/* <img
                                    src={mediatorAustraliaFlag}
                                    width="35"
                                    alt=""
                                    style={{ marginTop: "7px" }}
                                  /> */}
                                </div>
                                <div className="col-8">
                                  <h6>{this.state.magnifierViewUserData.id}</h6>
                                  <h6>
                                    {this.state.magnifierViewUserData.createdAt.substring(
                                      0,
                                      10
                                    )}
                                  </h6>
                                  <h6>
                                    {this.state.magnifierViewUserData.zipcode}
                                  </h6>
                                </div>
                              </div>
                            </div>

                            <h2 className="registeredMediatorPercent">97%</h2>
                          </div>
                        </div>
                      </div>
                      <div className="col-5 MediatorCardRightSide">
                        <div className="mediatorCardSubDiv">
                          <h4
                            className="mediatorName"
                            style={{ color: "white" }}
                          >
                            Qualifications:
                          </h4>
                          <div className="DetailedSubDiv">
                            <img
                              src={qualificationLeftImg}
                              alt="qualificationLeftImg"
                            />
                            <p className="DetailedSubDivPara">Yes</p>

                            <span
                              className="alignEnd"
                              style={{ float: "right" }}
                            >
                              <img
                                src={qualificationRightImgArrow}
                                alt="qualificationRightImgArrow"
                              />
                            </span>
                          </div>
                          <h4
                            className="mediatorName"
                            style={{ color: "white" }}
                          >
                            Mediations:
                          </h4>
                          <div className="DetailedSubDiv DetailedSubDiv2">
                            <img
                              src={mediatorLeftImg}
                              alt="qualificationLeftImg"
                            />

                            <span
                              className="alignEnd"
                              style={{ float: "right" }}
                            >
                              <p className="detailedSubDivP">2</p>
                            </span>
                          </div>
                          <h4
                            className="mediatorName"
                            style={{ color: "white" }}
                          >
                            Appeals:
                          </h4>
                          <div className="DetailedSubDiv DetailedSubDiv2">
                            <img
                              src={appealLeftImg}
                              alt="qualificationLeftImg"
                            />
                            <span
                              className="alignEnd"
                              style={{ float: "right" }}
                            >
                              <p className="detailedSubDivP">1</p>
                            </span>
                          </div>
                          <h4
                            className="mediatorName"
                            style={{ color: "white" }}
                          >
                            Hourly Rate:
                          </h4>
                          <div className="DetailedSubDiv DetailedSubDiv2">
                            <img
                              src={hourlyRateImg}
                              alt="qualificationLeftImg"
                            />

                            <span
                              className="alignEnd"
                              style={{ float: "right" }}
                            >
                              <p className="detailedSubDivP">${this.state.magnifierViewUserData.priceperhour} USD</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contractBlackContainer">
                    {this.state.magnifierViewUserData.bio === "" ?
                      <p style={{ marginTop: "-12px", fontSize: "17px" }}>
                        No Biography
                      </p> :
                      <textarea
                        className="BuisInput"
                        type="text"
                        value={this.state.magnifierViewUserData.bio}
                        placeholder="Your Bio"
                        ref="userBio"
                      ></textarea>
                    }

                    <center>
                      <div className="mediatorSocialLinks">
                        {resolutionMediatorProfileWebsite}
                        {resolutionMediatorProfileEmail}

                        {/* <img src={emailIcon} alt="emailIcon" /> */}
                        <img src={telegramIcon} alt="telegramIcon" onClick={() => { toast.warning("Not defined") }} />
                      </div>
                    </center>

                    <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
                      <span className="alignStart">
                        <img src={mediatorPrev} alt="mapIcon" />
                      </span>
                      <span className="invoiceThreeBtn contractBTNText">
                        <p
                          className="alignCenter selectResolutionMediatorBtn"
                          style={{ width: "210px" }}
                        >
                          Select Mediator
                        </p>
                      </span>
                      <span className="alignEnd" style={{ float: "right" }}>
                        <Link to={{ pathname: "/Resolution" }}>
                          <img
                            src={mediatorNext}
                            className="floatRight"
                            alt="walletGreaterSign"
                          />
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN mediatorSearchBtnBag">
                <span className="alignStart">
                  {/* <Link to={{ pathname: '/Menu' }}> */}
                  <img
                    onClick={() => {
                      if (this.state.searchMediatorPage === true) {
                        this.setState({ searchMediatorPage: false })
                      } else if (this.state.searchMediatorPage === false) {
                        window.location = "Menu"
                      } else if (this.state.searchMediatorPage === "magnifier") {
                        this.setState({ searchMediatorPage: true })
                      }
                    }
                    }
                    src={invoiceBack}
                    alt="invoiceBack"
                  />
                  {/* </Link> */}
                </span>

                <div className="selectResolutionBtnDiv">
                  {this.state.searchMediatorPage === false ?
                    <p
                      className="selectResolutionBtn alignCenter"
                      style={{ width: "95%" }}
                      onClick={() => this.searchHandler()}
                    >
                      Search
                    </p>
                    :
                    <p
                      className="selectResolutionBtn alignCenter"
                      style={{ width: "95%" }}
                    >
                      Contact
                    </p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
