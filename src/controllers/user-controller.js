var userDb = require('../models/model');
const dotenv = require("dotenv").config({ path: '.env' });




//API FOR USER
//user signup api
exports.userSignUp = async (req, res) => {
  const data = req.body; // Access the user data from the request body
  try {
    // Check if the email already exists in the database
    const existingUser = await userDb.findOne({ email: data.email });
    if (existingUser) {
      req.session.message = "Email already exists"; // Set the message in the session
      return res.redirect("/user-signup"); // Redirect back to the signup page
    }
    // If the email is unique, create and save a new user to the database
    const createdUser = await userDb.create(data);
    res.redirect("/user-login");

  } catch (err) {
    console.error('Error creating or checking user existence in MongoDB', err);
    res.status(500).send('Internal Server Error');
  }
};


//user login api
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;  
  try {    //validate both email and password
    const userData = await userDb.findOne({ email, password });
    if (!userData) {
      req.session.message = "Incorrect Password or Email";
      return res.redirect("/user-login");
    }
   
    req.session.user = userData//passes the userData object to the session 
    res.redirect("/home");

  }
  catch (err) {
    console.error('Error creating or checking user existence in MongoDB', err);
    res.status(500).send('Internal Server Error');
  }
}

//VALIDATE LOGIN
exports.checkLoggedIn=(req, res, next)=> {
    if (req.session.user) {
        next()
    } else { 
        res.redirect('/user-login')
    }
}