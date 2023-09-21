import React from 'react'
import './category_box.css';

const CategoryBox = ({ title, description, imageUrl, imageAlt }) => {
  return (
    <div className="category-box w-full h-full bg-[#E2E8F0] rounded-[4px] hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors">
        <div className="flex flex-col p-[24px] items-center">
            <div className="font-[700] text-[20px]">
                {title}
            </div>
            <div className="mx-[24px] mt-[10px] font-[400]">
                {description}
            </div>
            <div className="mt-[20px]">
                <img className="h-[80px] category-image" src={imageUrl} alt={imageAlt}></img>
            </div>
        </div>
    </div>
  )
}

export default CategoryBox