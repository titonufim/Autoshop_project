import React, { useContext, useEffect, useState } from "react";
import { Container, Modal, Button, Card, Alert, Badge, Spinner } from "react-bootstrap";
import { Context } from "../../index";
import { getAllProduct } from "../../http/product_categoryAPI";
import { getAllOrders, changeStatus } from "../../http/orderAPI";
import { toJS } from "mobx";

const UserOrdersModal = ({ show, onHide }) => {
  const { product, order } = useContext(Context);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, orderData] = await Promise.all([getAllProduct(), getAllOrders()]);

        product.setProduct(productData.rows);
        order.setOrders(orderData);
        order.setUsers(orderData);
        const allOrderItems = orderData.flatMap((o) => o.OrderItems || []);
        order.setOrderItems(allOrderItems);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await changeStatus(orderId, newStatus);
      order.updateOrderStatus(orderId, newStatus);
      setStatusMessage(`Статус заказа №${orderId} обновлён на "${newStatus}"`);
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при изменении статуса заказа");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Загрузка заказов...</p>
      </Container>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Информация о заказах пользователей</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {statusMessage && <Alert variant="success">{statusMessage}</Alert>}
        {toJS(order.order).map((ord) => {
          const user = order.getUserById(ord.user_id); // 👈 получаем пользователя по ID
          return (
            <Card className="mb-4" key={ord.id}>
              <Card.Header>
                <strong>Пользователь:</strong> {user?.email || "неизвестно"}
              </Card.Header>
              <Card.Body>
                <p>
                  <strong>Заказ №{ord.id}</strong>
                </p>
                <p>
                  Сумма: <strong>{ord.total_price}₽</strong>
                </p>
                <p>
                  Статус:{" "}
                  <Badge bg="info" text="dark">
                    {ord.status}
                  </Badge>
                </p>

                <div className="d-flex flex-column gap-2 mb-3">
                  <Button variant="outline-warning" onClick={() => updateStatus(ord.id, "pending")}>
                    Pending
                  </Button>
                  <Button variant="outline-primary" onClick={() => updateStatus(ord.id, "shipped")}>
                    Shipped
                  </Button>
                  <Button variant="outline-success" onClick={() => updateStatus(ord.id, "delivered")}>
                    Delivered
                  </Button>
                </div>

                {ord.OrderItems?.length > 0 && (
                  <div>
                    <strong>Товары в заказе:</strong>
                    {ord.OrderItems.map((item) => (
                      <div key={item.id} className="mb-2 ps-3">
                        <div>
                          🛒 <strong>{item.Product.name}</strong>
                        </div>
                        <div>Количество: {item.quantity}</div>
                        <div>Цена: {item.Product.price}₽</div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserOrdersModal;
