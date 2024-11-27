const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(
      "mongodb+srv://nimbadkarnitin:lwdFpRhXtkcnvwqn@cluster0.kka8x.mongodb.net/"
    )
    .then(() => console.log("Databse connected successfully"))
    .catch((err) => {
      console.log("error in conncecting with database");
      console.log(err,"-err");
      process.exit(1);
    });
};
