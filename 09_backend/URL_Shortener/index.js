const express = require("express");
const path = require("path");
const session = require("express-session");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const authRoute = require("./routes/auth");

const app = express();
const PORT = 8001;

// --------------------
// View engine
// --------------------
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// --------------------
// Middlewares
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware (AUTH)
app.use(
  session({
    secret: "supersecretkey", // move to .env in production
    resave: false,
    saveUninitialized: false,
  })
);

// --------------------
// Routes
// --------------------
app.use("/", staticRoute); // homepage
app.use("/", authRoute);   // login, signup, logout
app.use("/url", urlRoute); // url shortener

// --------------------
// Database
// --------------------
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// --------------------
// Server
// --------------------
app.listen(PORT, () => {
  console.log(`Server Started at PORT :${PORT}`);
});
