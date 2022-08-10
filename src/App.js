import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Button } from "react-bootstrap";

export default function App(props) {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState(null);

  const [param1, setParam1] = useState();
  const [param2, setParam2] = useState();
  const [param3, setParam3] = useState();
  const [param4, setParam4] = useState();
  const [param5, setParam5] = useState();

  useEffect(() => {
    loadingDeafult();
  }, []);

  const loadingDeafult = async () => {
    setLoading(true);
    await loadWeb3();
    await loadBlockchainData();
    setLoading(false);
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = await window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    var myContract = new web3.eth.Contract(
      [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "approved",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "ticketId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "paymentAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "buyer",
              type: "address",
            },
          ],
          name: "authorizeSellTicketfromEventOwner",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "ticketId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "paymentAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "buyer",
              type: "address",
            },
          ],
          name: "authorizeSellTicketfromSecondHandOwner",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "bidAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "bidToken",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
          ],
          name: "bid",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "targetURI",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "ticketNumber",
              type: "uint256",
            },
          ],
          name: "BulkURImintForEventId",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
          ],
          name: "closeEventSale",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "eventName",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "totalSupply",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "basePrice",
              type: "uint256",
            },
          ],
          name: "createEvent",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
          ],
          name: "openEventSale",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "ticketId",
              type: "uint256",
            },
          ],
          name: "releaseTokentoHighestBidder",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "typeOfBid",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "duration",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
          ],
          name: "sellToken",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "targetURI",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
          ],
          name: "URImintForEventId",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "_isSecondHandDeleted",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "bidTokenIDsMapping",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "a",
              type: "string",
            },
            {
              internalType: "string",
              name: "b",
              type: "string",
            },
          ],
          name: "compareStrings",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "expiresAtMapping",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "getApproved",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAvailableEvents",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "eventName",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "eventId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalSupply",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "mintedTickets",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "availableTickets",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "EventOwner",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "saleIsActive",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "basePrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "tokenIDs",
                  type: "uint256[]",
                },
              ],
              internalType: "struct SearsTixBooth.Event[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "eventId",
              type: "uint256",
            },
          ],
          name: "getAvailableEventTickets",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAvailableResaleAuctions",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAvailableResaleDirectSaleTickets",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "highestBiddersAddressMapping",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "operator",
              type: "address",
            },
          ],
          name: "isApprovedForAll",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "isBid",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ownerOf",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "priceMapping",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "tokenURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      // 0xC37d1D95A017EBfb54b590BA0BF22dE26060a99A  
      "0x98Ef5F009FCC2448b6D4b461b2078B957693358E",
      { from: account, gas: 150000, gasPrice: "30000000000" }
    );
    setContract(myContract);

    await myContract.methods
      .getAvailableEvents()
      .call()
      .then((events) => setEventsData(events))
      .catch((err) => console.log(err));
  };

  const createNewEvent = async (event_name, total_supply, base_price) => {
    console.log("LOADING");
    await contract.methods
      .createEvent(event_name, total_supply, base_price)
      .send({ from: account }, (err, res) => {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the transaction: " + res);
      })
    .once("receipt", (receipt) => {
      console.log(receipt);
    });
  };

  const openEventSale = async (event_id) => {
    console.log("LOADING");

    await contract.methods
      .openEventSale(event_id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
    getAvailableEvents();
  };

  const getAvailableEvents = async () => {
    console.log("getting events");

    await contract.methods
      .getAvailableEvents()
      .call()
      .then((events) => {
        setEventsData(events);
        console.log(events);
      })
      .catch((err) => console.log(err));
  };

  const closeEventSale = async (event_id) => {
    console.log("LOADING");

    await contract.methods
      .closeEventSale(event_id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
    getAvailableEvents();
  };

  const URImintForEventId = async (target_uri, event_id) => {
    console.log("LOADING", target_uri, event_id);

    await contract.methods
      .URImintForEventId(target_uri, event_id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const BulkURImintForEventId = async (
    target_uri,
    event_id,
    number_of_tickets
  ) => {
    console.log("LOADING");

    await contract.methods
      .BulkURImintForEventId(target_uri, event_id, number_of_tickets)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const AuthorizeSellTicketfromEventOwner = async (
    ticket_id,
    payment_amount,
    event_id
  ) => {
    console.log("LOADING");

    await contract.methods
      .authorizeSellTicketfromEventOwner(
        ticket_id,
        payment_amount,
        event_id,
        account
      )
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const authorizeSellTicketfromSecondHandOwner = async (
    ticket_id,
    payment_amount,
    event_id
  ) => {
    console.log("LOADING");

    await contract.methods
      .authorizeSellTicketfromSecondHandOwner(
        ticket_id,
        payment_amount,
        event_id,
        account
      )
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const bid = async (bid_amount, bid_token, event_id) => {
    console.log("LOADING");

    await contract.methods
      .bid(bid_amount, bid_token, event_id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const releaseTokentoHighestBidder = async (ticket_id) => {
    console.log("LOADING");

    await contract.methods
      .releaseTokentoHighestBidder(ticket_id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const sellToken = async (
    token_id,
    type_of_bid,
    duration,
    price,
    event_id
  ) => {
    console.log("LOADING");

    await contract.methods
      .sellToken(token_id, type_of_bid, duration, price, event_id)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log(receipt);
      });
  };

  const getAvailableEventTickets = async (event_id) => {
    console.log("LOADING");
    await contract.methods
      .getAvailableEventTickets(event_id)
      .call()
      .then((events) => {
        setEventsData(events);
        console.log(events);
      })
      .catch((err) => console.log(err));
  };

  const getAvailableResaleAuctions = async () => {
    console.log("LOADING");
    await contract.methods
      .getAvailableResaleAuctions()
      .call()
      .then((events) => {
        setEventsData(events);
        console.log(events);
      })
      .catch((err) => console.log(err));
  };

  const getAvailableResaleDirectSaleTickets = async () => {
    console.log("LOADING");
    await contract.methods
      .getAvailableResaleDirectSaleTickets()
      .call()
      .then((events) => {
        setEventsData(events);
        console.log(events);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar account={account} />
      {loading ? (
        <div
          id="loader"
          className="text-center d-flex align-items-center w-100 justify-content-center fs-4"
          style={{ height: "70vh", fontWeight: "600" }}
        >
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <>
          <Home
            account={account}
            createNewEvent={createNewEvent}
            openEventSale={openEventSale}
            getAvailableEvents={getAvailableEvents}
            eventsData={eventsData}
            closeEventSale={closeEventSale}
            URImintForEventId={URImintForEventId}
          />
          <div>
            <div className="d-flex">
              <input
                value={param1}
                onChange={(e) => setParam1(e.target.value)}
                type="text"
                placeholder="Param"
                className="col-1"
              />
              <input
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                type="text"
                placeholder="Param"
                className="col-1"
              />
              <input
                value={param3}
                onChange={(e) => setParam3(e.target.value)}
                type="text"
                placeholder="Param"
                className="col-1"
              />
              <input
                value={param4}
                onChange={(e) => setParam4(e.target.value)}
                type="text"
                placeholder="Param"
                className="col-1"
              />
              <input
                value={param5}
                onChange={(e) => setParam5(e.target.value)}
                type="text"
                placeholder="Param"
                className="col-1"
              />
            </div>
            <div className="d-flex my-2">
              <Button
                className="mx-1"
                onClick={() => BulkURImintForEventId(param1, param2, param3)}
              >
                BulkURImintForEventId
              </Button>
              <Button
                className="mx-1"
                onClick={() =>
                  AuthorizeSellTicketfromEventOwner(param1, param2, param3)
                }
              >
                AuthorizeSellTicketfromEventOwner
              </Button>
            </div>
            <Button
              className="mx-1"
              onClick={() =>
                authorizeSellTicketfromSecondHandOwner(param1, param2, param3)
              }
            >
              authorizeSellTicketfromSecondHandOwner
            </Button>
            <Button
              className="mx-1"
              onClick={() => bid(param1, param2, param3)}
            >
              bid
            </Button>
            <div className="d-flex my-2">
              <Button
                className="mx-1"
                onClick={() => releaseTokentoHighestBidder(param1)}
              >
                releaseTokentoHighestBidder
              </Button>
              <Button
                className="mx-1"
                onClick={() => sellToken(param1, param2, param3, param4)}
              >
                sellToken
              </Button>
              <Button
                className="mx-1"
                onClick={() => getAvailableEventTickets(param1)}
              >
                getAvailableEventTickets
              </Button>
              <Button
                className="mx-1"
                onClick={() => getAvailableResaleAuctions()}
              >
                getAvailableEventTickets
              </Button>
              <Button
                className="mx-1"
                onClick={() => getAvailableResaleDirectSaleTickets()}
              >
                getAvailableEventTickets
              </Button>
            </div>
          </div>
        </>
      )}
      {/* 
        
        <div className="container-fluid">
          <div className="row">
            <main >
              { this.state.loading
                ? <div id="loader" className="text-center d-flex align-items-center w-100 justify-content-center fs-4" style={{height:"70vh",fontWeight:"600"}}><p className="text-center">Loading...</p></div>
                : <Main
                contract={this.state.myContract}
                deleteRequest={this.deleteRequest}
                createProduct={this.createProduct}
                products={this.state.products}
                requestProduct={this.requestProduct}
                requestCount={this.state.requestCount}
                request={this.state.request}
                purchaseProduct={this.purchaseProduct}
              

                  />

              }
            </main>
          </div>
        </div> */}
    </>
  );
}
