require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');


const friendSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    friends: [{// friend array 
        userName: String,
        firstName: String,
        lastName: String,
        _id: mongoose.Schema.Types.ObjectId // Reference to the User's ObjectId 
    }]
});

const Friend  = mongoose.model('Friends', friendSchema);
 module.exports = Friend;  