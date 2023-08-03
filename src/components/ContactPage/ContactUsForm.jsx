import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging data: ", data);
        try{

            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("logging response", response);
            setLoading(false);

        } catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNumber:"",
            }, [reset,isSubmitSuccessful])
        }
    })

    return (
        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className="flex flex-col gap-4 text-richblue-900">
                <div className="flex gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="firstName" 
                        className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            First Name
                        </label>
                        <input 
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter first name"
                        {...register("firstName", {required:true})}
                        className="w-[268px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                        {
                            errors.firstName && (
                                <span>
                                    Please enter your name
                                </span>
                            )
                        }
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="lastName"
                        className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            Last Name
                        </label>
                        <input 
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter last Name"
                        {...register("lastName")}
                        className="w-[268px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                    </div>
                </div>

                {/* email */}
                <div className="flex flex-col">
                        <label htmlFor="email"
                        className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                            Email Address
                        </label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        {...register("email", {required:true})}
                        className=" w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                         leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                         shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                        {
                            errors.email && (
                                <span>
                                    Please enter your email
                                </span>
                            )
                        }
                </div>

                {/* phone phoneNumber */}
                <div className="">
                    <label htmlFor="phoneNumber"
                    className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                        Phone Number
                    </label>

                    <div className="flex gap-5">
                        {/* dropdown */}
                        <select
                            name="dropdown"
                            id="dropdown"
                            {...register("countrycode", {required:true})}
                            className="w-[75px] h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                            leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                            shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                            >
                                {
                                    CountryCode.map((ele, index) => {
                                        return (
                                            <option key={index} value={ele.code}>
                                                {ele.code} - {ele.country}
                                            </option>
                                        )
                                    })
                                }                               
                        </select>

                        <input 
                            type="number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="12345 67890"
                            {...register("phoneNo", {
                                required:{value:true, message:"Please enter ph number"},
                                maxLength:{value:10, message:"Invalid ph no"},
                                minLength:{value:8, message:"Invalid ph no"}
                            })}
                            className=" w-full h-[40px] p-3 mt-[6px] font-inter font-bold text-[12px]
                            leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                            shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                        />
                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
                </div>

                {/* message box */}
                <div className="flex flex-col">
                    <label htmlFor="message"
                    className="font-inter font-400 text-[14px] text-richblack-5 leading-[22px]">
                        Message
                    </label>
                    <textarea 
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    {...register("message", {required:true})}
                    className=" p-3 mt-[6px] font-inter font-bold text-[12px]
                    leading-[24px] text-richblack-200 rounded-[8px] bg-richblack-800 opacity-[0.9]
                    shadow-[0_1px_0px_0px_rgba(255,255,255,0.18)]"
                    />
                    {
                        errors.message && (
                            <span>
                                Please enter your message
                            </span>
                        )
                    }
                </div>

                <button type="submit" className=" text-richblack-900 w-fill h-[48px] rounded-lg p-3 bg-yellow-50 mt-6 font-bold">
                    Send message
                </button>
            </div>

        </form>
    )
}

export default ContactUsForm;