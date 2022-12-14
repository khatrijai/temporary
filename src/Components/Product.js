import React from "react";
import "./Product.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStateValue } from "../StateProvider";
import ReactStarRating from "react-star-ratings-component";
import CurrencyFormat from "react-currency-format";
import { ToastProvider, useToasts } from "react-toast-notifications";

export default function Product({ id, title, image, price, rating }) {
  const { addToast } = useToasts();

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (title) => {
    addToast(` ${title} has been successfully added to your cart`, {
      appearance: "success",
    });

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div
      className="hover:scale-105 poster_home z-10 p-4 flex  flex-col justify-between items-center bg-white rounded-3xl inter text-base leading-5  "
      style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
    >
  
        <div className="mb-4">
          <p className="font-normal mb-2">{title}</p>

          <CurrencyFormat
            decimalScale={2}
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
            renderText={(value) => <p className="font-bold mb-2">{value}</p>}
          />

          <ReactStarRating
            numberOfStar={5}
            numberOfSelectedStar={parseInt(rating)}
            colorFilledStar="orange "
            colorEmptyStar="black"
            starSize="20px"
            spaceBetweenStar="10px"
            disableOnSelect={true}
            // onSelectStar={(val) => {
            //   console.log(val);
            // }}
          />

        </div>
        <div className="mb-6 flex justify-center items-center">
          <img src={image} className="object-contain w-4/5"></img>
        </div>
        <div className="w-full">
          <Button variant="warning" onClick={() => addToBasket(title)}>
            Add to Basket
          </Button>
        </div>
    </div>
  );
}
