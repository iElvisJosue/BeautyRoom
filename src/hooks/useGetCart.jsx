import { useState, useEffect } from "react";

export default function useGetCart() {
  const [cart, setCart] = useState([]);
  const [getCartAgain, setGetCartAgain] = useState(false);

  useEffect(() => {
    const getCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(cart);
    };
    getCart();
  }, [getCartAgain]);

  return { cart, setCart, getCartAgain, setGetCartAgain };
}
