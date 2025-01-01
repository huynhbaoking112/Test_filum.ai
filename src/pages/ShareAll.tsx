import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { EmailShareButton, FacebookShareButton } from "react-share";

export default function ShareAll(){
    
    const location = useLocation()
    const {uploadedImageUrl} = location?.state || ""
    const navigate = useNavigate()
   
    useEffect(() => {
        
        if (!uploadedImageUrl ) {
          navigate("/");
        } 
      }, [uploadedImageUrl]);

    if (!uploadedImageUrl) return null;

    const copyToClipboard = () => {
        if (uploadedImageUrl) {
            navigator.clipboard.writeText(uploadedImageUrl)
                .then(() => {
                    alert('Đường dẫn đã được sao chép vào clipboard!');
                })
                .catch((error) => {
                    console.error('Không thể sao chép đường dẫn: ', error);
                });
        }
    };


   return <div className="w-full overflow-y-auto h-screen bg-gradient-to-b to-[#051E40] from-[#0D4C8D] flex flex-col justify-center items-center">
     <div className="bg-white overflow-y-auto flex flex-col gap-4 font-thin text-white w-[80%] md:w-[50%] p-4 rounded-lg shadow-md">
            {/* chia se ket qua */}
            <div className="flex justify-center items-center font-bold text-black text-[15px]">
                Chia sẻ kết quả 
            </div>
            <div className="text-black font-semibold ">
                Đây là một số cách bạn có thể chia sẻ với bạn bè và đồng nghiệp của mình.
            </div>
            {/* chia se qua facebook
             */}
             <FacebookShareButton url={`${uploadedImageUrl}`}>
             <div className="w-full hover:cursor-pointer hover:scale-105 duration-200 bg-[#1890FF] text-white py-2 px-4 flex font-semibold justify-center rounded-sm items-center  ">
                Chia sẻ qua Facebook
             </div>
             </FacebookShareButton>

             {/* chia se qua email */}
             <EmailShareButton url={`${uploadedImageUrl}`} >
             <div className="w-full hover:cursor-pointer hover:scale-105 duration-200 bg-[#E9F4FF] text-[#1890FF] py-2 px-4 flex font-semibold justify-center rounded-sm items-center  ">
                Chia sẻ qua Email
             </div>
             </EmailShareButton>
             {/* Sao chep duong dan*/}
             <div className="w-full hover:cursor-pointer hover:scale-105 duration-200 bg-[#E9F4FF] text-[#1890FF] py-2 px-4 flex font-semibold justify-center rounded-sm items-center  " onClick={copyToClipboard}>
                Sao chép đường dẫn đến trang kết quả
             </div>
             {/* huy */}
             <div  className="w-full hover:cursor-pointer hover:scale-105 duration-200 bg-[#E9F4FF] text-[#1890FF] py-2 px-4 flex font-semibold justify-center rounded-sm items-center  " onClick={() => {
         navigate(-1)
        }}>
                Hủy
             </div>
     </div>
    </div>
}