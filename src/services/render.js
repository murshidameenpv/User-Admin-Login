const axios = require("axios")

exports.adminLogin = (req, res) => {
  if (req.session.admin) {
    res.redirect('/admin-view')
  }
  res.render('admin-login')
}

exports.userSignup = async (req, res) => {
  let message = ""; // Variable to store the message
  // Check if the message exists in the session
  if (req.session.message) {
    message = req.session.message;
    delete req.session.message; // Clear the message from the session
  }
  res.render('user-signup', { message }); // Pass the message to the user-signup view
};



exports.userLogin =  (req, res) => {
let message = ""; // Variable to store the message
  // Check if the message exists in the session
  if (req.session.message) {
    message = req.session.message;
    delete req.session.message; // Clear the message from the session
  }
  if (req.session.user) {
    res.redirect('/home')
  } else {
    res.render('user-login', { message }); // Pass the message to the user-login view
  }
}


exports.userLogout = (req, res) => {

  req.session.user = null;
  res.redirect('/user-login')
}

exports.home =  (req, res) => { 
  const user = req.session.user
  res.render('home', { user })
}



//ADMIN RENDER

exports.adminView = async (req, res) => {
  if (req.session.admin) {
     try {
        const response = await axios.get('http://localhost:3001/api/admin/users'); // Make a GET request to the user API endpoint
        const users = response.data // Extract the user data from the response
         res.render('admin-view', { users });//render 
  } catch (err) { 
    console.error('Error fetching users from MongoDB', err);
    res.status(500).send('Internal Server Error');
    }
    
  } else {
    res.redirect('/admin-login');
  }
   
};
exports.addUserAdmin = (req, res) => {
    res.render('admin-add-user');
}

exports.updateUserAdmin = async (req, res) => {
  try {
    const userId = req.query.id; // Get the user ID from the query string
    const response = await axios.put(`http://localhost:3001/api/admin/users/${userId}`, req.body);
    const updatedUser = response.data; // Fetch the updated user data by making a PUT request to the user API endpoint

    res.render('admin-update-user', { user: updatedUser }); // Render the 'admin-update-user' EJS view and pass the updated user data
  } catch (err) {
    console.error('Error updating user in MongoDB', err);
    res.status(500).send('Internal Server Error');
  }
};