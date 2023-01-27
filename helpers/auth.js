const modelName = require("../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({path: '../config/config.env'});

const checkSignUp = async(req,res,next)=>{
    try {
        const userId = req.params.userId
        const theUser = await modelName.findById(userId);
        const authToken = theUser.token;
        if(!authToken){
            res.status(400).json({
                Message:"Not authorized"
            })
        }else{
            await jwt.verify(authToken, process.env.JWTSCRET, (err,payLoad)=>{
                if(err){
                    res.status(400).json({
                        Message:err.message
                    })
                }else{
                    req.user = payLoad
                    next()
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            Message:error.Message
        })
    }
};

const authUser = (req,res,next)=>{
    checkSignUp(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(400).json({
                Message:"Sorry you are Not authorized"
            })
        }
    })
};

module.exports = authUser;