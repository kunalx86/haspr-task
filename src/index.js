require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { connect } = require("mongoose");

// To use .catch() & promises at top level
(async () => {
  const app = express();

  // Database setup
  await connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("DB connected");

  // Set up logging
  if (process.env.ENV === "development") {
    app.use(morgan("dev"));
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api", (_, res) => {
    res.json({
      message: "Hello, World"
    });
  });


  // Top Level Error Manager
  app.use((err, _, res) => {
    return res.status(err.status || 500).json({
      message: err.message || "Something went wrong"
    });
  })

  app.listen(process.env.PORT || 4000, () => {
    console.log(`API up on ${process.env.URL}`);
  });
})()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
