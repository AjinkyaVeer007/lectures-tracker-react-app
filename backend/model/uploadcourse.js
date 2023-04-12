const mongoose = require("mongoose");

const uploadCourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    require: true,
  },
  courseType: {
    type: String,
    require: true,
  },
  courseDescription: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("course", uploadCourseSchema);
