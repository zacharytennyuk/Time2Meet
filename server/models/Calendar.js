require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const newCalendar = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const Calendar = mongoose.model('Calendar', newCalendar);

module.exports = Calendar;