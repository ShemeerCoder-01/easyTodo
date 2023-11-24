const Joi = require('joi');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signUpFunc = async (req, res) => {
    const { userName, email, password } = req.body;
    const isValid = Joi.object({
        userName: Joi.string().min(4).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(16).required()
    }).validate({ userName, email, password });

    if (isValid.error) {
        return res.status(400).send({
            status: "400",
            Error: isValid.error
        });
    }
    const hashedPassword = await bcrypt.hash(password, JSON.parse(process.env.SALT_ROUNDS));
    const userObj = new User({
        userName,
        email,
        password: hashedPassword
    });
    await userObj.save();
    res.status(201).send({
        status: "201",
        message: "User is successfully signed up."
    });
};


const loginFunc = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    const isValid = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).validate({ email, password });
    if (isValid.error) {
        return res.status(404).send({
            status: "404",
            Error: isValid.error
        });
    }

    try {
        const userObj = await User.findOne({ email: email });
        const isMatched = bcrypt.compare(password, userObj.password);

        if (isMatched) {
           const user = await jwt.sign({username:userObj.userName, userEmail:userObj.email}, process.env.SECRET_KEY,{expiresIn:'1h'});
           console.log(user);
           res.status(200).send(user);
        }

    } catch (e) {
        res.status(403).send({
            status: "403",
            message: "User is not authorized. Please check your credentials.",
            Error: e
        });
    }

};


module.exports ={signUpFunc,loginFunc};