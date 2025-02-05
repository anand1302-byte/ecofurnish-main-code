const mongoose = require('mongoose');

const userschema =new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{ 
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

exports.userschema = mongoose.model('User', userschema);