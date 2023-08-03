const user = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailsender");
const { passwordUpdated } = require("../mail/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();

//send otp
exports.sendOTP = async(req,res) => {
    try {
        
        // fetch email from request ki body
        const {email} = req.body;

        //check user exist or not
        const userExist = await user.findOne({email});

        //if user already exist
        if(userExist) {
            return res.status(401).json({
                success:false,
                message:"User already exist"
            })
        }

        //generate otp
        var otp = otpgenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        // check unique otp or not
        const result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpgenerator(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
    
            // check unique otp or not
            const result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email,otp};

        // create an entry for an otp \
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);


        res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })

    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Error sending OTP"
        });
        console.log("error while sending otp", error);
    }
}

//sign up
exports.signUp = async(req,res) => {

    try{
            //data fetch
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
            phoneNumber
        } = req.body;

        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !phoneNumber) {
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check user already exist or not
        const existingUser = await user.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }

        // find most recent otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recent OTP : ", recentOtp);

        //validation otp
        if(recentOtp.length === 0) {
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10); 

        //entry create in db

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        const User = await user.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            phoneNumber:phoneNumber,
            accountType: accountType,
            approved: true,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName}${lastName}`,
        })

        //return res
        return res.status(200).json({
            success:true,
            message:"user is registered successfully"
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. please try again"
        })
    }

}

//login

exports.login = async(req,res) => {
    try {
        //get data from req body
        const {email,password} = req.body; 

        // validation data
        if(!email || !password) {
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }

        //user check exist or not
        const User = await user.findOne({email}).populate("additionalDetails");
        if(!User) {
            return res.status(401).json({
                success:false,
                message:"User does not exist, please sign up first"
            })
        }

        //generate JWT,after password matching
        if(await bcrypt.compare(password, User.password)) {
            const payload = {
                email:User.email,
                id:User._id,
                accountType:User.accountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"24h",
            });
            User.token = token;
            User.password = undefined;

            // create cookie and send response
            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                User,
                message:"Logged in successfully"
            })
        }

        else{
            res.status(401).json({
                success:false,
                message:"Password is not match"
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure, plese try again"
        });

    }
}

// change password
exports.changePassword = async(req,res) => {
    try{
        //get user details
        console.log("into changePassword");
        const userDetails = await user.findById(req.user.id);

        //get oldpassword, newPassword , confirmPassword
        console.log("before fetching data");
        const {oldPassword,newPassword,confirmPassword} = req.body;
        console.log("after fetching data");

        //validation
        const isMatch = await bcrypt.compare(oldPassword,userDetails.password)

        if(!isMatch) {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        if(newPassword !== confirmPassword) {
            return res.json({
                success:false,
                message:"Password not match"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        //update pwd in db
        const updateData = await user.findByIdAndUpdate(req.user.id,
            {password:hashedPassword},
            {new:true},    
        )

        //send mail - Password updated
        try{

            const emailResponse = await mailSender(userDetails.email,
                passwordUpdated(userDetails.email,
                    `password update successfully for ${userDetails.firstName} ${userDetails.lastName}`)
            );
            console.log("email send successfully",emailResponse);

        } catch(error) {
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"reset password done"
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"error while reset password",
            error: error.message,
        })
    }
}