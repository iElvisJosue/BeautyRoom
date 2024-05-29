import { useState, useEffect } from "react";

export default function useGetCartDates() {
  const [cartDates, setCartDates] = useState([]);
  const [getCartDatesAgain, setGetCartDatesAgain] = useState(false);

  useEffect(() => {
    const getCart = () => {
      const cart = JSON.parse(localStorage.getItem("cartDates")) || [];
      setCartDates(cart);
    };
    getCart();
  }, [getCartDatesAgain]);

  return { cartDates, setCartDates, getCartDatesAgain, setGetCartDatesAgain };
}
