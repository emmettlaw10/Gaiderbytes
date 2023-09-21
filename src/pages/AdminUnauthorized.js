import React from "react";

function AdminUnauthorized() {
    return (
        <div className="p-3 rounded-md m-2 flex flex-col items-center">
            <p>Incorrect Login Information, Please try Again</p>
            <button className="mt-[48px] mb-[32px] px-[16px] py-[8px] font-[600] text-[24px] border border-black rounded-[4px] hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300"  onClick={()=>{window.location.pathname= "/adminLogin"}}>
                Try Again
            </button>
        </div>
    );
}

export default AdminUnauthorized;
