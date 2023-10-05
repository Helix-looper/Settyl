import React, { useState } from "react";
import "../App.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import BusSearchForm from "../Components/BusSearch";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const location = useLocation();
  const busNames = location.state?.busNames || [];
  const [showModal, setShowModal] = useState(false);
  const [ticketGenerated, setTicketGenerated] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };
  const confirmTicket = async (user, source, destination, date, fare) => {
    try {
      // Make a POST request to the server to create a new ticket

      const response = await axios.post("http://localhost:5000/api/ticket", {
        user,
        source,
        destination,
        date,
        fare,
      });

      // Handle the response from the server
      console.log("Ticket created:", response.data);
      // You can perform additional logic here, such as updating the UI
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error creating ticket:", error);
      console.log(user, source, destination, date, fare);
    }
  };

  const handleConfirm = () => {
    confirmTicket(
      busNames[0].user,
      busNames[0].source,
      busNames[0].destination,
      busNames[0].date,
      busNames[0].fare
    );
    // On successful ticket generation, set ticketGenerated to true
    setTicketGenerated(true);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="home-bg">
      <div className="container d-flex vw-100 vh-100 ps-0 ms-0">
        <div className="d-flex flex-column align-items-center">
          <div className="vw-100">
            <Header />
          </div>
          <div className="d-flex justify-content-center my-5">
            <div className="home-heading d-flex flex-column justify-content-center px-5">
              <h1>Search Buses</h1>
              <h3>Enjoy hassle free booking</h3>
              <h3> with EasyTicket</h3>
            </div>
            <div>
              <BusSearchForm />
            </div>
          </div>
          <div className="d-flex flex-column align-items-center search-cont border rounded">
            <div className="search-result d-flex flex-column align-items-center">
              <h2>Search Result:</h2>
              {busNames.length > 0 ? (
                <ul>
                  {busNames.map((bus) => (
                    <div className="search-item d-flex justify-content-between align-items-center" key={bus.name}>
                      <span className="busname ps-3">{bus.name}</span>
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleConfirm(bus)}
                      >
                        Generate Ticket
                      </button>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>Nothing to show here.</p>
              )}
            </div>
          </div>
          <div className="footer-pos">
            <Footer />
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to generate a ticket?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={ticketGenerated} onHide={() => setTicketGenerated(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket Generation Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your ticket has been successfully generated. Head over to 'My Tickets'
          section to confirm your booking.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setTicketGenerated(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
