import React from 'react'
import PageBubble from './../components/page_bubble/page_bubble';

const Home = () => {
    const style = {
        marginTop: 100,
        position: 'absolute',
        textDecoration: "underline"

    }
  return (
    <div className='min-h-full'>
        <div>
            <PageBubble
                title="Need Help In Your First Year Post-Secondary?"
                description="Apply Now To Be Matched With a Coach!"
                buttonTitle="Apply Now!"
                navigateUrl="/student-application"
            />
        </div>


        <footer className='flex flex-col items-center align-bottom sticky bottom-0 cursor-pointer' style={style}>
            <a onClick={()=>{window.location.pathname= "/admin"}}>
                Admin login
            </a>
        </footer>
    </div>
  )
}

export default Home