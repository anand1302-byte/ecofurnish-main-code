const mongoose = require('mongoose');

const domesticschema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

exports.domesticschema = mongoose.model('domestic', domesticschema);