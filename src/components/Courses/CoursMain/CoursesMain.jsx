import React from "react";
import { useParams } from "react-router-dom";

export default function CoursesMain() {
  const { id } = useParams();
  console.log(id);
  const Coursedata = JSON.parse(localStorage.getItem("courses")).filter((c) => {
    return c.id === id;
  })[0];
  return (
    <>
      <div className="pt-20 pl-20">
        <div className="container">
          <h1 className=" text-3xl">{Coursedata.id}</h1>
          <h1 className=" text-3xl">{Coursedata.title}</h1>
          <h1 className=" text-3xl">{Coursedata.author}</h1>
          <h1 className=" text-3xl">{Coursedata.price}</h1>
        </div>
      </div>
    </>
  );
}
