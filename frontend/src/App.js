import React, { useContext, useState, useEffect } from "react";
import { Context } from "./index";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";

import { check_auth } from "./http/userAPI";
import { getCart } from "./http/cart_cartItemAPI";

const App = observer(() => {
  const { user } = useContext(Context); // ОБЯЗАТЕЛЬНО, иначе user не будет доступен
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check_auth()
      .then((data) => {
        user.setUser(data); // Сохраняем пользователя
        user.setIsAuth(true); // Устанавливаем флаг авторизации
      })
      .catch(() => {
        user.setIsAuth(false); // В случае ошибки снимаем авторизацию
      })
      .finally(() => setLoading(false)); // Заканчиваем загрузку
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
