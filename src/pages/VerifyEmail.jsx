import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp, signup } from "../services/oparations/authApi";

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {signupData, loading} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!signupData) {
            navigate("/signup");
        }
    },[]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName, 
            lastName, 
            email, 
            password, 
            confirmPassword, 
            phoneNumber,
        } = signupData;

        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, phoneNumber, otp, navigate));
    }

    return (
        <div className="flex w-11/12 max-w-maxContent mt-[12rem] mx-auto justify-center items-center">
            {
                loading ? (<div>Loading...</div>) :
                (
                    <div className="flex flex-col gap-y-3 w-[420px] h-[586px]">
                        <h1 className="font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">
                            Verify Email
                        </h1>
                        <p className="text-[18px] leading-[1.7rem] font-400 text-richblack-100">
                            A verification code has been sent to you.Enter the code Below
                        </p>

                        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6 mt-3">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                {...props}
                                placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem]
                                 text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2
                                 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                               
                              }}
                            />
                            <button type="submit" className="w-fill h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold">
                                Verify email
                            </button>
                        </form>

                        <div className="flex justify-between">
                            <div className="text-[16px] leading-6 font-400 font-inter text-richblack-5 pt-3">
                                <Link to="/login">
                                    <p>Back to login</p>
                                </Link>
                            </div>

                            <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} 
                            className="font-inter font-bold pt-2 text-blue-100 text-[16px] leading-6">
                                Resend it
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail;
