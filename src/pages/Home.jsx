import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa"
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAbutton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import instructorImage from "../assets/Images/Instructor.png"
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-start lg:items-center
            text-white lg:justify-between max-w-maxContent">

                <Link to={"/signup"}>
                    <div className="group mx-auto rounded-full font-bold text-richblack-200
                    bg-richblack-800 transition-all duration-200 hover:scale-95 w-fit mt-16 p-1">

                        <div className="flex flex-row items-center gap-2 rounded-full px-10 
                        group-hover:bg-richblack-900 py-[5px]">
                            <p>become an instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className="lg:text-center text-4xl font-semibold mt-7">
                    Empower your future with 
                    <HighlightText text={" Coding Skills"} 
                    style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/>
                </div>

                <div className="w-[90%] lg:text-center text-lg font-bold text-richblack-300 mt-4">      
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className="flex gap-7 mt-8 mx-auto">
                    <CTAbutton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAbutton>

                    <CTAbutton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAbutton>
                </div>

                <div className="relative mx-3 my-12">
                    
                    <video muted loop autoPlay className="relative z-10 
                    shadow-[8px_8px_0px_0px_rgba(245,245,245,1)] 
                    lg:shadow-[20px_20px_0px_0px_rgba(245,245,245,1)]">
                        <source src={Banner} type="video/mp4"/>
                    </video>

                    <div className="mx-auto right-3 left-3 bottom-36 absolute  rounded-[500px]
                     bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% 
                     to-[#A6FFCB] to-100% lg:w-[750px] lg:h-[590px] w-[298px] h-[69px] blur-2xl opacity-25 z-0"></div>

                    <div className="mx-auto left-0 top-10 absolute  rounded-[500px] bg-gradient-to-r 
                    from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100%
                    lg:w-[550px] lg:h-[360px] blur-2xl opacity-25 z-0"></div>

                </div>

                {/*code section 1 */}
                <div className=" lg:mt-10 -mt-16">
                    <CodeBlocks 
                        position={"lg:flex lg:flex-row flex-col"}
                        heading={
                            <div className="text-4xl font-semibold w-[500px]">
                               Unlock Your
                                <HighlightText text={" coding potential"}
                                style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/> 
                                with our online courses.
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                        ctabtn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n <html>\n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n </head>\n
                        <body>\n h1><ahref="/">Header</a>\n </h1>\n <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n </nav>`}
                        codeColor={"text-[#E7BC5B]"}
                        gradient={"bg-gradient-to-r from-[#8A2BE2] from-100% via-[#FFA500] via-100% to-[#F8F8FF] to-100%"}
                    />
                </div>

                {/*code section 2 */}
                <div className=" lg:mt-28 -mt-20">
                    <CodeBlocks 
                        position={"lg:flex flex-col lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                               Start 
                                <HighlightText text={" coding in seconds"}
                                style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/> 
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                linkto:"/login",
                                active:false,
                            }
                        }

                        codeblock={`<!DOCTYPE html>\n <html>\n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n </head>\n
                        <body>\n h1><ahref="/">Header</a>\n </h1>\n <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n </nav>`}
                        codeColor={"text-[#E7BC5B]"}
                        gradient={"bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100%"}
                    />
                </div>

                <div className="lg:h-[700px]"></div>

                <div className=" lg:mt-40 lg:absolute lg:-bottom-24">
                    <ExploreMore/>
                </div>

            </div>

            {/*section 2 */}
            <div className=" bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px]">
                    
                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                        <div className="h-[150px]"></div>
                        <div className="flex gap-7 text-white">
                            <CTAbutton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-3">
                                    Explore Full Catelog
                                    <FaArrowRight/>
                                </div>
                            </CTAbutton>

                            <CTAbutton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAbutton>
                        </div>
                    </div>

                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between lg:gap-7">

                    <div className="lg:flex lg:flex-row flex-col gap-20 mb-10 mt-[95px]">

                        <div className="text-4xl font-semibold w-fit lg:w-[45%]">
                            Get the Skills you need for a 
                            <HighlightText text={" Job that is in demand "}
                            style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/>
                        </div>

                        <div className="flex flex-col gap-7 lg:gap-10 w-fit lg:w-[40%] items-start pt-2 lg:pt-0">
                            <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms. 
                            Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAbutton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAbutton>
                        </div>
                    </div>

                    <TimelineSection/>

                    <LearningLanguageSection/>

                </div>

            </div>

            {/*section 3*/}
            <div className="w-11/12 lg:mx-auto max-w-maxContent lg:flex lg:flex-row flex flex-col-reverse justify-between items-start lg:items-center">
                <div className=" pt-24 pb-24">
                    <img src={instructorImage} alt="instructorImage"
                    className=" lg:w-[650px] lg:h-[580px] w-[358px] h-[545px] lg:shadow-[-20px_-20px_0px_0px_rgba(255,255,255,1)]"/>
                </div>
                
                <div className="lg:flex lg:flex-col w-[477px] h-[284px] gap-[15px]">
                    <div className="text-4xl m-5 text-richblack-5 font-[600] font-inter w-[200px] leading-[50px]">
                        Become an 
                        <HighlightText text={" instructor"}
                        style={"font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] from-100% via-[#12D8FA] via-100% to-[#A6FFCB] to-100% "}/>
                    </div>

                    <p className="font-inter text-[16px] leading-[24px] font-[500] text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. 
                    We provide the tools and skills to teach what you love.</p>

                    <div className=" pt-[50px] w-fit">
                        <CTAbutton active={true} linkto={"/signup"}>
                            <div className="flex items-center justify-center gap-3">
                                <p>Start Teaching Today</p>
                                <FaArrowRight/>
                            </div>
                        </CTAbutton>
                    </div>

                </div>
            </div>

            <h1 className="ml-[720px] mt-12 mb-12 text-[36px] leading-11 font-semibold font-inter text-richblack-5">
                Reviews from other learners
            </h1>

            <ReviewSlider/>

            <Footer/>
        </div>
    )
}

export default Home;