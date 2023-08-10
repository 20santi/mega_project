const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender");
const emailTemplate = require("../mail/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

// function to send mail
async function sendOTP(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "verification email",
      emailTemplate(otp)
    );
    console.log("email send successfully: ", mailResponse);
  } catch (error) {
    console.log("error ocured while sending otp", error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  console.log("New document saved to databse");

  // Only send an email when a new document is created
  if (this.isNew) {
    await sendOTP(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
