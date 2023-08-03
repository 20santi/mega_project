const express = require("express");
const router = express.Router();

const {auth, isInstructor} = require("../middlewares/auth");
const {updateProfile, deleteAccount, getAllUserDetails, updateDisplyPicture, 
    getEnrolledCourses,
    instructorDashboard} = require("../controllers/Profile");

router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth, getAllUserDetails);
router.put("/updateDisplayPicture",auth, updateDisplyPicture);
router.get("/getEnrolledCourses",auth, getEnrolledCourses);
router.get("/instructorDashboard",auth, isInstructor, instructorDashboard);

module.exports = router;