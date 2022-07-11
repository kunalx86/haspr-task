require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { connect } = require("mongoose");

const baseRouter = require("./routes/index");
const { validateToken, decodeToken } = require("./utils/jwt");

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

  // If token exists save info in context
  app.use(async (req, res, next) => {
    req.ctx = {
      isLoggedIn: false
    }

    try {
      const token = (req.headers["authorization"] || "").split(" ")[2];
      
      if (token && token !== "" && (await validateToken(token))) { 
        const ctx = await decodeToken(token);
        req.ctx = {
          ...ctx,
          isLoggedIn: true
        }
      } 
      next();
    } catch (err) {
      return next(err);
    }
  });

  // Routes
  app.use('/api', baseRouter)

  // Top Level Error Manager
  app.use((err, _, res, next) => {
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
