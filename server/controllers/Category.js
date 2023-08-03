const { default: mongoose, Mongoose } = require("mongoose");
const Category = require("../models/Category");
const Course = require("../models/Course");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

// handeler function for create Category
exports.createCategory = async (req,res) => {
    try {
        const {name,description} = req.body;

        if(!name || ! description) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log("category details: " + categoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

// getAllCategoryhandler function

exports.showAllCategory = async(req,res) => {
    try {
        const allCategory = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            data:allCategory,
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
} 

exports.categoryPageDetails = async(req,res) => {
    try{

        //get category id
        const {categoryId} = req.body;

        //get courses for specified category id
        const selectCategory = await Category.findById(categoryId)
            .populate({
                path:"courses",
                match: { status: "Published" },
                populate: "ratingAndReviews"
            })
            .exec();

        //validation
        if(!selectCategory) {
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        } 

        if(selectCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(500).json({
                success: false,
                message:"Courses not found in this category",
            })
        }

        //get courses for different categories
        const categoriesExceptSelected = await Category.find({
            _id:{$ne:categoryId},
        })
        
        const differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
        .populate({
            path:"courses",
            match: { status: "Published" },
            populate:{
                path:"instructor"
            }
        })
        .exec();

        //get top selling courses
        let mostSellingCourses = null;
        try{
            const allCourses = await Course.find({status:"Published"}).exec();
            mostSellingCourses = 
            allCourses.sort((a, b) => b.studentEnrolled.length - a.studentEnrolled.length);

        } catch(error) {
            console.log("error while fetching all Courses in Category controller, ",error);
            return res.status(500).json({
                success:false,
                message:"Could not fetch all courses"
            })
        }

        //return
        return res.status(200).json({
            success:true,
            data:{
                selectCategory,
                differentCategory,
                mostSellingCourses
            }
        })

    } catch(error) {
        console.log("error while fetching categoryPageData in Category controller: " ,error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}