const { default: Friends } = require('../../client/src/pages/FriendsPage');
const Friend = require('../models/Friend');
const User = require('../models/User');

exports.sendFriendRequest = async (req,res) => {
    try{
        const {requester, recipient} = req.body;

        // check if requester and recipeient exist
        //const [userA, userB] = await 

        // create friend request 
        const friendRequest = await Friend.findOneAndUpdate(
            {requester,recipient},
            {$set: {status: 1}},
            {upsert: true, new: true}
        );
        const pendingRequest = await Friend.findOneAndUpdate(
            {requester: recipient, recipient:requester},
            {$set: {status: 2}},
            {upsert: true, new: true}
        );

        await User.findByIdAndUpdate(requester, { $push: { friends: friendRequestA._id }});
        await User.findByIdAndUpdate(requester, { $push: { friends: friendRequestA._id }});

        res.status(200).json({ message: 'Friend request sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.acceptFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        // Find and update the friend request to mark it as accepted (status: 3)
        const friendRequest = await Friend.findByIdAndUpdate(
            requestId,
            { $set: { status: 3 }},
            { new: true }
        );

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found.' });
        }

        res.status(200).json({ message: 'Friend request accepted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.declineFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        // Find and remove the friend request where status is 'pending' (status: 2)
        const friendRequest = await Friend.findByIdAndRemove(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found.' });
        }

        // Remove friend request ID from both users' friend lists
        await Promise.all([
            User.findByIdAndUpdate(friendRequest.requester, { $pull: { friends: requestId }}),
            User.findByIdAndUpdate(friendRequest.recipient, { $pull: { friends: requestId }})
        ]);

        res.status(200).json({ message: 'Friend request declined successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};