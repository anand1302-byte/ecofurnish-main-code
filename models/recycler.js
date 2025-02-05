const mongoose = require('mongoose');

const recyclerschema =new mongoose.Schema({
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

exports.recyclerschema = mongoose.model('recycler', recyclerschema);