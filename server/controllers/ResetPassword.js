const User = require('../models/User');
const mailSender = require('../utils/mailsender');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
    try{
            //get email from req body
        const email = req.body.email;

        //check user for this email, emial validation
        const user = await User.findOne({email:email});
        if(!user) {
            return res.json({
                success:false,
                message:"Your email is not registered"
            })
        }

        //genarate a token
        const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate(
            {email:email}, 
            {
                token:token,
                resetPasswordExpires:Date.now() + 3600000,
            },
            {new:true});

        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        // send mail containing url
        await mailSender(email,"Password reset link", `password reset link ${url}`);

        return res.json({
            success:true,
            message:"Email sent successfully for reset password",
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Somthing went wrong while reseting password"
        })
    }
}

// resetPassword

exports.resetPassword = async(req,res) => {
    try{
        //data fetch 
        const {password,confirmPassword,token} = req.body;

        //validation 
        if(password !== confirmPassword) {
            return res.json({
                success:false,
                message:"Password not matched"
            })
        }

        //get userDetails from db using token
        const userDetails = await User.findOne({token:token});

        if(!userDetails) {
            return res.json({
                success:false,
                message:"Token is invalid"
            });
        }

        //token time check
        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success:false,
                message:"token is expired"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message:"password reset successfully",
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in reset password"
        })
    }
}