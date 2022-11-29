// react States
import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import { useNavigate } from "react-router-dom";

// components
// Trade
import Resolution from "./components/Trade/Resolution.jsx";
import Invoice from "./components/Trade/Invoice.jsx";
import Contract from "./components/Trade/Contract.jsx";
import Wallet from "./components/Trade/Wallet.jsx";
import WalletConnectPage from "./components/Trade/WalletConnectPage.jsx";
import Menu from "./components/Trade/Menu.jsx";
import MyPayment from "./components/Trade/myPayment.jsx";
import MyProfile from "./components/Trade/MyProfile.jsx";
import MyProfileFurther from "./components/Trade/MyProfileFurther.jsx";
import SearchPage from "./components/Trade/SearchPage.jsx";
import PurchaseHistory from "./components/Trade/PurchaseHistory.jsx";
import SalesHistory from "./components/Trade/SalesHistory.jsx";
import CreateInvoice from "./components/Trade/CreateInvoice.jsx";

// Mediate
import Attention from "./components/Mediate/Attention.jsx";
import OverdueTasks from "./components/Mediate/Attensions/OverdueTasks.jsx";
import MedResolution from "./components/Mediate/MedResolution.jsx";
import NewCases from "./components/Mediate/MedResolution/NewCases.jsx";
import CaseHistory from "./components/Mediate/MedResolution/CaseHistory";
import MyFees from "./components/Mediate/MyFees.jsx";
import PaidFees from "./components/Mediate/MyFees/PaidFees.jsx";

import Messages from "./components/Messages.jsx";
import Assets from "./components/Assets.jsx";
import MedAssets from "./components/MedAssets.jsx";
import DesktopVersion from "./components/DesktopVersion.jsx";
// css
import "./App.css";
import axios from "axios";
// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userProfileData = createContext();
const userContectedAccount = createContext();
const userContectedNetwork = createContext();

function App() {
  const navigate = useNavigate();

  const [userAccountAddr, setuserAccountAddr] = useState("");
  const [userAccountEmail, setuserAccountEmail] = useState("");
  const [userAccountNtw, setuserAccountNtw] = useState("");
  const [userBusinessname, setuserBusinessname] = useState("");
  const [metamaskStatus, setmetamaskStatus] = useState("");
  const [props, setprops] = useState({});

  useEffect(() => {
    if (window.ethereum === undefined) {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    } else {
      window.ethereum.on("chainChanged", function(accounts) {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", function(accounts) {
        window.location.reload();
      });

      asyncFunc();
    }
  }, []);

  const asyncFunc = async () => {
    if (localStorage.getItem("userViewTradeOrMediate") === null) {
      localStorage.setItem("userViewTradeOrMediate", "trade");
    }

    if (await window.ethereum._metamask.isUnlocked()) {
      setmetamaskStatus(await window.ethereum._metamask.isUnlocked());

      let userAccountt = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let userAccount = userAccountt[0];
      console.log(userAccount);
      setuserAccountAddr(userAccount);

      // temparary set account
      // let temparayAddr = "adddresssss1";
      // setuserAccountAddr(temparayAddr);
      // let userAccount = temparayAddr;

      setuserAccountNtw(window.ethereum.networkVersion);

      setprops({
        MetamaskStatus: {
          metamaskStatus: await window.ethereum._metamask.isUnlocked(),
        },
        UserAccountAddr: { userAccountAddr: userAccount },
      });

      axios
        .post(process.env.REACT_APP_BASE_URL + "user/searchUsers", {
          walletaddress: userAccount,
        })
        .then((res) => {
          if (
            res.data.success === false ||
            res.data.data.length === 0 ||
            res.data.data[0].email === "" ||
            res.data.data[0].email === undefined
          ) {
            if (localStorage.getItem("userViewTradeOrMediate") !== "mediate") {
              toast.error("Please first complete your profile", {
                position: "top-right",
              });
              // alert("Please first complete your profile");
              setTimeout(() => {
                navigate("/MyProfile");
              }, 1000);
            }
          } else if (res.data.data[0].email !== "") {
            setuserAccountEmail(res.data.data[0].email);
            setuserBusinessname(res.data.data[0].buisnessname);
          }
        })
        .catch((err) => {
          console.log(err);
          // alert("Please first complete your profile");
          // setTimeout(() => {
          //   navigate("/MyProfile");
          // }, 1000);
        });
    } else {
      setTimeout(() => {
        alert("Please first connect your wallet");
      }, 200);
      navigate("/WalletConnectPage");
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Wallet />} />
        <Route
          path="/Invoice"
          element={
            <Invoice
              props={{
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/PurchaseHistory"
          element={
            <PurchaseHistory
              props={{
                UserAccountAddr: { userAccountAddr },
                MetamaskStatus: { metamaskStatus },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/SalesHistory"
          element={
            <SalesHistory
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
                userBusinessname: {userBusinessname}
              }}
              // props={props}
            />
          }
        />
        <Route
          path="/CreateInvoice"
          element={
            <CreateInvoice
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
                userBusinessname: {userBusinessname}
              }}
              // props={props}
            />
          }
        />
        <Route
          path="/Resolution"
          element={
            <Resolution
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
              }}
              // props={
              //   props
              // }
            />
          }
        />
        <Route
          path="/Contract"
          element={
            <Contract
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
              }}
              // props={
              //   props
              // }
            />
          }
        />
        <Route
          path="/Wallet"
          element={<Wallet props={{ MetamaskStatus: { metamaskStatus } }} />}
        />
        <Route path="/WalletConnectPage" element={<WalletConnectPage />} />
        <Route path="/Menu" element={<Menu />} />
        <Route
          path="/MyPayment"
          element={
            <MyPayment
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
              }}
              // props={
              //   props
              // }
            />
          }
        />
        {/* <Route path='/MyProfile' element={<MyProfile props={{ MetamaskStatus:{metamaskStatus}, UserAccountAddr:{userAccountAddr}, UserAccountNtw:{userAccountNtw}}} />} /> */}
        <Route
          path="/MyProfile"
          element={
            <MyProfile
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
              }}
              // props={
              //   props
              // }
            />
          }
        />
        <Route
          path="/MyProfileFurther"
          element={
            <MyProfileFurther
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
              }}
              // props={props}
            />
          }
        />
        <Route path="/SearchPage" element={<SearchPage />} />

        {/* Mediate */}
        <Route
          path="/Attention"
          element={
            <Attention
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/MedResolution"
          element={
            <MedResolution
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/MyFees"
          element={
            <MyFees
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/OverdueTasks"
          element={
            <OverdueTasks
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/NewCases"
          element={
            <NewCases
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/CaseHistory"
          element={
            <CaseHistory
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />

        <Route
          path="/PaidFees"
          element={
            <PaidFees
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
            />
          }
        />
        <Route
          path="/Messages"
          element={
            <Messages
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
              // props={props}
            />
          }
        />
        <Route
          path="/Assets"
          element={
            <Assets
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
              // props={props}
            />
          }
        />
        <Route
          path="/MedAssets"
          element={
            <MedAssets
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
              // props={props}
            />
          }
        />
        <Route
          path="/desktopVersion"
          element={
            <DesktopVersion
              props={{
                MetamaskStatus: { metamaskStatus },
                UserAccountAddr: { userAccountAddr },
                userAccountEmail: { userAccountEmail },
              }}
              // props={props}
            />
          }
        />
        
      </Routes>
      <ToastContainer />
    </>
  );
}
// }

export default App;
export { userProfileData, userContectedAccount, userContectedNetwork };
