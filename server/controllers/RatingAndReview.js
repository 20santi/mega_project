const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

//create rating
exports.createRating = async(req,res) => {
    try{
        //get user id
        const userId = req.user.id;

        //fetch data from req
        const {rating, review, courseId} = req.body;

        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
            studentEnrolled: {$elemMatch: {$eq: userId}}}
        );

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:"student is not enrolled"
            })
        }

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })

        if(alreadyReviewed) {
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by this user"
            })
        };

        //create rating and review
        const ratingAndReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        })

        //update course 
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingAndReview._id,
                }
            },{new:true});

        console.log(updatedCourseDetails);

            return res.status(200).json({
                success:true,
                message:"rating and review created successfully",
                ratingAndReview
            })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get average rating
exports.getAverageRating = async(req,res) => {
    try{

        // get course id
        const courseId = req.body.courseId;

        //calculate avarage rating
        const result = await RatingAndReview.aggregate([
            {
                $push:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg:"$rating"},
                }
            }
        ])

        //return rating
        if(result.length>0) {
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        //if no rating and review exist
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, no ratings given till now"
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//get all rating
exports.getAllRating = async (req,res) => {
    try{

        const allReviews = await RatingAndReview.find({})
                                                        .sort({rating:"desc"})
                                                        .populate({
                                                            path:"user",
                                                            select:"firstName lastName email image",
                                                        })
                                                        .populate({
                                                            path:"course",
                                                            select:"courseName"
                                                        })
                                                        .exec();
    
    return res.status(200).json({
        success:true,
        message:"All reviews fetched successfully",
        data:allReviews
    })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}