import React from "react";
// Public imports
import styles from "./Navbar.module.css";
import logo from "./img/logo.png";

// Component imports
import { Link } from "react-router-dom";

// Icon imports
import {
  FaSearch,
  FaFilter,
  FaShoppingBasket,
  FaGraduationCap,
  FaLocationArrow,
} from "react-icons/fa";
import { HiOutlineBookOpen, HiOutlineViewGrid } from "react-icons/hi";

import { useStateValue } from "../context/Context";

export default function Navbar() {
  const [{ basket }] = useStateValue();

  return (
    <>
      <nav className=" z-[99] py-4 fixed w-full bg-white border-b-2 border-black/20">
        <div className="container max-w-[1920px] m-auto px-4">
          <div className="flex items-center">
            {/* <button className="w-min">
              <FaBars className="text-xl" />
            </button> */}
            <div className="flex items-center justify-between w-full">
              <div className="max-w-max flex justify-between items-center">
                <Link to="/">
                  <img src={logo} className={styles.img} alt="" />
                </Link>
                <div>
                  <button className="bg-blue flex items-center justify-between ml-7 mx-2 px-4 py-2 rounded-2xl text-white">
                    <HiOutlineBookOpen className="text-3xl" />
                    <span className="ml-2 text-xl">Kurslar</span>
                  </button>
                </div>
              </div>
              <div className="w-[35%] flex items-center justify-between">
                <div className="flex items-center w-full">
                  <div className="flex w-full justify-between border-2 border-black/25 p-2 rounded-2xl ">
                    <FaSearch className="text-2xl text-black/25 mr-5" />
                    <input
                      type="text"
                      placeholder="Qidirish..."
                      className="w-full outline-none"
                    />
                  </div>
                </div>
                <button className="flex items-center w-min text-xl">
                  <FaFilter className=" mx-9" />
                  Filter
                </button>
              </div>
              <div className="w-[35%] xl:w-[25%] flex items-center justify-between">
                <Link className=" text-xl ">Ramazon taqvimi</Link>
                <Link className="">Spiker</Link>
                <Link to="/mybasket" className="relative text-lg block">
                  {basket.length > 0 && (
                    <div className="absolute h-4 w-4 text-xs flex justify-center items-center -right-2 -top-3 bg-blue p-1 rounded-full text-white">
                      {basket.length}
                    </div>
                  )}
                  <FaShoppingBasket />
                </Link>
                <Link className="bg-blue text-white rounded-xl py-2 px-4">
                  Boshlash
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className=" z-[98] bg-white w-20 pt-20 h-screen border-r-2 border-black/20 transi fixed left-0 px-2">
        <div className="border-b-2 border-black/20">
          <Link
            to="/"
            className="text-center block my-5 duration-100 hover:text-blue"
          >
            <HiOutlineViewGrid className="text-3xl mx-auto stroke-blue stroke-2" />
            <span className=" text-xs  ">Bosh Sahifa</span>
          </Link>
          <Link className="text-center block my-5 duration-100 hover:text-blue">
            <FaGraduationCap className="text-2xl mx-auto stroke-2" />
            <span className=" text-xs  ">Mening Kurslarim</span>
          </Link>
          <Link
            to="/mybasket"
            className="text-center block my-5 duration-100 hover:text-blue relative"
          >
            {basket.length > 0 && (
              <div className="absolute h-4 w-4 text-xs flex justify-center items-center right-2 -top-3 bg-blue p-1 rounded-full text-white">
                {basket.length}
              </div>
            )}
            <FaShoppingBasket className="text-2xl mx-auto stroke-2" />
            <span className=" text-xs  ">Savatdagi Kurslar</span>
          </Link>
          <Link className="text-center block my-5 duration-100 hover:text-blue">
            <FaLocationArrow className="text-xl mx-auto stroke-2" />
            <span className=" text-xs  ">Yaqinda joylangan</span>
          </Link>
        </div>
      </div>
    </>
  );
}
