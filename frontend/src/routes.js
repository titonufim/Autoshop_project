// описание всех маршрутов ко всем страницам
import { Component } from "react";
import Admin from "./pages/admin";
import Cart from "./pages/cart";
import Order from "./pages/order";
import Shop from "./pages/shop";
import Auth from "./pages/auth";
import Device from "./pages/devicePage";
//import NotFound from "./pages/notFound";

import {
  ADMIN_ROUTER,
  CART_ROUTER,
  ORDER_ROUTER,
  SHOP_ROUTER,
  LOGIN_ROUTER,
  REGISTRATION_ROUTER,
  DEVICE_ROUTER,
} from "./utils/constants";

// список маршрутов только для авторизованнных
export const authRoutes = [
  {
    path: ADMIN_ROUTER, // путь к компоненту, url
    Component: Admin, // сам компонент
  },
  {
    path: CART_ROUTER,
    Component: Cart,
  },
  {
    path: ORDER_ROUTER,
    Component: Order,
  },
];

// список маршрутов для любого
export const publicRoutes = [
  {
    path: SHOP_ROUTER,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTER,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTER,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTER + "/:id",
    Component: Device,
  },
  // {
  //   path: NOT_FOUND_ROUTER,
  //   Component: NotFound,
  // },
];
