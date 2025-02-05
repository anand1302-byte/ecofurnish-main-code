const mongoose = require('mongoose');

const collectorschema =new mongoose.Schema({
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

exports.collectorschema = mongoose.model('collector', collectorschema);