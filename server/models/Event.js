require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const newEvent = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: false },
  eventDate: { type: Date, required: true },
  eventStartTime: { type: String, required: true },
  eventEndTime: { type: String, required: true },
  eventLocation: { type: String, required: false },
  eventType: { type: String, required: true, enum: ['Personal', 'School', 'Work'] },
  // eventUserId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  eventInvitedFriends: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: false 
  }],
  
});

module.exports = mongoose.model('Event', newEvent);