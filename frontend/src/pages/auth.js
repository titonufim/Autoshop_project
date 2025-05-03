import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Container, Form, FormControl, Row, Col } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTER, REGISTRATION_ROUTER, SHOP_ROUTER } from "../utils/constants";
import { login, registration } from "../http/userAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
  const location = useLocation(); // это хук позволяющий получить маршрут в строке запроса
  // используем для отрисовки регистрации или авторизации
  const isLogin = location.pathname === LOGIN_ROUTER; // если совпало с /login, то true
  //console.log(location);
  const navigate = useNavigate();

  const { user } = useContext(Context);

  // для оживления инпутов
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // состояние для email
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [location.pathname]); // срабатывает каждый раз, когда путь меняется

  // универсальная функция для рег и авт
  const click = async () => {
    try {
      // теперь мы функции возвращают нам данные о пользователе из jwt токена
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(name, email, password);
        // console.log(data);
      }
      // сохраняем в userStore данные о пользователе
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTER);
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  // const click = async () => {
  //   try {
  //     if (isLogin) {
  //       // Авторизация
  //       await user.login(email, password); // Используем метод из UserStore для логина
  //     } else {
  //       // Регистрация
  //       await user.registration(name, email, password); // Используем метод из UserStore для регистрации
  //     }

  //     // Если авторизация или регистрация успешна, перенаправляем на главную страницу
  //     navigate(SHOP_ROUTER);
  //   } catch (error) {
  //     alert(error.response?.data?.message);
  //   }
  // };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 700 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>

        <Form className="d-flex flex-column">
          {!isLogin && (
            <Form.Control
              className="mt-4"
              placeholder="Введите Ваше имя..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Form.Control
            className="mt-4"
            placeholder="Введите Ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            type="password"
            className="mt-4"
            placeholder="Введите Ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Row className="d-flex justify-content-between align-items-center mt-3 px-2">
            {isLogin ? (
              <div>
                <Col>
                  Нет аккаунта? <NavLink to={REGISTRATION_ROUTER}>Зарегистрируйтесь!</NavLink>
                </Col>
                <Col className="text-end">
                  <Button variant="outline-success" onClick={click}>
                    Войти
                  </Button>
                </Col>
              </div>
            ) : (
              <div>
                <Col>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTER}>Войдите!</NavLink>
                </Col>
                <Col className="text-end">
                  <Button variant="outline-success" onClick={click}>
                    Регистрация
                  </Button>
                </Col>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
