import React from "react";

function MatchSuccess () {

    return(
        <div>
            <h1>Match Successful! </h1>
            <h2>The selected match has been made</h2>
            <button className="mt-[48px] mb-[32px] px-[16px] py-[8px] font-[600] text-[24px] border border-black rounded-[4px] hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300"  onClick={()=>{window.location.pathname= "/admin/matching"}}>
                Make Another Match
            </button>
        </div>
    );
}

export default MatchSuccess
