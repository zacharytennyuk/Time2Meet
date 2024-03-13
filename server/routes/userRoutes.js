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


        res.status(201).send({ message: "Account created!" });

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
            return res.status(401).send({message: "User does not exist!"});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(402).send({message: "Password does not match username!"});
        }

        const token = jsonWebToken.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '24h' });
        
        res.status(200).send({token});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error: could not login." });
    }
});

module.exports = router;