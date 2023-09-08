import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
  fname: {
    type: "String",
    trim: true,
    required: true
    },
  lname: { 
    type: "String", 
    trim: true, 
    required: true 
    },
  email: { 
    type: "String", 
    trim: true, 
    required: true,
    unique: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Errow("Enter valid email")
        }
    }
    },
    mobile: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    datecreated: {
        type: Date
    },
    dateupdated: {
        type: Date
    }
});

const userModel = new userSchema("users",userSchema);

export default userModel
