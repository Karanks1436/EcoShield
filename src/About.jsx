import { useState, useEffect, useRef } from "react";

import Navbar from "./Navbar";
// import Foot from "./Foot";
import "./About.css";

export default function About() {
  const [showModal, setShowModal] = useState(false);
  const [biodata, setBiodata] = useState({
    namea: "AYUSH RAWAT",
    namek: "KARAN KUMAR",
    names: "SAHIL GOYAL",
    namet: "TUSHAR GUPTA",
    namey: "YUVRAJ RAJPUT",

    githuba: "https://github.com/ayu51591",
    githubk: "https://github.com/Karanks1436",
    githubs: "https://github.com/sahilgoyal545",
    githubt: "https://github.com/tg39387-oss",
    githuby: "https://github.com/devilrajput1049-debug",

    contacta: "+91 90265 30382",
    contactk: "+91 90414 29065",
    contacts: "+91 90410 31190",
    contactt: "+91 62848 88576",
    contacty: "+91 73475 51997",

    emaila: "ayushrawat51591@gmail.com",
    emailk: "karanksxxx@gmail.com",
    emails: "goyalsahil852@gmail.com",
    emailt: "tg39387@gmail.com",
    emaily: "ryuvraj438@gmail.com",

    specialtya: "Backend(Python + Flask)",
    specialtyk: "Frontend(ReactJS), GitHub, Hosting ,Debugging Testing",
    specialtys: "Backend(Python + Flask), DataBase(SQLlite3)",
    specialtyt: "UI/UX Designer",
    specialtyy: "Graphic Designing, UI Designer",

    course: "Bachelor of Computer Applications(BCA)",
    address: "Bathinda, Punjab, India",
  });

  // 🔹 Refs for auto-scroll
  const sectionsRef = useRef([]);
  sectionsRef.current = [];

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // 🔹 Auto scroll effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (sectionsRef.current[index]) {
        sectionsRef.current[index].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      index = (index + 1) % sectionsRef.current.length;
    }, 4000); // scroll every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div ref={addToRefs} className="about-page-ayush bg-black">
        <div className="overlay"></div>
        <div className="outerdiv">
          <div className="about-content-box">
            <p className="intro-line">HELLO, I AM {biodata.namea}</p>
            <h1>
              I'M A <span className="text-primary">WEB DEVELOPER</span>
            </h1>
            <p className="subtitle">
              I love working with SQL, API's, and databases and always curious about how data moves and connects. Beyond the Backend I'm also exploring AI-thinking about how human thoughts can be translated into intelligent system. I enjoy experimenting, building projects, and finding creative ways to make tech feel smarter and smoother.
            </p>

            <ul className="bio-list">
              <li>
                <strong>Github:</strong> <a href={biodata.githuba}>{biodata.githuba}</a>
              </li>
              <li>
                <strong>Contact:</strong> {biodata.contacta}
              </li>
              <li>
                <strong>Email:</strong> {biodata.emaila}
              </li>
              <li>
                <strong>Course:</strong> {biodata.course}
              </li>
              <li>
                <strong>Specialty:</strong> {biodata.specialtya}
              </li>
              <li>
                <strong>Address:</strong> {biodata.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="about-page-karan bg-black">
        <div className="overlay"></div>
        <div className="about-content-box">
          <p className="intro-line">HELLO, I AM {biodata.namek}</p>
          <h1>
            I'M A <span className="text-primary">FULL STACK WEB DEVELOPER</span>
          </h1>
          <p className="subtitle">
            Passionate about crafting clean, efficient, and scalable code, I am
            a self-taught web developer who began this journey in 2020. What
            started as curiosity soon turned into a deep passion for building
            impactful digital experiences. Over the years, I have honed my
            skills in modern web technologies, focusing on both functionality
            and user experience.
          </p>

          <ul className="bio-list">
            <li>
              <strong>Github:</strong> <a href={biodata.githubk}>{biodata.githubk}</a>
            </li>
            <li>
              <strong>Contact:</strong> {biodata.contactk}
            </li>
            <li>
              <strong>Email:</strong> {biodata.emailk}
            </li>
            <li>
              <strong>Course:</strong> {biodata.course}
            </li>
            <li>
              <strong>Specialty:</strong> {biodata.specialtyk}
            </li>
            <li>
              <strong>Address:</strong> {biodata.address}
            </li>
          </ul>
        </div>
      </div>

      <div ref={addToRefs} className="about-page-sahil bg-black">
        <div className="overlay"></div>
        <div className="outerdiv">
          <div className="about-content-box">
            <p className="intro-line">HELLO, I AM {biodata.names}</p>
            <h1>
              I'M A <span className="text-primary">CREATIVE CODER</span>
            </h1>
            <p className="subtitle">
              I am a Creative Coder on a Journey of Discovery a passionate and
              curious learner with a deep interest in technology and
              problem-solving. I’ve always been fascinated by how systems work
              from the logic inside games to how websites function under the
              hood. As someone who enjoys turning ideas into real, working
              things through code, I’m currently on a journey to strengthen my
              skills in programming and web development. My approach to learning
              is hands-on: I love experimenting, failing, fixing, and finally
              figuring things out.
            </p>

            <ul className="bio-list">
              <li>
                <strong>Github:</strong>  <a href={biodata.githubs}>{biodata.githubs}</a>
              </li>
              <li>
                <strong>Contact:</strong> {biodata.contacts}
              </li>
              <li>
                <strong>Email:</strong> {biodata.emails}
              </li>
              <li>
                <strong>Course:</strong> {biodata.course}
              </li>
              <li>
                <strong>Specialty:</strong> {biodata.specialtys}
              </li>
              <li>
                <strong>Address:</strong> {biodata.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div ref={addToRefs} className="about-page-tushar reverse bg-black">
        <div className="overlay"></div>
        <div className="about-content-box ">
          <p className="intro-line">HELLO, I AM {biodata.namet}</p>
          <h1>
            I'M A <span className="text-primary">UI/UX DESIGNER</span>
          </h1>
          <p className="subtitle">
            I focus on every stage of the design process — from wireframing and
            prototyping to visual design and usability testing — ensuring that
            the final product is both aesthetically pleasing and easy to use. My
            approach blends creativity with data-driven decision making, allowing
            me to design experiences that are not just beautiful but also
            effective in solving real user problems.
          </p>

          <ul className="bio-list">
            <li>
              <strong>Github:</strong> <a href={biodata.githubt}>{biodata.githubt}</a>
            </li>
            <li>
              <strong>Contact:</strong> {biodata.contactt}
            </li>
            <li>
              <strong>Email:</strong> {biodata.emailt}
            </li>
            <li>
              <strong>Course:</strong> {biodata.course}
            </li>
            <li>
              <strong>Specialty:</strong> {biodata.specialtyt}
            </li>
            <li>
              <strong>Address:</strong> {biodata.address}
            </li>
          </ul>
        </div>
      </div>

      <div ref={addToRefs} className="about-page-yuvraj bg-black">
        <div className="overlay"></div>
        <div className="outerdiv">
          <div className="about-content-box">
            <p className="intro-line">HELLO, I AM {biodata.namey}</p>
            <h1>
              I'M A <span className="text-primary">GRAPHIC DESIGNER</span>
            </h1>
            <p className="subtitle">
              Driven by creativity and a keen eye for detail, I specialize in
              visual storytelling through design. As a graphic designer, my
              passion lies in transforming abstract ideas into engaging visuals
              that inspire, inform, and connect with audiences. Over the years,
              I have worked on a wide range of projects, including branding,
              digital media, print design, and marketing campaigns, each time
              ensuring that the visuals align seamlessly with the client’s
              vision and goals.
            </p>

            <ul className="bio-list">
              <li>
                <strong>Github:</strong>  <a href={biodata.githuby}>{biodata.githuby}</a>
              </li>
              <li>
                <strong>Contact:</strong> {biodata.contacty} 
              </li>
              <li>
                <strong>Email:</strong> {biodata.emaily}
              </li>
              <li>
                <strong>Course:</strong> {biodata.course}
              </li>
              <li>
                <strong>Specialty:</strong> {biodata.specialtyy}
              </li>
              <li>
                <strong>Address:</strong> {biodata.address}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
