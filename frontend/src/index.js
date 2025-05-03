import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import CartStore from "./store/CartStore";
import OrderStore from "./store/OrderStore";
// для прокидывания состояний
export const Context = createContext(null);
//console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{ user: new UserStore(), product: new ProductStore(), cart: new CartStore(), order: new OrderStore() }}>
    <App />
  </Context.Provider>
);
