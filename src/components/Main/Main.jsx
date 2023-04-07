import React from "react";
import { Link } from "react-router-dom";
import CoursCard from "../Courses/CoursCard/CoursCard";

const shortid = require("shortid");

export default function Main({ basket, setBasket }) {
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
  let Courses = localStorage.getItem("courses")
    ? JSON.parse(localStorage.getItem("courses"))
    : [];

  if (Courses.length === 0) {
    for (let i = 0; i < 10; i++) {
      Courses.push({
        id: shortid.generate(),
        title: "Web Dasturlash",
        author: "Otabek Qarshiboyev",
        price: 1200000,
        img: "./img/course_img.jpg",
      });
    }
    localStorage.setItem("courses", JSON.stringify(Courses));
  }

  return (
    <>
      <div className="pt-20 pl-20 min-[1970px]:pl-0">
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
          <div className="flex flex-wrap ">
            {Courses.map((course, index) => (
              <CoursCard
                key={index}
                id={course.id}
                img={course.img}
                title={course.title}
                author={course.author}
                price={course.price}
                basket={basket}
                setBasket={setBasket}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
