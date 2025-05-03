import React, { useContext, useState } from "react";
import { Card, Col, Image, Button, ButtonGroup } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import UpdateProduct from "../components/modals/UpdateProduct";
import ConfirmProdDelete from "../components/modals/ConfirmProdDelete";

import { addItem, decreaseItem } from "../http/cart_cartItemAPI";

const ProductItem = observer(({ product }) => {
  const { user, cart } = useContext(Context);

  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  // проверяем, есть ли товар в корзине
  const cartItem = cart.cartItems.find((item) => item.product_id === product.id);

  const AddItemInCart = async () => {
    try {
      const item = await addItem({ product_id: product.id });
      // Если товар уже есть в корзине, обновляем его количество
      if (cartItem) {
        // Используем метод для обновления количества товара в корзине
        const newQuantity = cartItem.quantity + 1;
        cart.updateItemQuantity(product.id, newQuantity); // Обновляем количество в корзине
        console.log(toJS(cart.cartItems)); // Получаем чистую копию массива cartItems
      } else {
        cart.setCartItems(item); // Добавляем новый товар в корзину стор
        console.log(toJS(cart.cartItems)); // Получаем чистую копию массива cartItems
      }
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при добавлении в корзину");
    }
  };

  const DecreaseItemInCart = async () => {
    try {
      await decreaseItem(cartItem.id);

      // Используем метод для обновления количества товара в корзине
      const newQuantity = cartItem.quantity - 1;
      cart.updateItemQuantity(product.id, newQuantity); // Обновляем количество в корзине
      //console.log(toJS(cart.cartItems)); // Получаем чистую копию массива cartItems
    } catch (e) {
      alert(e.response?.data?.message || "Ошибка при добавлении в корзину");
    }
  };

  return (
    <Col md={4} className="d-flex mb-4">
      <Card className="w-100 d-flex flex-column border-secondary">
        <Image
          src={process.env.REACT_APP_API_URL + product.image}
          alt={product.name}
          style={{ width: "100%", height: 300, borderRadius: 10, objectFit: "contain" }}
          className="p-1"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-1">{product.name}</Card.Title>
          <Card.Text className="mt-2 flex-grow-1">
            <strong>Описание:</strong> {product.description}
            <br />
            <strong>Цена:</strong> {product.price} ₽
            <br />
            <strong>В наличии:</strong> {product.stock} шт.
          </Card.Text>
          {cartItem && cartItem.quantity > 0 ? (
            <ButtonGroup className="mt-auto">
              <Button variant="outline-danger" onClick={DecreaseItemInCart}>
                -
              </Button>
              <Button variant="light" disabled style={{ width: "100px" }}>
                {cartItem.quantity} шт.
              </Button>
              <Button variant="outline-success" onClick={AddItemInCart}>
                +
              </Button>
            </ButtonGroup>
          ) : (
            <Button variant="outline-primary" className="mt-auto w-100" onClick={AddItemInCart}>
              Добавить в корзину
            </Button>
          )}

          {user.user.role === "admin" && (
            <>
              <Button variant="outline-primary" className="mt-2 w-100" onClick={() => setUpdateVisible(true)}>
                Обновить информацию
              </Button>
              <UpdateProduct show={updateVisible} onHide={() => setUpdateVisible(false)} productId={product.id} />

              <Button variant="danger" className="mt-2 w-100" onClick={() => setDeleteVisible(true)}>
                Удалить
              </Button>
              <ConfirmProdDelete show={deleteVisible} onHide={() => setDeleteVisible(false)} productId={product.id} />
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
});

export default ProductItem;
