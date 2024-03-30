require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const newUser = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true
    },
    password: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }] // Reference to Friend model

});

const User = mongoose.model('User', newUser);

module.exports = User;