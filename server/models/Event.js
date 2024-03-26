require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const newEvent = new mongoose.Schema({
  name: String,
  type: String,
  start: Date,
  end: Date,
  location: String,
  calendarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendar'
  }
});

const Event = mongoose.model('Event', newEvent);

module.exports = Event;