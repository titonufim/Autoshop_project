// для навигации по страницам
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import NotFound from "../pages/notFound";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);
  //console.log(user);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component, role }) => {
          if (role && user.user.role !== role) {
            return null; // если нужно быть админом, а пользователь не админ => не даём доступ
          }
          return <Route key={path} path={path} element={<Component />} />;
        })}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
