const Joi = require('joi');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

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
            req.session.regenerate((err)=>{
                if(err){
                    res.status(500).send({
                        message:"Internal serveer error",
                        Error:err
                    })
                }
                req.session.isAuth = true;
                req.session.user = {
                    userName: userObj.userName,
                    email: userObj.email,
                    user_id: userObj._id,
                };
                req.session.save((err) => {
                    if (err) {
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    res.status(200).send({
                        message: 'User is successfully logged in',
                        session_id: req.sessionID,
                        Cookie:req.Headers
                    });
                    
                });

            })
            
        }

    } catch (e) {
        res.status(403).send({
            status: "403",
            message: "User is not authorized. Please check your credentials.",
            Error: e
        });
    }

};

const logoutFunc = async(req, res) => {

    try{
        await req.session.destroy();
        res.status(200).send({
            status:"200",
            message:"User is successfully logged out"
        });

    }catch(e){
        res.status(500).send({
            status:"500",
            Error:e
        });
    }
}

module.exports ={signUpFunc,loginFunc,logoutFunc};