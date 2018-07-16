const express = require("express");
const bcrypt = require("bcrypt");
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const router = express.Router();

//Creates a new user
router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(() => {
            res.status(201).json({
                message: "User successfully created"
            });
        }).catch((error) => {
            res.status(500).json({
                error:error
            });
        });;
    });
});

//logins the user: check for user existance in database, compares password to 
//hashed password, returns json web token if all successfull
router.post("/login", (req, res, next) => {
    User.find({email: req.body.email}).then((users)=>{
        if (!users[0]){
            return res.status(401).json({
                message: 'User does not exist'
            });
        }
        bcrypt.compare(req.body.password, users[0].password).then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: 'Wrong password'
                });
            }
            // if user and password match, return JWT
            const token = jwt.sign(
                { email: users[0].email, userId: users[0]._id },
                "secret",
                { expiresIn: "1hr"}
            ); 
            // return token and expiration time in seconds
            res.status(200).json({
                token: token,
                expiresIn: 3600
            });
        });
    })
})

module.exports = router;