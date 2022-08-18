import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
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

  const [tokenId, settokenId] = useState();
  const [owner, setowner] = useState();

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
      // 0x7d9916f76FB9D48D37A1710C5e49D24b7e1a3eEd
      // "0x44E55DbCa6672b6CbE7419bDEFdC2997E145Fb5c",
      // "0x055e43aFd89e4722bC49d38951E1b523c348beE9",
      // "0x7CED9f328E27C51f9d01D90C50027eC3a90b9e40",
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

  const Main = () => {
    return loading ? (
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
          BulkURImintForEventId={BulkURImintForEventId}
          AuthorizeSellTicketfromEventOwner={AuthorizeSellTicketfromEventOwner}
          sellToken={sellToken}
          bid={bid}
          releaseTokentoHighestBidder={releaseTokentoHighestBidder}
        />
        <div>
          <div>
            <input
              value={tokenId}
              onChange={(e) => settokenId(e.target.value)}
              type="text"
              placeholder="tokenId"
              className="col-1"
            />
            <Button onClick={() => ownerOf(tokenId)}>ownerOf</Button>
          </div>
          {owner}
          <div className="d-flex"></div>
          <div className="d-flex my-2"></div>
        </div>
      </>
    );
  };

  return (
    <>
      <Router>
        <Navbar account={account} />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="event" element={<EventPage />}>
            <Route path=":eventid" element={<EventPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

const EventPage = () => {
  let params = useParams();
  return <h2>Event: {params.eventid}</h2>;
};
