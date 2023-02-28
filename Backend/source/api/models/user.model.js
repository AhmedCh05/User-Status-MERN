const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: {type:String,require:true},
    lname: {type:String,require:true},
    email : {type:String,require:true,unique:true},
    password:{type:String,require:true},
    DOB : {type:Date,require:true},
    Gender : {type:String, enum:["None","Male","Female"] , default:"None"},
    Occupation : {type:String,require:true},
    Bio : {type:String,require:true,default:"None"},
    ProfilePicture : {type:String,default:"None"},
    lastActive :{type:String},
    Status:{type:String, enum:["Active","Disabled"] , default:"Disabled"},
});

const User = mongoose.model('User',UserSchema);

module.exports =  User;