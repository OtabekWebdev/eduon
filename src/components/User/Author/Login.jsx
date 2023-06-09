import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Author.module.css";

// Icon imports
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
  const [LoginData, setLoginData] = useState({ phone: "", password: "" });
  const [PassShow, setPassShow] = useState(false);
  const [SpanShow, setSpanShow] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [MemberPassword, setMemberPassword] = useState(false);

  const InputData = (value) => {
    if (value.target) {
      setLoginData({ ...LoginData, password: value.target.value });
    } else {
      setLoginData({ ...LoginData, phone: value });
    }
  };

  const AddClass = (q) => {
    setSpanShow(q);
  };

  const navigate = useNavigate();
  const FormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `http://localhost:8000/getUser/phone:${LoginData.phone}:password:${LoginData.password}`
      )
      .then((res) => {
        navigate("/");
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
      })
      .catch((err) => {
        if (err.response.status === 501) {
          setIsMember(true);
          setTimeout(() => {
            setIsMember(false);
          }, 2000);
        } else if (err.response.status) {
          setMemberPassword(true);
          setTimeout(() => {
            setMemberPassword(false);
          }, 2500);
        }
        console.clear();
        console.log("Login err : ", err);
      });
  };

  return (
    <>
      <div className="container mx-auto pt-20">
        <div id="recaptcha-container"></div>
        <form action="" onSubmit={FormSubmit} className="mt-24">
          <h1 className="text-3xl text-center font-bold mb-20">
            Profilga kirish
          </h1>
          <PhoneInput
            name="phone"
            value={LoginData.phone}
            onChange={(e) => {
              InputData(e);
            }}
            country={"uz"}
            containerClass={styles.inputCon}
            inputClass={styles.input}
            buttonClass={styles.inputButton}
          />
          <div
            className={
              (SpanShow ? "border-blue" : "") +
              " mt-10 mx-auto relative flex justify-between w-8/12 rounded-xl border p-5 border-black/40"
            }
          >
            <input
              name="password"
              value={LoginData.password}
              onChange={InputData}
              onFocus={() => {
                AddClass(true);
              }}
              onBlur={() => {
                AddClass(false);
              }}
              type={PassShow ? "text" : "password"}
              className={styles.pass_input + " w-3/4 outline-none text-xl"}
            />
            <span
              className={
                styles.input_after +
                " " +
                (SpanShow
                  ? styles.span_show
                  : LoginData.password.length > 0
                  ? styles.span_show
                  : "") +
                " absolute"
              }
            >
              Parolingizni kiriting
            </span>
            <div
              type="button"
              className="text-2xl"
              onClick={() => {
                setPassShow(!PassShow);
              }}
            >
              {PassShow ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          <div className="w-8/12 mx-auto text-red">
            {isMember ? <h1>Foydalanuvchi topilmadi</h1> : ""}
            {MemberPassword ? <h1>Kiritgan parolingiz xato</h1> : ""}
          </div>
          <div className="w-8/12 mx-auto">
            <div className="flex justify-between mt-10">
              <div className="flex">
                <input
                  type="checkbox"
                  className="mr-3 scale-150"
                  value="Tizimda eslab qolish"
                  name=""
                  id="save_me"
                />
                <label htmlFor="save_me" className="cursor-pointer">
                  Tizimda eslab qolish
                </label>
              </div>
              <Link className="underline">Parolingizni unutdingizmi</Link>
            </div>
            <button className="bg-blue/50 hover:bg-blue duration-300 text-2xl font-semibold outline-none text-white p-5 w-full mt-10 mb-10 rounded-xl drop-shadow-xl">
              Tizimga Kirish
            </button>
            <div className="relative border-t border-black/30">
              <p className=" left-2/4 -top-3 bg-white px-3  absolute">Yoki</p>
            </div>
            <p className="text-center mt-4 text-black/60">
              Akkauntingiz yo'qmi? Unda{" "}
              <Link to="/register" className="text-blue underline">
                Ro'yxatdan o'ting
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
