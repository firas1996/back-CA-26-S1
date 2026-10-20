const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Db connected !!!");
  })
  .catch(() => {
    console.log("Db not connected !!!");
  });

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

const port = 1234;

app.listen(port, () => {
  console.log("The server is running !!!");
});

//sfW8JvwZturpcX9K-firashm1996_db_user
