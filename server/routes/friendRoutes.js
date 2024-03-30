const express = require("express");
const router = express.Router();
const Friend = require('../models/Friends');
const User = require('../models/User');

// Adding a friend by username 
router.post('/add-friends', async (req, res) => {
    try {
        const { userName, friendUserName,firstName, lastName } = req.body;

        const user = await Friend.findOne({ userName });
        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "User not found." });
        }

        // Check if friend already exists
        const existingFriend = user_friend.friends.find(friend => friend.userName === friendUserName);
        if (existingFriend) {
            console.log("user is already here.");
            return res.status(400).json({ message: "User is already a friend." });
        }

        // Create a new friend object matching the schema
        const newFriend = new Friend({
            userName: friendUserName,
            firstName,
            lastName,
            user: user._id
        });

        // Push the new friend into the friends array
        user.friends.push(newFriend);
        await user.save();

        console.log("Friend added successfully.");
        res.status(200).json({ message: "Friend added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not add friend." });
    }
});




// search friend by username
router.get('/friends/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const friend = await Friend.findOne({ 'friends.userName': username }, { 'friends.$': 1 });
        if (!friend) {
            return res.status(404).json({ message: "Friend not found." });
        }

        res.status(200).json({ friend });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

//  async function getFriend(req, res, next){
// try{
//     friend =await Friends.findById(req.params.id)
//     if(friend == null){
//         return res.status(404).json({message: 'Friend cannot be found'})
//     }
// }catch(error){
//     return res.status(500).json({message: err.message})
// }
// next()
//  }

module.exports =router;