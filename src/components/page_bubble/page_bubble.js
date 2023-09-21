import React from 'react'
import { useNavigate  } from "react-router-dom";

const PageBubble = ({ title, description, buttonTitle, navigateUrl }) => {
    const navigate = useNavigate();
  return (
    <div>
        <div className='w-full h-auto bg-[#E2E8F0] mt-[64px] flex flex-col items-center rounded-[64px]'>
            <h1 className="font-[800] text-[40px] leading-[150%] pt-[32px]">{title}</h1>
            <h2 className="pt-[32px] font-[700] text-[25px]">{description}</h2>
            {buttonTitle ? (
                <button className="mt-[48px] mb-[32px] px-[16px] py-[8px] font-[600] text-[24px] border border-black rounded-[4px] hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300"  onClick={()=>{navigate(navigateUrl)}}>
                    {buttonTitle}
                </button>
            ) : <div className="mb-[32px]"></div>}
        </div>
    </div>
  )
}

export default PageBubble