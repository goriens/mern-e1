const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(process.env.MONGO_URI).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
  //.catch((e) => {
  //  console.log(e);
  //});
};

module.exports = connect;
