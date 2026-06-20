import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true,
    unique:true
  },

  username:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  otp:{
    type:String,
    default:null
  },

  expiryOtp:{
    type:Date,
    default:null
  },
  role:{

type:String,

enum:["user","admin"],

default:"user"

}
});

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    userSchema
  );

export default User;