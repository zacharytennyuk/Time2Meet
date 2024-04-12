const express = require("express");
const router = express.Router();
const Friend = require('../models/Friends');
const User = require('../models/User');

// Adding a friend by username 
router.post('/add-friends', async (req, res) => {
    console.log("your are at add-friends")
    try {
        const {userName} = req.body;
        console.log("Request Body:", req.body);

        console.log("user: " + userName)

        const user = await User.findOne({userName});
        console.log("user: " + user)

        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "User not found." });
        }

        // Check if friend already exists
            console.log(user.friends);
        const friendExist = user.friends.length > 0;
            // Check if the friends array has at least one element
        
        if (friendExist ) {
            console.log("User is already a friend.");
            return res.status(400).json({ message: "User is already a friend." });
        } else {
            console.log("User is not a friend.");
            // Proceed with adding the friend
        }
        

        // Create a new friend object matching the schema
        const newFriend = new Friend({
            userName,
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

module.exports =router;

// accept friends request 
router.patch('/accept-friends', async(req,res)=> {
    try{
        const {userName} =req.body;
        const friendUserName = req.params.friendUserName;

        const user = await User.findOne({userName});
        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "User not found." });
        }
        
        console.log(" Friend Request Accepted");
        res.status(200).json({message:"Friend Request Accepted" }); 

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Could not accept friend request"});
    }
});

// decline friend request
router.patch('/decline-request', async(req,res)=>{
try{
    const {userName} =req.body;
    const friendUserName = req.params.friendUserName;

    const user = await User.findOne({userName});
    if (!user) {
        console.log("user not found");
        return res.status(404).json({ message: "User not found." });
    }
    const friendIndex = user.friendRequests.findIndex(request => request.friendUserName === friendUserName);
    if (friendIndex === -1){
        console.log("Friend request no found ");
        return res.status(404).json({message: " Friend Request not found"});
    }

    //remove friends request 
    user.friendRequest.splice(friendIndex,1);
    await user.save();

    console.log("Friend request declined")
    res.status(200).json({message:"Friend request declined" }); 

}catch(error){
    console.error(error);
    res.status(500).json({message: "Could not decline friend request"});
    }
});

// display all friends 
router.get('/display-friends', async (req, res) => {
    try {
        const { userName, firstName,lastName } = req.body;

        console.log("user: " + userName)
        console.log("lastname: " + lastName)
        console.log("firstName: " + firstName)


        const user = await User.findOne({ userName });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found." });
        }

        const friendsList = await Friend.find({ _id: {$in: user.friends} })

        const friendDetail = friendsList.map(friends => ({
            firstName: user.friends.firstName,
            lastName: user.friends.lastName
        }));

        res.status(200).json({ message: "Friends are all displayed", friendsList });
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;