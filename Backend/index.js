const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cors = require("cors");

const MONGO_URL = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET;

const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// console.log('MONGO_URL:', MONGO_URL);
// console.log('JWT_SECRET:', jwtSecret);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

app.use('/', Routes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
