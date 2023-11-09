import React from "react";
import PageBubble from "../components/page_bubble/page_bubble";

function Eligible() {
    return (
        <div>
            <PageBubble
                title="Congratulations!"
                description="You are eligible for the Canadian HigherEd Coaches Program! Please fill out the application. Continue to Apply!"
                buttonTitle="Apply Now!"
                navigateUrl="/student-application"/>
        </div>

    );
}

export default Eligible;
