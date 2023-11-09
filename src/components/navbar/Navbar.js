import React from 'react'
import logo from './../../images/logo.jpg';
import { useNavigate  } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const redirectDonation = () => {
        window.open('https://www.zeffy.com/en-CA/donation-form/ad78ba3b-2d4e-4930-9602-e99547915171');
    }
    return (
        <div className="px-[10%] h-[75px] w-full bg-white fixed top-0 z-10 shadow-md">
            <div className="flex flex-row items-center h-full justify-between">
                <div className="flex flex-row items-center">
                    <img src={logo} className="w-[135px] mr-[64px] cursor-pointer" alt="Comapny Logo" onClick={()=>{navigate("/")}}/>
                    <div className="flex flex-row font-[600] text-[16px] leading-[22px] gap-[32px]">
                        <div onClick={()=>{navigate("/")}} className="cursor-pointer">
                            Home
                        </div>
                        <div onClick={()=>{navigate("/about-us")}} className="cursor-pointer">
                            About Us
                        </div>
                        <div onClick={()=>{navigate("/coaches")}} className="cursor-pointer">
                            Coaches
                        </div>
                        <div onClick={()=>{navigate("/students")}} className="cursor-pointer">
                            Students
                        </div>
                        <div onClick={redirectDonation} className="cursor-pointer">
                            Donate
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar