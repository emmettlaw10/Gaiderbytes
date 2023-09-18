import React from "react";
import user_review_pic from "../images/user_review_pic.png"
function AboutUs (){
    return(
        <div>
            <div className="m-2 shadow-lg bg-red-700 text-white rounded-md p-3">
                <h1 className="text-3xl font-bold">About Us</h1>
            </div>
            <div className="flex flex-row">
                <div className="m-2 shrink w-3/4">
                    <h1 className="text-3xl">Our Mission</h1>
                    <p>The organization's mission statement will be in this section.</p>
                </div>
                <div className="m-2 shrink w-3/4">
                    <h1 className="text-3xl">User Reviews</h1>
                    <div className="bg-gray-300 rounded-md p-3">
                        <div>
                            <img src={user_review_pic} alt="User review picture" className="w-16 p-1"/>
                        </div>
                        <p>"Canadian Higher-Ed Coaches made me more confortable with transitioning to post-secondary."</p>
                        <p className="font-bold">- Anon Name</p>
                    </div>
                    <br/>
                    <div className="bg-gray-300 rounded-md p-3">
                        <div>
                            <img src={user_review_pic} alt="User review picture" className="w-16 p-1"/>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p className="font-bold">- User Name</p>
                    </div>
                </div>
                </div>
                <div className="flex flex-row">
                <div className="m-2 shrink w-3/4">
                    <h1 className="text-3xl">Our Services</h1>
                    <p>We offer 1 on 1 coaching to underserved first year post-secondary students in Canada. Click below for pricing details.</p>
                    <button className="bg-red-500 p-3 rounded-md hover:bg-red-200">Pricing</button>
                </div>
                <div className="m-2 shrink w-3/4">
                    <h1 className="text-3xl">Have any Questions?</h1>
                    <p>If you have any questions or are interested in volunteering, please Contact us:</p>
                    <p><strong>Address:</strong> 123 AnyStreet Road City, Prov., A0X1X2 <br/> <strong>Email Nancy Van Dorp: </strong>nancy@cdnhecoaches.org
                        <br/><strong>Phone:</strong> 416-801-0135
                    </p>
                    <h2 className="text-xl">Or visit our FAQs</h2>
                    <button className="bg-red-500 p-3 rounded-md hover:bg-red-200">FAQS</button>
                </div>
            </div>
        </div>
    )
}
export default AboutUs;