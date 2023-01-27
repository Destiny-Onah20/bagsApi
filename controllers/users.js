const modelName = require("../models/users");
const dotenv = require('dotenv');
dotenv.config({path: '../config/config.env'})
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../helpers/email")

exports.signUp = async(req,res)=>{
    try {
        const {fullName, email, password} = req.body;
        const saltPwd = await bcrypt.genSalt(10);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const dataCreate = {
            fullName,
            email,
            password: hassPwd
        };
            const createUser = new modelName(dataCreate);
            const genToken = await jwt.sign({
                id: createUser._id,
                password: createUser.password,
                isAdmin: createUser.isAdmin
            }, process.env.JWTSCRET, {
                expiresIn: "1d"
            });
            createUser.token = genToken;
            await createUser.save();

            const verifyUser = `${req.protocol}://${req.get("host")}/api/verifyUser/${createUser._id}`;
            const message = `Thanks for signing up with us, kindly verify your account with this link ${verifyUser}`
            mailSender({
                email: createUser.email,
                subject: "kindly verify",
                message
            })
        
            res.status(201).json({
                data: createUser
            })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.logIn = async(req,res)=>{
    try {
        const { email, password} = req.body;
        const checkEmail = await modelName.findOne({email: email});
        if(!checkEmail){
            res.status(404).json({
                message: "Email or password is not correct"
            })
        }else{
            const checkPwd = await bcrypt.compare(password, checkEmail.password);
            if(!checkPwd){
                res.status(404).json({
                    message: "Email or password is not correct"
                })
            }else{
                 const genToken = await jwt.sign({
                id: checkEmail._id,
                password: checkEmail.password,
                isAdmin: checkEmail.isAdmin
            }, process.env.JWTSCRET, {
                expiresIn: "1d"
            });
            checkEmail.token = genToken;
            await checkEmail.save();
            res.status(201).json({
                data: checkEmail
            })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.verifyUser = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const users = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(users._id, {
            verify: true
        }, {
            new: true 
        });
        res.status(200).json({
            message: 'You are now verified'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.forgot = async(req,res)=>{
    try {
        const {email} = req.body;
        const checkEmail = await modelName.findOne({email: email})
        if(!checkEmail){
            res.status(404).json({
                message: "This email is not correct..."
            })
        }else{
        const genToken = await jwt.sign({
                id: checkEmail._id,
                isAdmin: checkEmail.isAdmin
            }, process.env.JWTSCRET, {
                expiresIn: "1d"
        });
         const sendResetLink = `${req.protocol}://${req.get("host")}/api/password/${checkEmail._id}/${genToken}`
        const message = `please click on this link ${sendResetLink} to reset your password`
        mailSender({
            email: checkEmail.email,
            subject: "Reset password",
            message
        })
        res.status(200).json({
            message: "Please check your email for confirmation.."
        })
        }
       
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.confirm = async(req,res)=>{
    try {
        const {password} = req.body;
        const userId = req.params.userId;
        const saltPwd = await bcrypt.genSalt(10);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const users = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(users._id,{
            password: hassPwd
        },
        {
            new: true
        } )
        res.send("Successfully changed...")
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};