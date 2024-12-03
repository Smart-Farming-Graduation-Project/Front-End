import React from "react";
import memberImage1 from "../../assets/images/member-1.jpeg";
import memberImage2 from "../../assets/images/member-2.jpeg";
import memberImage3 from "../../assets/images/member-3.jpeg";
import MemberCard from "./MemberCard";

const Members = () => {
  return (
    <div className="members p-sec bg-light-green-section">
      <div className="container">
        <h2 className="text-center text-3xl sm:text-4xl mb-4">What Our Members Say</h2>
        <p className=" text-center text-sm mb-12">Hear from farmers who have benefited from our community.</p>
        <div className="members-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MemberCard memberImage={memberImage1} name="Abdo Ibrahim" jop="Front-End Developer"/>
          <MemberCard memberImage={memberImage2} name="Reda Elsayed" jop="Back-End Developer"/>
          <MemberCard memberImage={memberImage3} name="John Doe" jop="Full-Stack Developer"/>
        </div>
      </div>
    </div>
  );
};

export default Members;
