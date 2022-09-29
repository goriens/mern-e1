const app = require("./app");
// const dotenv = require("dotenv");
const connect = require("./Config/db");
const cloudinary = require("cloudinary");
const port = process.env.PORT || 5000;

//handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shuting down server uncaught exception");
  process.exit(1);
});
// dotenv.config({ path: "backend/config/config.env" });

//connect db and server
const server = app.listen(port, async () => {
  await connect();
  console.log(`Server is Listening on port ${port}`);
});
// cloud file upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//Unhandled error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server because of unhandled error");
  server.close(() => {
    process.exit(1);
  });
});
