import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { questions } from "../assets/questionsData";
import King from "./King";
import Axios from 'axios';
import html2canvas from 'html2canvas';

export default function ResultPage() {
  const { emailAddress } = useParams();
  const location = useLocation();
  const { scoreTotal } = location?.state || {};
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!scoreTotal) {
      navigate("/");
    } else {
      const results = questions.results;
      const matchingResult = results.find(
        (result) =>
          scoreTotal >= result.range[0] && scoreTotal <= result.range[1]
      );
      if (
        matchingResult &&
        matchingResult.level !== undefined &&
        matchingResult.icon != undefined &&
        matchingResult.description != undefined &&
        matchingResult.name != undefined
      ) {
        setLevel(matchingResult.level);
        setIcon(matchingResult.icon);
        setDescription(matchingResult.description.text);
        setName(matchingResult.name);
      }
    }
  }, [scoreTotal]);

  if (!scoreTotal) return null;

  const captureScreen = () => {
    const element = document.body; // Chụp toàn bộ trang web

    html2canvas(element, {
        useCORS: true, // Cho phép chụp ảnh từ các nguồn khác (CORS)
        allowTaint: true, // Cho phép hình ảnh từ các nguồn ngoài được render
        logging: true // Bật log để xem chi tiết lỗi
      }).then((canvas) => {
        const imageUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "screenshot.png";
        link.click();
      });
  };

  const profileUpload = async (blob: Blob) => {
    try {
        // Tạo đối tượng FormData
        const formData = new FormData();
        formData.append("file", blob, "screenshot.png"); // Gửi file blob dưới dạng "screenshot.png"
        formData.append("upload_preset", "kingFlim");

        // Gửi ảnh lên Cloudinary
        const result = await Axios.post(
            "https://api.cloudinary.com/v1_1/dam4hupzg/image/upload",
            formData
        );

        // Trả về URL ảnh đã tải lên Cloudinary
        return result.data.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

const captureScreen2 = () => {
    const element = document.body; // Chụp toàn bộ trang web

    html2canvas(element, {
        useCORS: true, // Cho phép chụp ảnh từ các nguồn khác (CORS)
        allowTaint: true, // Cho phép hình ảnh từ các nguồn ngoài được render
        logging: true, // Bật log để xem chi tiết lỗi
    }).then((canvas) => {
        const imageUrl = canvas.toDataURL("image/png");

        // Chuyển đổi dữ liệu URL thành Blob
        fetch(imageUrl)
            .then((res) => res.blob())
            .then((blob) => {
                // Tải ảnh lên Cloudinary
                profileUpload(blob).then((uploadedImageUrl) => {
                   navigate("/share",{state:{uploadedImageUrl}})
                }).catch((error) => {
                    console.error("Error during image upload:", error);
                });
            });
    });
};




  return (
    <div className="w-full overflow-y-auto h-screen bg-gradient-to-b to-[#051E40] from-[#0D4C8D] flex flex-col justify-center items-center">
      {/* chiase  */}
      <div className="fixed top-[100px]  duration-200  hover:cursor-pointer hover:translate-x-[-10px]  right-0 flex justify-center items-center py-4 text-white w-[150px] h-[15px] bg-[#1890FF] transform -rotate-90 origin-bottom-right" onClick={() => {
         captureScreen2()
        }} >
        Chia sẻ
      </div>
      {/* down */}
      <div  onClick={captureScreen} className="fixed px-2 right-[-69px] duration-200   top-[290px] hover:cursor-pointer hover:translate-x-[-10px]   flex  items-center py-4 bg-white w-[100px] h-[15px] text-[#1890FF] ">
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
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </div>
      {/* reset */}
      <div  className="fixed px-2 right-[-69px]  duration-200   top-[330px] hover:cursor-pointer hover:translate-x-[-10px]   flex  items-center py-4 bg-white w-[100px] h-[15px] text-[#1890FF] "  onClick={() => {
         navigate("/")
        }}>
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>

      <h1 className="text-[15px] md:text-[20px] text-white w-[80%] text-center md:w-[50%] mb-[40px] md:mb-[50px]">
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </h1>

      <div className="bg-white overflow-y-auto bg-opacity-30 flex flex-col gap-4 font-thin text-white w-[80%] md:w-[50%] p-4 rounded-xl shadow-md">
        {/* dongdau */}
        <div className="flex gap-3 md:gap-5 ">
          {/* icon */}
          <div className="bg-white self-start  rounded-full  p-2">
            <img src={`${icon}`} alt="" className="w-10 h-10   " />
          </div>

          {/* 2 dong con */}
          <div className="flex flex-col gap-1">
            <div className="text-white">
              VOICE OF THE CUSTOMER - CẤP ĐỘ {level}
            </div>
            <div className="text-white font-bold text-xl">{name}</div>
          </div>
        </div>

        {/* dong des */}
        <div>{description}</div>

        {/* chart */}

        <div className="w-full h-[200px]  xl:h-[500px] md:h-[300px] lg:h-[350px] overflow-x-auto  overflow-y-auto flex justify-center items-center ">
          <King val={scoreTotal} />
        </div>
      </div>
    </div>
  );
}
