const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");
const ticketSchema = Schema({
  title: {
    type: String,
    required: [true, "The title is required !"],
    maxlength: 10,
    minlength: 3,
  },
  status: {
    type: String,
    enum: ["Done", "In_Progress", "Closed"],
    default: "In_Progress",
  },
  assigned_to: {
    type: String,
    userid: [ObjectId],
  },
});
const Ticket = model("Ticket", ticketSchema);
module.exports = Ticket;
