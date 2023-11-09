import React from 'react'
import PageBubble from "../components/page_bubble/page_bubble";
import CategoryBox from "../components/cateogry_box/category_box";

const StudentsPage = () => {
    const qualifications = [
        {
            title: "Education",
            description: "You have been accepted to a post-secondary program at a publicly-funded institution in Canada.",
            imageUrl: "/images/education.svg",
            imageAlt: "Education Logo"
        },
        {
            title: "Entering First Year",
            description: "You are currently entering or completing your first year of study.",
            imageUrl: "/images/employment.svg",
            imageAlt: "Employment Logo"
        },
        {
            title: "Residence",
            description: "You currently reside in Canada.",
            imageUrl: "/images/residence.svg",
            imageAlt: "Residence Logo"
        },
        {
            title: "Drive to succeed",
            description: "You are motivated to make the most of your education, and you'd like some extra guidance to help you succeed.",
            imageUrl: "/images/availablity.svg",
            imageAlt: "Availablity Logo"
        }
    ]

    return (
        <div >
            <PageBubble
                title="Student Qualifications"
                description="Here are some qualifications you need to meet."
                buttonTitle="Check Eligibility & Apply Now!"
                navigateUrl="/eligibilityCheck"
            />
            <div className="grid grid-cols-2 gap-10 mt-[32px] mb-[64px] mx-[64px]">
                {qualifications.map((qualification) => (
                    <CategoryBox
                        key={qualification.title} // Add a unique key
                        title={qualification.title}
                        description={qualification.description}
                        imageUrl={qualification.imageUrl}
                        imageAlt={qualification.imageAlt}
                    />
                ))}
            </div>
        </div>
    )
}

export default StudentsPage