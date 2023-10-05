const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const Ticket = require("../models/ticket_model");

router.post("/", async (req, res) => {
  try {
    const { user, source, destination, date, fare } = req.body;

    // Validate if all fields are sent
    if (!user || !source || !destination || !date || !fare) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Create a new ticket
    const newTicket = new Ticket({
      user,
      source,
      destination,
      date,
      fare,
    });

    // Save the ticket to the database
    await newTicket.save();

    res
      .status(201)
      .json({ message: "Ticket created successfully!", ticket: newTicket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create ticket!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the ticket by ID
    const ticket = await Ticket.find({user: userId});
    
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found!" });
    }

    res.status(200).json({ ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve ticket!" });
  }
});

router.post("/:id/book", async (req, res) => {
  try {
    const ticketId = req.params.id;

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found!" });
    }

    // Update the ticket's booked value to true
    ticket.booked = true;

    // Save the updated ticket to the database
    await ticket.save();

    res.status(200).json({ message: "Ticket booked successfully!", ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to book ticket!" });
  }
});

module.exports = router;
