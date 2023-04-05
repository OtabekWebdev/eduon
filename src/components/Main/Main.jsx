import React from "react";
import { Link } from "react-router-dom";
import CoursCard from "../Courses/CoursCard/CoursCard";
// Public imports
// import style from "./Main.module.css";

export default function Main() {
  let filterItem = [
    "Biznes",
    "IT va dasturlash",
    "Foto va Video",
    "Ta'lim va ilmiy fanlar",
    "Marketing",
    "San'at",
    "Shaxsiy o'sish",
    "Boshqalar",
  ];

  let Courses = [];
  for (let i = 0; i <= 10; i++) {
    Courses.push({
      title: "Web Dasturlash",
      author: "Otabek Qarshiboyev",
      price: "1 200 000",
      img: "https://cdn4.telegram-cdn.org/file/totHZiQW5oe2Nj9QG3HMP1op4kFW6Ukx1q0qJr4F3uo2E6OHHk20weKgZj-9616Y7us944Y0ivIrmh3IbzOO3q_rgySMVuVdK5knBM0wYUMOH5ycW6NJ7iUTPSnsLviHymi3utgDTEcVKeej8gRnnL5PWE3cMcyQJiWUbSTkafG8SAfrf0PPtJ2xDGZv_W9aE5j3fEpoCvkP01VBjfu9kZ0bl_5sSKPo7sbHwOIuHS2U7KRl8QpY1sRjDxr1tbb3NuMCkj3_ovPnKUOGtzTrlv4N6WwS6wCiuB9Mdi2rGqDUF0ECSxhikuQcrtz6c2NkqbpIDHz1w-djTfyfQrX3pw.jpg",
    });
  }
  return (
    <>
      <div className="h-[200vh] pt-20 pl-20 min-[1970px]:pl-0">
        <div className="overflow-x-scroll min-[1970px]:overflow-x-hidden lg:border-b border-black/20">
          <div className="container max-w-[1850px] mx-auto">
            <ul className="flex items-center justify-between w-full py-4">
              {filterItem.map((item, index) => (
                <li key={index}>
                  <Link
                    to="/"
                    className=" mx-10  block w-max bg-black/20 px-4 py-2 rounded-2xl border border-black/50"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container max-w-[1850px] mx-auto">
          <div className="flex flex-wrap">
            {Courses.map((course, index) => (
              <CoursCard
                key={index}
                img={course.img}
                title={course.title}
                author={course.author}
                price={course.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
