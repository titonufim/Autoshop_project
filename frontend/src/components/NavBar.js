import React, { useContext, useState } from "react";
import { Context } from "../index";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTER, LOGIN_ROUTER, SHOP_ROUTER, CART_ROUTER, ORDER_ROUTER } from "../utils/constants";
import { observer } from "mobx-react-lite";

import UserMenu from "./modals/UserMenu";

// observer для перерендеринга в реальном времени
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate(); // узнать про этот хук

  const [showUser, setShowUser] = useState(false);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink to={SHOP_ROUTER} style={{ color: "white", textDecoration: "none", transform: "translateX(-85px)" }}>
          МагазинАвтозапчастей
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={() => navigate(ORDER_ROUTER)}>
              Заказы
            </Button>
            <Button variant="outline-light" className="ms-2" onClick={() => navigate(CART_ROUTER)}>
              Корзина
            </Button>
            {user.user.role === "admin" && (
              <Button variant="outline-light" className="ms-2" onClick={() => navigate(ADMIN_ROUTER)}>
                {/* {console.log("isAuth?", user.isAuth)} */}
                Админ Панель
              </Button>
            )}
            <Button variant={"outline-danger"} className="ms-2" onClick={() => setShowUser(true)}>
              {/* {console.log("isAuth?", user.isAuth)} */}
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button variant={"outline-success"} onClick={() => navigate(LOGIN_ROUTER)}>
              Авторизация
            </Button>
          </Nav>
        )}

        <UserMenu show={showUser} onHide={() => setShowUser(false)} />
      </Container>
    </Navbar>
  );
});

export default NavBar;
