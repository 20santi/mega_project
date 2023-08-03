const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImage} = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { converSecToDuration } = require("../utils/secToDuration");

//createCourse handeler function
exports.createCourse = async(req,res) => {
    try{
        //fetch data
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions
        } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !tag.length ||
            !instructions.length || 
            !price || 
            !category ||
            !thumbnail) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if (!status || status === undefined) {
            status = "Draft"
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType:"Instructor"
        });
        console.log("Instructor details ->",instructorDetails);

        if(!instructorDetails) {
            return res.status(400).json({
                success:false,
                message:"Instructor Details not found"
            })
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"category details not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImage(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new post
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions,
        })

        //add new course to the user schema of instructor
        await User.findByIdAndUpdate({_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
            );

        // Add the new course to the Categories
		const categoryDetails2 = await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
        console.log("category details after backend : ", categoryDetails2);

        return res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newCourse
        })
        
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"failed to create course",
            error:error.message,
        })
    }
}

exports.editCourse = async(req, res) => {
    try{
        const {courseId} = req.body;
        const update = req.body;
        const course = await Course.findById(courseId);
        
        if(!course) {
            return res.status(404).json({
                success:false,
                message:"Course not found",
            })
        }

        if(req.files) {
            const thumbnail = req.files.thumbnailImage;
            const newImage = await uploadImage(thumbnail, process.env.FOLDER_NAME);
            course.thumbnailImage = newImage.secure_url;
        }
        for(const key in update) {
            if(update.hasOwnProperty(key)) {
                if(key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(update[key])
                }
                else{
                    course[key] = update[key]
                }
            }
        }
        await course.save();

        const newCourse = await Course.findOne({_id:courseId})
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec()
        res.json({
            success: true,
            message: "Course updated successfully",
            data: newCourse,
          })

    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Error in Course controllers",
          error: error.message,
        })
      }
}

// get all courses
exports.showAllCourses = async (req,res) => {
    try {
        const allCourses = await Course.find({}, {courseName:true,
                                            price:true,
                                            thumbnail:true,
                                            instructor:true,
                                            ratingAndReviews:true,
                                            studentsenrolled:true}).populate("instructor").exit();

        return res.status(200).json({
            success:false,
            message:"fetch course's data successfully"
        })
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"failed to fetch course data",
            error:error.message,
        })
    }
}

//getcourseDetails
exports.getCourseDetails = async(req,res) => {
    try{

        //get id
        const {courseId} = req.body;

        //find course Details
        const courseDetails = await Course.find(
            {_id:courseId}
        ).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails"
                },
            }
        )
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        })
        .exec();

        //validation
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`could not find the course with ${courseId}`,
            })
        }

        return res.status(200).json({
            success:true,
            message:"course details find successfully",
            courseDetails,
        })


    } catch(error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getFullCourseDetails = async(req, res) => {
    try {
        const {courseId} = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
            _id:courseId
        }).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        }).populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()
        let courseProgressCount = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })
        console.log("courseProgressCount : ", courseProgressCount)

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = converSecToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                ? courseProgressCount?.completedVideos
                : [],
            },
        })
    } catch (error) {
        console.log("error in fullDetailsOfCourses function in controlers: ", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getInstructorCourses = async(req, res) => {
    try {
        const instructorId = req.user.id;

        const courses = await Course.find({instructor:instructorId}).sort({createdAt:-1});
        return res.status(200).json({
            success:true,
            message:"courses fetch successfully.",
            data:courses,
        })

    } catch(error){
        console.log("error in getInstructorCourses of course controler");
        return res.status(200).json({
            success:false,
            message:"could not fetch instructor courses",
            error:error.message,
        })
    }
}

exports.deleteCourse = async(req, res) => {
    try {
        const {courseId} = req.body;

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }

        //unenroll students from courses
        for(const studentId of course.studentEnrolled) {
            await User.findByIdAndUpdate({_id:studentId}, {
                $pull: { courses:courseId }
            })
        }

        //delete section and subsection
        for(const sectionId of course.courseContent) {
            const section = await Section.findById(sectionId);
            if(section) {
                for(const subsectionId of section.subSection) {
                    await SubSection.findByIdAndDelete({_id:subsectionId})
                }
            }
            //delete section
            await Section.findByIdAndDelete(sectionId)
        }

        //delete course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course Deleted successfully"
        })

    } catch(error) {
        console.log("error while deleteing course: ", error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}