const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();
const jsonWebToken = require('jsonwebtoken');

// create a new event
router.post('/create-event', checkToken, async (req, res) => {
    console.log("CREATE EVENT")
    try {
        console.log(req.body.eventInvitedFriends);
        //const { userId } = req.params;
        const {eventName, eventDescription, eventDate, eventStartTime, eventEndTime, eventLocation, eventType, eventUser, eventInvitedFriends} = req.body;

        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).send({ message: "User not found." });
        // }

        // checks if event already exists in database
        const eventExists = await Event.findOne({eventName});
        if(eventExists){
            return res.status(400).send({message: "Event already exists."});
        }

        // mongo implementation
        const event = new Event({
            eventName,
            eventDescription,
            eventDate,
            eventStartTime,
            eventEndTime,
            eventLocation,
            eventType,
            eventUser,
            eventInvitedFriends,
        });


        
        const newEvent = await event.save(); // save event
        // {user.events.push(newEvent._id);}
        // await user.save();

        res.status(201).send({ message: "Event created successfully!"});

        console.log('New event:', newEvent);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Create Event failed!" });
    }

});

function checkToken(req, res, next) {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log("checking token");
        jsonWebToken.verify(req.token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.userId = decoded.id;
                next();
            }
        });        
    } else {
        res.sendStatus(403);
    }
}


module.exports = router;