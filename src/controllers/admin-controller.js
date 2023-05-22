var userDb = require('../models/model');

// const adminCred = process.env.ADMIN_CREDENTIAL;
ADMIN_CREDENTIAL = {
    email: "admin@gmail.com",
    password:"admin123"
}

//admin validate
exports.adminLogin = (req, res) => {
   if (req.body.email === ADMIN_CREDENTIAL.email && req.body.password === ADMIN_CREDENTIAL.password) {
    req.session.admin = ADMIN_CREDENTIAL;
    res.redirect('/admin-view')
   } else {
     res.redirect('back')
  }
}

exports.adminLogout = (req, res) => {
  req.session.admin = null;
  res.redirect('/admin-login');
}



//CRUD OPERATIONS  FOR ADMIN

 //create and save new user
exports.adminCreateUser = async (req, res) => {
  const data = req.body; // Access the user data from the request body

  try {
    const createdUser = await userDb.create(data);
    res.redirect("/admin-add-user")
  }
  catch (err) {
    console.error('Error inserting user into MongoDB', err);
    res.status(500).send('Internal Server Error');
  }
}





//retrieve and return all users or retrieve or return a single user 
exports.adminFindUser = async (req, res) => {
    if (req.query.id) {//find single user by ID
        try {
           const id = req.query.id; // Get the query ID from the route query
            data = await userDb.findById(id);
             res.send(data);
        }
        catch (err) {
           console.error('Error retrieving data from Mongoose', err);
           res.status(500).send('Internal Server Error');
        }
    }
    else {// find all users
        try {
           const data = await userDb.find();
             res.send(data);
        }
        catch (err) {
           console.error('Error retrieving data from Mongoose', err);
           res.status(500).send('Internal Server Error');
        }
    }
    
}





//Update a new identified user by user id
exports.adminUpdateUser = async (req, res) => {
  const id = req.params.id; // Get the ID from the route parameter
  const updatedData = req.body; // Assuming you're sending JSON data in the request body

  try {
    const result = await userDb.findByIdAndUpdate(id, updatedData);//update data
    const data = await userDb.findById(id);

    if (!result) {
      res.status(404).send('Document not found');
      return;
    }

    res.send(data);
  }
  catch (err) {
    console.error('Error updating data in Mongoose', err);
    res.status(500).send('Internal Server Error');
  }
}



//Delete a user with specified user id in the request by id
exports.adminDeleteUser = async (req, res) => {
    const id = req.params.id; // Get the ID from the route parameter
    try {
        const result = await userDb.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send('Document not found');
            return;
        }
        res.send('Data deleted successfully');
    }
    catch (err) {
        console.error('Error deleting data from Mongoose', err);
        res.status(500).send('Internal Server Error');
    }
};