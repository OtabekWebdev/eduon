import React from "react";

import { useStateValue } from "../../context/Context";
import { Link } from "react-router-dom";

// Icon
import { FaStar } from "react-icons/fa";

export default function CoursesBasket() {
  const [{ basket }, dispetch] = useStateValue();
  console.log(basket);
  let fullPrice = 0;
  basket.forEach((b) => {
    fullPrice += +b.price;
  });
  const RemoveBasket = (id) => {
    dispetch({
      type: "remove_basket",
      data: {
        id,
      },
    });
  };

  return (
    <>
      <div className=" pt-24 pl-16">
        <div className="container mx-auto pt-5">
          <h1 className=" text-3xl font-semibold">Xarid savati</h1>
          <div className="flex">
            {basket.length > 0 ? (
              <div className="pt-5 w-9/12">
                <p className=" text-xl text-black/60">
                  Savatda {basket.length} ta kurs va 0 ta vebinar mavjud
                </p>
                <div className="flex mt-6">
                  <div className="px-6 bg-black/5 rounded-2xl">
                    {basket.map((b) => (
                      <div key={b.id} className="flex items-center">
                        <div className="w-2/12 py-5">
                          <img
                            className="rounded-xl"
                            key={b.id}
                            src={b.img}
                            alt={b.titile}
                          />
                        </div>
                        <div className="w-7/12 pl-4 py-5">
                          <Link className="block text-2xl">{b.title}</Link>
                          <Link className="block underline pt-1 text-black/50">
                            {b.author}
                          </Link>
                          <div className="flex items-center py-2">
                            <FaStar className="text-blue text-2xl" />
                            <span className="text-blue pl-3">5</span>
                            <span className="pl-2 text-black/50">( 9 )</span>
                          </div>
                          <span className="text-black/50">
                            Jami 02:02:02 | 02 ma'ruza
                          </span>
                        </div>
                        <div className="w-3/12 text-end">
                          <h1 className=" text-2xl py-4">UZS {b.price}</h1>
                          <button
                            className="bg-red py-2 px-3 text-white rounded-md"
                            onClick={() => {
                              RemoveBasket(b.id);
                            }}
                          >
                            savatdan o'chirish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className=" text-xl pt-5 text-black/60">
                  Savatda kurslar mavjud emas
                </p>
                <div className="w-9/12"></div>
              </>
            )}
            <div className="w-3/12 pt-16 pl-8">
              <div className="border border-black/30 rounded-xl mt-2 p-6">
                <h1 className="text-2xl font-semibold">Jami:</h1>
                <h1 className="text-2xl font-semibold">UZS {fullPrice}</h1>
                <Link
                  to="/buy"
                  className="bg-blue py-2 w-full block rounded-xl mt-5 text-center text-lg text-white"
                >
                  Xarid qilish
                </Link>
              </div>
            </div>
          </div>
          <footer className=" pt-40">
            <div className="flex border-b border-black/20">
              <div className="w-1/4 px-5">
                <img src="./img/logo.png" alt="" className=" w-36" />
                <p className=" text-xl mt-10">
                  Bizni ijtimoiy tarmoqlarda kuzating
                </p>
                <div className="flex"></div>
              </div>
              <div className="w-1/4 px-5">
                <p className="text-black/50 text-2xl mb-5">Veb sayt</p>
                <Link to="/" className="block text-black text-lg">
                  Bosh sahifa
                </Link>
                <Link to="/" className="block text-black text-lg">
                  Kurslar
                </Link>
                <Link className="block text-black text-lg">FAQ</Link>
              </div>
              <div className="w-1/4 px-5">
                <p className="text-black/50 text-2xl mb-5">Ma'lumotlar</p>
                <Link to="/" className="block text-black text-lg">
                  Biz haqimizda
                </Link>
                <Link to="/" className="block text-black text-lg">
                  Foydalanish
                </Link>
              </div>
              <div className="w-1/4 px-5">
                <p className="text-black/50 text-2xl mb-5">Manzillar</p>
                <Link to="/" className="block text-black text-xl pb-3">
                  Toshkent sh. Yakkasaroy t. Shota Rustaveli 1-tor ko'chasi,
                  6-uy
                </Link>
                <Link to="/" className="block text-black text-xl pb-3">
                  +998 99 702 00 88
                </Link>
                <Link className="block text-black text-xl pb-3">
                  info@eduon.uz
                </Link>
              </div>
            </div>
            <p className="text-center py-3">
              © <Link className="text-blue">EduOn.</Link> Barcha huquqlar
              himoyalangan
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
