import React from "react";
import "./Collection.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { Pagination } from "@mui/material";
import {
  loteryContractAbi,
  loteryContractAddress,
} from "../../utilies/Bsc_contract";
import Web3 from "web3";
import { loadWeb3 } from "../../apis/api";
// import Connect_wallet_modal from "../Connect_wallet_modal/Connect_wallet_modal";

import lucky from "../../Assets/images/lucky-me-logo.png";
import { useNavigate } from "react-router-dom";
import Loading_spinner from "../Loading/Loading_spinner";

const emg_data = [
  {
    value: "$67.6k",
    statement: "Income",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-primary dark:text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    value: "12.6K",
    statement: "Completed",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-success"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        ></path>
      </svg>
    ),
  },
  {
    value: "143",
    statement: "Pending",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-warning"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    value: "651",
    statement: "Dispatch",
    img: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-info"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        ></path>
      </svg>
    ),
  },
];

function Collection() {
  const base_url = process.env.REACT_APP_API_URL;
  const [filterdata, setfilterdata] = useState("All");
  const history = useNavigate();
  let isuser = localStorage.getItem("UserAuth");

  const [get_lottery_Investor, setget_lottery_Investor] = useState([]);
  const [get_Winner, setget_Winner] = useState([]);
  const [total_entries, settotal_entries] = useState(0);
  const [total_invested_amount, settotal_invested_amount] = useState(0);
  const [total_lottery_completed, settotal_lottery_completed] = useState(0);
  const [total_reward, settotal_reward] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [postsPerPage1] = useState(5);
  const [selectCardNumber, setselectCardNumber] = useState(0);
  const [DateFilter, setDateFilter] = useState();
  const [StartDateFilter, setStartDateFilter] = useState(0);

  const [selectCardNumber_Winner, setselectCardNumber_Winner] = useState(0);
  const [DateFilter_Winner, setDateFilter_Winner] = useState(0);
  const [endDate, setendDate] = useState(0);

  const [gameNumber, setgameNumber] = useState(0);
  const [gameNumber_winner, setgameNumber_winner] = useState(0);

  const [Select_lottery_details, setSelect_lottery_details] = useState("All");
  const [total_entries_all, settotal_entries_all] = useState("");
  const [total_number_Amount, settotal_number_Amount] = useState(0);
  const [IsLoading, setIsLoading] = useState(false)


  const get_lottery_investor = async () => {
    try {
      setIsLoading(true)
      const Url= process.env.REACT_APP_API_URL
      const url = `https://winner.archiecoin.online/get_Lotter_invester?startDate=${StartDateFilter}&endDate=${DateFilter}&card_Number=${selectCardNumber}&address=${gameNumber}`;
      let res = await axios.get(url);
    
     
      setget_lottery_Investor(res.data);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.log("Error While calling API Get lottery Investor", e);
    }
  };
  const get_lottery_Winner = async () => {
    try {
      setIsLoading(true)


      const BaseURL= process.env.REACT_APP_API_URL
      const url = `https://winner.archiecoin.online/get_Winner_list?startDate=${DateFilter_Winner}&endDate=${endDate}&card_Number=${selectCardNumber_Winner}&address=${gameNumber_winner}`;
      let res = await axios.get(url);
      setget_Winner(res.data);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)

      console.log("Error While calling API Get lottery Investor", e);
    }
  };
  const webSupply = new Web3("https://bsc-testnet.public.blastapi.io");
  const lotter_all_data = async () => {
    try {
      // let acc = await loadWeb3();
      const web3 = window.web3;
      let loteryContractOf = new webSupply.eth.Contract(
        loteryContractAbi,
        loteryContractAddress
      );

      if (Select_lottery_details == "All") {
        let total_entries_all = await loteryContractOf.methods
          .total_entries()
          .call();

        settotal_entries_all(total_entries_all);
        let total_invested_amount = await loteryContractOf.methods
          .total_invested_amount()
          .call();
        total_invested_amount = webSupply.utils.fromWei(total_invested_amount);
        settotal_invested_amount(total_invested_amount);
        let total_lottery_completed = await loteryContractOf.methods
          .total_lottery_completed()
          .call();
        settotal_lottery_completed(total_lottery_completed);
        let total_reward = await loteryContractOf.methods.total_reward().call();
        settotal_reward(parseInt(webSupply.utils.fromWei(total_reward)));
      } else {
        let total_entries = await loteryContractOf.methods
          .lottey_detail(Select_lottery_details)
          .call();
         

        let obj = {
          lottery_entries: total_entries.lottery_entries,
          lottery_invested_amount: webSupply.utils.fromWei(
            total_entries.lottery_invested_amount
          ),
          lottery_completed: total_entries.lottery_completed,
          lottery_reward: parseInt(webSupply.utils.fromWei(total_entries.lottery_reward)),
        };
   
        settotal_entries(obj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTokens = get_lottery_Investor.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const indexOfLastPost1 = currentPage1 * postsPerPage1;
  const indexOfFirstPost1 = indexOfLastPost1 - postsPerPage1;
  const currentTokens1 = get_Winner.slice(indexOfFirstPost1, indexOfLastPost1);

  const setPageNumber = (event, value) => {
    // setPage(value);
    setCurrentPage(value);
  };

  const setPageNumber1 = (event, value) => {
    // setPage(value);
    setCurrentPage1(value);
  };
  let total_Amount = 0;

  const Total_Amount = async () => {
    if (currentTokens.length !== 0) {
     
      // for(let i=0;i < Object.keys(get_lottery_Investor).length;i++){
      //   total_Amount = Number(total_Amount) + Number(get_lottery_Investor[i].position)
      // }

      currentTokens.forEach((items) => {
        total_Amount = Number(total_Amount) + Number(items.position);
      });
  
      settotal_number_Amount(total_Amount);
    }
  };

  useEffect(() => {
    get_lottery_investor();
    lotter_all_data();
    setInterval(() => {
      Total_Amount();
    }, 1000);
  }, [
    selectCardNumber,
    DateFilter,
    gameNumber,
    Select_lottery_details,
    StartDateFilter,
  ]);

  useEffect(() => {
    get_lottery_Winner();
  }, [selectCardNumber_Winner, DateFilter_Winner, gameNumber_winner, endDate]);

  return (
    <div>
      
      {IsLoading && <Loading_spinner/>
      
    }
      <div className="header-top-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-top-area-inner">
                <a href="" className="logo">
                  <img src={lucky} alt="" />
                </a>
                <div className="d-flex">
                <button
                    class="custom-button2 navmainbt me-3"
                    onClick={() => (
                      history("/Change_Password"), localStorage.removeItem("UserAuth")
                    )}
                  >
                    Change Password
                  </button>
                  <button
                    class="custom-button2 navmainbt"
                    onClick={() => (
                      history("/"), localStorage.removeItem("UserAuth")
                    )}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="Admin_filter_card">
            <div>
              <p>Select Card Number</p>
            <select
              class="form-select_top"
              aria-label="Default select example"
              onChange={(e) => setSelect_lottery_details(e.target.value)}
            >
              <option selected>Select Card</option>
              <option value="All">All</option>

              <option value="1">10x</option>
              <option value="2">20x</option>
              <option value="3">50x</option>
              <option value="4">100x</option>
              <option value="5">250x</option>
              <option value="6">500x</option>
              <option value="7">1000x</option>
              <option value="8">2500x</option>
              <option value="9">5000x</option>
              <option value="10">10000x</option>
              <option value="11">25000x</option>
              <option value="12">50000x</option>
              <option value="13">100000x</option>
              <option value="14">250000x</option>
              <option value="15">500000x</option>
              <option value="16">1000000x</option>
            </select>
            </div>
          </div>
          <div className="mt-4 mb-5 grid grid-cols-2 gap-3 px-4 sm:mt-5 sm:grid-cols-4 sm:gap-5 sm:px-5 lg:mt-6">
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {Select_lottery_details == "All"
                    ? total_entries_all
                    : total_entries?.lottery_entries}
                </p>
                {emg_data[0].img}
              </div>
              <p className="mt-1 text-xs+">Total Entries</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {Select_lottery_details == "All"
                    ? total_invested_amount
                    : total_entries?.lottery_invested_amount}&nbsp;
                    BUSD
                </p>
                {emg_data[1].img}
              </div>
              <p className="mt-1 text-xs+">Total Invested Amount</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {Select_lottery_details == "All"
                    ? total_lottery_completed
                    : total_entries?.lottery_completed}
                </p>
                {emg_data[2].img}
              </div>
              <p className="mt-1 text-xs+">Total Lottery Completed</p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 dark:bg-navy-600">
              <div className="flex justify-between space-x-1">
                <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                  {Select_lottery_details == "All"
                    ? total_reward
                    : total_entries?.lottery_reward}&nbsp;
                     BUSD
                </p>
                {emg_data[3].img}
              </div>
              <p className="mt-1 text-xs+">Total Reward</p>
            </div>
          </div>
        </div>
        <div className="text">
          <h2 className="title_admin">Lottery Invester</h2>
        </div>
        <div className="Admin_filter_card">
          <div>
            <p>Select Address</p>
            <input
              type="text"
              width="10%"
              placeholder="User Address"
              onChange={(e) => setgameNumber(e.target.value)}
            />
          </div>
          <div>
            <p>Start Date</p>
            <input
              type="date"
              width="10%"
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
          </div>
          <div>
            <p>End Date</p>
            <input
              type="date"
              width="10%"
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div>
            <p>Select Card Number </p>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => setselectCardNumber(e.target.value)}
            >
              <option selected>Select Card</option>
              <option value="0">All</option>

              <option value="10x">10x</option>
              <option value="20x">20x</option>
              <option value="50x">50x</option>
              <option value="100x">100x</option>
              <option value="250x">250x</option>
              <option value="500x">500x</option>
              <option value="1000x">1000x</option>
              <option value="2500x">2500x</option>
              <option value="5000x">5000x</option>
              <option value="10000x">10000x</option>
              <option value="25000x">25000x</option>
              <option value="50000x">50000x</option>
              <option value="100000x">100000x</option>
              <option value="250000x">250000x</option>
              <option value="500000x">500000x</option>
              <option value="1000000x">1000000x</option>
            </select>
          </div>
        </div>
        <Table responsive border>
          <thead>
            <tr className="t_head">
              <th>#</th>
              <th>Investor Address</th>
              <th>Card Number</th>
              <th>Entries</th>

              <th>Amount</th>
              <th>Lottery Time</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="boxx">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Amount {total_number_Amount}</td>
           
            </tr> */}
            {currentTokens.map((item, index) => {
              return (
                <>
                  <tr className="boxx">
                    <td>{item.index}</td>
                    <td className="large_address">{item.userAddress}</td>
                    <td className="responice_addres">
                      {item.userAddress?.substring(0, 8) +
                        "..." +
                        item.userAddress?.substring(
                          item.userAddress?.length - 8
                        )}
                    </td>

                    <td>{item.card_Number}</td>
                    <td>{item.gameNumber}</td>

                    <td>{item.position} BUSD</td>
                    <td>
                      {/* {moment(item.time * 1000).format("M/D/YYYY h:m:s A")} */}
                      {item.time}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: " flex-end" }}>
          <div className="d-flex ">
            <h1 className="fs-4">
              Total Entries :{get_lottery_Investor.length}{" "}
            </h1>
          </div>
        </div>
            <div className="d-flex justify-content-center">
              <Pagination
                count={Math.ceil(get_lottery_Investor.length / postsPerPage)}
                page={currentPage}
                onChange={setPageNumber}
              />
            </div>
        <div className="text">
          <h1 className="title_admin">Lottery Winner</h1>
        </div>
        <div className="Admin_filter_card">
          <div>
            <p>Select Address</p>
            <input
              type="text"
              width="10%"
              placeholder="User Address"
              onChange={(e) => setgameNumber_winner(e.target.value)}
            />
          </div>
          <div>
            <p> Start Date</p>
            <input
              type="date"
              width="10%"
              onChange={(e) => setDateFilter_Winner(e.target.value)}
            />
          </div>
          <div className="">
            <p>End Date</p>
            <input
              type="date"
              width="100%"
              onChange={(e) => setendDate(e.target.value)}
            />
          </div>
          <div>
            <p>Select Card Number</p>

            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => setselectCardNumber_Winner(e.target.value)}
            >
              <option selected>Select Card</option>
              <option value="0">All</option>

              <option value="10x">10x</option>
              <option value="20x">20x</option>
              <option value="50x">50x</option>
              <option value="100x">100x</option>
              <option value="250x">250x</option>
              <option value="500x">500x</option>
              <option value="1000x">1000x</option>
              <option value="2500x">2500x</option>
              <option value="5000x">5000x</option>
              <option value="10000x">10000x</option>
              <option value="25000x">25000x</option>
              <option value="50000x">50000x</option>
              <option value="100000x">100000x</option>
              <option value="250000x">250000x</option>
              <option value="500000x">500000x</option>
              <option value="1000000x">1000000x</option>
            </select>
          </div>
        </div>{" "}
        <Table responsive border>
          <thead>
            <tr className="t_head">
              <th>#</th>
              <th>Winner Address</th>
              <th>Card Number</th>
              <th>Entries</th>

              <th>Reward</th>
              <th> Lottery Time</th>
            </tr>
          </thead>
          <tbody>
            {currentTokens1.map((item, index) => {
              return (
                <>
                  <tr className="boxx">
                    <td>{item.index}</td>
                    <td className="large_address">{item.userAddress}</td>
                    <td className="responice_addres">
                      {item.userAddress?.substring(0, 8) +
                        "..." +
                        item.userAddress?.substring(
                          item.userAddress?.length - 8
                        )}
                    </td>
                    <td>{item.card_Number}</td>
                    <td>{item.gameNumber}</td>

                    <td>{(webSupply.utils.fromWei(item.reward))} BUSD</td>
                    <td>
                      {item.time}
                      {/* {moment(item.time * 1000).format("M/D/YYYY h:m:s A")} */}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: " flex-end" }}>
          <div className="d-flex">
            <h1 className="fs-4" style={{ marginLeft: "3rem" }}>
              Total Entries :{get_Winner.length}{" "}
            </h1>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            count={Math.ceil(get_Winner.length / postsPerPage1)}
            page={currentPage1}
            onChange={setPageNumber1}
          />
        </div>
      </div>
    </div>
  );
}

export default Collection;

// node js and express API filter date

// how get filter data in monogodb express Api

// how to solve  coinmarketcap.com api cors error