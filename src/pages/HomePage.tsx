import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  const validateEmail = (value: string) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="w-full h-screen bg-[#051E40] overflow-y-auto flex flex-col justify-center items-center">
      {/* filumxmp */}
      <div className="mb-[50px] p-7 rounded-full border-2 border-yellow-200 cursor-pointer shadow-lg shadow-yellow-200 hover:shadow-xl hover:shadow-yellow-300 duration-300">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbED01UZGU4k9Si6rBjGGqb83PQZqrH_X6JluKMX2h_Xj_nIT9GHOyAWXhqKjShyKNnHQ&usqp=CAU"
          className="rounded-full w-[120px] md:w-[180px]"
        />
      </div>

      {/* Tiêu đề đánh giá
       */}
      <div className="text-white text-center mb-[50px]  md:w-[40%] w-[80%]">
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </div>

      {/* // Tiêu đề công ty */}
      <div className="text-white text-center  font-semibold text-3xl  md:w-[40%] w-[80%]   mb-[40px] md:mb-[50px]">
        Công ty bạn trưởng thành như thế nào trong việc lắng nghe khách hàng?
      </div>

      {/* // Đánh giá*/}
      <div className="text-white text-center mb-[30px]  md:mb-[50px]  md:w-[40%] w-[80%]">
        Đánh giá khả năng của bạn trong việc lắng nghe, hiểu và đáp ứng các tín
        hiệu từ khách hàng
      </div>

      {/* Email */}
      <div className=" mb-[30px] md:mb-[50px] w-[80%] md:w-[40%]">
        <input
          placeholder="Địa chỉ email của bạn"
          className="py-[10px] px-[10px] w-full"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[90%] md:w-[50%]">
            <p className="text-red-500 text-lg font-semibold mb-4">
              Email bạn nhập không hợp lệ. Mời bạn nhập lại.
            </p>
            <button
              className="bg-[#1890FF] text-white py-2 px-4 rounded"
              onClick={() => setShowPopup(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      {/* Bat dau  */}
      <div
        className="flex gap-2 hover:cursor-pointer hover:scale-105 duration-300 group/enter items-center bg-[#1890FF] py-[10px] px-[10px] text-white justify-center  w-[80%] md:w-[40%] "
        onClick={() => {
          
          const ketQua = validateEmail(email);
          if (ketQua) {
            navigate(`/test/${email}`)
          } else {
            setShowPopup(true); // Hiện popup khi email không hợp lệ
          }
        }}
      >
        Bắt đầu
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 group-hover/enter:animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
      </div>
    </div>
  );
}
