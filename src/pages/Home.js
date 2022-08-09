import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Home({ createNewEvent, openEventSale, getAvailableEvents, eventsData}) {
  const [eventName, setEventName] = useState("");
  const [totalSupply, setTotalSupply] = useState();
  const [basePrice, setBasePrice] = useState();

  const [event_id, setEventID] = useState();

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
        <div className="border m-1 mx-2 px-3 col-2">
          {data.map((item) => {
            return <p key={`${item}`}>Navigation</p>;
          })}
          <div>
            <Button onClick={() => setShow(true)}>Add New Event</Button>
          </div>
          <br></br>
          <div className="d-flex">
            <input
              value={event_id}
              onChange={(e) => setEventID(e.target.value)}
              type="number"
              placeholder="100"
              className="col-6"
            />

            <Button onClick={() => openEventSale(event_id)}>
              Open Event Sale
            </Button>
          </div>
          <br></br>

          <div>
            <Button onClick={() => getAvailableEvents()}>Get All Events</Button>
          </div>
        </div>
        <div className="px-5 row pt-5 col-10">
          {eventsData.map((item) => {
            return (
              <div key={item.eventId + item.eventName} className="col-3 border m-1 mx-2 p-2 d-flex justify-content-center">
                {/* <img>hy</img> */}
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4UwTtZRMBCq2W718Ym4Unt66e9eT9KT5Icg&usqp=CAU"
                    alt="NFT"
                    width="300"
                    height="300"
                  />
                  <div className="pt-2">
                    <p className="bold">{item.eventName}</p>
                    <p>Total Supply: {item.totalSupply}</p>
                    <p>Event ID: {item.eventId}</p>
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