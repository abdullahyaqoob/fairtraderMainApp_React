import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

import dropdownImg from "../Images/exchangeIcons/greenDropdown.png";

class ApexChart extends React.Component {
  formatingInGraphData(res) {
    // console.log(res);

    let graphFormatedArray = [];
    let graphAllOpenValues = res.data["o"];
    let graphAllHighValues = res.data["h"];
    let graphAllLowValues = res.data["l"];
    let graphAllCloseValues = res.data["c"];
    let graphAllTime = res.data["t"];

    graphAllTime.forEach(function(val, index) {
      let emptyObj = new Object({ x: "", y: [] });
      graphFormatedArray.push(emptyObj);
      graphFormatedArray[index].x = new Date(val * 1000);
    });

    graphAllOpenValues.forEach(function(val, index) {
      graphFormatedArray[index].y.push(parseFloat(val));
    });

    graphAllHighValues.forEach(function(val, index) {
      graphFormatedArray[index].y.push(parseFloat(val));
    });

    graphAllLowValues.forEach(function(val, index) {
      graphFormatedArray[index].y.push(parseFloat(val));
    });

    graphAllCloseValues.forEach(function(val, index) {
      graphFormatedArray[index].y.push(parseFloat(val));
    });

    this.setState({ GraphFormatedData: graphFormatedArray });
    // console.log(this.state.GraphFormatedData);
    this.setState({ loading: false });
  }

  graphDataGetterReq() {
    const date = new Date();

    // 👇️ timestamp in seconds (Unix timestamp)
    let currentTimestampInSeconds = Math.floor(date.getTime() / 1000);
    console.log("currentTimestampInSeconds", currentTimestampInSeconds);

    let selectedTimePeriod;
    setTimeout(() => {
      selectedTimePeriod = this.state.selectedTimePeriod;
      let selectedTimePeriodSecs = this.state.selectedTimePeriodSecs;

      if (selectedTimePeriod === "1day") {
        selectedTimePeriodSecs =
          currentTimestampInSeconds - this.state.oneDaySeconds;
      } else if (selectedTimePeriod === "2day") {
        selectedTimePeriodSecs =
          currentTimestampInSeconds - this.state.twoDaySeconds;
      } else if (selectedTimePeriod === "3day") {
        selectedTimePeriodSecs =
          currentTimestampInSeconds - this.state.threeDaySeconds;
      } else if (selectedTimePeriod === "7day") {
        selectedTimePeriodSecs =
          currentTimestampInSeconds - this.state.sevenDaySeconds;
      } else if (selectedTimePeriod === "30day") {
        selectedTimePeriodSecs =
          currentTimestampInSeconds - this.state.thirtyDaySeconds;
      }
      this.setState({ selectedTimePeriodSecs });
      console.log("selectedTimePeriodSecs", selectedTimePeriodSecs);

      axios
        .get(
          `https://api.latoken.com/v2/tradingview/history?symbol=FTP%2FUSDT&resolution=60&from=${selectedTimePeriodSecs}&to=${currentTimestampInSeconds}`
        )
        .then((res) => {
          this.formatingInGraphData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 100);
  }

  coinDetailHandle() {
    axios
      .get(
        "https://abdullahyaqoob.com/",
        // axios.get('/ticker/FTP/USDT',
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept",
          },
        }
      )
      .then((res) => {
        // console.log(res);
        this.setState({ coinDetail: res.data });
        // console.log(this.state.coinDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleCoinDetail() {
    console.log(this.state.showCoinDetail);
    if (this.state.showCoinDetail === true) {
      this.setState({ showCoinDetail: false });
    } else {
      this.setState({ showCoinDetail: true });
    }
  }

  componentDidMount() {
    this.graphDataGetterReq();
    this.coinDetailHandle();

    setInterval(() => {
      this.graphDataGetterReq();
      }, 25000);
    // }, 22222000);

    setInterval(() => {
      this.coinDetailHandle();
    }, 10000);
  }

  constructor(props) {
    super(props);

    this.state = {
      showCoinDetail: false,
      GraphFormatedData: [],
      timestampInSeconds: "",
      coinDetail: "",
      oneDaySeconds: 1 * 86400,
      twoDaySeconds: 2 * 86400,
      threeDaySeconds: 3 * 86400,
      sevenDaySeconds: 7 * 86400,
      thirtyDaySeconds: 30 * 86400,
      // "1day"
      // "2day"
      // "3day"
      // "7day"
      // "30day"
      selectedTimePeriod: "1day",
      selectedTimePeriodSecs: "",

      options: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "FairTrader FTP",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
      mobileChartoptions: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        // title: {
        //   text: "FairTrader FTP",
        //   align: "left",
        // },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }

  render() {
    // let graphHeightSize;
    // if (window.screen.width <= 370) {
    //   console.log('370');
    //   graphHeightSize = 135;
    // } else if (window.screen.width >= 418) {
    //   console.log('418');
    //   graphHeightSize = 170;
    // } else if (window.screen.width >= 580) {
    //   console.log('500');
    //   graphHeightSize = 195;
    // } else{
    //   console.log('ELSE');
    //   graphHeightSize = 155;
    // }

    let graphHeightSize;
    if (window.screen.height <= 550) {
      graphHeightSize = 120;
    } else if (window.screen.height < 570) {
      graphHeightSize = 136;
    } else if (window.screen.height < 600) {
      graphHeightSize = 142;
    } else if (window.screen.height < 650) {
      graphHeightSize = 155;
    } else if (window.screen.height < 700) {
      graphHeightSize = 165;
    } else if (window.screen.height < 750) {
      graphHeightSize = 185;
    } else if (window.screen.height < 800) {
      graphHeightSize = 206;
    } else if (window.screen.height < 850) {
      graphHeightSize = 218;
    } else if (window.screen.height < 900) {
      graphHeightSize = 230;
    } else if (window.screen.height < 950) {
      graphHeightSize = 250;
    } else if (window.screen.height < 1000) {
      graphHeightSize = 265;
    } else if (window.screen.height < 1050) {
      graphHeightSize = 290;
    } else if (window.screen.height < 1100) {
      graphHeightSize = 320;
    } else if (window.screen.height < 1150) {
      graphHeightSize = 340;
    } else if (window.screen.height < 1200) {
      graphHeightSize = 340;
    } else if (window.screen.height < 1250) {
      graphHeightSize = 360;
    } else if (window.screen.height < 1300) {
      graphHeightSize = 400;
    }
    // else if (window.screen.width <= 418) {
    //   console.log('418');
    //   graphHeightSize = 170;
    // } else if (window.screen.width >= 580) {
    //   console.log('500');
    //   graphHeightSize = 195;
    // } else{
    //   console.log('ELSE');
    //   graphHeightSize = 155;
    // }

    let mainCOntetn;

    // if (this.state.loading === true) {
    //   mainCOntetn = <h1>Loading....</h1>;
    // } else {
    mainCOntetn = (
      <>
        {/* {window.screen.width <= 1000 ? <div id="chart" style={{ width: "93%", marginTop: '-50px' }} : <div id="chart" style={{ width: "93%" }} >} */}
        <div id="desktopChart">
          <center>
            <div id="chart" style={{ width: "93%" }}>
              <ReactApexChart
                options={this.state.options}
                series={[{ data: this.state.GraphFormatedData }]}
                type="candlestick"
                height={350}
              />
            </div>
          </center>
        </div>

        <div id="tabChart">
          <div id="chart" style={{ width: "93%" }}>
            <ReactApexChart
              options={this.state.mobileChartoptions}
              series={[{ data: this.state.GraphFormatedData }]}
              type="candlestick"
              height={graphHeightSize}
            />
          </div>
        </div>
      </>
    );
    // }

    return (
      <div className="bottomHeader graphTOpContainer">
        <div className="row graphCoinDetailRow GraphRow">
          <div className="col-6">
            <div className="row GraphRow" style={{ fontSize: "13px" }}>
              <div className="col-3">
                <img
                  className="bottomHeaderLogo"
                  src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png"
                  width="30px"
                  alt=""
                />
              </div>
              <div className="col-4">
                <p>
                  <span
                    className="bottomHeaderTxt marginLeft"
                    style={{ color: "#1dccff" }}
                  >
                    <b>FTP</b>
                  </span>
                  <br />
                  {/* <b className='bottomHeaderTxt marginLeft'>${currentPrice}</b> */}
                  <b className="bottomHeaderTxt marginLeft">
                    ${Number(this.state.coinDetail.lastPrice).toFixed(6)}
                  </b>
                </p>
              </div>
              <div className="col-3">
                <p className="bottomheaderDrop marginLeftt graphUpDown">
                  <img src={dropdownImg} alt="dropdownImg" />
                  <br />
                  {/* <b className='bottomHeaderTxt'>{priceChangePercentage24}</b> */}
                  <b className="bottomHeaderTxt">
                    {Number(this.state.coinDetail.change24h).toFixed(2)}
                  </b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row GraphRow" style={{ fontSize: "13px" }}>
              <div className="col-8">
                <p style={{ float: "right" }}>
                  <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading">
                    24hr<span style={{ color: "black" }}>_</span>Volume
                  </span>
                  <br />
                  <span>
                    {/* <b className='bottomHeaderTxt fontTwelve'>${hourVolume24}</b> */}
                    <b className="bottomHeaderTxt fontTwelve">
                      ${Number(this.state.coinDetail.volume24h).toFixed(2)}
                    </b>
                  </span>
                </p>
              </div>
              <div className="col-4">
                <p style={{ float: "right" }}>
                  <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading">
                    Marketcap
                  </span>{" "}
                  <br />
                  <span>
                    {/* <b className='bottomHeaderTxt fontTwelve'>${marketCap}</b></span></p></div> */}
                    <b className="bottomHeaderTxt fontTwelve">
                      $
                      {parseFloat(
                        Number(
                          this.state.coinDetail.lastPrice * 52000000000
                        ).toFixed(2)
                      )}
                    </b>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="showCoinDetail"
          onClick={() => {
            this.handleCoinDetail();
          }}
        >
          {this.state.showCoinDetail === true ? (
            <>Show Graph</>
          ) : (
            <>Coin Detail</>
          )}
        </button>
        {this.state.showCoinDetail === false ? (
          <div id="graphSecPart">
            <p
              className="text-right graphDetailCss"
              style={{
                color: "#18C7C7",
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "30px",
                zIndex: "9999",
              }}
            >
              <span className="graphSelectPeriod">Select Period:</span>
              <span
                className="graphFormats graphTimePeriod"
                onClick={() => {
                  this.setState({ selectedTimePeriod: "1day" });
                  this.graphDataGetterReq();
                }}
                style={{ cursor: "pointer" }}
              >
                1D
              </span>
              <span
                className="graphFormats graphTimePeriod"
                onClick={() => {
                  this.setState({ selectedTimePeriod: "2day" });
                  this.graphDataGetterReq();
                }}
                style={{ cursor: "pointer" }}
              >
                2D
              </span>
              <span
                className="graphFormats graphTimePeriod"
                onClick={() => {
                  this.setState({ selectedTimePeriod: "3day" });
                  this.graphDataGetterReq();
                }}
                style={{ cursor: "pointer" }}
              >
                3D
              </span>
              <span
                className="graphFormats graphTimePeriod"
                onClick={() => {
                  this.setState({ selectedTimePeriod: "7day" });
                  this.graphDataGetterReq();
                }}
                style={{ cursor: "pointer" }}
              >
                7D
              </span>
              <span
                className="graphFormats graphTimePeriod"
                onClick={() => {
                  this.setState({ selectedTimePeriod: "30day" });
                  this.graphDataGetterReq();
                }}
                style={{ cursor: "pointer" }}
              >
                1M
              </span>
              {/* <span><img onClick={() => setWhichGraphState("first")} src={istGraph} /></span><span style={{ color: 'black' }}><span className="graphFormats">_</span></span>
          <span><img onClick={() => setWhichGraphState("second")} src={secGraph} /></span> */}
              {/* <span>
                <img src={istGraph} />
              </span>
              <span style={{ color: "black" }}>
                <span className="graphFormats">_</span>
              </span>
              <span>
                <img src={secGraph} />
              </span> */}
            </p>
            <br /><br />
            {mainCOntetn}
          </div>
        ) : (
          <>
            <div className="row GraphRow" style={{ paddingTop: "32px" }}>
              <div className="col-6">
                <div className="row GraphRow" style={{ fontSize: "13px" }}>
                  <div className="col-3">
                    <img
                      className="bottomHeaderLogo"
                      src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png"
                      width="30px"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <p>
                      <span
                        className="bottomHeaderTxt marginLeft graphDetailTxtSize"
                        style={{ color: "#1dccff" }}
                      >
                        <b>FTP</b>
                      </span>
                      <br />
                      {/* <b className='bottomHeaderTxt marginLeft'>${currentPrice}</b> */}
                      <b className="bottomHeaderTxt marginLeft graphDetailTxtSize">
                        ${Number(this.state.coinDetail.lastPrice).toFixed(6)}
                      </b>
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="bottomheaderDrop marginLeftt graphUpDown">
                      <img src={dropdownImg} alt="dropdownImg" />
                      <br />
                      {/* <b className='bottomHeaderTxt'>{priceChangePercentage24}</b> */}
                      <b className="bottomHeaderTxt graphDetailTxtSize">
                        {Number(this.state.coinDetail.change24h).toFixed(2)}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row GraphRow" style={{ fontSize: "13px" }}>
                  <div className="col-6">
                    <p style={{ float: "right" }}>
                      <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading graphDetailTxtSize">
                        24hr<span style={{ color: "black" }}>_</span>Volume
                      </span>
                      <br />
                      <span>
                        {/* <b className='bottomHeaderTxt fontTwelve'>${hourVolume24}</b> */}
                        <b className="bottomHeaderTxt fontTwelve graphDetailTxtSize">
                          ${Number(this.state.coinDetail.volume24h).toFixed(2)}
                        </b>
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ float: "right" }}>
                      <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading graphDetailTxtSize">
                        Marketcap
                      </span>{" "}
                      <br />
                      <span>
                        {/* <b className='bottomHeaderTxt fontTwelve'>${marketCap}</b></span></p></div> */}
                        <b className="bottomHeaderTxt fontTwelve graphDetailTxtSize">
                          $
                          {parseFloat(
                            Number(
                              this.state.coinDetail.lastPrice * 52000000000
                            ).toFixed(2)
                          )}
                        </b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row GraphRow" style={{ marginTop: "15px" }}>
              <div className="col-6">
                <div className="row GraphRow" style={{ fontSize: "13px" }}>
                  <div className="col-6">
                    <p style={{ float: "right" }}>
                      <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading graphDetailTxtSize">
                        Symbol
                      </span>
                      <br />
                      <span>
                        {/* <b className='bottomHeaderTxt fontTwelve'>${hourVolume24}</b> */}
                        <b className="bottomHeaderTxt fontTwelve graphDetailTxtSize">
                          ${this.state.coinDetail.symbol}
                        </b>
                      </span>
                    </p>
                  </div>
                  <div
                    className="col-6"
                    style={{ position: "relative", left: "20px" }}
                  >
                    <p style={{ float: "right" }}>
                      <span
                        className="colorBlueBold bottomHeaderTxt fontTwelveHeading graphDetailTxtSize"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Last Quantity
                      </span>{" "}
                      <br />
                      <span>
                        {/* <b className='bottomHeaderTxt fontTwelve'>${marketCap}</b></span></p></div> */}
                        <b className="bottomHeaderTxt fontTwelve graphDetailTxtSize">
                          $
                          {parseFloat(
                            Number(this.state.coinDetail.lastQuantity).toFixed(
                              2
                            )
                          )}
                        </b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row GraphRow" style={{ fontSize: "13px" }}>
                  <div className="col-6">
                    <p style={{ float: "right" }}>
                      <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading graphDetailTxtSize">
                        Best Bid
                      </span>
                      <br />
                      <span>
                        {/* <b className='bottomHeaderTxt fontTwelve'>${hourVolume24}</b> */}
                        <b className="bottomHeaderTxt fontTwelve graphDetailTxtSize">
                          ${Number(this.state.coinDetail.bestBid).toFixed(5)}
                        </b>
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ float: "right" }}>
                      <span
                        className="colorBlueBold bottomHeaderTxt fontTwelveHeading graphDetailTxtSize"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Best Ask
                      </span>{" "}
                      <br />
                      <span>
                        {/* <b className='bottomHeaderTxt fontTwelve'>${marketCap}</b></span></p></div> */}
                        <b className="bottomHeaderTxt fontTwelve graphDetailTxtSize">
                          $
                          {parseFloat(
                            Number(this.state.coinDetail.bestAsk).toFixed(5)
                          )}
                        </b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default ApexChart;

// import React, { useRef, useEffect, useState } from "react";
// import Chartjs from "chart.js";
// import { historyOptions } from "../chartConfigs/chartConfigs";
// import coinGecko from "../apis/coinGecko";
// import dropdownImg from "../Images/greenDropdown.png";
// import istGraph from "../Images/istGraph.png";
// import secGraph from "../Images/sndGraph.png";
// import graphPhoto from "../Images/graphPhoto.png";

// //css
// import "./css/graph.css";
// import axios from "axios";
// const HistoryChart = ({ data }) => {
//   const chartRef = useRef();
//   const chartRef2 = useRef();
//   const [isLoading, setIsLoading] = useState(false);
//   const [timeFormat, setTimeFormat] = useState("24h");
//   const [coinData, setCoinData] = useState({});
//   const [detail, setDetail] = useState("");
//   const [WhichGraphState, setWhichGraphState] = useState("first");

//   const formatData = (data) => {
//     return data.map((el) => {
//       return {
//         t: el[0],
//         y: el[1].toFixed(2),
//       };
//     });
//   };

//   const determineTimeFormat = () => {
//     switch (timeFormat) {
//       case "24h":
//         return coinData.day;
//       case "7d":
//         return coinData.week;
//       case "1m":
//         return coinData.month;
//       case "1y":
//         return coinData.year;
//       default:
//         return coinData.day;
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const [day, week, month, year, detail] = await Promise.all([
//         coinGecko.get(`/coins/bitcoin/market_chart/`, {
//           params: {
//             vs_currency: "usd",
//             days: "1",
//           },
//         }),
//         coinGecko.get(`/coins/bitcoin/market_chart/`, {
//           params: {
//             vs_currency: "usd",
//             days: "7",
//           },
//         }),
//         coinGecko.get(`/coins/bitcoin/market_chart/`, {
//           params: {
//             vs_currency: "usd",
//             days: "30",
//           },
//         }),
//         coinGecko.get(`/coins/bitcoin/market_chart/`, {
//           params: {
//             vs_currency: "usd",
//             days: "365",
//           },
//         }),
//         axios.get("https://api.coingecko.com/api/v3/coins/markets/", {
//           params: {
//             vs_currency: "usd",
//             ids: "bitcoin",
//           },
//         }),
//       ]);
//       // console.log(day);

//       setCoinData({
//         day: formatData(day.data.prices),
//         week: formatData(week.data.prices),
//         month: formatData(month.data.prices),
//         year: formatData(year.data.prices),
//         detail: detail.data[0],
//       });
//       setIsLoading(false);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // FIRST CHART GRAPH
//     // if (chartRef && chartRef.current && coinData.detail) {
//     if (chartRef && chartRef.current) {
//       const chartInstance = new Chartjs(chartRef.current, {
//         type: "line",
//         data: {
//           datasets: [
//             {
//               labels: ["Red"],
//               label: "bitocin",
//               data: determineTimeFormat(),
//               color: "#00ff00",
//               backgroundColor: [
//                 // 'rgba(255, 99, 132, 0.2)',
//                 // 'rgba(255, 206, 86, 0.2)',
//                 "rgba(75, 192, 192, 0.2)",
//                 // 'rgba(153, 102, 255, 0.2)',
//                 // 'rgba(255, 159, 64, 0.2)'
//               ],
//               borderColor: "#00FF00",
//               pointBorderColor: "yellow",
//               pointRadius: 0,
//               fill: true,
//               tension: 0.1,
//               borderCapStyle: "butt",
//             },
//           ],
//         },
//         options: {
//           legend: {
//             display: false,
//           },
//           ...historyOptions,
//           font: "25",
//           color: "#fff",
//           defaultColor: "white",
//         },
//       });
//     }

//     // FIRST CHART GRAPH

//     if (chartRef2 && chartRef2.current) {
//       const chartInstance = new Chartjs(chartRef2.current, {
//         type: "bar",
//         data: {
//           datasets: [
//             {
//               labels: ["Red"],
//               label: "bitocin",
//               data: determineTimeFormat(),
//               color: "#00ff00",
//               backgroundColor: [
//                 // 'rgba(255, 99, 132, 0.2)',
//                 "rgba(255, 206, 86, 0.2)",
//                 // 'rgba(75, 192, 192, 0.2)',
//                 // 'rgba(153, 102, 255, 0.2)',
//                 // 'rgba(255, 159, 64, 0.2)'
//               ],
//               borderColor: "#00FF00",
//               pointBorderColor: "yellow",
//               pointRadius: 0,
//               fill: true,
//               tension: 0.1,
//               borderCapStyle: "butt",
//             },
//           ],
//         },
//         options: {
//           legend: {
//             display: false,
//           },
//           ...historyOptions,
//           font: "25",
//           color: "#fff",
//           defaultColor: "white",
//         },
//       });
//     }
//   });

//   const renderPrice = () => {
//     if (coinData.detail) {
//       return (
//         <>
//           <p className="my-0">${coinData.detail.current_price.toFixed(2)}</p>
//           <p
//             className={
//               coinData.detail.price_change_24h < 0
//                 ? "text-danger my-0"
//                 : "text-success my-0"
//             }
//           >
//             {/* heloosssssssss */}
//             {coinData.detail.price_change_percentage_24h.toFixed(2)}%
//           </p>
//         </>
//       );
//     }
//   };
//   let internationalNumberFormat = new Intl.NumberFormat("en-US");

//   let currentPrice;
//   // console.log('coinData.detail', coinData.detail);
//   if (coinData.detail) {
//     currentPrice = internationalNumberFormat.format(
//       coinData.detail.current_price.toFixed(2)
//     );
//   } else {
//     currentPrice = "undefined";
//   }

//   let priceChangePercentage24;
//   if (coinData.detail) {
//     priceChangePercentage24 = (
//       <span
//         className={
//           coinData.detail.price_change_24h < 0
//             ? "text-danger my-0"
//             : "text-success my-0"
//         }
//       >
//         {coinData.detail.price_change_percentage_24h.toFixed(2)}%
//       </span>
//     );
//   } else {
//     priceChangePercentage24 = "undefined";
//   }

//   let hourVolume24;
//   if (coinData.detail) {
//     hourVolume24 = internationalNumberFormat.format(
//       coinData.detail.total_volume
//     );
//   } else {
//     hourVolume24 = "undefined";
//   }

//   let marketCap;
//   if (coinData.detail) {
//     marketCap = internationalNumberFormat.format(coinData.detail.market_cap);
//   } else {
//     marketCap = "undefined";
//   }

//   let whichGraph;
//   if (WhichGraphState === "first") {
//     whichGraph = chartRef;
//   } else if (WhichGraphState === "second") {
//     whichGraph = chartRef2;
//   }

//   return (
//     <>
//       <div className="bottomHeader">
//         {/* <center>
//           <img src={graphPhoto} className="graphPhoto" alt="graphPhoto" />
//         </center> */}

//         <div className="row">
//           <div className="col-6">
//             <div className="row" style={{ fontSize: "13px" }}>
//               <div className="col-3">
//                 <img
//                   className="bottomHeaderLogo"
//                   src="https://fairtrader.io/wp-content/uploads/2021/08/cropped-favicon-192x192.png"
//                   width="30px"
//                   alt=""
//                 />
//               </div>
//               <div className="col-3">
//                 <p>
//                   <span
//                     className="bottomHeaderTxt marginLeft"
//                     style={{ color: "#1dccff" }}
//                   >
//                     <b>Bitcoin</b>
//                   </span>
//                   <br />
//                   <b className="bottomHeaderTxt marginLeft">${currentPrice}</b>
//                 </p>
//               </div>
//               <div className="col-3">
//                 <p className="bottomheaderDrop marginLeftt graphUpDown">
//                   <img src={dropdownImg} alt="dropdownImg" />
//                   <br />
//                   <b className="bottomHeaderTxt">{priceChangePercentage24}</b>
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="col-6">
//             <div className="row" style={{ fontSize: "13px" }}>
//               <div className="col-6">
//                 <p style={{ float: "right" }}>
//                   <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading">
//                     24hr<span style={{ color: "black" }}>_</span>Volume
//                   </span>
//                   <br />
//                   <span>
//                     <b className="bottomHeaderTxt fontTwelve">
//                       ${hourVolume24}
//                     </b>
//                   </span>
//                 </p>
//               </div>
//               <div className="col-6">
//                 <p style={{ float: "right" }}>
//                   <span className="colorBlueBold bottomHeaderTxt fontTwelveHeading">
//                     Marketcap
//                   </span>{" "}
//                   <br />
//                   <span>
//                     <b className="bottomHeaderTxt fontTwelve">${marketCap}</b>
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <p
//           className="text-right"
//           style={{
//             color: "#18C7C7",
//             fontSize: "14px",
//             fontWeight: "bold",
//             marginRight: "30px",
//             zIndex: "9999",
//           }}
//         >
//           Select Period:{" "}
//           <span style={{ color: "black" }}>
//             <span className="graphFormats">__</span>
//           </span>
//           <span
//             className="graphFormats"
//             onClick={() => setTimeFormat("24h")}
//             style={{ cursor: "pointer" }}
//           >
//             1D<span style={{ color: "black" }}>__</span>
//           </span>
//           <span
//             className="graphFormats"
//             onClick={() => setTimeFormat("7d")}
//             style={{ cursor: "pointer" }}
//           >
//             7D<span style={{ color: "black" }}>__</span>
//           </span>
//           <span
//             className="graphFormats"
//             onClick={() => setTimeFormat("1m")}
//             style={{ cursor: "pointer" }}
//           >
//             1M<span style={{ color: "black" }}>__</span>
//           </span>
//           <span
//             className="graphFormats"
//             onClick={() => setTimeFormat("1y")}
//             style={{ cursor: "pointer" }}
//           >
//             1Y<span style={{ color: "black" }}>___</span>
//           </span>
//           <span>
//             <img onClick={() => setWhichGraphState("first")} src={istGraph} />
//           </span>
//           <span style={{ color: "black" }}>
//             <span className="graphFormats">_</span>
//           </span>
//           <span>
//             <img onClick={() => setWhichGraphState("second")} src={secGraph} />
//           </span>
//         </p>
//       </div>
//       <div
//         className="graph"
//         style={{ width: "90%", maxWidth: "90%", minWidth: "90%" }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <canvas ref={whichGraph} id="myChart"></canvas>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HistoryChart;
