import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactForms = () => {
    return (
        <div className="mx-auto mt-40 flex flex-col items-center justify-center">
            <h1 className="text-[36px] leading-[44px] font-inter font-semibold text-richblack-5">
                Get in Touch
            </h1>
            <p className="text-[16px] leading-6 font-500 text-richblack-300 font-inter">
                We’d love to here for you, Please fill out this form.
            </p>
            <div className="mt-16">
                <ContactUsForm/>
            </div>
        </div>
    )
}

export default ContactForms;