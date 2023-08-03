import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getResetPasswordToken } from "../services/oparations/authApi";

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => { 
        e.preventDefault();
        dispatch(getResetPasswordToken(email, setEmailSent));
    }

    return (
        <div className="flex w-11/12 max-w-maxContent mt-[10rem] mx-auto justify-center items-center">
            {
                loading ? (
                    <div className="text-xl text-white">Loading...</div>
                ) : (
                    <div className="">
                        <div className="p-2 gap-y-4 flex flex-col justify-center w-[29rem] h-[448px]">
                            <h1 className=" font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">      
                                {
                                    !emailSent ? "Reset your password" : "Check your email"
                                }
                            </h1>

                            <p className="text-[18px] leading-[1.7rem] font-400 text-richblack-100">
                                {
                                    !emailSent ? 
                                    "Have no fear. we will email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                                    : `We have sent the reset email to ${email}`
                                    
                                }
                            </p>

                            <form onSubmit={handleOnSubmit} className="flex flex-col">
                                {
                                    !emailSent && (
                                        <label className="pt-7">
                                            <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                                                Email Address <sup className="text-pink-200">*</sup>
                                            </p>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={(e)=> setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className=" w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                            />


                                        </label>
                                    )
                                }

                                <button type="submit" className="w-fill h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold">
                                    {
                                        !emailSent ? "Reset Password" : "Resend Email"
                                    }
                                </button>
                            </form>

                            <div className="text-[16px] leading-6 font-400 font-inter text-richblack-5 pt-3 ">
                                <Link to="/login">
                                    <p>Back to login</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;