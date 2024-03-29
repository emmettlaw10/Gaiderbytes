import React from 'react'
import PageBubble from './../components/page_bubble/page_bubble';
import CategoryBox from './../components/cateogry_box/category_box';

const qualifications = [
    {
        title: "Education",
        description: "You have attended post-secondary schooling at a publicly-funded institution in Canada for a mininmum of two years.",
        imageUrl: "/images/education.svg",
        imageAlt: "Education Logo"
    },
    {
        title: "Employment",
        description: "It would be an additional benefit if you have work experience at a post-secondary institution.",
        imageUrl: "/images/employment.svg",
        imageAlt: "Employment Logo"
    },
    {
        title: "Residence",
        description: "I currently reside and work in Canada.",
        imageUrl: "/images/residence.svg",
        imageAlt: "Residence Logo"
    },
    {
        title: "Availablity",
        description: "I will be available to provide personalized coaching at least once a month for a period of two terms.",
        imageUrl: "/images/availablity.svg",
        imageAlt: "Availablity Logo"
    }
]

const CoachesPage = () => {
    return (
      <>
        <PageBubble
          title="Coaching Qualifications"
          description="Here are some qualifications you need to meet."
          buttonTitle="Apply Now!"
          navigateUrl="/coach-application"
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
      </>
    );
  }
  

export default CoachesPage