import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import styles from "./Login.module.css";

export default function Register() {
  const [RegisteData, setRegisterData] = useState({
    phone: "",
    request: false,
  });
  const [Shake, setShake] = useState(false);
  const InputData = (e) => {
    RegisteData.phone = e;
    if (e.length === 12) {
      RegisteData.request = true;
    } else {
      RegisteData.request = false;
    }
    setRegisterData(RegisteData);
  };

  const DetectReq = () => {
    if (!RegisteData.request && !Shake) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 300);
    }
  };

  return (
    <>
      <div className="container mx-auto pt-20">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-24"
        >
          <h1 className="text-3xl text-center font-bold mb-20">
            Ro'yxatdan o'tish
          </h1>
          <PhoneInput
            name="phone"
            value={RegisteData.phone}
            onChange={(e) => {
              InputData(e);
            }}
            country={"uz"}
            containerClass={
              styles.inputCon + " " + (Shake ? styles.inputShake : "")
            }
            inputClass={styles.input}
            buttonClass={styles.inputButton}
          />
          <div className="w-8/12 mx-auto">
            <button
              onClick={DetectReq}
              className={
                "hover:bg-blue bg-blue/50 duration-300 text-2xl font-semibold outline-none text-white p-5 w-full mt-10 mb-10 rounded-xl drop-shadow-xl"
              }
            >
              Davom etish
            </button>
            <div className="relative border-t border-black/30">
              <p className=" left-2/4 -top-3 bg-white px-3  absolute">Yoki</p>
            </div>
            <p className="text-center mt-4 text-black/60">
              Akkountingiz bormi? Unda{"  "}
              <Link to="/login" className="text-blue underline">
                Akkauntingizga kiring
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
