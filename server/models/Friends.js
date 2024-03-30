require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');


const friendSchema = new mongoose.Schema({
        userName: {type: String, required: true,},
        firstName: String,
       lastName: String,
     user: {type: mongoose.Schema.Types.ObjectId,ref:'User'} // Reference to the User's ObjectId 

});

const Friend  = mongoose.model('Friends', friendSchema);
 module.exports = Friend;  