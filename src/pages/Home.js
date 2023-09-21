import React from 'react'
import PageBubble from './../components/page_bubble/page_bubble';

const Home = () => {
  return (
    <>
      <PageBubble
        title="Need Help In Your First Year Post-Secondary?"
        description="Apply Now To Be Matched With a Coach!"
        buttonTitle="Apply Now!"
        navigateUrl="/student-application"
      />
    </>
  )
}

export default Home