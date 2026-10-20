const { SignUp, signIn } = require("../controllers/authController");
const {
  createTicket,
  getTicketById,
  updateTicketById,
  getTickets,
} = require("../controllers/ticketController");
const { protectorMW, checkRoleMW, isMineMW } = require("../utils/middleware");
const router = require("express").Router();

router
  .route("/")
  .post(createTicket)
  .get([protectorMW, checkRoleMW("admin", "user"), getTickets]);
router
  .route("/:id")
  .get([protectorMW, isMineMW("owner"), getTicketById])
  .patch([updateTicketById]);

module.exports = router;
