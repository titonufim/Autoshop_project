import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container, Card, Row, Col, Image, Spinner, Badge } from "react-bootstrap";
import { Context } from "../index";
import { toJS } from "mobx";

import { getAllProduct } from "../http/product_categoryAPI";

import { getOrders } from "../http/orderAPI";

const getStatusVariant = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "completed":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

const OrdersPage = observer(() => {
  const { product, order } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, orderData] = await Promise.all([getAllProduct(), getOrders()]);

        product.setProduct(productData.rows);
        order.setOrders(orderData);

        // Собираем все OrderItems из заказов
        const allOrderItems = orderData.flatMap((order) => order.OrderItems || []);
        order.setOrderItems(allOrderItems);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Загрузка заказов...</p>
      </Container>
    );
  }

  // console.log(" OrderItems из стора:", toJS(order.orderItems));
  // console.log(" Orders из стора:", toJS(order.order));

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Мои заказы</h2>

      {/* Условие для проверки наличия заказов */}
      {order.order.length === 0 ? (
        <Container className="text-center mt-5">
          <h2>У Вас еще не было заказов</h2>
        </Container>
      ) : (
        order.order.map((ord) => {
          const items = order.getOrderItemsByOrderId(ord.id).map((item) => {
            const productDetails = product.product.find((p) => p.id === item.product_id);
            return {
              ...item,
              name: productDetails?.name || "Неизвестный товар",
              image: productDetails ? process.env.REACT_APP_API_URL + productDetails.image : "",
              price: productDetails?.price || 0,
            };
          });

          const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return (
            <Card className="mb-4 shadow-sm" key={ord.id}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Заказ №{ord.id}</h5>
                  <Badge bg={getStatusVariant(ord.status)}>{ord.status.toUpperCase()}</Badge>
                </div>

                <hr />

                {items.map((item) => (
                  <Row key={item.id} className="align-items-center py-2 border-bottom">
                    <Col xs={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col xs={5}>
                      <div className="fw-bold">{item.name}</div>
                    </Col>
                    <Col xs={2} className="text-center">
                      <small>Цена ед. товара:</small> <div>{item.price} ₽</div>
                    </Col>
                    <Col xs={3} className="text-center">
                      <small>Кол-во:</small> <div>{item.quantity} шт.</div>
                    </Col>
                  </Row>
                ))}

                <div className="d-flex justify-content-end mt-3">
                  <h5>
                    Итоговая сумма: <strong>{totalPrice} ₽</strong>
                  </h5>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </Container>
  );
});

export default OrdersPage;
