// для навигации по страницам
import React, { useContext } from "react";
import { Route, Redirect, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import NotFound from "../pages/notFound";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user);
  //const isAuth = false;

  return (
    <Routes>
      {user.IsAuth && authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
