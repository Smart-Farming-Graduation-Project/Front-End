import React from "react";
import img_about from "../assets/images/landing.jpeg";
import Crumb from "../components/banner/Crumb";
import Heading from "../components/utils/Heading";
import Image from "next/image";
import abdo from "../assets/images/abdo.png";
import teamimg from "../assets/images/member-1.jpeg";
import "./about.css";
import Link from "next/link";
function About() {
  const teams = [
    {
      name: "Abdulrahman Ibrahim",
      role: "Frontend Developer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/abdo-ibrahim",
    },
    {
      name: "Reda Elsayed",
      role: "Backend Developer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/redaelsayed/",
    },
    {
      name: "Mohamed Elofa",
      role: "Backend Developer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/mohamedelofa",
    },
    {
      name: "Mohamed Elsayed",
      role: "Backend Developer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/mohamed-elsayed-265328249",
    },
    {
      name: "Ahmed Fathy",
      role: "Embedded Systems Engineer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/ahmed-fathy0/",
    },
    {
      name: "Ehab Magdy",
      role: "Embedded Systems Engineer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/ehabmagdyy/",
    },
    {
      name: "Ziad Ashraf",
      role: "Embedded Systems Engineer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/ziiaadashraf",
    },
    {
      name: "Mohamed Ashraf",
      role: "Embedded Systems Engineer",
      img: abdo,
      linkedin: "http://www.linkedin.com/in/mohamedashraf7",
    },
    {
      name: "Ahmed Mohamed",
      role: "AI Research Engineer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/ahmedalmohamdy/",
    },
    {
      name: "Ahmed Mohamed Sharaf",
      role: "Machine Learning Specialist",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/ahmedsharaf9/",
    },
    {
      name: "Mahmoud Ashra",
      role: "AI Engineer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/mahmoudashrafsaad",
    },
    {
      name: "Marwan Walid",
      role: "AI Researcher",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/marwanwalid",
    },
    {
      name: "Ali Gad",
      role: "Mobile Developer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/aligadali/",
    },
    {
      name: "Noha Ahmed",
      role: "Mobile UI/UX Developer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/noha-ahmad-3935b3225",
    },
    {
      name: "Menna Abd Elrahim",
      role: "Mobile Developer",
      img: abdo,
      linkedin: "https://www.linkedin.com/in/menna2024",
    },
  ];
  return (
    <div className="">
      <Crumb crumb={img_about} />
      <div className="container p-sec">
        <Heading heading="Meat Our Team" paragraph="Team Members" />
        <p className="text-center -mt-5">
          We are a team from Zagazig University, and this is our graduation project. We are passionate about Engineering and have put a lot of effort into creating this project. We hope you find it useful and informative. Thank you for visiting our
          page!
        </p>
        <div className="about-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {teams.map((team, index) => (
            <Link href={team.linkedin} key={index} target="_blank" className="box relative shadow-md cursor-pointer">
              <div className="w-full h-full">
                <Image src={team.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="info absolute w-full h-full flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-yellow">{team.name}</span>
                <span className="block text-white text-lg">{team.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
