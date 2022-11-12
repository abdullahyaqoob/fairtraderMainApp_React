// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Web3 from "web3";

import toggleBtn from '../Images/exchangeIcons/toggleBtn.png';
import connectImg from '../Images/exchangeIcons/connectImg.png';
import networkDropdown from '../Images/exchangeIcons/networkDropdown.png';

// css
import './css/exchangeCss/exchange.css'
// components
import Graph from '../components/Graph.jsx'
import HeaderNav from '../components/HeaderNav.jsx';
import FooterBottom from '../components/footerBottom.jsx';
function App() {


  const [CurrentUserNetwork, setCurrentUserNetwork] = useState('Binance');
  const [userAccount, setuserAccount] = useState('');

  useEffect(() => {
    useEffectFunc()
    window.ethereum.on("chainChanged", networkChanged)
    window.ethereum.on('accountsChanged', accountChanged)

    // setstakedBalance(
    //   <div class="spinner-border" role="status">
    //     <span class="sr-only">Loading...</span>
    //   </div>
    // )
  }, [])

  const networkChanged = (chainId) => {
    console.log('chain_changed', chainId);
    window.location.reload()
  };
  const accountChanged = (account) => {
    console.log('account_changed', account);
    window.location.reload()
  }

  async function useEffectFunc() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    // load Blockchain Data
    const web3 = window.web3

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    console.log('First accounts', accounts[0]);
    setuserAccount(accounts[0])


    const networkId = await web3.eth.net.getId()
    console.log('Accoutn Network ID :', networkId);
    setCurrentUserNetwork(networkId)


  }

  let userNetworkContent
  if (CurrentUserNetwork != '' && CurrentUserNetwork != null) {
    if (CurrentUserNetwork === 97 || CurrentUserNetwork === 56) {
      userNetworkContent = 'BSC'
    } else {
      userNetworkContent = 'ETH'
    }
  } else {
    // console.log('userNetwork', CurrentUserNetwork);
    userNetworkContent = <span style={{ marginRight: '-25px', marginLeft: '-6px' }}>Networks</span>
  }

  let userAccountContent
  if (userAccount != '' && userAccount != null) {
    let accountFirstLetters = userAccount.substring(0, 3);
    let accountlastLetters = userAccount.substring(40);
    let fullResult = accountFirstLetters + '..' + accountlastLetters
    setTimeout(() => {
      localStorage.setItem('userAccount', userAccount)
    }, 1);
    userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>{fullResult}</span>
      {/* Connect */}
    </div>
  } else {
    userAccountContent = <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}>
      <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" />
      <span style={{ color: '#E5E600' }}>Connect</span>
      {/* Connect */}
    </div>
  }


  return (
    // [content]
    <div style={{ backgroundColor: 'black' }}>
      <div className='MainDivDesktop'>
        <HeaderNav />

        <div className="desktopBlueDiv">
          <hr className='hrr' />
          <div className="row MainDivMain">
            <div className="col-8">
              <h1 style={{ color: 'black', marginLeft: '30px' }}><b><a target="_blank"
                style={{ color: 'black', textDecoration: 'none' }} href="https://www.youtube.com/watch?v=xAvmFY4qIQY">What is Fair Trader?</a></b></h1>
              {/* <h1 className='HelpTxt' style={{ display: 'inline' }}>Help</h1>
              <Link to={{ pathname: '/NetworkVideos' }}>
                <h1 className='HelpTxt VideoTxt' style={{ display: 'inline', marginLeft: '30px' }}>Video</h1>
              </Link> */}
              <div style={{ width: '110%' }} className='graphDiv'>
                <Graph />
              </div>

            </div>
            <div className="col-4">
              {/* <div className="row functionalityDiv">
                <div className="col-3">
                  <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    <a className='colorBlack' target="_blank" href="https://buy.ftp.indacoin.io/">
                      Buy
                    </a>
                  </h1>
                </div>
                <div className="col-3">
                  <Link to={{ pathname: '/SwapPage' }}><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Swap
                  </h1></Link>
                </div>
                <div className="col-3">
                  <Link to={{ pathname: '/StakePage' }}><h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                    Stake
                  </h1></Link>
                </div>
                <div className="col-3">
                  <a target="_blank" href="https://latoken.com/exchange/FTP_USDT ">
                    <h1 className='colorBlack' style={{ fontWeight: 'bold' }}>
                      Trade
                    </h1></a>
                </div>
              </div>
              <div className="bottomHeaderr functionalityDiv" style={{ width: '100%' }}>
                <div className="row" style={{ marginBottom: '7px' }}>
                  <div className="col-2">
                    <Link to={{ pathname: '/SndScreen' }}>
                      <img className='blackDivBtns ' src={lightInfo} alt="infoIcon" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className='blackConnectTxtSwap' style={{ fontSize: '22px', whiteSpace: 'nowrap' }}>My Assets</p>
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns bigScreenIssue' style={{ marginLeft: '20px', paddingTop: '2px' }} src={lightSetting1} alt="settingIcon" />
                  </div>
                  <div className="col-2">
                    <img className='blackDivBtns settingIcon' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ width: '30px', paddingTop: '3px', cursor: 'pointer' }} alt="settingIcon" />
                  </div>

                </div>
                <hr className='hrSwap' />
                <div style={{ height: '380px' }}>
                  <div className="greyDiv2" style={{ backgroundColor: 'transparent', paddingTop: '0px', paddingBottom: '0px' }}>
                    <span style={{ fontWeight: 'bold' }}>{letStakedTokensLink}</span>
                  </div>

                  <div className="greyDiv2DeskAssets" style={{ paddingTop: '10px', paddingBottom: '5px', backgroundColor: 'black' }}>
                    <div className="row">
                      <div className="col-2">
                        {nativeTokenImg}
                      </div>
                      <div className="col-7" style={{ textAlign: 'start' }}>
                        <h5 className="pdfheading" style={{ marginTop: '3px', fontWeight: 'bold' }}>{Number(nativeTokenBalance).toFixed(4)} <span> {nativeTokenSym}</span></h5>
                      </div>
                      <div className="col-3">
                        <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'end' }}>
                          <span style={{ marginRight: '5px', position: 'relative', left: '-18px' }}>$</span>
                          <span style={{ position: 'relative', left: '-17px' }}>{bnbInUsd.toFixed(1)}</span>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="greyDiv2DeskAssets" style={{ paddingTop: '10px', paddingBottom: '5px', overflow: 'hidden', backgroundColor: 'black' }}>
                    <div className="row">
                      <div className="col-2">
                        <img src={ftpToken} alt="ftpToken" style={{ width: '44px', position: 'absolute', left: '10px', top: '-13px' }} />
                      </div>
                      <div className="col-7" style={{ textAlign: 'start' }}>
                        <h5 className="pdfheading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span>{Number(FairtraderBlnc).toFixed(0)} FTP</span></h5>
                      </div>
                      <div className="col-3">
                        <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'end' }}>
                          <span style={{ marginRight: '5px', position: 'relative', left: '-18px' }}>$</span>
                          <span style={{ position: 'relative', left: '-17px' }}>{bftpInUsd.toFixed(1)} </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                <div className="greyDiv2" style={{ paddingTop: '18px', paddingBottom: '10px' }}>

                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop mobTokensImges' src="https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389" alt="USD_Coin_icon" style={{width: "40px", marginTop: '-8px'}} />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }} >
                      <h5 className="pdfheading assetsValueHeading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span style={{ fontSize: '16px' }}>{Number(UsdtBlnc).toFixed(2)} USDT</span></h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading assetsValueHeading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'start' }}>
                        <span style={{ marginRight: '5px', position: 'relative', left: '-15px', fontSize: '16px' }}>$</span>
                        <span style={{ position: 'relative', left: '-12px', fontSize: '16px' }}>{Number(UsdtBlnc).toFixed(1)} </span>
                      </h5>
                    </div>
                  </div>

                </div>
               

                
                </div>
                <hr className='hr' style={{ marginTop: '-27px' }} />
                <div className="row" style={{ marginTop: '15px' }}>
                  <div className="col-6">
                    <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Assets</h1>
                  </div>

                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }}>
                      <h1 style={{ textAlign: 'center', color: 'black', fontSize: '18px', fontWeight: 'bold' }} >Activity</h1>
                    </Link>

                  </div>
                </div>
              </div> */}
              {/* 
              <div className='bottomBtns'>
                <div className="row">
                  <div className="col-6" style={{ color: 'white', fontSize: '22px' }}>Assets</div>
                  <div className="col-6">
                    <Link to={{ pathname: '/RecentTx' }} style={{ color: '#1FE2FA', fontSize: '22px' }}>
                      Activity
                    </Link>
                  </div>
                </div>
              </div> */}
              <br /><br /><br /><br />
              <br /><br /><br />
            </div>
          </div>
        </div>
        {/* <div className='foooterDiv'>
          <div className="footerInerDiv">
            <div className="row">
              <div className="col-3">
                <br />
                <br />
                <img src={laExchange} style={{marginLeft: '-80px', marginTop: '-30px'}} alt="laExchange" />
              </div>
              <div className="col-9">
                <div className='footerDivCol9'>
                  <h2>Fair Trader will be soon listed on LATOKEN Exchange</h2>
                  <p>Fair Trader has partnered with LATOKEN exchange where you will be able to buy and sell FTP tokens with a credit card in just a few minutes.</p>
                  <p>LATOKEN is a rapidly growing crypto exchange focussing on liquidity for new tokens. LATOKEN entered CoinmarketCap's Top-20 in March 2019 and has over 1.5 million registered traders.</p>
                  <h6>Initial Exchange Offering (IEO)</h6>
                  <p>LATOKEN has approved the FTP token to be listen for the upcoming IEO on its launch pad, LATOKEN will notify all the users of its platform about the uniqueness of the Fair Trader Applications and ability to resolve disputes between Buyer and Sellers using the revolutionary App that will be release in the middle of 20022.</p>
                  <p>The Initial Exchange Offering will be the first international exposure for Fair Trader and will significantly increase the number of FTP token holders and future users of FTP platform</p>
                  <p>For more information on LATOKEN Exchange or to open an account please visit <a href="https://www.Latoken.com" target="_blank">www.Latoken.com</a></p>
                  <br /><br /><br />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <FooterBottom />
      </div>

      <div className='MainDivMob'>
        <div className='blackWholeDiv'>
          <div className='row headerLogoBtns'>
            <div className='col-4'>
              <a href="http://fairtrader.io/">
                <img className='fairtraderLogo' src="https://fairtrader.io/wp-content/uploads/2021/08/FairTrader_logo.svg" alt="fairtraderLogo" />
              </a>
            </div>
            <div className="col-8 headerLinks">
              <span style={{ display: "inline", float: "right" }}>
                <a href="http://fairtrader.io/">
                  <img className='toggleBtn' src={toggleBtn} alt="toggleBtn" />
                </a>
              </span>
              <div style={{ display: "inline", float: "right" }}>
                {/* <div className='headerBtns sndHeaderBtn' style={{ paddingRight: '4px' }}> */}
                {/* <img src={connectImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                {/* {accountNumb} */}
                <Link to={{ pathname: '/WhichWallet' }}>
                  {userAccountContent}
                </Link>
                {/* </div> */}
              </div>
              <div style={{ display: "inline", float: "right" }}>
                <Link to={{ pathname: '/SelectNetwork' }}>
                  <div className='headerBtns sndHeaderBtn'>
                    {/* <img src={networkImg} className='sndHeaderBtnist' alt="connectImg" /> */}
                    <span style={{ color: '#1DCBFE', marginLeft: '10px', marginRight: '20px', fontWeight: 'bold' }}>
                      {userNetworkContent}
                    </span>
                    <img src={networkDropdown} className='sndHeaderBtnsnd' alt="networkDropdown" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div style={{ width: '110%' }} className='graphDiv'>
            <Graph />
          </div>
        </div>
        <div className="blueDiv">
            hello
        </div>

        {/* <div className="blueDiv">
        
          <div className="MainLinks">
            <div className='row'>
              <div className='mainLinksPics col-3'>
                <a target="_blank" href="https://buy.ftp.indacoin.io/">
                  <img className='mainLinksPics1' src={buyImg} alt="buyImg" />
                </a>                                    </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/SwapPage' }}><img className='mainLinksPics1' src={swapImg} alt="swapImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <Link to={{ pathname: '/StakePage' }}><img className='mainLinksPics2' src={stakeImg} style={{ marginTop: '2px' }} alt="stakeImg" /></Link>
              </div>
              <div className='mainLinksPics col-3'>
                <a target="_blank" href="https://latoken.com/exchange/FTP_USDT "><img className='mainLinksPics2' style={{ marginTop: '1px' }} src={tradeImg} alt="tradeImg" /></a>
              </div>
            </div>
          </div>

          <div>
            <div className="bottomHeaderrr" style={{ paddingTop: '5px' }}>
              <div className="row">
                <div className="col-2">
                  <Link to={{ pathname: '/SndScreen' }}>
                    <img className='blackDivBtns blackDivBtnsIst marginMinus5 firstLightInfoMob' src={lightInfo} alt="infoIcon" />
                  </Link>
                </div>
                <div className="col-6">
                  <p style={{ color: 'black', fontSize: '20px', textAlign: 'center', fontWeight: 'bold', marginTop: '5px', whiteSpace: 'nowrap' }}>My Assets</p>
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIstImg marginMinus5' style={{ marginLeft: '17px' }} src={lightSetting1} alt="settingIcon" />
                </div>
                <div className="col-2">
                  <img className='blackDivBtns blackDivBtnsIst settingIcon marginMinus5' onClick={() => { window.location.reload() }} src={lightRefresh} style={{ maxWidth: '25px', cursor: 'pointer' }} alt="settingIcon" />
                </div>
              </div>
              <hr className='hrSwap' />
              <div style={{ height: '212px' }}>
                <div className="greyDiv2 assetsLockedFTP" style={{ backgroundColor: 'transparent', paddingTop: '0px', paddingBottom: '0px' }}>
                  {letStakedTokensLink}
                </div>

                <div className="greyDiv2" style={{ paddingTop: '14px', paddingBottom: '2px' }}>

                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop mobTokensImges' src={ftpToken} alt="" />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }} >
                      <h5 className="pdfheading assetsValueHeading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span style={{ fontSize: '16px' }}>{Number(FairtraderBlnc).toFixed(2)} FTP</span></h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading assetsValueHeading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'start' }}>
                        <span style={{ marginRight: '5px', position: 'relative', left: '-15px', fontSize: '16px' }}>$</span>
                        <span style={{ position: 'relative', left: '-12px', fontSize: '16px' }}>{bftpInUsd.toFixed(1)} </span>
                      </h5>
                    </div>
                  </div>

                </div>

                <div className="greyDiv2" style={{ paddingTop: '13px', paddingBottom: '11px', overflow: 'hidden' }}>
                  <div className="row">
                    <div className="col-2 mobTokensImgeNative">
                      {nativeTokenImg}
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }}>
                      <h5 className="pdfheading assetsValueHeading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span style={{ fontSize: '16px' }}>{Number(nativeTokenBalance).toFixed(4)} {nativeTokenSym}</span></h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'start' }}>
                        <span style={{ marginRight: '5px', position: 'relative', left: '-13px', fontSize: '16px' }}>$</span>
                        <span style={{ position: 'relative', left: '-12px', fontSize: '16px' }}>{bnbInUsd.toFixed(1)}</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="greyDiv2" style={{ paddingTop: '14px', paddingBottom: '3px' }}>

                  <div className="row">
                    <div className="col-2">
                      <img className='marginTop mobTokensImges' src="https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389" alt="USD_Coin_icon" style={{width: "35px", marginTop: '0px'}} />
                    </div>
                    <div className="col-7" style={{ textAlign: 'start' }} >
                      <h5 className="pdfheading assetsValueHeading" style={{ marginTop: '3px', fontWeight: 'bold' }}><span style={{ fontSize: '16px' }}>{Number(UsdtBlnc).toFixed(2)} USDT</span></h5>
                    </div>
                    <div className="col-3">
                      <h5 className='pdfheading assetsValueHeading' style={{ marginTop: '3px', fontWeight: 'bold', textAlign: 'start' }}>
                        <span style={{ marginRight: '5px', position: 'relative', left: '-15px', fontSize: '16px' }}>$</span>
                        <span style={{ position: 'relative', left: '-12px', fontSize: '16px' }}>{Number(UsdtBlnc).toFixed(1)} </span>
                      </h5>
                    </div>
                  </div>

                </div>

                <br />
              </div>
              <div className='assetsBottomHeandler'>
                .
              </div>
            </div>

            <div className='bottomBtns'>
              <div className="row" style={{ marginTop: '-3px' }}>
                <div className="col-6" style={{ color: 'white' }}>
                  Assets
                </div>
                <div className="col-6">
                  <Link to={{ pathname: '/RecentTx' }} style={{ color: 'black' }}>
                    Activity
                  </Link>
                </div>
              </div>
            </div>
          </div>
        
        </div> */}
      </div>
    </div>
  );
}

export default App;
