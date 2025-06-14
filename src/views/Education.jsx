import Educationcard from "../components/Educationcard";
import { ThemeContext } from "../themeProvider";
import React, { useContext } from "react";
const Education = () => {

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
  
  <div
      id="education"
      className={
        darkMode
          ? "bg-gray-100 pt-24 md:h-screen text-black md:pt-24 lg:h-screen lg:pt-24"
          : "bg-black pt-24 text-white md:h-screen"
      }
    >
    <h2 className="text-5xl font-bold px-4 md:px-0 pb-8 mt-18 text-center z-0">Education</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Educationcard
        degree="Master of Computer Appplication"
        university="Jain University"
        duration="November 2023 – July 2025"
        location="Bengaluru, Karnataka, India"
        cgpa="8.5/10.00"
      />
      <Educationcard
        degree="Bachelor of Computer Application"
        university="SET Degree college"
        duration="October 2020 – May 2023"
        location="Bengaluru, Karnataka, India"
        cgpa="85%"
      />
      <Educationcard
        degree="Pre-University College"
        university="Sheshadripuram Ind PU College"
        duration="June 2018 – May 2020"
        location="Bengaluru, Karnataka, India"
        cgpa="66%"
      />
      <Educationcard
        degree="Xth Standard"
        university="ST Thomas Convent and High School"
        duration="June 2017 – May 2018"
        location="Bengaluru, Karnataka, India"
        cgpa="85%"
      />
    </div>
    </div>
  
  );
};


export default Education;
