const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
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

module.exports = router;