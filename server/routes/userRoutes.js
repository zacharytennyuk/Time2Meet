const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jsonWebToken = require('jsonwebtoken');
const router = express.Router();

// create a new user account
router.post('/create-account', async (req, res) => {
    console.log("arrived at /create-account")
    try {

        const {firstName, lastName, userName, password} = req.body;

        // checks if username already exists in database
        const userExists = await User.findOne({userName});
        if(userExists){
            return res.status(400).send({message: "Please choose a different username."});
        }

        // encrypt password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword =  await bcrypt.hash(password, salt);
     
        // mongo implementation
        const user = new User({
            firstName,
            lastName,
            userName,
            password: hashedPassword,
        });

        const newUser = await user.save(); // save user
        
        const token = jsonWebToken.sign({ userId: newUser._id }, process.env.JWT_KEY, { expiresIn: '24h' });
        console.log(token);
        const id = getId(token);
        console.log(getId(token));
        res.status(201).send({ message: "Account created!", token, id });

        console.log('New user:', newUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not create a new account." });
    }
});

// user login to application
router.post('/login', async (req, res) => {
    console.log("arrived at /login route")
    try {

        const {firstName, lastName, userName, password} = req.body;

        // checks if username exists in database and if password matches username
        const user = await User.findOne({userName});
        if(!user){
            return res.status(401).send({message: 'Username or password is incorrect.'});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).send({message: 'Username or password is incorrect.'});
        }

        const token = jsonWebToken.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '24h' });
        console.log(token);
        const id = getId(token);
        console.log(getId(token));
        res.status(200).send({ message: "Account created!", token, id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error: could not login." });
    }
});

router.get('/read-events', async (req, res) => {
    console.log("arrived at /read-events)
    try {
        const user = await User.findById(req.body.eventUser);
        if(!user){
            return res.status(401).send({message: 'User id did not work.'});
        }
        res.status(200).send(user.events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error: could not display events." });
    }
});

function getId(token) {
    try {
        const cracked = jsonWebToken.verify(token, process.env.JWT_KEY);
        return cracked.userId;  
    } catch (error) {
        console.error("Bad token:", error);
        return null;  
    }
}

module.exports = router;