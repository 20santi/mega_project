import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import bannerImage1 from "../assets/Images/aboutus1.webp";
import bannerImage2 from "../assets/Images/aboutus2.webp";
import bannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import foundStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForms from "../components/core/AboutPage/ContactForms";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const About = () => {
    return (
        <div className="flex flex-col gap-y-36 mx-auto text-white w-[11/12] ">
            {/* section 1 */}
            <section className="bg-richblack-800 w-full relative h-[618px]">
                <div className="flex gap-y-12 flex-col w-[900px] text-center mx-auto max-w-maxContent pt-[90px]">
                    <p className="">About Us</p>

                    <header className="text-richblack-5 text-[36px] font-inter leading-[44px] font-semibold">
                        Driving Innovation in Online Education for a
                        <HighlightText text=" Brighter Future"
                        style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/>

                        <p className=" text-[16px] leading-6 font-500 text-richblack-300 w-[809px] mt-4">
                            Studynotion is at the forefront of driving innovation in online education. 
                            We're passionate about creating a brighter future by offering cutting-edge 
                            courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>
                    <div className="flex gap-x-5 absolute -bottom-20 -ml-40">
                        <img src={bannerImage1}/>
                        <img src={bannerImage2} className="relative z-10"/>
                        <div className="absolute w-[357.43px] h-[36.88px] blur-2xl opacity-70 translate-x-96 translate-y-2
                        bg-gradient-to-r from-[#E65C00] from-100% to-[#F9D423] to-100% z-0">
                        </div>
                        <img src={bannerImage3}/>
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section className=" mx-auto max-w-maxContent mt-8">
                <div className="text-center">
                    <Quote/>
                </div>
            </section>

            <div className=" w-full bg-richblack-700 h-[1px] -mt-16"></div>

            {/* section 3 */}
            <section className=" mx-auto max-w-maxContent">
                <div className="">

                    {/* founding story div */}
                    <div className="flex -mt-16 gap-x-48">
                        {/* left box */}
                        <div className="flex flex-col gap-y-5 ml-10">
                            <HighlightText text="Our Founding Story"
                            style={"text-[36px] leading-[44px] font-inter font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] from-100% via-[#FD1D1D] via-100% to-[#FCB045] to-100% "}/>
                
                            <p className="text-[16px] leading-[24px] font-500 text-richblack-300 w-[450px]">
                            Our e-learning platform was born out of a shared vision and passion 
                            for transforming education. It all began with a group of educators, 
                            technologists, and lifelong learners who recognized the need for 
                            accessible, flexible, and high-quality learning opportunities in a 
                            rapidly evolving digital world.
                            </p>
                            <p className="text-[16px] leading-[24px] font-500 text-richblack-300 w-[450px]">
                            As experienced educators ourselves, we witnessed firsthand the 
                            limitations and challenges of traditional education systems. We believed
                             that education should not be confined to the walls of a classroom or 
                             restricted by geographical boundaries. We envisioned a platform that 
                             could bridge these gaps and empower individuals from all walks of life 
                             to unlock their full potential.
                            </p>
                        </div>

                        {/* right box */}
                        <div className=" mt-12 relative">
                            <img src={foundStory} className="relative z-10"/>
                            <div className="w-[372.95px] h-[257.05px] opacity-20 blur-2xl rounded-full -top-10 -left-10
                            absolute bg-gradient-to-r from-[#EC008C] from-100% to-[#FC6767] to-100% z-0"></div>
                        </div>
                        
                    </div>

                    {/* vision and misson parent div */}
                    <div className="flex mt-40">

                        {/* left box */}
                        <div className=" translate-x-16 flex flex-col gap-y-4">
                            <HighlightText text="Our Vision"
                            style={"text-[36px] leading-[44px] font-inter font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] from-100% to-[#F9D423] to-100% "}/>
                            
                            <p className="text-[16px] leading-[24px] font-500 text-richblack-300 w-[450px]">
                            With this vision in mind, we set out on a journey to create an
                             e-learning platform that would revolutionize the way people learn. 
                             Our team of dedicated experts worked tirelessly to develop a robust 
                             and intuitive platform that combines cutting-edge technology with 
                             engaging content, fostering a dynamic and interactive learning 
                             experience.
                            </p>
                        </div>

                        {/* right box */}
                        <div className=" translate-x-64 flex flex-col gap-y-4 -translate-y-2">
                            <HighlightText text="Our Mission"
                            style={"text-[36px] leading-[44px] font-inter font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/>
                            
                            <p className="text-[16px] leading-[24px] font-500 text-richblack-300 w-[450px]">
                            our mission goes beyond just delivering courses online. 
                            We wanted to create a vibrant community of learners, where individuals 
                            can connect, collaborate, and learn from one another. We believe that
                             knowledge thrives in an environment of sharing and dialogue, and we 
                             foster this spirit of collaboration through forums, live sessions, 
                             and networking opportunities.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* section 4 */}
            <div className=" ">
                <StatsComponent/>
            </div>

            {/* section 5 */}
            <div className="mx-auto flex flex-col mb-[140px]">
                <LearningGrid/>
                <ContactForms/>
            </div>

            <section className=" max-w-maxContent mx-auto">
                <div className="text-[30px] leading-[44px] font-inter font-semibold text-richblack-5 -mt-36">
                    Review from other learners
                </div>

                <ReviewSlider/>
            </section>
            <Footer/>
        </div>
    )
}

export default About;