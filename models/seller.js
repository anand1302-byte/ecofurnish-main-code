const mongoose = require('mongoose');

const sellerschema =new mongoose.Schema({
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

exports.sellerschema = mongoose.model('seller', sellerschema);