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
import resolution from "../../Images/activeResolution.png";
import contract from "../../Images/contract.png";
import myWallet from "../../Images/myWallet.png";
import mapIcon from "../../Images/mapIcon.png";
import languageIcon from "../../Images/languageIcon.png";
import dropdownRegistered from "../../Images/dropdownRegistered.png";
import contractNext from "../../Images/contract/contractNext.png";
import contractPrev from "../../Images/contract/contractPrev.png";
import navMessage from "../../Images/Menu/navMessage.png";

import location1 from "../../Images/resolutionMediator/location1.png";
import location2 from "../../Images/resolutionMediator/location2.png";
import location3 from "../../Images/resolutionMediator/location3.png";
import location4 from "../../Images/resolutionMediator/location4.png";
import location5 from "../../Images/resolutionMediator/location5.png";
import location6 from "../../Images/resolutionMediator/location6.png";
import location7 from "../../Images/resolutionMediator/location7.png";
import location8 from "../../Images/resolutionMediator/location8.png";

import trust2 from "../../Images/resolutionMediator/trust2.png";
import trust4 from "../../Images/resolutionMediator/trust4.png";
import trust5 from "../../Images/resolutionMediator/trust5.png";
import trust6 from "../../Images/resolutionMediator/trust6.png";
import trust8 from "../../Images/resolutionMediator/trust8.png";

import price1 from "../../Images/resolutionMediator/price1.png";
import price2 from "../../Images/resolutionMediator/price2.png";
import price3 from "../../Images/resolutionMediator/price3.png";
import price5 from "../../Images/resolutionMediator/price5.png";
import price7 from "../../Images/resolutionMediator/price7.png";
import price8 from "../../Images/resolutionMediator/price8.png";

import mediatorAustraliaFlag from "../../Images/resolutionMediator/mediatorAustraliaFlag.png";
import mediatorNext from "../../Images/resolutionMediator/mediatorNext.png";
import mediatorPrev from "../../Images/resolutionMediator/mediatorPrev.png";
import mediatorSearch from "../../Images/resolutionMediator/mediatorSearch.png";
import mediatorSuggested from "../../Images/resolutionMediator/mediatorSuggested.png";

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

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
// import HeaderNav from '../../components/HeaderNav.jsx';

// css
import "../css/Resolution.css";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twoPartyOnly: false,
      mutualFriend: false,
      registeredMediator: false,
      openDropdown: false,
      selectedIndustry: "",
      handleSelectMediatorLocation: false,
      handleSelectMediatorTrust: false,
      handleSelectMediatorPrice: false,
      mediatorMagnifierView: false,
      selectedResolutionMediators: [],
      resolutionMediatorSelected: {},
      connectedUserAddr: "",
      letMeSelectOrVs: false
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

  handleSelectIndustry(e) {
    this.setState({ selectedIndustry: e });
    this.setState({ openDropdown: false });
  }

  handleLetMeSelectOrVs() {

    if (
      document.getElementById("resolutionAutomaticTxt").style
        .display === "initial"
    ) {
      setTimeout(() => {
        document.getElementById(
          "resolutionAutomaticBox"
        ).style.display = "initial";
        document.getElementById(
          "resolutionAutomaticTxt"
        ).style.display = "none";

        this.setState({ letMeSelectOrVs: true })

      }, 1);
    } else if (
      document.getElementById("resolutionAutomaticTxt").style
        .display === "none"
    ) {
      setTimeout(() => {
        document.getElementById(
          "resolutionAutomaticBox"
        ).style.display = "none";
        document.getElementById(
          "resolutionAutomaticTxt"
        ).style.display = "initial";

        this.setState({ letMeSelectOrVs: false })

      }, 1);
    }





  }

  handleMagnifierView(e) {
    console.log("jello");
    this.setState({ handleSelectMediatorLocation: false });
    this.setState({ handleSelectMediatorTrust: false });
    this.setState({ handleSelectMediatorPrice: false });
    this.setState({ mediatorMagnifierView: true });
  }

  handleSelectMediator(e) {
    let mediatorStatus = document.getElementById(e).style.display;
    console.log("mediatorStatus", mediatorStatus);
    document.getElementById(e).style.display = "initial";
    if (mediatorStatus === "initial") {
      document.getElementById(e).style.display = "none";
    }
  }
  handleSelectResolutionMediator(e) {
    let InvoiceIDSotre = localStorage.getItem(
      this.state.connectedUserAddr + "invoiceId"
    );
    let selectedMediatorId = e.id;
    console.log("selectedMediatorId", selectedMediatorId);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}resolutions/selectResolution/${InvoiceIDSotre}`,
        {
          resolution: "mediator",
          mediator: selectedMediatorId.toString(),
        }
      )

      .then((res) => {
        console.log(res.data);

        if (res.data.success === true) {
          setTimeout(() => {
            window.location = "Contract";
          }, 1000);
          toast.success("Successfully Resolution Selected", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSelectResolution() {
    if (document.getElementById("myonoffswitch3").checked === false) {
      let resolutionType;

      if (
        document.getElementById("resolutionAutomaticBox").style.display ===
        "none"
      ) {
        resolutionType = "Auto Select";
      } else if (document.getElementById("myonoffswitch1").checked) {
        resolutionType = "two party only";
      } else if (document.getElementById("myonoffswitch2").checked) {
        resolutionType = "mutual friend";
      }
      console.log(resolutionType);

      if (resolutionType !== "mutual friend") {
        let InvoiceIDSotre = localStorage.getItem(
          this.state.connectedUserAddr + "invoiceId"
        );

        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}resolutions/selectResolution/${InvoiceIDSotre}`,
            {
              resolution: resolutionType,
            }
          )

          .then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
              setTimeout(() => {
                window.location = "Contract";
              }, 1000);
              toast.success("Successfully Resolution Selected", {
                position: "top-right",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let InvoiceIDSotre = localStorage.getItem(
          this.state.connectedUserAddr + "invoiceId"
        );
        let friendEmailInput = document.getElementById("mutualFriendInputEmail")
          .value;

        if (friendEmailInput !== "") {
          console.log(friendEmailInput);

          axios
            .post(
              `${process.env.REACT_APP_BASE_URL}resolutions/selectResolution/${InvoiceIDSotre}`,
              {
                resolution: "mutual friend",
                friendsemail: friendEmailInput,
                mediator: "no need",
              }
            )

            .then((res) => {
              console.log(res.data);
              if (res.data.success === true) {
                setTimeout(() => {
                  window.location = "Contract";
                }, 1000);
                toast.success("Successfully Resolution Selected", {
                  position: "top-right",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("First type mutual friend email", {
            position: "top-right",
          });
        }
      }
    } else {
      if (this.state.selectedIndustry === "") {
        toast.error("Please first select industry", {
          position: "top-right",
        });
      } else {
        console.log(this.state.selectedIndustry);
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}resolutions/displayMeditorWithIndustry/${this.state.selectedIndustry}`
          )

          .then((res) => {
            console.log(res.data);

            if (typeof res.data.data === "object") {
              this.setState({ selectedResolutionMediators: res.data.data });
              console.log(this.state.selectedResolutionMediators);
              if (res.data.data.length !== 0) {
                if (this.state.handleSelectMediatorLocation === false) {
                  this.setState({ handleSelectMediatorLocation: true });
                } else {
                  this.setState({ handleSelectMediatorLocation: false });
                }
              } else {
                toast.error("No, Mediator found", {
                  position: "top-right",
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  render() {
    let resolutionMediatorEmail = this.state.resolutionMediatorSelected.email
    let resolutionMediatorProfileEmail =
      <a href={`mailto:${resolutionMediatorEmail}`} target="_blank">
        <img src={emailIcon} alt="emailIcon" />
      </a>




    let mutualFriendOrMentor;
    if (this.state.mutualFriend === true) {
      mutualFriendOrMentor = (
        <div>
          <div className="resolutionOptionstoggle optionChange mutualFriend">
            <span className="alignStart">
              <input
                id="mutualFriendInputEmail"
                type="mutualFriend"
                className="mutualFriendInput"
                placeholder="enter friend's email address"
              />
            </span>
            <span
              className="alignEnd mutualFriendChangeDiv"
              style={{ float: "right", marginRight: "-8px" }}
            >
              <div className="changeBox mutualChange">invite</div>
            </span>
          </div>

          {/* <div className="resolutionOptionstoggle optionChange mutualFriend">
            <span className="alignStart">
              <input
                type="mutualFriend"
                className="mutualFriendInput"
                placeholder="enter friend's wallet number"
              />
            </span>
            <span
              className="alignEnd mutualFriendChangeDiv"
              style={{ float: "right", marginRight: "-8px" }}
            >
              <div className="changeBox mutualChange">change</div>
            </span>
          </div> */}
        </div>
      );
    }

    let industrySelectedOrNot;
    if (this.state.selectedIndustry !== "") {
      industrySelectedOrNot = this.state.selectedIndustry;
    } else {
      industrySelectedOrNot = (
        <span style={{ color: "black" }}>Select Mediator industry</span>
      );
    }

    let resolutionBtn;
    if (this.state.selectedIndustry !== "") {
      resolutionBtn = (
        <p
          className="selectResolutionBtn alignCenter"
          onClick={() => {
            this.handleSelectResolution();
          }}
        >
          Select Mediator
        </p>
      );
    } else if (this.state.letMeSelectOrVs === true) {
      resolutionBtn = (
        <p
          className="selectResolutionBtn alignCenter"
          onClick={() => {
            this.handleSelectResolution();
          }}
        >
          Select Resolution
        </p>
      );
    } else if (this.state.selectedIndustry === "") {
      resolutionBtn = (
        <p
          className="selectResolutionBtn alignCenter"
          onClick={() => {
            this.handleSelectResolution();
          }}
        >
          Approve
        </p>
      );
    }

    let registeredMediator;
    if (this.state.registeredMediator === true) {
      registeredMediator = (
        <div>
          <div className="resolutionOptionstoggle registeredmediator">
            <span
              className="alignStart"
              style={{ color: "#21272A", fontSize: "19px" }}
            >
              {industrySelectedOrNot}
            </span>
            <span className="alignEnd" style={{ float: "right" }}>
              <img
                onClick={() => {
                  if (this.state.openDropdown === true) {
                    this.setState({ openDropdown: false });
                  } else {
                    this.setState({ openDropdown: true });
                  }
                }}
                src={dropdownRegistered}
                className="dropdownRegistered"
                alt="dropdownRegistered"
              />
            </span>
          </div>
        </div>
      );
    }
    let openDropdownContent;
    if (
      this.state.openDropdown === true &&
      this.state.registeredMediator === true
    ) {
      openDropdownContent = (
        <div className="resolutionOptionstoggle registeredmediator">
          <div className="registeredCompanies">
            <p
              onClick={() => {
                this.handleSelectIndustry("Construction");
              }}
            >
              Construction
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Import / Export");
              }}
            >
              Import / Export
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("IT & Software Development");
              }}
            >
              IT & Software Development
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Manufacturing");
              }}
            >
              Manufacturing
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Support Services");
              }}
            >
              Support Services
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Religion Christianity");
              }}
            >
              Religion Christianity
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Religion Islam");
              }}
            >
              Religion Islam
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Religion Judaism");
              }}
            >
              Religion Judaism
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Construction");
              }}
            >
              Construction
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Import / Export");
              }}
            >
              Import / Export
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("IT & Software Development");
              }}
            >
              IT & Software Development
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Manufacturing");
              }}
            >
              Manufacturing
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Support Services");
              }}
            >
              Support Services
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Religion Christianity");
              }}
            >
              Religion Christianity
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Religion Islam");
              }}
            >
              Religion Islam
            </p>
            <p
              onClick={() => {
                this.handleSelectIndustry("Religion Judaism");
              }}
            >
              Religion Judaism
            </p>
          </div>
        </div>
      );
    } else {
      // this.setState({openDropdown: false})
      this.state.openDropdown = false;
    }

    let handleMainPageContent;
    if (this.state.handleSelectMediatorLocation === true) {
      handleMainPageContent = (
        <div className="handleMainPage" style={{ overflow: "hidden" }}>
          <h6 className="selectResoutionTxt alignCenter selectMediatorHeading">
            <span className="slcMdtrActive">Location</span>
            <span
              className="SlcMedHeadingMiddle"
              onClick={() => {
                this.setState({ handleSelectMediatorLocation: false });
                this.setState({ handleSelectMediatorTrust: true });
                this.setState({ handleSelectMediatorPrice: false });
              }}
            >
              Trust Score
            </span>
            <span
              onClick={() => {
                this.setState({ handleSelectMediatorLocation: false });
                this.setState({ handleSelectMediatorTrust: false });
                this.setState({ handleSelectMediatorPrice: true });
              }}
            >
              Price / Hour
            </span>
          </h6>
          <div className="slcMedBlackContainer">
            <div className="row" style={{ marginTop: "-20px" }}>
              {this.state.selectedResolutionMediators.map((value, index) => (
                <div className="col-6" style={{ marginTop: "20px" }} key={index}>
                  {/* <div className="mediatorBlueDiv" onClick={() => { this.handleSelectMediator('location1') }}> */}
                  <div className="mediatorBlueDiv">
                    <div className="mediatorBlackDiv">
                      <img
                        src={mediatorSuggested}
                        id="location1"
                        className="mediatorSuggested"
                        alt="mediatorSuggested"
                      />
                      {value.passport === "" ? (
                        <img
                          src={location8}
                          className="mediatorMainPic"
                          alt="location8"
                        />
                      ) : (
                        <img
                          src={process.env.REACT_APP_BASE_URL + value.passport}
                          className="mediatorMainPic"
                          alt={value.passport}
                        />
                      )}
                      {/* <img
                        src={mediatorAustraliaFlag}
                        className="mediatorAustraliaFlag"
                        alt="mediatorAustraliaFlag"
                      /> */}
                      {/* <p className="mediatorsInfoTxt" style={{textAlign: 'center'}}>{value.id}</p> */}
                      <p className="mediatorsInfoTxt" style={{ textAlign: 'center' }}>84 %</p>
                    </div>
                    {/* <img src={mediatorSearch} onClick={() => { this.handleMagnifierView() }} alt="mediatorSearch" className='mediatorSearch' /> */}
                    <img
                      src={mediatorSearch}
                      alt="mediatorSearch"
                      className="mediatorSearch"
                      onClick={() => {
                        this.setState({ resolutionMediatorSelected: value });
                        this.handleMagnifierView();
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="row">
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("location1");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location1"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location1}
                      className="mediatorMainPic"
                      alt="location1"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">141</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("location2");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location2"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location2}
                      className="mediatorMainPic"
                      alt="location2"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">158</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("location3");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location3"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location3}
                      className="mediatorMainPic"
                      alt="location3"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">1708</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("location4");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location4"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location4}
                      className="mediatorMainPic"
                      alt="location4"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">2000</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("location5");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location5"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location5}
                      className="mediatorMainPic"
                      alt="location3"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">3000</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("location6");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location6"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location6}
                      className="mediatorMainPic"
                      alt="location4"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">2007</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("location7");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location7"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location7}
                      className="mediatorMainPic"
                      alt="location3"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">2017</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("location8");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="location8"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location8}
                      className="mediatorMainPic"
                      alt="location4"
                    />
                    <img
                      src={mediatorAustraliaFlag}
                      className="mediatorAustraliaFlag"
                      alt="mediatorAustraliaFlag"
                    />
                    <p className="mediatorsInfoTxt">2500</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="mediatorBlackBackground">
            <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
              {/* <span className="alignStart">
                                <img
                                    src={mediatorPrev}
                                    alt="mediatorPrev" onClick={() => {
                                        this.setState({ handleSelectMediatorLocation: false })
                                        this.setState({ handleSelectMediatorTrust: false })
                                    }}
                                />
                            </span> */}
              <div className="selectResolutionBtnDiv">
                {/* <Link to={{ pathname: "/Contract" }}> */}
                <p className="selectResolutionBtn alignCenter" onClick={() => toast.warning("First Select, Any Mediator", {
                  position: "top-right",
                })
                }>
                  Select Mediator
                </p>
                {/* </Link> */}
              </div>
              {/* <span className="alignEnd" style={{ float: 'right' }}>
                                <img src={mediatorNext} className='floatRight' alt="mediatorNext" onClick={() => {
                                    this.setState({ handleSelectMediatorLocation: false })
                                    this.setState({ handleSelectMediatorTrust: true })
                                }} />
                            </span> */}
            </div>
          </div>
        </div>
      );
    } else if (this.state.handleSelectMediatorTrust === true) {
      handleMainPageContent = (
        <div className="handleMainPage" style={{ overflow: "hidden" }}>
          <h6 className="selectResoutionTxt alignCenter selectMediatorHeading">
            <span
              onClick={() => {
                this.setState({ handleSelectMediatorLocation: true });
                this.setState({ handleSelectMediatorTrust: false });
                this.setState({ handleSelectMediatorPrice: false });
              }}
            >
              Location
            </span>
            <span className="SlcMedHeadingMiddle slcMdtrActive">
              Trust Score
            </span>
            <span
              onClick={() => {
                this.setState({ handleSelectMediatorLocation: false });
                this.setState({ handleSelectMediatorTrust: false });
                this.setState({ handleSelectMediatorPrice: true });
              }}
            >
              Price / Hour
            </span>
          </h6>
          <div className="slcMedBlackContainer">
            <div className="row">
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("trust1");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust1"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location7}
                      className="mediatorMainPic"
                      alt="location7"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">92%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("trust2");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust2"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={trust2}
                      className="mediatorMainPic"
                      alt="trust2"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">91%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("trust3");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust3"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location8}
                      className="mediatorMainPic"
                      alt="location8"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">87%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("trust4");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust4"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={trust4}
                      className="mediatorMainPic"
                      alt="trust4"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">85%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("trust5");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust5"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={trust5}
                      className="mediatorMainPic"
                      alt="trust5"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">82%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("trust6");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust6"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={trust6}
                      className="mediatorMainPic"
                      alt="trust6"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">80%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("trust7");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust7"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={location5}
                      className="mediatorMainPic"
                      alt="location5"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">79%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("trust8");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="trust8"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={trust8}
                      className="mediatorMainPic"
                      alt="trust8"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt">78%</p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mediatorBlackBackground">
            <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
              {/* <span className="alignStart">
                                <img
                                    src={mediatorPrev}
                                    alt="mediatorPrev" onClick={() => {
                                        this.setState({ handleSelectMediatorLocation: true })
                                        this.setState({ handleSelectMediatorTrust: false })
                                        this.setState({ handleSelectMediatorPrice: false })
                                    }}
                                />
                            </span> */}
              <div className="selectResolutionBtnDiv">
                {/* <Link to={{ pathname: "/Contract" }}> */}
                <p className="selectResolutionBtn alignCenter">
                  Select Mediator
                </p>
                {/* </Link> */}
              </div>
              {/* <span className="alignEnd" style={{ float: 'right' }}>
                                <img src={mediatorNext} className='floatRight' alt="mediatorNext" onClick={() => {
                                    this.setState({ handleSelectMediatorLocation: false })
                                    this.setState({ handleSelectMediatorTrust: false })
                                    this.setState({ handleSelectMediatorPrice: true })
                                }} />
                            </span> */}
            </div>
          </div>
        </div>
      );
    } else if (this.state.handleSelectMediatorPrice === true) {
      handleMainPageContent = (
        <div className="handleMainPage" style={{ overflow: "hidden" }}>
          <h6 className="selectResoutionTxt alignCenter selectMediatorHeading">
            <span
              onClick={() => {
                this.setState({ handleSelectMediatorLocation: true });
                this.setState({ handleSelectMediatorTrust: false });
                this.setState({ handleSelectMediatorPrice: false });
              }}
            >
              Location
            </span>
            <span
              className="SlcMedHeadingMiddle"
              onClick={() => {
                this.setState({ handleSelectMediatorLocation: false });
                this.setState({ handleSelectMediatorTrust: true });
                this.setState({ handleSelectMediatorPrice: false });
              }}
            >
              Trust Score
            </span>
            <span className="slcMdtrActive">Price / Hour</span>
          </h6>
          <div className="slcMedBlackContainer">
            <div className="row">
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("price1");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price1"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={price1}
                      className="mediatorMainPic"
                      alt="price1"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $5 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("price2");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price2"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={price2}
                      className="mediatorMainPic"
                      alt="price2"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $10 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("price3");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price3"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={price3}
                      className="mediatorMainPic"
                      alt="price3"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $14 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("price4");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price4"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={trust4}
                      className="mediatorMainPic"
                      alt="trust4"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $18 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("price5");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price5"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={price5}
                      className="mediatorMainPic"
                      alt="price5"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $19 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("price6");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price6"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={trust2}
                      className="mediatorMainPic"
                      alt="trust2"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $20 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv"
                  onClick={() => {
                    this.handleSelectMediator("price7");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price7"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={price7}
                      className="mediatorMainPic"
                      alt="price7"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $22 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="mediatorBlueDiv mediatorBlueDivMarginLeft"
                  onClick={() => {
                    this.handleSelectMediator("price8");
                  }}
                >
                  <div className="mediatorBlackDiv">
                    <img
                      src={mediatorSuggested}
                      id="price8"
                      className="mediatorSuggested"
                      alt="mediatorSuggested"
                    />
                    <img
                      src={price8}
                      className="mediatorMainPic"
                      alt="price8"
                    />
                    <p className="mediatorsInfoTxt mediatorTrustTxt mediatorPriceTxt">
                      $25 USD
                    </p>
                  </div>
                  <img
                    src={mediatorSearch}
                    onClick={() => {
                      this.handleMagnifierView();
                    }}
                    alt="mediatorSearch"
                    className="mediatorSearch"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mediatorBlackBackground">
            <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
              {/* <span className="alignStart">
                                <img
                                    src={mediatorPrev}
                                    alt="mediatorPrev" onClick={() => {
                                        this.setState({ handleSelectMediatorLocation: false })
                                        this.setState({ handleSelectMediatorTrust: true })
                                        this.setState({ handleSelectMediatorPrice: false })
                                    }}
                                />
                            </span> */}
              <div className="selectResolutionBtnDiv">
                {/* <Link to={{ pathname: "/Contract" }}> */}
                <p className="selectResolutionBtn alignCenter">
                  Select Mediator
                </p>
                {/* </Link> */}
              </div>
              {/* <span className="alignEnd" style={{ float: 'right' }}>
                                <Link to={{ pathname: '/Contract' }}>
                                    <img src={mediatorNext} className='floatRight' alt="mediatorNext" />
                                </Link>
                            </span> */}
            </div>
          </div>
        </div>
      );
    } else if (this.state.mediatorMagnifierView === true) {
      handleMainPageContent = (
        <div className="handleMainPage" style={{ overflow: "hidden" }}>
          <div>
            <div className="row pinkConainerMain">
              <div className="col-7 MediatorCardContainer">
                <div className="MediatorCard">
                  <div className="MediatorCardHead">
                    <div className="row">
                      <div className="col-6 MediatorCardImg">
                        {this.state.resolutionMediatorSelected.passport ===
                          "" ? (
                          <img
                            src={location8}
                            alt="MediatorCardImg"
                            style={{ borderRadius: "12px" }}
                          />
                        ) : (
                          <img
                            src={
                              process.env.REACT_APP_BASE_URL +
                              this.state.resolutionMediatorSelected.passport
                            }
                            style={{ borderRadius: "12px" }}
                            alt={this.state.resolutionMediatorSelected.passport}
                          />
                        )}
                        {/* <img src={flexlablogo} alt="MediatorCardImg" /> */}
                      </div>
                      <div className="col-6 MediatorCardHeadHeading MediatorCardHeadImg">
                        <img
                          src={faritraderRegisterdSign}
                          alt="faritraderRegisterdSign"
                        />
                        <h4 className="alignEnd">
                          {/* {this.state.resolutionMediatorSelected.industry} */}
                          Registered
                          <br />
                          Mediator
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="MediatorCardBottom">
                    <h5 className="mediatorName">
                      {this.state.resolutionMediatorSelected.name}
                    </h5>
                    <h4 className="mediatorDisc">
                      {this.state.resolutionMediatorSelected.businessName}
                    </h4>
                    <div className="medeatorDiscBox">
                      <div className="row">
                        <div className="col-4">
                          <h4>ID:</h4>
                          <h4>Joined:</h4>
                          <h4>City:</h4>
                          <img
                            src={mediatorAustraliaFlag}
                            width="35"
                            alt=""
                            style={{ marginTop: "7px" }}
                          />
                        </div>

                        <div className="col-8">
                          <h6>{this.state.resolutionMediatorSelected.id}</h6>
                          <h6>
                            {this.state.resolutionMediatorSelected.createdAt.substring(
                              0,
                              10
                            )}
                          </h6>
                          <h6>
                            {this.state.resolutionMediatorSelected.city === ""
                              ? "Not Defined"
                              : this.state.resolutionMediatorSelected.city}
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
                  <h4 className="mediatorName" style={{ color: "white" }}>
                    Qualifications:
                  </h4>
                  <div className="DetailedSubDiv">
                    <img
                      src={qualificationLeftImg}
                      alt="qualificationLeftImg"
                    />
                    <p className="DetailedSubDivPara">Yes</p>

                    <span className="alignEnd" style={{ float: "right" }}>
                      <img
                        src={qualificationRightImgArrow}
                        alt="qualificationRightImgArrow"
                      />
                    </span>
                  </div>
                  <h4 className="mediatorName" style={{ color: "white" }}>
                    Mediations:
                  </h4>
                  <div className="DetailedSubDiv DetailedSubDiv2">
                    <img src={mediatorLeftImg} alt="qualificationLeftImg" />

                    <span className="alignEnd" style={{ float: "right" }}>
                      <p className="detailedSubDivP">77</p>
                    </span>
                  </div>
                  <h4 className="mediatorName" style={{ color: "white" }}>
                    Appeals:
                  </h4>
                  <div className="DetailedSubDiv DetailedSubDiv2">
                    <img src={appealLeftImg} alt="qualificationLeftImg" />
                    <span className="alignEnd" style={{ float: "right" }}>
                      <p className="detailedSubDivP">0</p>
                    </span>
                  </div>
                  <h4 className="mediatorName" style={{ color: "white" }}>
                    Hourly Rate:
                  </h4>
                  <div className="DetailedSubDiv DetailedSubDiv2">
                    <img src={hourlyRateImg} alt="qualificationLeftImg" />

                    <span className="alignEnd" style={{ float: "right" }}>
                      <p className="detailedSubDivP">$40 USD</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contractBlackContainer">
            {/* <h6 className='alignCenter'>FTP Terms & Conditions</h6> */}
            <p style={{ marginTop: "-12px", fontSize: "17px" }}>
              FLEXLAB are experts in blockchain development services, including
              auditing of smart contracts. We can also conduct an audit on the
              work done by other developers and provide a detailed report in
              multiple languages. Please visit our website to or contact us by
              email. Thank you
            </p>

            <center>
              <div className="mediatorSocialLinks">
                <img src={websiteIcon} alt="websiteIcon" />
                {resolutionMediatorProfileEmail}
                <img src={telegramIcon} alt="telegramIcon" />
              </div>
            </center>

            <div className="selectResolutionDIv invoiceThreeBtnDiv contractDIvBTN">
              <span className="alignStart">
                <img src={mediatorPrev} alt="mapIcon" onClick={() => this.setState({ handleSelectMediatorLocation: true })} />
              </span>
              <span className="invoiceThreeBtn contractBTNText">
                <p
                  className="alignCenter selectResolutionMediatorBtn"
                  style={{ width: "210px" }}
                  onClick={() => {
                    this.handleSelectResolutionMediator(
                      this.state.resolutionMediatorSelected
                    );
                  }}
                >
                  Select Mediator
                </p>
              </span>
              <span className="alignEnd" style={{ float: "right" }}>
                <img
                  onClick={() => {
                    this.handleSelectResolutionMediator(
                      this.state.resolutionMediatorSelected
                    );
                  }}
                  src={mediatorNext}
                  className="floatRight"
                  alt="walletGreaterSign"
                />
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      handleMainPageContent = (
        <div className="handleMainPage">
          <div className="mainContainer" style={{ paddingTop: "25px" }}>
            <div
              className="resolutionOptionstoggle resolutionOptionstoggleAutoSelect"
              style={{ marginBottom: "-7px" }}
              onClick={() => this.handleLetMeSelectOrVs()}

            >
              <span className="alignStart">Let me select resolution</span>

              <span className="alignEnd" style={{ float: "right" }}>
                <div
                  className="onoffswitch"
                  style={{ marginTop: "-1px", marginRight: "-3px" }}
                >
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id="myonoffswitch0"
                    tabIndex="0"
                  />
                  <label
                    className="onoffswitch-label onoffswitch-label2"
                    htmlFor="myonoffswitch0"
                  >
                    <span className="onoffswitch-inner onoffswitch-inner2"></span>
                    <span className="onoffswitch-switch"></span>
                  </label>
                </div>
              </span>
            </div>

            <h6
              className="selectResoutionTxt alignCenter"
              id="resolutionAutomaticTxt"
              style={{ display: "initial" }}
            >
              The resolution is set to automatic
            </h6>

            <div id="resolutionAutomaticBox" style={{ display: "none" }}>
              <div
                className="resolutionOptionstoggle"
                onClick={() => {
                  document.getElementById("myonoffswitch2").checked = false;
                  document.getElementById("myonoffswitch3").checked = false;
                  this.setState({ registeredMediator: false });
                  this.setState({ mutualFriend: false });

                  const myonoffswitch1 = document.querySelector(
                    "#myonoffswitch1"
                  );
                  this.setState({ twoPartyOnly: myonoffswitch1.checked });
                  setTimeout(() => {
                    console.log("myonoffswitch1", this.state.twoPartyOnly);
                  }, 1);
                }}
              >
                <span className="alignStart">Two Party Only</span>

                <span className="alignEnd" style={{ float: "right" }}>
                  <div
                    className="onoffswitch"
                    style={{ marginTop: "-1px", marginRight: "-3px" }}
                  >
                    <input
                      type="checkbox"
                      name="onoffswitch"
                      className="onoffswitch-checkbox"
                      id="myonoffswitch1"
                      tabIndex="0"
                    />
                    <label
                      className="onoffswitch-label"
                      htmlFor="myonoffswitch1"
                    >
                      <span className="onoffswitch-inner"></span>
                      <span className="onoffswitch-switch"></span>
                    </label>
                  </div>
                </span>
              </div>

              <div
                className="resolutionOptionstoggle"
                onClick={() => {
                  document.getElementById("myonoffswitch1").checked = false;
                  document.getElementById("myonoffswitch3").checked = false;
                  this.setState({ registeredMediator: false });

                  const myonoffswitch2 = document.querySelector(
                    "#myonoffswitch2"
                  );

                  this.setState({ mutualFriend: myonoffswitch2.checked });
                  setTimeout(() => {
                    console.log("myonoffswitch2", this.state.mutualFriend);
                  }, 1);
                }}
              >
                <span className="alignStart">Mutual Friend / Mentor</span>
                <span className="alignEnd" style={{ float: "right" }}>
                  <div
                    className="onoffswitch"
                    style={{ marginTop: "-1px", marginRight: "-3px" }}
                  >
                    <input
                      type="checkbox"
                      name="onoffswitch"
                      className="onoffswitch-checkbox"
                      id="myonoffswitch2"
                      tabIndex="0"
                    />
                    <label
                      className="onoffswitch-label onoffswitch-label2"
                      htmlFor="myonoffswitch2"
                    >
                      <span className="onoffswitch-inner onoffswitch-inner2"></span>
                      <span className="onoffswitch-switch"></span>
                    </label>
                  </div>
                </span>
              </div>

              {mutualFriendOrMentor}

              <div
                className="resolutionOptionstoggle"
                onClick={() => {
                  document.getElementById("myonoffswitch2").checked = false;
                  document.getElementById("myonoffswitch1").checked = false;
                  this.setState({ mutualFriend: false });

                  const myonoffswitch3 = document.querySelector(
                    "#myonoffswitch3"
                  );
                  this.setState({ registeredMediator: myonoffswitch3.checked });
                  setTimeout(() => {
                    console.log(
                      "myonoffswitch3",
                      this.state.registeredMediator
                    );
                  }, 1);
                }}
              >
                <span className="alignStart">Registered Mediator</span>
                <span className="alignEnd" style={{ float: "right" }}>
                  <div
                    className="onoffswitch"
                    style={{ marginTop: "-1px", marginRight: "-3px" }}
                  >
                    <input
                      type="checkbox"
                      name="onoffswitch"
                      className="onoffswitch-checkbox"
                      id="myonoffswitch3"
                      tabIndex="0"
                    />
                    <label
                      className="onoffswitch-label onoffswitch-label3"
                      htmlFor="myonoffswitch3"
                    >
                      <span className="onoffswitch-inner onoffswitch-inner3"></span>
                      <span className="onoffswitch-switch"></span>
                    </label>
                  </div>
                </span>
              </div>

              {registeredMediator}
              {openDropdownContent}

              <div className="resolutionOptionstoggle optionChange autoPickedData">
                <span className="alignStart">
                  <img
                    src={mapIcon}
                    alt="mapIcon"
                    style={{ marginTop: "-4px", marginRight: "10px" }}
                  />
                  <span style={{ marginLeft: "6px" }}>
                    Australia
                    <span style={{ fontWeight: "normal", marginLeft: "6px" }}>
                      Melbourne
                    </span>
                  </span>
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginRight: "-8px" }}
                >
                  <div
                    className="changeBox autoPickedDataBtn"
                    onClick={() => {
                      toast.warning("Comming Soon!", {
                        position: "top-right",
                      });
                    }}
                  >
                    change
                  </div>
                </span>
              </div>

              <div className="resolutionOptionstoggle optionChange autoPickedData">
                <span className="alignStart">
                  <img
                    src={languageIcon}
                    alt="languageIcon"
                    style={{ marginTop: "-4px", marginRight: "10px" }}
                  />
                  <span style={{ fontWeight: "normal" }}>English, Chinese</span>
                </span>
                <span
                  className="alignEnd"
                  style={{ float: "right", marginRight: "-8px" }}
                >
                  <div
                    className="changeBox autoPickedDataBtn"
                    onClick={() => {
                      toast.warning("Comming Soon!", {
                        position: "top-right",
                      });
                    }}
                  >
                    change
                  </div>
                </span>
              </div>
            </div>

            <div className="selectResolutionDIv">
              <div className="selectResolutionBtnDiv">{resolutionBtn}</div>
            </div>
          </div>
        </div>
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
                            <p className="alignCenter activeImg">
                                <Link to={{ pathname: '/Resolution' }}>
                                    <img
                                        src={resolution}
                                        className='resolutionImg'
                                        alt="resolution" />
                                </Link>
                            </p>
                        </div>
                        <div className="col-3">
                            <p className="alignCenter iconSubNav">
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
          <div className="contractTabMenuItems">
            <button className="ResolutioninvoiceTab">
              <Link to={{ pathname: "/Invoice" }}>
                <img src={invoice} alt="invoice" />
              </Link>
            </button>
            <button className="ResolutionresolutionTab">
              <Link to={{ pathname: "/Resolution" }}>
                <img src={resolution} alt="resolution" />
              </Link>
            </button>
            <button className="ResolutioncontractTab">
              <Link to={{ pathname: "/Contract" }}>
                <img src={contract} alt="contract" />
              </Link>
            </button>
            <button className="ResolutionwalletTab">
              <Link to={{ pathname: "/Wallet" }}>
                <img src={myWallet} alt="myWallet" />
              </Link>
            </button>
          </div>
        </section>

        {handleMainPageContent}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
