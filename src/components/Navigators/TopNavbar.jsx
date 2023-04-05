import React from "react";
// Public imports
import styles from "./TopNavbar.module.css";
import logo from "./img/logo.png";

// Component imports
import { Link } from "react-router-dom";

// Icon imports
import { FaBars, FaSearch, FaFilter, FaShoppingBasket } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";

export default function TopNavbar() {
  return (
    <>
      <nav className="py-4 fixed w-full bg-white border-b-2 border-black/20">
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
                <Link>
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
    </>
  );
}
