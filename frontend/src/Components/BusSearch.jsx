import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import busData from "../Bus.json";
import { Form, Dropdown, Button } from "react-bootstrap";

const BusSearchForm = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate(); // Get the navigate function to navigate to a different page

  const userData =JSON.parse(localStorage.getItem("userData"));
  console.log(userData._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter the bus names based on the selected source, destination, and date
    const filteredBusData = busData.buses.filter(
      (bus) => bus.source === source && bus.destination === destination
    );

    // Create an array of objects containing the bus names, source, destination, and fare
    const filteredBusNames = filteredBusData.map((bus) => ({
      user: userData._id,
      name: bus.name,
      source: bus.source,
      destination: bus.destination,
      fare: bus.fare,
      date: date
    }));

    // Navigate to a different page and pass the filtered bus names as a parameter
    navigate("/", { state: { busNames: filteredBusNames } });

    // Reset the state values for source, destination, and date
    setSource("");
    setDestination("");
    setDate("");
  };

  return (
    <div className="rounded border d-flex flex-column search-area">
      <Form onSubmit={handleSubmit}>
        <div className="my-3 d-flex">
          <Form.Group controlId="source" className="fixed">
            <Form.Label className="form-text">Leaving from?</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-source">
                {source ? source : "Select Source"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setSource("");
                  }}
                >
                  Select Source
                </Dropdown.Item>
                {busData.buses.map((bus) => (
                  <Dropdown.Item
                    key={bus.id}
                    onClick={() => {
                      setSource(bus.source);
                    }}
                  >
                    {bus.source}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group controlId="destination" className="fixed">
            <Form.Label className="form-text">Going to?</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-light"
                id="dropdown-destination"
              >
                {destination ? destination : "Select Destination"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setDestination("");
                  }}
                >
                  Select Destination
                </Dropdown.Item>
                {busData.buses.map((bus) => (
                  <Dropdown.Item
                    key={bus.id}
                    onClick={() => {
                      setDestination(bus.destination);
                    }}
                  >
                    {bus.destination}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </div>
        <div>
          <Form.Group controlId="date">
            <Form.Label className="form-text">Date:</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-light" type="submit" className="mt-3">
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BusSearchForm;
