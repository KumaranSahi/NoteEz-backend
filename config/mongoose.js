const mongoose = require("mongoose");
mongoose.connect(process.env["DB_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to the database"));

db.once("open", function () {
  console.log("Connected to database successfully");
});
