import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {  questions as myQuestions } from "../assets/questionsData";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";

export default function TestPage() {
  const questions = myQuestions.questions
  const [results, setResults] = useState({});
  const swiperRef = useRef(null); // Tạo tham chiếu đến Swiper instance
  const navigate = useNavigate()
  const params = useParams()

  const handleAnswer = (questionId, optionId) => {
    setResults((prevResults) => ({
      ...prevResults,
      [questionId]: optionId,
    }));
  };

  return (
    <div className="w-full h-screen  bg-gradient-to-b to-[#051E40] from-[#0D4C8D] flex flex-col justify-center items-center">
      <h1 className="text-[15px] md:text-[20px] text-white w-[70%] text-center md:w-[50%] mb-[40px] md:mb-[50px]">
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </h1>

      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Gán instance của Swiper vào tham chiếu
        className="w-11/12 md:w-2/3 lg:w-1/2"
      >
        {questions.map((question) => (
          <SwiperSlide key={question.id}>
            <div className="bg-white overflow-y-auto h-full bg-opacity-30 p-4 rounded-xl shadow-md">
              <div className="flex justify-center gap-2 items-center text-white mb-4">
                {/* CÂU HỎI */}
                <div className="w-[10px] h-[10px] rounded-full bg-[#188FFD] "></div>
                CÂU HỎI {question.id}/{questions.length}
              </div>
              {/* TIÊU ĐỀ CÂU HỎI */}
              <div className="text-lg text-white text-center font-bold mb-6">
                {question.title}
              </div>
              <div className="flex flex-col gap-5">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    className={`py-2 px-4 font-semibold border-2 rounded-sm border ${
                      results[question.id] === option.score
                        ? "border-blue-500 text-blue-500"
                        : "text-white"
                    }`}
                    onClick={() => handleAnswer(question.id, option.score)}
                  >
                    {option.text}
                  </button>
                ))}
                {/* NÚT TIẾN VÀ LÙI */}
                <div className="flex gap-4 justify-between">
                  <div className="flex w-[40%]  hover:scale-105 hover:cursor-pointer duration-200 text-[#1890FF] gap-1 font-semibold  py-2 px-4 rounded-sm bg-white text-[]  justify-center items-center" onClick={() => swiperRef.current?.slidePrev()} >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>

                    <div
                      className="   "
                      // Điều hướng về slide trước
                    >
                      Quay Lại
                    </div>
                  </div>

                  <div className="flex py-2 w-[40%] hover:scale-105 hover:cursor-pointer duration-200 px-4 rounded-sm  font-semibol  gap-1 bg-blue-500 text-white  items-center justify-center" onClick={() => swiperRef.current?.slideNext()}>
                    <div
                      className=""
                       // Điều hướng đến slide tiếp theo
                    >
                      Tiếp theo
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                    
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* TRẠNG THÁI TRẢ LỜI */}
      <div className="mt-6 text-white">
        
        {Object.keys(results).length === questions.length
          ? <div className="px-4 hover:cursor-pointer hover:scale-105 duration-300 py-2 rounded-lg bg-blue-500" onClick={() => {
            const obj: {[key: string]: number} = results
            const scoreTotal:number =  Object.values(obj).reduce((sum, value) => sum + value, 0);
            navigate(`/result/${params.emailAddress}`, {state:{scoreTotal}})
          }
          }>
            SUBMIT
          </div>
          : `Bạn đã trả lời ${Object.keys(results).length}/${
              questions.length
            } câu hỏi.`}
      </div>
    </div>
  );
}
