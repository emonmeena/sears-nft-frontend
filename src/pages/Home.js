import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Home({
  account,
  createNewEvent,
  openEventSale,
  getAvailableEvents,
  eventsData,
  closeEventSale,
  URImintForEventId,
  BulkURImintForEventId,
  AuthorizeSellTicketfromEventOwner,
  sellToken,
  bid,
  releaseTokentoHighestBidder,
}) {
  const [eventName, setEventName] = useState("");
  const [totalSupply, setTotalSupply] = useState();
  const [basePrice, setBasePrice] = useState();
  const [targetURI, setTargetURI] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState();
  const [paymentAmount, setPaymentAmount] = useState();
  const [ticketId, setTicketId] = useState();
  const [eventId, setEventID] = useState();
  const [buyer, setBuyer] = useState();
  const [bidAmount, setBidAmount] = useState();

  const [show, setShow] = useState(false);
  const [data, setData] = useState([1, 2, 3]);

  const createEvent = () => {
    createNewEvent(eventName, totalSupply, basePrice);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="App row">
        <div className="border m-1 mx-2 px-3 col-4">
          <br></br>

          <div>
            <Button onClick={() => setShow(true)}>Add New Event</Button>
          </div>
          <br></br>
          <div className="d-flex">
            <input
              value={targetURI}
              onChange={(e) => setTargetURI(e.target.value)}
              type="text"
              placeholder="TargetURI"
              className="col-3"
            />
            <input
              value={eventId}
              onChange={(e) => setEventID(e.target.value)}
              type="number"
              placeholder="EventID"
              className="col-3"
            />
            <Button onClick={() => URImintForEventId(targetURI, eventId)}>
              URI mint For EventId
            </Button>
          </div>
          <br></br>
          <div className="d-flex">
            <input
              value={eventId}
              onChange={(e) => setEventID(e.target.value)}
              type="number"
              placeholder="EventID"
              className="col-6"
            />

            <Button onClick={() => openEventSale(eventId)}>
              Open Event Sale
            </Button>
          </div>
          <br></br>

          <div>
            <input
              value={eventId}
              onChange={(e) => setEventID(e.target.value)}
              type="number"
              placeholder="EventID"
              className="col-4"
            />

            <Button onClick={() => closeEventSale(eventId)}>
              Close Event Sale
            </Button>
          </div>
          <br></br>

          {/* <div className="d-flex">
            <input
              value={targetURI}
              onChange={(e) => setTargetURI(e.target.value)}
              type="text"
              placeholder="TargetURI"
              className="col-2"
            />
            <input
              value={eventId}
              onChange={(e) => setEventID(e.target.value)}
              type="number"
              placeholder="EventID"
              className="col-2"
            />
            <input
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(e.target.value)}
              type="number"
              placeholder="Number Of Tickets"
              className="col-2"
            />

            <Button
              onClick={() =>
                BulkURImintForEventId(targetURI, eventId, numberOfTickets)
              }
            >
              Bulk URI mint For EventId
            </Button>
          </div> */}
          <br></br>

          <div>
            <Button onClick={() => getAvailableEvents()}>Get All Events</Button>
          </div>
          <br></br>

          <div>
            <div>
              <input
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                type="text"
                placeholder="ticketId"
                className="col-2"
              />
              <input
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                type="number"
                placeholder="payment amount"
                className="col-2"
              />
              <input
                value={eventId}
                onChange={(e) => setEventID(e.target.value)}
                type="number"
                placeholder="EventID"
                className="col-2"
              />
              <input
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                type="text"
                placeholder="Buyer"
                className="col-2"
              />
              <Button
                className="mx-1"
                onClick={() =>
                  AuthorizeSellTicketfromEventOwner(
                    ticketId,
                    paymentAmount,
                    eventId,
                    buyer
                  )
                }
              >
                AuthorizeSellTicketfromEventOwner
              </Button>
            </div>
            <br></br>
            <div>
              <input
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                type="text"
                placeholder="ticketId"
                className="col-2"
              />
              <input
                value={"auction"}
                type="text"
                placeholder="auction"
                className="col-2"
              />
              <input
                value={10000}
                type="number"
                placeholder="Duration"
                className="col-2"
              />
              <input
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                type="number"
                placeholder="payment amount"
                className="col-2"
              />
              <input
                value={eventId}
                onChange={(e) => setEventID(e.target.value)}
                type="number"
                placeholder="EventID"
                className="col-2"
              />
              <Button
                className="mx-1"
                onClick={() =>
                  sellToken(ticketId, "auction", 1000, paymentAmount, eventId)
                }
              >
                sellToken
              </Button>
            </div>
            <br></br>

            <div>
              <div>
                <input
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  type="number"
                  placeholder="bidAmount"
                  className="col-2"
                />
                <input
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  type="number"
                  placeholder="ticketId"
                  className="col-2"
                />
                <input
                  value={eventId}
                  onChange={(e) => setEventID(e.target.value)}
                  type="number"
                  placeholder="EventID"
                  className="col-2"
                />
                <Button
                  className="mx-1"
                  onClick={() => bid(bidAmount, ticketId, eventId)}
                >
                  bid
                </Button>
              </div>
              <br></br>
              <div>
                <input
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  type="number"
                  placeholder="ticketId"
                  className="col-2"
                />
                <Button
                  className="mx-1"
                  onClick={() => releaseTokentoHighestBidder(ticketId)}
                >
                  releaseTokentoHighestBidder
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 row pt-5 col-8">
          {eventsData.map((item) => {
            return (
              <div
                key={item.eventId + item.eventName}
                className="col-4 border m-1 mx-2 d-flex justify-content-center"
              >
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UwTtZRMBCq2W718Ym4Unt66e9eT9KT5Icg&usqp=CAU"
                    alt="NFT"
                    width="300"
                    height="300"
                  />
                  <div className="pt-2">
                    <p>Event ID: {item.eventId}</p>
                    <p className="bold">Event Name: {item.eventName}</p>
                    <p>Total Supply: {item.totalSupply}</p>
                    <p>Base Price: {item.basePrice}</p>
                    <p>EventOwner: {item.EventOwner}</p>
                    <p>Available Tickets: {item.availableTickets}</p>
                    <p>Minted Tickets: {item.mintedTickets}</p>
                    <p>isSaleActive: {item.saleIsActive ? "True" : "False"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
          <Button variant="primary" onClick={createEvent}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
