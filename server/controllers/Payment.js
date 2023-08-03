const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const {courseEnrollmentEmail} = require("../mail/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

//initiate the razor pay for multiple items
exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({
            success:false,
            message:"Please provide Course ID"
        })
    }

    let totalAmount = 0;
    for(const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({
                    success:false,
                    message:"Course not found"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled that's why can not buy the course"
                })
            }
            totalAmount += course.price;

        } catch(error) {
            console.log("error durning payment: ", error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }


    const options = {
        amount: totalAmount * 100,
        currency:"INR",
        receipt: Math.random(Date.now().toString())
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"COuld not initiate order"
        })
    }
}

//verify payment
exports.verifySignature = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success:false,
            message:"Payment failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
    
    if(expectedSignature === razorpay_signature) {
        //enrolled student
        enrolleStudents(courses, userId, res);

        return res.status(200).json({
            success:true,
            message:"payment verified"
        })
    }
    return res.status(500).json({
        success:false,
        message:"Payment failed"
    })
}

const enrolleStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({
            success:false,
            message:"Please provide data for courses or userId"
        })
    }
    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true},
            )

            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos: []
            })

            //find the student and add the course to their list of enrolledCourses
            const enrolledStudent = await User.findByIdAndUpdate(userId, 
                {$push:{
                    courses: courseId,
                    courseProgress:courseProgress._id,
                }},{new:true})

            //mail sent 
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )

        }
        catch(error) {
            console.log("error in payment controler: ", error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}

exports.sendPaymentSuccessEmail =  async(req,res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount) {
        return res.status(400).json({
            success:false,
            message:"please provide all the fields"
        })
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, 
            amount/100, orderId, paymentId)
        )
    } catch(error) {
        console.log("error while payment sending mail: ", error);
        return res.status(500).json({
            success:false,
            message:"Could not send email"
        })
    }
}

// // capture the payment and initiate the razorpay order
// exports.capturePayment = async(req,res) => {

//     //get courseId and userId
//     const {course_id} = req.body;
//     const userId = req.user.id;

//     //valid courseId
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:"please provide valid courseid"
//         })
//     }
    
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:"could not find course"
//             }) 
//         }

//         //user already pay for the same course

//         //convert string type in objectId
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:"Student already enrolled in this course"
//             })
//         }
//     } catch(error) {
//         console.error(error)
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }

//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount*100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId
//         }
//     };

//     try{
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })

//     } catch (error){
//         console.log(error);
//         res.json({
//             success:true,
//             message:"could not initiate order"
//         })
//     }
// }

// //verify signature of Razorpay and server

// exports.verifySignature = async (req,res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers("x-razorpay-signature");

//     const shasum = crypto.createHmap("sha256", webhookSecret);
//     shasum.update(json.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("payment is authorized");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{

//             //find the course and enroll the student in this course
//             const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
//                                                                 {$push:{studentEnrolled:userId}},
//                                                                 {new:true});

//             if(!enrolledCourse) {
//                 return res.status(500).json({
//                     success:false,
//                     message:"course not found"
//                 })
//             }

//             console.log(enrolledCourse);

//             //find the student and add the course to their enrolled course list
//             const enrolledStudent = await User.findOneAndUpdate({_id:userId},
//                                                                 {$push:{courses:courseId}},
//                                                                 {new:true});

//             console.log(enrolledStudent);

//             //mail send 
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "congratulation",
//                 "you are added into the course"
//             );

//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"signature verified and course added"
//             });

//         } catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request",
//         });
//     }
// }