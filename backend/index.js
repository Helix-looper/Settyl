const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
dotenv.config();

// const url = "mongodb://localhost:27017/TicketGenerator";

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const authRoute = require("./routes/auth_route");
const userRoute = require("./routes/user_route");
const ticketRoute = require("./routes/ticket_route");

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/ticket", ticketRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
