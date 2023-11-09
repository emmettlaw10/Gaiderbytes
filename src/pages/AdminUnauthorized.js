import React from "react";
import PageBubble from "../components/page_bubble/page_bubble";

function AdminUnauthorized() {
    return (
        <div >
            <PageBubble
                title="Login Failed"
                description="Incorrect Login Information, Please try Again."
                buttonTitle="Try Again"
                navigateUrl="/admin"
            />
        </div>
    );
}

export default AdminUnauthorized;
