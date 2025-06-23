import React from "react";
import img_about from "../assets/images/landing.jpeg";
import Crumb from "../components/banner/Crumb";
import Heading from "../components/utils/Heading";
import Image from "next/image";
import abdo from "../assets/images/teams/abdo_ibrahim.png";
import ahmed_elmohamedy from "../assets/images/teams/ahmed_elmohamedy.png";
import ahmed_fathy from "../assets/images/teams/ahmed_fathy.png";
import ahmed_sharaf from "../assets/images/teams/ahmed_sharaf.png";
import ali_gad from "../assets/images/teams/ali_gad.png";
import ehab_magdy from "../assets/images/teams/ehab_magdy.png";
import Mahmoud_Ashraf from "../assets/images/teams/Mahmoud_Ashraf.jpg";
import marwan_walid from "../assets/images/teams/marwan_walid.png";
import menna from "../assets/images/teams/menna.png";
import mohamed_ashraf from "../assets/images/teams/mohamed_ashraf.png";
import mohamed_elofa from "../assets/images/teams/mohamed_elofa.png";
import Mohamed_Elsayed from "../assets/images/teams/Mohamed_Elsayed.png";
import noha_ahmed from "../assets/images/teams/noha_ahmed.png";
import reda_elsayed from "../assets/images/teams/reda_elsayed.jpg";
import ziad_ashraf from "../assets/images/teams/ziad_ashraf.png";

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
      img: reda_elsayed,
      linkedin: "https://www.linkedin.com/in/redaelsayed/",
    },
    {
      name: "Mohamed Elofa",
      role: "Backend Developer",
      img: mohamed_elofa,
      linkedin: "https://www.linkedin.com/in/mohamedelofa",
    },
    {
      name: "Mohamed Elsayed",
      role: "Backend Developer",
      img: Mohamed_Elsayed,
      linkedin: "https://www.linkedin.com/in/mohamed-elsayed-265328249",
    },
    {
      name: "Ahmed Fathy",
      role: "Embedded Systems Engineer",
      img: ahmed_fathy,
      linkedin: "https://www.linkedin.com/in/ahmed-fathy0/",
    },
    {
      name: "Ehab Magdy",
      role: "Embedded Systems Engineer",
      img: ehab_magdy,
      linkedin: "https://www.linkedin.com/in/ehabmagdyy/",
    },
    {
      name: "Ziad Ashraf",
      role: "Embedded Systems Engineer",
      img: ziad_ashraf,
      linkedin: "https://www.linkedin.com/in/ziiaadashraf",
    },
    {
      name: "Mohamed Ashraf",
      role: "Embedded Systems Engineer",
      img: mohamed_ashraf,
      linkedin: "http://www.linkedin.com/in/mohamedashraf7",
    },
    {
      name: "Ahmed Mohamed",
      role: "AI Research Engineer",
      img: ahmed_elmohamedy,
      linkedin: "https://www.linkedin.com/in/ahmedalmohamdy/",
    },
    {
      name: "Ahmed Mohamed Sharaf",
      role: "Machine Learning Specialist",
      img: ahmed_sharaf,
      linkedin: "https://www.linkedin.com/in/ahmedsharaf9/",
    },
    {
      name: "Mahmoud Ashraf",
      role: "AI Engineer",
      img: Mahmoud_Ashraf,
      linkedin: "https://www.linkedin.com/in/mahmoudashrafsaad",
    },
    {
      name: "Marwan Walid",
      role: "AI Researcher",
      img: marwan_walid,
      linkedin: "https://www.linkedin.com/in/marwanwalid",
    },
    {
      name: "Ali Gad",
      role: "Mobile Developer",
      img: ali_gad,
      linkedin: "https://www.linkedin.com/in/aligadali/",
    },
    {
      name: "Noha Ahmed",
      role: "Mobile UI/UX Developer",
      img: noha_ahmed,
      linkedin: "https://www.linkedin.com/in/noha-ahmad-3935b3225",
    },
    {
      name: "Menna Abd Elrahim",
      role: "Mobile Developer",
      img: menna,
      linkedin: "https://www.linkedin.com/in/menna2024",
    },
  ];

  return (
    <div className="">
      <Crumb crumb={img_about} />
      <div className="container p-sec">
        <Heading heading="Meet Our Team" paragraph="Team Members" />
        <p className="text-center -mt-5">
          We are a team from Zagazig University, and this is our graduation project. We are passionate about Engineering and have put a lot of effort into creating this project. We hope you find it useful and informative. Thank you for visiting our
          page!
        </p>
        <div className="about-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {teams.map((team, index) => (
            <Link href={team.linkedin} key={index} target="_blank" className="team-member group">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={team.img}
                  alt={`${team.name} - ${team.role}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-75"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                  <div className="text-center p-4 pb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                    <p className="text-yellow-400 text-sm font-medium">{team.role}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
