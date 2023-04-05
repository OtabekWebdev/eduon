import React from "react";
import { Link } from "react-router-dom";

import {
  FaGraduationCap,
  FaShoppingBasket,
  FaLocationArrow,
} from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";

export default function LeftNavbar() {
  return (
    <>
      <div className=" bg-white w-20 pt-20 h-screen border-r-2 border-black/20 fixed left-0 px-2">
        <div className="border-y-2 border-black/20">
          <Link className="text-center block my-4 ">
            <HiOutlineViewGrid className="text-3xl mx-auto stroke-blue stroke-2" />
            <span className=" text-xs  ">Bosh Sahifa</span>
          </Link>
          <Link className="text-center block my-4">
            <FaGraduationCap className="text-2xl mx-auto stroke-2" />
            <span className=" text-xs  ">Mening Kurslarim</span>
          </Link>
          <Link className="text-center block my-4">
            <FaShoppingBasket className="text-2xl mx-auto stroke-2" />
            <span className=" text-xs  ">Savatdagi Kurslar</span>
          </Link>
          <Link className="text-center block my-4">
            <FaLocationArrow className="text-xl mx-auto stroke-2" />
            <span className=" text-xs  ">Yaqinda joylangan</span>
          </Link>
        </div>
      </div>
    </>
  );
}
