const express = require("express");
const {connectMongodb} = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./Routes/user");

const app = express();
const PORT = 8000;

// Connection
connectMongodb("mongodb://127.0.0.1:27017/project_db")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));


// Routes
app.use("/user",userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`)
);
