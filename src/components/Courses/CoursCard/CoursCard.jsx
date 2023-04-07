import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";

import { useStateValue } from "./../../context/Context";

export default function CoursCard({ id, img, title, author, price }) {
  const [{ basket }, dispetch] = useStateValue();

  const [inBasket, setInBasket] = useState(basket.some((b) => b.id === id));
  const CtrlBasket = () => {
    if (!basket.some((b) => b.id === id)) {
      dispetch({
        type: "add_basket",
        data: {
          id,
          img,
          title,
          author,
          price,
        },
      });
      setInBasket(true);
    } else {
      dispetch({
        type: "remove_basket",
        data: {
          id,
        },
      });
      setInBasket(false);
    }
  };

  return (
    <>
      <div className="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-[1.5%] h-min pt-5">
        <div className="w-full h-1/3">
          <img
            src={img}
            alt={title}
            className="w-full block h-1/3 rounded-3xl"
          />
        </div>
        <div className="flex py-4 items-center justify-between">
          <Link>
            <h1 className="text-blue text-2xl hover:underline">{title}</h1>
          </Link>
          <button
            onClick={CtrlBasket}
            className={
              inBasket
                ? "p-4 text-white bg-blue border rounded-2xl"
                : "p-4 text-blue border rounded-2xl"
            }
          >
            <FaShoppingBasket />
          </button>
        </div>
        <Link className="hover:underline">
          <p>{author}</p>
        </Link>
        <div className="flex justify-between items-center py-3">
          <p className="text-sm opacity-90">UZS {price}</p>
          <button className="text-white text-sm bg-blue rounded-xl px-4 py-3">
            Xarid qilish
          </button>
        </div>
      </div>
    </>
  );
}
