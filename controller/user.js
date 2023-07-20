require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {UsersModel} = require("../model/users");
// const {CartModel} = require('../model/cart');
const secretKey = process.env.SECRET_KEY;

const saltRounds = 10;
// date formatter function
const dateFormatter = (a,b,c)=>{
  switch(b){
    case 1:
      return a+' Jan '+c;
    case 2:
      return a+' Feb '+c;
    case 3:
      return a+' March '+c;
    case 4:
      return a+' April '+c;
    case 5:
      return a+' May '+c;
    case 6:
      return a+' June '+c;
    case 7:
      return a+' July '+c;
    case 8:
      return a+' August '+c;
    case 9:
      return a+' Sept '+c;
    case 10:
      return a+' Oct '+c;
    case 11:
      return a+' Nov '+c;
    case 12:
      return a+' Dec '+c;
  }
}
// // User registration endpoint
const register = async (req, res) => {
  try {
    const userInfo = req.body;
    // Check if user already exists
    const existingUser = await UsersModel.findOne({ email:userInfo.email });
    if (existingUser) {
      return res.json({ message: "Registered user; try to LogIn !" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
    userInfo.password = hashedPassword;
    // Create a new user
    await UsersModel.create(userInfo);
    const user = await UsersModel.findOne({email:userInfo.email});
    const year = user.createdAt.getFullYear();
    const month = user.createdAt.getMonth();
    const day = user.createdAt.getDay();
    const date = dateFormatter(day, month, year);
    // Generate a JWT token
    const userName = userInfo.email.split('@')[0];
    const token = jwt.sign({ userId: user._id }, secretKey, {expiresIn: "12h"});
    res.status(200).json({ message: "User registered successfully !", token:token, userName: userName, joined: date});
  } 
  catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

// // User login endpoint
const login = async (req, res) => {
  try {
    const loginData = req.body;
    // Find the user
    const user = await UsersModel.findOne({ email:loginData.email });
    if (!user) {
      return res.json({ message: "New user try to SignUp first !" });
    }
    // Compare the password
    const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid Credinals !" });
    }
    // Generate a JWT token
    const userName = user.email.split('@')[0];
    const year = user.createdAt.getFullYear();
    const month = user.createdAt.getMonth();
    const day = user.createdAt.getDay();
    const date = dateFormatter(day, month, year);
    const token = jwt.sign({ userId: user._id }, secretKey, {expiresIn: "12h"});
    return res.json({message:"logged in Successfully !", Token:token, userName: userName, joined: date });
  }
  catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

module.exports={
    register,
    login
}