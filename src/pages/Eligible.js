import React from "react";

function Eligible() {
    return (
        <div>
            <h1>Congratulations!</h1>
            <p>You are eligible for the Canadian HigherEd Coaches Program! Please fill out the application.</p>
            <button className="mt-[48px] mb-[32px] px-[16px] py-[8px] font-[600] text-[24px] border border-black rounded-[4px] hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300"  onClick={()=>{window.location.pathname= "/student-application"}}>
                Apply Now!
            </button>
        </div>

    );
}

export default Eligible;
