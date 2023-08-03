import React from "react";

const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
    return (
       <section>
            <div className=" bg-richblack-800 w-full h-[254px] flex items-center justify-center">

                <div className="flex gap-x-60">
                    {
                        Stats.map((data,index) => {
                            return(
                                <div key={index} className="flex flex-col items-center justify-center">
                                    <h1 className="text-richblack-5 font-inter font-bold text-[30px] leading-10">{data.count}</h1>
                                    <h2 className="text-richblack-500 font-inter text-[16px] leading-6 font-semibold">
                                        {data.label}
                                    </h2>    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
       </section>
    )
}

export default StatsComponent;