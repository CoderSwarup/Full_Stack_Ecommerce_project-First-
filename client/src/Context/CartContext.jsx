import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);

  //   all multiple time running problem slove using the following at the last useEffect
  // eslint-disable-next-line

  useEffect(() => {
    let cartexists = localStorage.getItem("cart");
    // console.log(cartexists);
    if (cartexists) {
      setcart(JSON.parse(cartexists));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setcart]}>
      {children}
    </CartContext.Provider>
  );
};

//CustomHook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
