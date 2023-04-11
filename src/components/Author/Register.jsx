import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import AuthCode from "react-auth-code-input";

import styles from "./Login.module.css";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    phone: "",
    code: 0,
    request: false,
  });
  const [shake, setShake] = useState(false);

  const inputData = (e) => {
    const phone = e.replace(/\D/g, ""); // Telefon raqamdan faqat raqamlarni olib tashlash
    console.log(phone.length);
    setRegisterData({ ...registerData, phone });
  };

  const detectReq = () => {
    if (!registerData.request && !shake) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 300);
    }
  };

  const onSubmitOne = (e) => {
    e.preventDefault();
    if (registerData.phone.length === 12) {
      setRegisterData({ ...registerData, request: true });
    } else {
      detectReq();
      setRegisterData({ ...registerData, request: false });
    }
  };

  const AuthorCodeInput = (code) => {
    setRegisterData({ ...registerData, code });
    console.log(registerData);
  };

  return (
    <>
      <div className="container mx-auto pt-20">
        <form action="" onSubmit={onSubmitOne} className="mt-24">
          <h1 className="text-3xl text-center font-bold mb-20">
            Ro'yxatdan o'tish
          </h1>
          <div className={" overflow-hidden w-full h-24 justify-between"}>
            <div
              className={
                styles.full +
                " " +
                (registerData.request ? " -mt-24" : "") +
                " duration-300 mb-10"
              }
            >
              <PhoneInput
                name="phone"
                value={registerData.phone}
                onChange={inputData}
                country={"uz"}
                containerClass={
                  styles.inputCon + " " + (shake ? styles.inputShake : "")
                }
                inputClass={styles.input}
                buttonClass={styles.inputButton}
              />
            </div>
            <div className={styles.codeInputs + "  mx-auto w-max"}>
              <AuthCode
                autoFocus={registerData.request}
                onChange={AuthorCodeInput}
              />
            </div>
          </div>
          <div className="w-8/12 mx-auto">
            <button
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

// const CodeInputs = ({ registerData, setRegisterData }) => {
//   const [intValues, setIntValues] = useState(Array(6).fill(""));
//   const inputRefs = useRef([]);
//   const codeInputOnChange = (e, index) => {
//     const { value } = e.target;
//     if (value.length < 2) {
//       const newIntValues = [...intValues];
//       newIntValues[index] = value;
//       setIntValues(newIntValues);
//     }
//     if (value.length === 1 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//     const updatedRegisterData = { ...registerData };
//     updatedRegisterData.code = intValues.join(""); // intValues ni yangi qiymati bilan o'zgartiramiz
//     setRegisterData(updatedRegisterData);
//     console.log(registerData);
//   };

//   return (
//     <div className="mx-auto w-max">
//       {intValues.map((value, index) => (
//         <input
//           key={index}
//           ref={(el) => (inputRefs.current[index] = el)}
//           value={intValues[index]}
//           type="text"
//           onChange={(e) => codeInputOnChange(e, index)}
//           className="border w-16 h-16 text text-center text-3xl rounded-lg mx-2"
//         />
//       ))}
//     </div>
//   );
// };
