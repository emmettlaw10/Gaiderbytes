import React from 'react'

const StudentsPage = () => {
    return (
        <div className='flex items-stretch'>
            <div className='w-full h-auto bg-[#E2E8F0] mt-[64px] flex flex-col items-center rounded-[64px]'>
                <h1 className="font-[800] text-[40px] leading-[150%] pt-[32px]">Need Help In Your First Year Post-Secondary?</h1>
                <h2 className="pt-[32px] font-[700] text-[25px]">Apply Now To Be Matched With a Coach!</h2>
                <button className="mt-[48px] mb-[32px] px-[16px] py-[8px] font-[600] text-[24px] border border-black rounded-[4px] hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300"  onClick={()=>{window.location.pathname= "/student-application"}}>
                    Apply Now
                </button>
            </div>
            <div className='w-full h-auto bg-[#E2E8F0] mt-[64px] flex flex-col items-center rounded-[64px]'>
                <h1 className="font-[800] text-[40px] leading-[150%] pt-[32px]">Want To Quickly Check Your Eligibility?</h1>
                <h2 className="pt-[32px] font-[700] text-[25px]">Complete Our Brief Eligibility Questionnaire!</h2>
                <button className="mt-[48px] mb-[32px] px-[16px] py-[8px] font-[600] text-[24px] border border-black rounded-[4px] hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300"  onClick={()=>{window.location.pathname= "/eligibilityCheck"}}>
                    Check Eligibility
                </button>
            </div>
        </div>
    )
}

export default StudentsPage