import React from "react";
import PageBubble from "../components/page_bubble/page_bubble";

function ServerError() {
    return (

      <div>
          <PageBubble
              title="Application Failed"
              description="Sorry, we are having technical difficulties on our side. Please try again later"/>
      </div>
    );
  }
  
  export default ServerError;
