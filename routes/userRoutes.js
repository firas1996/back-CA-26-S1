const { SignUp, signIn } = require("../controllers/authController");
const {
  createUser,
  getUsers,
  getUserByid,
  updateUserByid,
  deleteUserByid,
} = require("../controllers/userController");
const { protectorMW, checkRoleMW, isMineMW } = require("../utils/middleware");
const router = require("express").Router();

router.post("/auth", signIn);

router
  .route("/")
  .post(SignUp)
  .get([protectorMW, checkRoleMW("admin", "user"), getUsers]);
router
  .route("/:id")
  .get([protectorMW, isMineMW("owner"), getUserByid])
  .patch([updateUserByid])
  .delete(deleteUserByid);

module.exports = router;
