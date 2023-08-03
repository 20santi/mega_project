const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImage } = require("../utils/imageUploader");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

exports.updateProfile = async (req,res) => {
    try{

        // get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // get userId
        const id = req.user.id;

        //validation
        if(!contactNumber || !gender) {
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            });
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile Upload successfuly"
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"error during Profile Upload",
            error:error.message
        })
    }
}

// delete account
exports.deleteAccount = async (req,res) => {
    try{

        // get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //HW : unenroll user from all enrolled courses
        for(let i=0; i<userDetails.courses.length; i++) {
            await Course.findByIdAndUpdate({_id:userDetails.courses[i]},
                {
                    $pull:{
                        studentEnrolled:userDetails._id
                    }
                }
            )
        }

        //hw: what is crone job
        //hw: how can we schedule this deletion oparation

        // delete user
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"user can not be delete"
        })
    }
}

exports.getAllUserDetails = async (req,res) => {
    try{

        const id = req.user.id;

        //get user details
        const user = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"User data fetch successfully",
            user
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateDisplyPicture = async(req,res) => {
    try {
        console.log('req.file -> ', req.file);
        const image = req.files.displayPicture;
        console.log('after fetching file from request body');
        const userId = req.user.id;
        console.log("user id -> ", userId);

        if(!image) {
            return res.json({
                success:false,
                message:"Please select a profile picture"
            })
        }
        console.log("user id -> ", userId);
        const uploadedProfile = await uploadImage(image, process.env.FOLDER_NAME,1000,1000);
        console.log("Profile image: ", uploadedProfile);

        //update user image
        const updateUserProfile = await User.findByIdAndUpdate({_id:userId},
            {image: uploadedProfile.secure_url},{new: true}    
        )
        console.log(updateUserProfile);

        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updateUserProfile,
          })
          

    } catch(error) {
        res.send({
            success: false,
            message: `error while Image Updated`
          })
    }
}

exports.getEnrolledCourses = async(req,res) => {
    try {

        const userId = req.user.id;
        const userDetails = await User.findOne({_id:userId})
        .populate({
            path: "courses",
            populate: {
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            },
          })
        .exec();

        // for (var i = 0; i < userDetails.courses.length; i++) {
        //     for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        //         let totalDurationOfVideo = 0;
        //         totalDurationOfVideo += userDetails.courses[i].courseContent[j].
        //         subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
        //         userDetails.courses[i].totalDuration = totalDurationOfVideo;
        //         console.log(`totalduration of Course[${i}]-------------------> `, totalDuration);
        //     }
        //   }          

        if(!userDetails) {
            return res.status(500).json({
                success:false,
                message:"user does not exist"
            })
        }

        return res.status(200).json({
            success:true,
            message:"get enrolled courses succesfully",
            data:userDetails.courses
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"error while fetching enrolled courses"
        })
    }
}

exports.instructorDashboard = async(req,res) => {
    try {
        const courseDetails = await Course.find({instructor:req.user.id});
        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmount = totalStudentsEnrolled * course.price;

            //create an new object with the additionsl fields
            const coursesData = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmount
            }
            return coursesData;
        })
        res.status(200).json({
            success:true,
            courseData:courseData
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message:"error in instructorDashboard controller"
        })
    }
}