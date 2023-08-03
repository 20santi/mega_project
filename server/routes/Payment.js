const express = require("express");
const router = express.Router();

const {auth,isStudent} = require("../middlewares/auth");
const {capturePayment, verifySignature, sendPaymentSuccessEmail} = require("../controllers/Payment");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifySignature);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;