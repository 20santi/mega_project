import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/oparations/ProfileApi";
import { Table, Tbody, Th, Tr, Td, Thead } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrollCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      console.log("enrolledCourses----------------", response);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled courses");
    }
  };

  useEffect(() => {
    getEnrollCourses();
  }, []);

  return (
    <div className="text-white ml-[330px] mt-32 w-[500px] mx-auto">
      <div className="text-[30px] leading-[38px] font-inter font-medium text-richblack-5">
        Enrolled Courses
      </div>
      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : enrolledCourses.length === 0 ? (
        <p>You have not enrolled in any course yet</p>
      ) : (
        <Table>
          <Thead>
            <Tr className="flex justify-between w-[1260px] bg-richblack-700 h-[54px] p-4 rounded-t-lg mt-10 ">
              <Th>Course Name</Th>
              <div className="flex w-[50%] justify-between">
                
                <div className="">
                 <Th>Duration</Th>
                </div> 

                <div className=" mr-[300px]">
                  <Th>Progress</Th>
                </div>

              </div>
            </Tr>
          </Thead>
          <Tbody>
            {enrolledCourses.map((course, index) => {
              return (
                <Tr 
                  onClick={() => {
                    navigate(
                      `/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent[0]?.subSection?.[0]?._id}`
                    )
                  }}
                  key={index}
                >
                  <Td className="border border-richblack-700 p-4">
                    <div className="flex gap-x-5">
                      <img
                        src={course.thumbnail}
                        className="w-[60px] h-[60px] rounded-lg object-cover"
                      />
                      <div className=" max-w-[582px]">
                        <p className="text-[16px] leading-6 font-inter font-medium text-richblack-5">
                          {course.courseName}
                        </p>
                        <p className="text-[16px] leading-6 font-inter font-normal text-richblack-300">
                          {
                            course.courseDescription.length > 50 
                            ? `${course.courseDescription.slice(0, 50)}...`
                            : course.courseDescription
                          }
                        </p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <div className="-ml-[630px] text-[16px] leading-6 font-inter font-medium text-richblack-50"> 
                      2 hr  30 mins 
                    </div>
                  </Td>
                  <Td>
                    <div className="flex flex-col gap-y-1 -ml-[390px]">
                      <p className="text-[12px] leading-5 font-inter font-semibold text-richblack-50"> 
                        Progress: {course.progressPercentage || 0}%
                      </p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        width="202px"
                        isLabelVisible={false}
                      />
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default EnrolledCourses;
