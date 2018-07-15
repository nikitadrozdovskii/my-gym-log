const express = require("express");
const bcrypt = require("bcrypt");
const User = require('../models/user');


const router = express.Router();

router.post("/signup", (req, res, next) => {
    console.log(req.body.password);
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

module.exports = router;