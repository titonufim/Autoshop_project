import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import PaginationBar from "../components/PaginationBar";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getAllProduct, getCategory } from "../http/product_categoryAPI";
import { getCart } from "../http/cart_cartItemAPI";
import { toJS } from "mobx";

const Shop = observer(() => {
  const { product, cart, user } = useContext(Context);

  //   // хук для подгрузки, которая будет единожды при открытии страницы
  useEffect(() => {
    // Загрузка категорий и товаров
    getCategory().then((data) => product.setCategory(data));

    //const categoryId = parseInt(product.selectedCategory.category_id, 10); // из-за этой хрени провозился 2 часа....

    const category_id = parseInt(product.selectedCategory.category_id, 10);
    getAllProduct(category_id, product.page, product.limit).then((data) => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });

    // загрузка данных корзины авторизованным грузим в стор
    if (user.isAuth) {
      getCart()
        .then((cartData) => {
          cart.setCart(cartData); // Сохраняем данные корзины
          cart.setCartItems(cartData.CartItems); // Сохраняем товары корзины
          //console.log("корзина загружена:", cartData);
        })
        .catch((err) => {
          console.error("Ошибка при загрузке корзины в Shop:", err);
        });
    }
  }, [user.isAuth, product.page, product.selectedCategory]); // Следим за изменениями авторизации пользователя
  return (
    // строка состоит из 12 колонок
    // md=3 для панели с отображением категории
    // md= 9 для самих товаров
    <Container>
      <Row className="mt-3">
        <Col md={2} style={{ transform: "translateX(-100px)" }}>
          <CategoryBar />
        </Col>
        <Col md={10}>
          <ProductList />
          <PaginationBar />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
