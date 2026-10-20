const Ticket = require("../models/ticketModel.js");
const User = require("../models/userModel.js");

exports.createTicket = async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    res.status(201).json({
      message: "ticket created !",
      data: newTicket,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({
      message: "Ticket Fetched !",
      nbr: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      res.status(404).json({
        message: "this ticket does not exist !!!!",
      });
    }
    res.status(200).json({
      message: "Ticket Fetched !",
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.updateTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ticket) {
      res.status(404).json({
        message: "this ticket does not exist !!!!",
      });
    }
    res.status(200).json({
      message: "ticket Updated !",
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};

exports.deleteUserByid = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "User Deleted !",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error !",
    });
  }
};
