import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/oparations/authApi";
import { ACCOUNT_TYPE } from "../../../utils/Constants";
import Tab from "../../common/Tab";

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });
    const {email, password} = formData;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    }

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
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
        <div>
            <div className="flex flex-col gap-y-4">
                {/* ...tab... */}
                <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

                {/* ...form... */}
                <form className=" flex flex-col gap-y-6" onSubmit={handleOnSubmit}>

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

                    <label className="relative">
                        <p className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            Enter Password <sup className="text-pink-200">*</sup>
                        </p>

                        <input 
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        className=" w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />

                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute z-10 bottom-2 left-[380px]"
                            >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>

                        <Link to="/forgot-password">
                            <div className="font-inter font-bold text-xs text-blue-100 absolute right-0 -bottom-6">
                                Forgot Password
                            </div>
                        </Link>
                    </label>

                    <button className="w-fill h-[48px] rounded-lg p-3 bg-yellow-50 mt-10" type="submit">
                        Log In
                    </button>

                </form>

            </div>

        </div>
    )
}

export default LoginForm;