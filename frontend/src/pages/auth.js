import React from "react";
import { Button, Card, Container, Form, FormControl, Row, Col } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTER, REGISTRATION_ROUTER } from "../utils/constants";

const Auth = () => {
  const location = useLocation(); // это хук позволяющий получить маршрут в строке запроса
  // используем для отрисовки регистрации или авторизации
  const isLogin = location.pathname === LOGIN_ROUTER;
  //console.log(location);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      {/*карточка с рамкой*/}
      <Card style={{ width: 700 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>

        <Form className="d-flex flex-column">
          {!isLogin && <Form.Control className="mt-4" placeholder="Введите Ваше имя..." />}

          <Form.Control className="mt-4" placeholder="Введите Ваш email..." />
          <Form.Control className="mt-4" placeholder="Введите Ваш пароль..." />

          <Row className="d-flex justify-content-between align-items-center mt-3 px-2">
            {isLogin ? (
              <div>
                <Col>
                  Нет аккаунта? <NavLink to={REGISTRATION_ROUTER}>Зарегистрируйтесь!</NavLink>
                </Col>
                <Col className="text-end">
                  <Button variant="outline-success">Войти</Button>
                </Col>
              </div>
            ) : (
              <div>
                <Col>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTER}>Войдите!</NavLink>
                </Col>
                <Col className="text-end">
                  <Button variant="outline-success">Регистрация</Button>
                </Col>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
