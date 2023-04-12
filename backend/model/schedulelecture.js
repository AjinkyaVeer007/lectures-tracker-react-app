const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  courseName: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  assignTo: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("lecture", lectureSchema);
