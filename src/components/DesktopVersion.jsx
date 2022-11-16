// react States
import { useEffect, useState } from 'react'
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import App from '../App';

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
function DesktopCOmp() {


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
            {window.screen.width < 1000 ?
                <div className=''>
                    <App />
                </div>
                :
                <div className=''>
                    <HeaderNav />

                    <div className="desktopBlueDiv">
                        <hr className='hrr' />
                        <div className="row MainDivMain GraphRow">
                            <div className="col-7">
                                <h1 style={{ color: 'black', marginLeft: '30px' }}><b><a target="_blank"
                                    style={{ color: 'black', textDecoration: 'none' }} href="https://www.youtube.com/watch?v=xAvmFY4qIQY">What is Fair Trader?</a></b></h1>

                                <div style={{ width: '110%' }} className='graphDiv'>
                                    <Graph />
                                </div>

                            </div>
                            <div className="col-5">
                                <div className="row functionalityDiv GraphRow">
                                    <App />
                                </div>

                                <br /><br /><br /><br />
                            </div>
                        </div>
                    </div>

                    <FooterBottom />
                </div>
            }
        </div>
    );
}

export default DesktopCOmp;
