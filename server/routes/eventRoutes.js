const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();

// create a new event
router.post('/create-event', async (req, res) => {
    console.log("CREATE EVENT")
    try {
        //const { userId } = req.params;
        const {eventName, eventDescription, eventDate, eventStartTime, eventEndTime, eventLocation, eventType, eventInvitedFriends} = req.body;

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
            // eventUserId: userId,
            eventInvitedFriends
        });
        
        const newEvent = await event.save(); // save event
        // {user.events.push(newEvent._id);}
        // await user.save();

        res.status(201).send({ message: "Event created!" });
        console.log('New event:', newEvent);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Create Event failed!" });
    }
});

module.exports = router;