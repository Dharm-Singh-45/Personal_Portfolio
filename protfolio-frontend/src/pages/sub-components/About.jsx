import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/portfolio/me",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);
  return (
    <div className="w-full flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg-text-[3.8rem] leading-[56px] md:leading-[67x] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold "
          style={{ background: "hsl(222.2 84% 4.9%)" }}
        >
          ABOUT
          <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid md:grid-cols-2 my-8 sm:my-8 gap-14">
        <div className="flex justify-center items-center">
          <img
            src={user.avatar && user.avatar.url}
            alt={user.fullName}
            className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350] lg:h-[450px]"
          />
        </div>
        <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
          <p>
            My name is Dharm Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Praesentium neque aliquid expedita necessitatibus, natus ea
            sit aperiam nostrum quasi culpa.
          </p>
          <p>
            I have interest in coding Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Minus consequatur id nesciunt aut delectus nemo
            magni reiciendis dicta quod eius?
          </p>
        </div>

        <div></div>
      </div>
      <p className="tracking-[1px] text-xl">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum cum
        officiis alias temporibus quae sapiente recusandae doloremque culpa?
        Architecto, asperiores corporis? Corrupti veniam fuga nulla itaque nisi
        minus autem adipisci!
      </p>
    </div>
  );
};

export default About;
