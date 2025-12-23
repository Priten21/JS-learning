const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server Started at PORT :${PORT}`);
});
