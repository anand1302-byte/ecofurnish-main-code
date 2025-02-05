const mongoose = require('mongoose');

const individualschema =new mongoose.Schema({
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

exports.individualschema = mongoose.model('individual', individualschema);