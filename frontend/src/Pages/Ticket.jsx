import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";

const Ticket = () => {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [booked, setBooked] = useState([]);

  useEffect(() => {
    const getGeneratedTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/ticket/" + id
        );
        const tickets = response.data;

        // Filter out tickets with booked: false
        const filteredTickets = tickets.ticket.filter(
          (ticket) => !ticket.booked
        );

        setTickets(filteredTickets);
      } catch (error) {
        console.log(error);
      }
    };

    const getBookedTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/ticket/" + id
        );
        const booked = response.data;

        // Filter out tickets with booked: false
        const filteredTickets = booked.ticket.filter((ticket) => ticket.booked);

        setBooked(filteredTickets);
      } catch (error) {
        console.log(error);
      }
    };

    getGeneratedTickets();
    getBookedTickets();
  }, [tickets, booked]);

  const bookTicket = async (ticketId) => {
    try {
      // Make a POST request to book the ticket by ID
      const response = await axios.post(
        `http://localhost:5000/api/ticket/${ticketId}/book`
      );

      // Handle the response from the server
      console.log("Ticket booked:", response.data);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error booking ticket:", error);
    }
  };

  return (
    <div className="my-bg">
      <div className="container d-flex flex-column vw-100 vh-100 ps-0 ms-0">
        <div className="vw-100">
          <Header />
        </div>
        <div>
          <div className="mt-5">
            <h1 className="ticket-head ms-4">Generated Tickets:</h1>
            <div>
            {tickets.map((ticket) => (
                <div key={ticket._id} className="mb-4">
                  <div className="ticket-bg ms-4 ps-3 d-flex">
                    <div className="mx-3">
                      <p>Booking ID: {ticket._id}</p>
                    </div>
                    <div className="d-flex flex-column mx-3">
                      <p>From: {ticket.source}</p>
                      <p>To: {ticket.destination}</p>
                    </div>
                    <div className="d-flex flex-column mx-3">
                      <p>Fare: {ticket.fare}</p>
                      <p>Date: {ticket.date}</p>
                    </div>
                    <button className="btn btn-dark ms-auto" onClick={() => bookTicket(ticket._id)}>book</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="ticket-head ms-4">Booked Tickets:</h1>
            <div>
              {booked.map((ticket) => (
                <div key={ticket._id} className="mb-4">
                  <div className="ticket-bg ms-4 ps-3 d-flex">
                    <div className="mx-3">
                      <p>Booking ID: {ticket._id}</p>
                    </div>
                    <div className="d-flex flex-column mx-3">
                      <p>From: {ticket.source}</p>
                      <p>To: {ticket.destination}</p>
                    </div>
                    <div className="d-flex flex-column mx-3">
                      <p>Fare: {ticket.fare}</p>
                      <p>Date: {ticket.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-pos">
          <Footer className="w-100"/>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
