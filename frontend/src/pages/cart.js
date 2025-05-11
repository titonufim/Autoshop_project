import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container, Row, Col, Card, Image, Spinner, Button, ButtonGroup } from "react-bootstrap";
import { Context } from "../index";
import { toJS } from "mobx";

import { getCart, addItem, decreaseItem, removeItem, deleteCart } from "../http/cart_cartItemAPI";
import { createOrder } from "../http/orderAPI";
import { getAllProduct, getCategory } from "../http/product_categoryAPI";

const Cart = observer(() => {
  const { cart, product, order } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productData] = await Promise.all([getCategory(), getAllProduct()]);
        product.setCategory(categoryData);
        product.setProduct(productData.rows);
        console.log("productData from getAllProduct:", productData.rows);
        const cartData = await getCart();
        cart.setCart(cartData);
        cart.setCartItems(cartData.CartItems);
        // console.log("Cart loaded:", cartData);
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
        <p className="mt-3">Загрузка корзины...</p>
      </Container>
    );
  }

  const totalPrice = cart.cartItems.reduce((acc, item) => {
    const productDetails = product.product.find((prod) => prod.id === item.product_id);
    return productDetails ? acc + item.quantity * productDetails.price : acc;
  }, 0);

  const AddItemInCart = async (productId) => {
    const cartItem = cart.cartItems.find((item) => item.product_id === productId);
    try {
      const item = await addItem({ product_id: productId });

      const newQuantity = cartItem.quantity + 1;
      cart.updateItemQuantity(productId, newQuantity);
      console.log(toJS(cart.cartItems));
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при добавлении в корзину");
    }
  };

  const DecreaseItemInCart = async (productId) => {
    const cartItem = cart.cartItems.find((item) => item.product_id === productId);
    if (!cartItem) return;

    try {
      await decreaseItem(cartItem.id);
      const newQuantity = cartItem.quantity - 1;
      cart.updateItemQuantity(productId, newQuantity);
      console.log(toJS(cart.cartItems));
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при уменьшении количества");
    }
  };

  const DeleteFromCart = async (productId) => {
    const cartItem = cart.cartItems.find((item) => item.product_id === productId);
    if (!cartItem) return;

    try {
      //console.log(cartItem.id);
      await removeItem(cartItem.id);
      //console.log("test");
      cart.removeItem(productId);

      console.log(toJS(cart.cartItems));
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при уменьшении количества");
    }
  };

  const DeleteAllFromCart = async () => {
    try {
      await deleteCart();
      cart.clearCartItems();
      console.log("Корзина успешно очищена");
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при очистке корзины");
    }
  };

  // const Order = async () => {
  //   try {
  //     const data = await createOrder();

  //     cart.clearCartItems();

  //     order.setOrders(data); // обернули в массив, если API возвращает один заказ
  //     order.setOrderItems(data.OrderItems || []);

  //     //alert(`Заказ №${data.id} успешно создан!`);
  //     console.log(order.getOrderItemsByOrderId(data.id));
  //   } catch (e) {
  //     alert(e.response?.data?.message || "Ошибка при создании заказа");
  //   }
  // };

  const Order = async () => {
    try {
      const data = await createOrder();

      cart.clearCartItems();

      order.setOrders([
        {
          id: data.id,
          user_id: data.user_id,
          total_price: data.total_price,
          status: data.status,
        },
      ]);

      // сохраняем все товары, которые входят в заказ
      order.setOrderItems(data.OrderItems || []);
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при создании заказа");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Товары в корзине</h2>

      <Row className="justify-content-center">
        {cart.cartItems.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <h4>В корзине отсутствуют товары</h4>
          </div>
        ) : (
          cart.cartItems.map((item) => {
            const productDetails = product.product.find((prod) => prod.id === item.product_id);
            if (!productDetails) return null;

            return (
              <Col key={item.id} md={4} className="d-flex mb-4">
                <Card className="w-100 border-secondary d-flex flex-column">
                  <Image
                    src={process.env.REACT_APP_API_URL + productDetails.image}
                    alt={productDetails.name}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "contain",
                      borderRadius: 10,
                    }}
                    className="p-2"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-1">{productDetails.name}</Card.Title>
                    <Card.Text className="mt-2 flex-grow-1">
                      <strong>Описание:</strong> {productDetails.description}
                      <br />
                      <strong>Цена ед. товара:</strong> {productDetails.price} ₽
                    </Card.Text>

                    <ButtonGroup className="my-2">
                      <Button variant="outline-danger" onClick={() => DecreaseItemInCart(productDetails.id)}>
                        -
                      </Button>
                      <Button variant="light" disabled style={{ width: "100px" }}>
                        {item.quantity} шт.
                      </Button>
                      <Button variant="outline-success" onClick={() => AddItemInCart(productDetails.id)}>
                        +
                      </Button>
                    </ButtonGroup>

                    <Button variant="danger" className="mt-auto" onClick={() => DeleteFromCart(productDetails.id)}>
                      Убрать товар из корзины
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      <Row className="justify-content-center my-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm bg-light">
            <Row className="my-2">
              <Col xs={12} className="d-flex justify-content-between align-items-center">
                <h5>
                  Итоговая стоимость: <strong>{totalPrice} ₽</strong>
                </h5>

                <div>
                  <Button variant="outline-danger" onClick={DeleteAllFromCart}>
                    Очистить корзину
                  </Button>
                  <Button variant="outline-success" className="ms-2" onClick={Order}>
                    Оформить заказ
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Cart;
