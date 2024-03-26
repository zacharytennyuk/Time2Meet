const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// create a new event
router.post('/create-event', async (req, res) => {
    
    // need to assign to calendar and User ID
    
    console.log("arrived at /create-event")
    try {

        const {eventName, eventType, eventLocation, eventDate, eventDescription} = req.body;

        // checks if username already exists in database
        const eventExists = await Event.findOne({eventName});
        if(eventExists){
            return res.status(400).send({message: "Event already exists."});
        }

        // mongo implementation
        const event = new Event({
            eventName,
            eventType,
            eventLocation,
            eventDate,
            eventDescription
        });

        const newEvent = await event.save(); // save event


        res.status(201).send({ message: "Event created!" });

        console.log('New event:', newEvent);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not create a new event." });
    }
});

module.exports = router;