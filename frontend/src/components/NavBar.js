import React, { useContext } from "react";
import { Context } from "../index";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTER } from "../utils/constants";
import { observer } from "mobx-react-lite";

// observer для перерендеринга в реальном времени
const NavBar = observer(() => {
  const { user } = useContext(Context);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink to={SHOP_ROUTER} style={{ color: "white", textDecoration: "none" }}>
          МагазинАвтозапчастей
        </NavLink>
        {user.IsAuth ? (
          <Nav className="ml-auto">
            {/* ml-auto для отображения панели справа*/}
            <Button variant="outline-light">Заказы</Button>
            <Button variant="outline-light" className="ms-2">
              Корзина
            </Button>
            <Button variant="outline-light" className="ms-2">
              Админ Панель
            </Button>
            <Button variant={"outline-danger"} className="ms-2">
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={"outline-danger"} onClick={() => user.setIsAuth(true)}>
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
