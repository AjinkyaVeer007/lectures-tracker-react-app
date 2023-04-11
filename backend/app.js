require("dotenv").config();

require("./config/db").connect();

const express = require("express");
const cors = require("cors");
const User = require("./model/user");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate the date
    if (!(email && password)) {
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
    await User.create({
      email,
      password: encryptPassword,
    });

    // share the response to frontend
    res.status(200).json({
      status: true,
      message: "User Successfully register",
      data: email,
    });
  } catch (error) {
    console.log("Fail to register User");
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    //data get from frontend
    const { email, password } = req.body;

    //check all fields are fill up or not
    if (!(email, password)) {
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

    // give response to frontend
    res.status(200).json({
      success: true,
      message: "Welcome to Dashboard",
      data: user.email,
    });
  } catch (error) {
    console.log("Fail to login");
    console.log(error);
  }
});

module.exports = app;
