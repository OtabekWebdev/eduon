import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import AuthCode from "react-auth-code-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import styles from "./Author.module.css";
import { auth } from "../../../config/firebase";
import axios from "axios";
import bcrypt from "bcryptjs-react";

export default function Register() {
  const [isMember, setIsMember] = useState(false);
  const [registerData, setRegisterData] = useState({
    phone: "",
    code: "",
    userToken: "",
    code_request: false,
    request: false,
  });
  const [shake, setShake] = useState(false);
  const [codeErr, setCodeErr] = useState(false);
  const [codeSuc, setCodeSuc] = useState(false);
  const form = useRef(null);
  function captcha(e) {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
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
      await axios
        .get(`http://localhost:8000/getUser/phone:${registerData.phone}`)
        .then(async (res) => {
          console.log(res);
          setIsMember(true);
          setTimeout(() => {
            setIsMember(false);
          }, 2000);
        })
        .catch((err) => {
          console.log("Submit");
          captcha(e);
          const phoneNumber = "+" + registerData.phone; // You can update this with registerData.phone
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              setRegisterData({ ...registerData, request: true });
            })
            .catch((error) => {
              console.log("SMS not sent", error);
              detectReq();
            });
          console.clear();
        });
    } else {
      detectReq();
    }
    if (registerData.request) {
      window.confirmationResult
        .confirm(registerData.code)
        .then(async (result) => {
          // User signed in successfully.
          setCodeSuc(true);
          const user = result.user;
          registerData.userToken = user.accessToken;
          const data = { ...registerData };
          setRegisterData(data);
          setTimeout(() => {
            setRegisterData({ ...registerData, code_request: true });
          }, 1300);
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

  return (
    <>
      {!registerData.code_request ? (
        <div className="container mx-auto pt-20">
          <div id="recaptcha-container"></div>
          <form
            action=""
            ref={form}
            onSubmit={onSignInSubmit}
            className="mt-24"
          >
            <h1 className="text-3xl text-center font-bold mb-20">
              Ro'yxatdan o'tish
            </h1>
            <div className={" overflow-hidden w-full h-24 justify-between"}>
              <label
                className={
                  (registerData.request ? " -mt-24" : "") +
                  " duration-300 mb-10 block"
                }
              >
                <PhoneInput
                  name="phone"
                  value={registerData.phone}
                  onChange={inputData}
                  country={"uz"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSignInSubmit(e);
                    }
                  }}
                  containerClass={
                    styles.inputCon + " " + (shake ? styles.inputShake : "")
                  }
                  inputClass={styles.input}
                  buttonClass={styles.inputButton}
                />
              </label>
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
            <div className="mt-0 mx-auto w-8/12 text-red">
              {isMember ? <h1>Bu raqam ro'yxatdan o'tgan</h1> : ""}
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
      ) : (
        <UserRegister
          phone={registerData.phone}
          accessToken={registerData.userToken}
        />
      )}
    </>
  );
}

const UserRegister = ({ phone, accessToken }) => {
  const [UserData, setUserData] = useState({
    phone,
    accessToken,
    surname: "",
    name: "",
    password: "",
    confirmPassword: "",
    request: false,
    password_request: false,
    askept: false,
  });
  const [inFocus, setInFocus] = useState({
    surname: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  const InputOnChange = (e) => {
    const value = { ...UserData };
    value[e.target.name] = e.target.value;
    setUserData({ ...value });
    setUserData({ ...value, password_request: false });
    setUserData({ ...value, request: false });
  };

  const navigate = useNavigate();
  const FormOnSubmit = async (e) => {
    e.preventDefault();
    if (
      UserData.surname === "" ||
      UserData.name === "" ||
      UserData.password === "" ||
      UserData.confirmPassword === ""
    ) {
      setUserData({ ...UserData, request: true });
    } else if (UserData.password !== UserData.confirmPassword) {
      setUserData({ ...UserData, password_request: true });
    } else if (!UserData.askept) {
      setUserData({ ...UserData, askept: true });
    } else {
      bcrypt.hash(UserData.password, 10, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          await axios
            .post("http://localhost:8000/addUser", {
              phone: UserData.phone,
              surname: UserData.surname,
              name: UserData.name,
              password: hash,
              accessToken: UserData.accessToken,
            })
            .then((res) => {
              if (res.status === 200) {
                navigate("/");
                localStorage.setItem(
                  "accessToken",
                  JSON.stringify(UserData.accessToken)
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };

  return (
    <>
      <div className="container mx-auto pt-20">
        <form action="" onSubmit={FormOnSubmit} className="mt-24">
          <h1 className="text-3xl text-center font-bold mb-20">
            Ro'yxatdan o'tish
          </h1>
          <label className="w-8/12 mx-auto flex justify-between gap-5 mb-10">
            <div className="w-1/2 relative">
              <input
                name="surname"
                type="text"
                value={UserData.surname}
                onChange={InputOnChange}
                onFocus={(e) => {
                  setInFocus({ ...inFocus, surname: true });
                }}
                onBlur={(e) => {
                  setInFocus({
                    ...inFocus,
                    surname: e.target.value.length > 0,
                  });
                }}
                className={
                  (inFocus.surname ? styles.focusInput : "") +
                  " border border-black/30 hover:border-black  w-full text-xl rounded-xl outline-2 outline-blue p-4"
                }
              />
              <span className=" text-xl duration-150 pointer-events-none absolute z-10 left-4 top-4 text-black/50">
                Familiyangiz
              </span>
            </div>
            <div className="w-1/2 relative">
              <input
                name="name"
                type="text"
                value={UserData.name}
                onChange={InputOnChange}
                onFocus={(e) => {
                  setInFocus({ ...inFocus, name: true });
                }}
                onBlur={(e) => {
                  setInFocus({
                    ...inFocus,
                    name: e.target.value.length > 0,
                  });
                }}
                className={
                  (inFocus.name ? styles.focusInput : "") +
                  " border border-black/30 hover:border-black  w-full text-xl rounded-xl outline-2 outline-blue p-4"
                }
              />
              <span className=" text-xl duration-150 pointer-events-none absolute z-10 left-4 top-4 text-black/50">
                Ismingiz
              </span>
            </div>
          </label>
          <label className="w-8/12 mx-auto flex justify-between gap-5  ">
            <div className="w-1/2 relative">
              <input
                name="password"
                type="text"
                value={UserData.password}
                onChange={InputOnChange}
                onFocus={(e) => {
                  setInFocus({ ...inFocus, password: true });
                }}
                onBlur={(e) => {
                  setInFocus({
                    ...inFocus,
                    password: e.target.value.length > 0,
                  });
                }}
                className={
                  (inFocus.password ? styles.focusInput : "") +
                  " border border-black/30 hover:border-black  w-full text-xl rounded-xl outline-2 outline-blue p-4"
                }
              />
              <span className=" text-xl duration-150 pointer-events-none absolute z-10 left-4 top-4 text-black/50">
                Parol
              </span>
            </div>
            <div className="w-1/2 relative">
              <input
                name="confirmPassword"
                type="text"
                value={UserData.confirmPassword}
                onChange={InputOnChange}
                onFocus={(e) => {
                  setInFocus({ ...inFocus, confirmPassword: true });
                }}
                onBlur={(e) => {
                  setInFocus({
                    ...inFocus,
                    confirmPassword: e.target.value.length > 0,
                  });
                }}
                className={
                  (inFocus.confirmPassword ? styles.focusInput : "") +
                  " border border-black/30 hover:border-black  w-full text-xl rounded-xl outline-2 outline-blue p-4"
                }
              />
              <span className=" text-xl duration-150 pointer-events-none absolute z-10 left-4 top-4 text-black/50">
                Parolni tasdiqlang
              </span>
            </div>
          </label>
          <div className="mt-5 w-8/12 mx-auto">
            <h1 className="text-red mb-3">
              {UserData.request ? `Malumotlaringiz xato yoki to'liq emas` : ""}
            </h1>
            <h1 className="text-red">
              {UserData.password_request
                ? `Parolni tasdiqlashdagi xatolik , Tasdiqlash paroli to'g'riligiga ishonch hosil qiling`
                : ""}
            </h1>
            <h1 className="text-red">
              {UserData.askept
                ? `Foydalanish shartlari bilan tanishganingizni tasdiqlang`
                : ""}
            </h1>
          </div>
          <div className="w-8/12 mx-auto mt-4">
            <label htmlFor="check" className="flex">
              <input
                onChange={(e) => {
                  setUserData({ ...UserData, askept: e.target.checked });
                }}
                type="checkbox"
                name=""
                id="check"
              />
              <p className="pl-5">Foydalanish shartlari bilan tanishdim</p>
            </label>
          </div>
          <div className="w-8/12 mx-auto">
            <button
              // type={registerData.code_request ? "button" : "submit"}
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
};
