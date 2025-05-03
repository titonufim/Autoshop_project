import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateProduct from "../components/modals/CreateProduct";
import CheckUserOrders from "../components/modals/CheckUserOrders"; // импортируем модалку заказов
//import UpdateProduct from "../components/modals/UpdateProduct";

const Admin = () => {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [ordersVisible, setOrdersVisible] = useState(false);
  // const [updateVisible, setUpdateVisible] = useState(false);

  // Пример заказов (заглушка)
  const dummyOrders = [
    {
      id: 1,
      name: "Иван Иванов",
      email: "ivan@example.com",
      orders: [
        { id: 101, total: 1500, status: "pending" },
        { id: 102, total: 3200, status: "shipped" },
      ],
    },
    {
      id: 2,
      name: "Анна Смирнова",
      email: "anna@example.com",
      orders: [{ id: 201, total: 890, status: "delivered" }],
    },
  ];

  return (
    <Container className="d-flex flex-column">
      <Button variant="outline-dark" className="mt-3" onClick={() => setCategoryVisible(true)}>
        Добавить категорию
      </Button>
      <Button variant="outline-dark" className="mt-3" onClick={() => setProductVisible(true)}>
        Добавить продукт
      </Button>
      {/* <Button variant="outline-dark" className="mt-3" onClick={() => setUpdateVisible(true)}>
        Изменить продукт
      </Button> */}
      {/* <Button variant="outline-dark" className="mt-3" onClick={() => setOrdersVisible(true)}>
        Удалить продукт
      </Button> */}
      <Button variant="outline-dark" className="mt-3" onClick={() => setOrdersVisible(true)}>
        Получить заказы пользователей
      </Button>

      <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)} />
      <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
      {/* <UpdateProduct show={updateVisible} onHide={() => setUpdateVisible(false)} /> */}
      <CheckUserOrders show={ordersVisible} onHide={() => setOrdersVisible(false)} userOrders={dummyOrders} />
    </Container>
  );
};

export default Admin;
