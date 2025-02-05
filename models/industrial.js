const mongoose = require('mongoose');

const industrialschema =new mongoose.Schema({
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

exports.industrialschema = mongoose.model('Industrial', industrialschema);