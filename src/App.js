import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";
import Web3 from "web3";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Button, Modal } from "react-bootstrap";

export default function App(props) {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState(null);

  const [tokenId, settokenId] = useState();
  const [owner, setowner] = useState();
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState("");
  const [totalSupply, setTotalSupply] = useState();
  const [basePrice, setBasePrice] = useState();
  const [ev, setEv] = useState([1,2]);
  const [ot, setOt] = useState([]);

  useEffect(() => {
    console.log("useEffect");
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

  const createEvent = () => {
    console.log("creating event");
    // createNewEvent(eventName, totalSupply, basePrice);
    setEv((ev)=> [...ev, ev.length + 1])
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
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
      "0x410353A524d1AabD1A8E5aaCf66c18b318842c92",
      { from: account, gas: 150000, gasPrice: "30000000000" }
    );
    setContract(myContract);

    await myContract.methods
      .getAvailableEvents()
      .call()
      .then((events) => {
        setEventsData(events);
      })
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
    console.log("LOADING", event_id);

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

  const ownerOf = async (tokenId) => {
    console.log("getting owner");

    await contract.methods
      .ownerOf(tokenId)
      .call()
      .then((owner) => {
        setowner(owner);
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
    console.log("LOADING Bulk", target_uri, event_id, number_of_tickets);

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
    event_id,
    buyer
  ) => {
    console.log("LOADING", ticket_id, payment_amount, event_id, buyer);

    await contract.methods
      .authorizeSellTicketfromEventOwner(
        ticket_id,
        payment_amount,
        event_id,
        buyer
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

  const H = () => {
    return <div>Home</div>;
  };

  const Main = () => {
    return (
      <Router>
        <Navbar account={account} />
        <div className="row">
          <div className="col-2 border vh-100">
            <div>
              <NavLink className="d-block m-2" to="/">
                Available Events
              </NavLink>
              <NavLink
                className="d-block m-2"
                to={`ticketsboughtby/${account}`}
              >
                Your Tickets
              </NavLink>
            </div>
            <div>
              <Button className="mx-2" onClick={() => setShow(true)}>
                Add New Event
              </Button>
            </div>
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Events eventsData1={ev} />}></Route>
              <Route path="event" element={<Events />}>
                <Route path=":eventid" element={<EventPage />} />
              </Route>
              <Route path="ticketsboughtby" element={<OwnersTicket />}>
                <Route path=":owneraddress" element={<OwnersTicket eventsData={ot}/>} />
              </Route>
              <Route path="tickets" element={<TicketPage />}>
                <Route path=":ticketid" element={<TicketPage />} />
              </Route>
              <Route path="ticketsofevent" element={<EventsTicket />}>
                <Route path=":eventid" element={<EventsTicket />} />
              </Route>
              <Route
                path="auctionforevent/:eventid"
                element={<AuctionTicket />}
              />
            </Routes>
          </div>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Event</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="form-group mx-2">
                    <label htmlFor="EventName">Event Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="EventName"
                      aria-describedby="emailHelp"
                      placeholder="Event Name"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mx-2">
                    <label htmlFor="totalSupply">Total Supply</label>
                    <input
                      type="number"
                      className="form-control"
                      id="totalSupply"
                      placeholder="100"
                      value={totalSupply}
                      onChange={(e) => setTotalSupply(e.target.value)}
                    />
                  </div>
                  <div className="form-group mx-2">
                    <label htmlFor="basePrice">Base Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="basePrice"
                      placeholder="100"
                      value={basePrice}
                      onChange={(e) => setBasePrice(e.target.value)}
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => createEvent()}>
                  Create
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </Router>
    );
  };

  const Events = ({eventsData1}) => {
    // let eventsData1 = [1, 2, 3];
    return (
      <>
        <div className="px-5 row pt-5">
          {eventsData1.map((item) => {
            return (
              <div
                key={item.eventId + item.eventName}
                className="col-3 border m-1 mx-2 d-flex justify-content-center"
              >
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UwTtZRMBCq2W718Ym4Unt66e9eT9KT5Icg&usqp=CAU"
                    alt="NFT"
                    width="300"
                    height="300"
                  />
                  <div className="pt-2">
                    {/* <p>Event ID: {item.eventId}</p>
                    <p className="bold">Event Name: {item.eventName}</p>
                    <p>Total Supply: {item.totalSupply}</p>
                    <p>Base Price: {item.basePrice}</p>
                    <p>EventOwner: {item.EventOwner}</p>
                    <p>Available Tickets: {item.availableTickets}</p>
                    <p>Minted Tickets: {item.mintedTickets}</p>
                    <p>isSaleActive: {item.saleIsActive ? "True" : "False"}</p> */}
                    <p>Event {item}</p>
                    <NavLink
                      className="d-block m-2"
                      to={`ticketsofevent/${item}`}
                    >
                      Buy Tickets
                    </NavLink>
                    <NavLink
                      className="d-block m-2"
                      to={`auctionforevent/${item}`}
                    >
                      Buy in Auction
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return loading ? (
    <div
      id="loader"
      className="text-center d-flex align-items-center w-100 justify-content-center fs-4"
      style={{ height: "70vh", fontWeight: "600" }}
    >
      <p className="text-center">Loading...</p>
    </div>
  ) : (
    <Main />
  );
}

const EventPage = () => {
  let params = useParams();
  return (
    <>
      <h2>Event: {params.eventid}</h2>
      <div className="col-3 border m-1 mx-2 d-flex justify-content-center">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UwTtZRMBCq2W718Ym4Unt66e9eT9KT5Icg&usqp=CAU"
            alt="NFT"
            width="300"
            height="300"
          />
          {/* <div className="pt-2">
                  <p>Event ID: {item.eventId}</p>
                  <p className="bold">Event Name: {item.eventName}</p>
                  <p>Total Supply: {item.totalSupply}</p>
                  <p>Base Price: {item.basePrice}</p>
                  <p>EventOwner: {item.EventOwner}</p>
                  <p>Available Tickets: {item.availableTickets}</p>
                  <p>Minted Tickets: {item.mintedTickets}</p>
                  <p>isSaleActive: {item.saleIsActive ? "True" : "False"}</p>
                </div> */}
          <div>
            event
            <Button variant="secondary">Buy</Button>
            <p>$500</p>
            {/* <Button variant="secondary">Close</Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

const EventsTicket = () => {
  let params = useParams();
  let eventsData = [1, 2];
  return (
    <>
      <h2>Tickets of the Event: {params.eventid}</h2>
      <div className="px-5 row pt-5 col-12">
        {eventsData.map((item) => {
          return (
            <div
              key={item.eventId + item.eventName}
              className="col-3 border m-1 mx-2 d-flex justify-content-center"
            >
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UwTtZRMBCq2W718Ym4Unt66e9eT9KT5Icg&usqp=CAU"
                  alt="NFT"
                  width="300"
                  height="300"
                />
                {/* <div className="pt-2">
                  <p>Event ID: {item.eventId}</p>
                  <p className="bold">Event Name: {item.eventName}</p>
                  <p>Total Supply: {item.totalSupply}</p>
                  <p>Base Price: {item.basePrice}</p>
                  <p>EventOwner: {item.EventOwner}</p>
                  <p>Available Tickets: {item.availableTickets}</p>
                  <p>Minted Tickets: {item.mintedTickets}</p>
                  <p>isSaleActive: {item.saleIsActive ? "True" : "False"}</p>
                </div> */}
                <p>ticket {item}</p>
                <Button className="mx-2" onClick>Buy Now</Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const AuctionTicket = () => {
  let params = useParams();
  let eventsData = [1, 2];
  return (
    <>
      <h2>Auction tickets of the Event: {params.eventid}</h2>
      <div className="px-5 row pt-5 col-12">
        {eventsData.map((item) => {
          return (
            <div
              key={item.eventId + item.eventName}
              className="col-3 border m-1 mx-2 d-flex justify-content-center"
            >
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UwTtZRMBCq2W718Ym4Unt66e9eT9KT5Icg&usqp=CAU"
                  alt="NFT"
                  width="300"
                  height="300"
                />
                {/* <div className="pt-2">
                  <p>Event ID: {item.eventId}</p>
                  <p className="bold">Event Name: {item.eventName}</p>
                  <p>Total Supply: {item.totalSupply}</p>
                  <p>Base Price: {item.basePrice}</p>
                  <p>EventOwner: {item.EventOwner}</p>
                  <p>Available Tickets: {item.availableTickets}</p>
                  <p>Minted Tickets: {item.mintedTickets}</p>
                  <p>isSaleActive: {item.saleIsActive ? "True" : "False"}</p>
                </div> */}
                <p>ticket {item}</p>
                <Button className="d-block m-2">Bid</Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const TicketPage = () => {
  let params = useParams();
  return <h2>TTicketID: {params.owneraddress}</h2>;
};

const OwnersTicket = ({}) => {
  let params = useParams();
  let eventsData = [1, 2, 3];
  return (
    <>
      <h2>Tickets of the owner: {params.owneraddress}</h2>
      <div className="px-5 row pt-5 col-12">
        {eventsData.map((item) => {
          return (
            <div
              key={item.eventId + item.eventName}
              className="col-3 border m-1 mx-2 d-flex justify-content-center"
            >
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UwTtZRMBCq2W718Ym4Unt66e9eT9KT5Icg&usqp=CAU"
                  alt="NFT"
                  width="300"
                  height="300"
                />
                {/* <div className="pt-2">
                  <p>Event ID: {item.eventId}</p>
                  <p className="bold">Event Name: {item.eventName}</p>
                  <p>Total Supply: {item.totalSupply}</p>
                  <p>Base Price: {item.basePrice}</p>
                  <p>EventOwner: {item.EventOwner}</p>
                  <p>Available Tickets: {item.availableTickets}</p>
                  <p>Minted Tickets: {item.mintedTickets}</p>
                  <p>isSaleActive: {item.saleIsActive ? "True" : "False"}</p>
                </div> */}
                <p>ticket {item}</p>
                <Button>Sell in Auction</Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
