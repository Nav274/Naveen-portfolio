import Experiencecard from "../components/Experiencecard";
import { ThemeContext } from "../themeProvider";
import React, { useContext } from "react";
const Experience = () => {

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
  
  <div
      id="experience"
      className={
        darkMode
          ? "bg-gray-100 pt-24 md:h-screen text-black md:pt-24 lg:h-screen lg:pt-24"
          : "bg-black pt-24 text-white md:h-screen"
      }
    >
    <h2 className="text-5xl font-bold px-4 md:px-0 pb-8 mt-18 text-center z-0">Experience</h2>
    <div className="max-w-[900px] min-h-[300px] h-full mx-auto px-4 pt-8">

      <Experiencecard
        company="Vindhya E-InfoMedia Pvt Ltd"
        role="Sales Representative"
        duration="October 2023 – May 2024 (6 months)"
        location="Bengaluru, Karnataka, India"
        desc="Telesales Representative for a loan company"
      />
      {/* <Experiencecard
        degree="Bachelor of Computer Appplication"
        university="SET Degree college"
        duration="October 2020 – May 2023"
        location="Bengaluru, Karnataka, India"
        cgpa="85%"
      />
      <Experiencecard
        degree="Pre-University College"
        university="Sheshadripuram Ind PU College"
        duration="June 2018 – May 2020"
        location="Bengaluru, Karnataka, India"
        cgpa="66%"
      />
      <Experiencecard
        degree="Xth Standard"
        university="ST Thomas Convent and High School"
        duration="June 2017 – May 2018"
        location="Bengaluru, Karnataka, India"
        cgpa="85%"
      /> */}
    </div>
    </div>
  
  );
};


export default Experience;
