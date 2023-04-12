import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import AuthCode from "react-auth-code-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import styles from "./Author.module.css";
import { auth } from "../../config/firebase";

export default function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    phone: "",
    code: "",
    code_request: false,
    request: false,
  });
  const [shake, setShake] = useState(false);
  const [codeErr, setCodeErr] = useState(false);
  const [codeSuc, setCodeSuc] = useState(false);
  function captcha(e) {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log(response);
            onSignInSubmit(e);
          },
        },
        auth
      );
    }
  }

  const inputData = (e) => {
    const phone = e.replace(/\D/g, "");
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

  const onSignInSubmit = async (e) => {
    e.preventDefault();

    if (registerData.phone.length === 12 && !registerData.request) {
      captcha(e);
      const phoneNumber = "+" + registerData.phone; // You can update this with registerData.phone
      const appVerifier = window.recaptchaVerifier;
      await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setRegisterData({ ...registerData, request: true });
        })
        .catch((error) => {
          console.log("SMS not sent", error);
          detectReq();
        });
    } else {
      detectReq();
    }
    if (registerData.request) {
      window.confirmationResult
        .confirm(registerData.code)
        .then((result) => {
          // User signed in successfully.
          setCodeSuc(true);
          const user = result.user;
          console.log(user);
          setRegisterData({ ...registerData, code_request: true });
        })
        .catch((error) => {
          setCodeErr(true);
          setTimeout(() => {
            setCodeErr(false);
          }, 750);
        });
    }
  };

  const AuthorCodeInput = (code) => {
    setRegisterData({ ...registerData, code });
  };

  if (registerData.code_request) {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <>
      <div className="container mx-auto pt-20">
        <div id="recaptcha-container"></div>
        <form action="" onSubmit={onSignInSubmit} className="mt-24">
          <h1 className="text-3xl text-center font-bold mb-20">
            Ro'yxatdan o'tish
          </h1>
          <div className={" overflow-hidden w-full h-24 justify-between"}>
            <div
              className={
                (registerData.request ? " -mt-24" : "") + " duration-300 mb-10"
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
            <div
              className={
                styles.codeInputs +
                " " +
                (codeErr ? styles.codeErr : "") +
                (codeSuc ? styles.codeSuc : "") +
                "  mx-auto w-max"
              }
            >
              <AuthCode
                allowedCharacters={"numeric"}
                autoFocus={registerData.request}
                onChange={AuthorCodeInput}
              />
            </div>
          </div>
          <div className="w-8/12 mx-auto">
            <button
              type={registerData.code_request ? "button" : "submit"}
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
