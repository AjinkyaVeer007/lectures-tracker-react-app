require("dotenv").config();

require("./config/db").connect();

const express = require("express");
const cors = require("cors");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Course = require("./model/uploadcourse");
const Lecture = require("./model/schedulelecture");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validate the date
    if (!(username && email && password)) {
      res.status(401).send("All field are mandatory");
    }

    //check user is existing or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).send("User is already register");
    }

    //encyrpt password
    const encryptPassword = await bcrypt.hash(password, 10);

    // create new entry in database
    const user = await User.create({
      username,
      email,
      password: encryptPassword,
    });

    // create a jwt token
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );

    user.password = undefined;

    // share the response to frontend
    res.status(200).json({
      status: true,
      message: "User Successfully register",
      token: token,
      data: email,
      username: username,
    });
  } catch (error) {
    console.log("Fail to register User");
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    //data get from frontend
    const { username, email, password } = req.body;

    //check all fields are fill up or not
    if (!(username, email, password)) {
      res.status(401).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // check user is valid or not
    const user = await User.findOne({ email });
    const userPassword = await bcrypt.compare(password, user.password);

    if (!(user && userPassword)) {
      res.status(401).json({
        success: false,
        message: "Kindly enter correct credentials or register",
      });
    }

    // create a jwt token
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );

    user.password = undefined;

    // give response to frontend
    res.status(200).json({
      success: true,
      message: "Welcome to Dashboard",
      token: token,
      data: user.email,
      username: username,
    });
  } catch (error) {
    console.log("Fail to login");
    console.log(error);
  }
});

app.post("/uploadCourse", auth, async (req, res) => {
  try {
    const { courseName, courseType, courseDescription, img } = req.body;
    // check if all data uploaded
    if (!(courseName, courseType, courseDescription, img)) {
      res.status(401).json({
        status: false,
        message: "All field are mandatory",
      });
    }

    // create new course entry in db
    const newImage = await Course.create({
      courseName,
      courseType,
      courseDescription,
      img,
    });
    newImage.save();

    res.status(200).json({
      status: true,
      data: courseName,
    });
  } catch (error) {
    console.log("Fail to upload course");
    console.log(error);
  }
});

app.get("/admin/getcourse", auth, async (req, res) => {
  try {
    const course = await Course.find();
    if (!course) {
      throw new Error("No Courses Found.!");
    }
    res.status(200).json({
      status: true,
      data: course,
    });
  } catch (error) {
    console.log("fail to get courses");
    console.log(error);
  }
});

app.get("/admin/getinstructor", auth, async (req, res) => {
  try {
    const instructors = await User.find();
    res.status(200).json({
      status: true,
      data: instructors,
    });
  } catch (error) {
    console.log("fail to get instructors");
    console.log(error);
  }
});

app.post("/admin/schedulelecture", auth, async (req, res) => {
  try {
    const { courseName, date, assignTo } = req.body;

    if (!(courseName, date, assignTo)) {
      res.status(401).json({
        status: false,
        message: "All fields are mandatory",
      });
    }

    // check the same user & same time is already there or not
    const scheduleCheck = await Lecture.findOne({ date, assignTo });

    if (scheduleCheck) {
      return res.status(400).send("Instructure busy in another lecture");
    }

    const data = await Lecture.create({
      courseName,
      date,
      assignTo,
    });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.log("Fail to scheduled lecture");
    console.log(error);
  }
});

app.get("/admin/getAllLectures", auth, async (req, res) => {
  try {
    const data = await Lecture.find();
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Fail to load lectures",
      });
    }

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.log("Fail catch");
    console.log(error);
  }
});

app.post("/instructor/getscheduledlectures", async (req, res) => {
  try {
    const { username } = req.body;
    const lectures = await Lecture.find({ assignTo: `${username}` });

    if (!lectures) {
      return res.send("Lectures not found");
    }

    res.status(200).json({
      status: true,
      data: lectures,
    });
  } catch (error) {
    console.log("Fail to get lectures");
    console.log(error);
  }
});

module.exports = app;
