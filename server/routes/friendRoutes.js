const express = require("express");
const router = express.Router();
const Friends = require('../models/Friends');

//adding by username 
router.post('/friends',async(req,res) =>{
  console.log("we are adding a friends")
  const {userName} = req.params;
  const{firstName,lastName} =req.body;
    try{
        const user = await Friend.findOne({ userName: username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if friend already exists
        const existingFriend = user.friends.find(friend => friend.userName === username);
        if (existingFriend) {
            return res.status(400).json({ message: "User is already a friend." });
        }
        user.friends.push({ userName: username, firstName, lastName });
        await user.save();

        res.status(200).json({ message: "Friend added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }

});
// search friend by username
router.get('/friends', async (req, res) => {
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

 async function getFriend(req, res, next){
try{
    friend =await Friends.findById(req.params.id)
    if(friend == null){
        return res.status(404).json({message: 'Friend cannot be found'})
    }
}catch(error){
    return res.status(500).json({message: err.message})
}
next()
 }

module.exports =router;