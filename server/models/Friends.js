require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');


const friendSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    friendsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    friendArr:[String],
    //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'} // Reference to the User's ObjectId 

    // friends list 
//     requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
//     recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
//     status: {
//       type: Number,
//       enums: [
//           0,    //'add friend',
//           1,    //'requested',
//           2,    //'pending',
//           3,    //'friends'
//       ]
//     }
   }, {timestamps: true});

const Friend  = mongoose.model('Friend', friendSchema);
 module.exports = Friend;  