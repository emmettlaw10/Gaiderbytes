import React from "react";
import PageBubble from "../components/page_bubble/page_bubble";

function Ineligible() {
    return (
        <div>
            <PageBubble
                title="Ineligible"
                description="Unfortunately, according to your answers, you are ineligible for Canadian HigherEd coaches program at this time. If you have any questions please feel free to contact us."/>
        </div>
    );
}

export default Ineligible;
