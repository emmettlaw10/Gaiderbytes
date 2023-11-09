import React from 'react'
import PageBubble from './../components/page_bubble/page_bubble';

const Home = () => {
    return (
        <div className='min-h-full items-center'>
            <div>
                <PageBubble
                    title="Need Help In Your First Year Post-Secondary?"
                    description="Interested in coaching in critical skills for students?"
                    buttonTitle="Learn More!"
                    navigateUrl="/students"
                />
            </div>
            <div>
                <PageBubble
                    title="Interested in becoming a coach?"
                    description="Do you want to help mentor driven students?"
                    buttonTitle="Learn More!"
                    navigateUrl="/coaches"
                />
            </div>
            <div>
                <footer className='bottom-0 left-1/2 cursor-pointer absolute underline' >
                    <a onClick={()=>{window.location.pathname= "/admin"}}>
                        Admin login
                    </a>
                </footer>
            </div>


        </div>
    )
}

export default Home