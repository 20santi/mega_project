import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {setSignupData} from "../../../slices/authSlice";
import { sendOtp } from "../../../services/oparations/authApi";
import { ACCOUNT_TYPE } from "../../../utils/Constants";

import Tab from "../../common/Tab";

const SignupFrom = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        phoneNumber:""
    })

    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = formData


    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(confirmPassword !== password) {
            toast.error("Password do not match");
            return;
        }

        const signupData = {
            ...formData,
            accountType,
        }

        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formData.email,navigate));

        //reset
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
            phoneNumber:""
        });


        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    const tabData = [
        {
            id:1,
            tabName:"Student",
            type:ACCOUNT_TYPE.STUDENT
        },
        {
            id:2,
            tabName:"Instructor",
            type:ACCOUNT_TYPE.INSTRUCTOR
        }
    ]


    return (
        <div className="flex flex-col gap-y-3">
            {/* ...tab... */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

            {/* ...form... */}
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-[20px]">
                <div className="flex gap-x-4">
                    <label>
                        <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input 
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                        placeholder="Enter your First name"
                        className="w-[212px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                    </label>

                    <label>
                        <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input 
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        placeholder="Enter your Last name"
                        className="w-[212px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                    </label>
                </div>

                <label>
                    <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input 
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter your Email Address"
                    className="w-[444px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                    />
                </label>

                <label>
                    <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                        Phone Number <sup className="text-pink-200">*</sup>
                    </p>

                    <input 
                    required
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleOnChange}
                    placeholder="Enter your Phone Number"
                    className="w-[444px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                    />
                </label>

                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>

                        <input 
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        className="w-[212px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />

                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute z-10 bottom-2 left-[170px]"
                            >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>

                    <label className="relative">
                        <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input 
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        className="w-[212px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />

                        <span
                            onClick={() => setConfirmPassword((prev) => !prev)}
                            className="absolute z-10 bottom-2 left-[170px]"
                            >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>

                    </label>
                </div>

                <button className="w-fill h-[48px] rounded-lg p-3 bg-yellow-50 mt-10 font-bold" type="submit">
                    Create Account
                </button>

            </form>

        </div>
    )
}

export default SignupFrom;