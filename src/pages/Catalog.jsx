import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import getCatalogPageData from "../services/oparations/pageAndComponentData";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    //fetch all categories
    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter(ct => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);

            } catch(error){
                console.log("error in Catelog.jsx file", error);
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])

    return (
        <div>
            
            <div className="w-full h-[244px] bg-richblack-800">
                <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-3 pt-10 justify-center">
                    <p className=" text-richblack-300 text-[14px] leading-[22px] font-normal">
                        {`Home  /  Catalog  /  `}
                        <span>
                            {catalogPageData?.data?.selectCategory?.name}
                        </span>
                    </p>
                    <p className=" font-inter text-[30px] leading-[38px] font-medium text-richblack-5">
                        {catalogPageData?.data?.selectCategory?.name}
                    </p>
                    <p className="w-[820px] text-[14px] leading-[22px] font-normal text-richblack-200">
                        {catalogPageData?.data?.selectCategory?.description}
                    </p>
                </div>
            </div>

            <div className="text-white w-11/12 max-w-maxContent mx-auto">
                {/* section 1 */}
                <div className="mt-16">
                    <div className="text-[30px] leading-[38px] font-inter font-semibold text-richblack-5">
                        Courses to get you started
                    </div>
                    <div className="flex gap-x-6 border-b border-richblack-600 mt-3 p-2">
                        <p className="">
                            Most Popular
                        </p>
                        <p>
                            New
                        </p>
                    </div>
                    <div className="mt-10">
                        <CourseSlider 
                        Courses={catalogPageData?.data?.selectCategory?.courses}
                        Weidth={"w-[380px]"} Height={"h-[200px]"}
                    />
                    </div>
                </div>

                {/* section 2 */}
                <div className="-mt-1">
                    <div className="text-[30px] leading-[38px] font-inter font-semibold text-richblack-5">
                        Top Courses in {catalogPageData?.data?.differentCategory?.name}
                    </div>
                    
                    <div className="mt-7">
                        <CourseSlider 
                            Courses={catalogPageData?.data?.differentCategory?.courses}
                            Weidth={"w-[380px]"} Height={"h-[200px]"}    
                        />
                    </div>
                </div>

                {/* section 3 */}
                <div className="mt-6">
                    <div className="text-[30px] leading-[38px] font-inter font-semibold text-richblack-5">
                        Frequently Brought
                    </div>
                    <div className="py-8">

                        <div className="grid grid-cols-1 gap-6 gap-y-20 lg:grid-cols-2 mb-20">
                            {
                                catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                                .map((course, index) => {
                                    return(
                                        <CourseCard course={course} key={index} Weidth={"w-[580px]"} Height={"h-[300px]"}/>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>

            
        </div>
    )
} 

export default Catalog;