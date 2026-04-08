const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.log("DB Connection Failed");
      console.error(error.message);
      process.exit(1);
    });
};
