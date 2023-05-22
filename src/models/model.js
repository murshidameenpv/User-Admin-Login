// define the schema

const mongoose = require('mongoose');

var LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:false
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
})

const userDb = mongoose.model('collection1', LogInSchema);


module.exports=userDb