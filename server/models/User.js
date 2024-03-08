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
    password: String
});

const User = mongoose.model('User', newUser);

module.exports = User;