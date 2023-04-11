const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connected Successfully"))
    .catch((err) => {
      console.log("Fail to connect DB");
      console.log(err);
      process.exit(1);
    });
};
