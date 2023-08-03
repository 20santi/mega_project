import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/oparations/authApi";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"


const UpdatePassword = () => {

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const {loading} = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const {password, confirmPassword} = formData

    const handleOnChange = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }

    return (
        <div className="flex w-11/12 max-w-maxContent mt-[12rem] mx-auto justify-center items-center">
            {
                loading ? (
                    <div className="">
                        Loading...
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-3 w-[420px] h-[586px]">
                        <h1 className="font-bold text-[30px] leading-[2.4rem] font-inter text-richblack-5">
                            Choose new Password
                        </h1>

                        <p className="text-[18px] leading-[1.7rem] font-400 text-richblack-100">
                            Almost done. Enter your new password and you are all set
                        </p>

                        <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6 mt-3">
                            <label className="relative">
                                <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                                    New Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input 
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                className=" w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                />

                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute z-10 bottom-2 left-[370px]"
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
                                    Confirm New Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input 
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                className=" w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                                leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                                shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                                />

                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute z-10 bottom-2 left-[370px]"
                                    >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>

                            <button type="submit" className="w-fill h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold">
                                Reset Password
                            </button>
                        </form>

                        <div  className="text-[16px] leading-6 font-400 font-inter text-richblack-5 pt-3">
                            <Link to="/login">
                                <p>Back to login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword;