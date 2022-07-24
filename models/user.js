//import mongoose from "mongoose";
const mongoose = require("mongoose");
var { Schema } = mongoose;
//const { createHmac } = await import("node:crypto");
const crypto = require("crypto");
//import { v4 as uuidv4 } from "uuid";

//const { uuid } = require("uuidv4");
const { v4: uuidv4 } = require("uuid");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true
  },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },

    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases:{
        type: Array,
        default: []
    }
},
    {timestamps: true}
);

userSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })

userSchema.methods = {

    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);






