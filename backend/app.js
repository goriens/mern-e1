const express = require("express");
const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
const path = require("path");

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// dotenv.config({ path: "backend/config/config.env" });

const errorMiddleware = require("./Middleware/error");
const product = require("./Routes/productRoutes");
const user = require("./Routes/userRoutes");
const order = require("./Routes/orderRoutes");
const payment = require("./Routes/paymentRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware);
module.exports = app;
