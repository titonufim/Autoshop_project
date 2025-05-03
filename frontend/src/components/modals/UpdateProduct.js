import React, { useContext, useState, useEffect } from "react";
import { Context } from "../..";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { updateProd, getCategory } from "../../http/product_categoryAPI";
import { observer } from "mobx-react-lite";

const UpdateProduct = observer(({ show, onHide, productId }) => {
  const { product } = useContext(Context);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(product.selectedCategory); // Локальное состояние для категории

  useEffect(() => {
    getCategory().then((data) => product.setCategory(data));
  }, [productId, product]);

  const upProd = async () => {
    try {
      const updatedFields = {};

      // Собираем измененные данные для отправки на сервер
      if (name.trim()) updatedFields.name = name;
      if (description.trim()) updatedFields.description = description;
      if (price.trim()) updatedFields.price = parseInt(price);
      if (stock.trim()) updatedFields.stock = parseInt(stock);

      if (selectedCategory?.category_id) {
        updatedFields.category_id = selectedCategory.category_id;
      }

      // Проверка на изменения перед отправкой данных
      if (Object.keys(updatedFields).length === 0) {
        alert("Вы не ввели никаких изменений для обновления!");
        return;
      }

      await updateProd(productId, updatedFields);
      window.location.reload();
      // Закрываем модалку после успешного обновления
      onHide();

      // Очистка полей формы после успешного обновления
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setSelectedCategory({}); // Сбрасываем локальное состояние категории

      alert("Товар успешно обновлен!");
    } catch (error) {
      alert(error.response?.data?.message || "Ошибка при обновлении товара");
    }
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Обновление товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-2"
            placeholder="Введите новое название продукта"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mb-2"
            placeholder="Введите новое описание товара"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control
            className="mb-2"
            type="text"
            min="0"
            placeholder="Введите новую стоимость товара"
            value={price}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, ""); // Убираем всё, кроме цифр
              input = input.replace(/^0+/, ""); // Убираем начальные нули
              setPrice(input);
            }}
          />
          <Form.Control
            className="mb-2"
            type="text"
            min="0"
            placeholder="Введите количество товара в наличии"
            value={stock}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, ""); // Убираем всё, кроме цифр
              input = input.replace(/^0+/, ""); // Убираем начальные нули
              setStock(input);
            }}
          />

          <Dropdown className="mb-3">
            <Dropdown.Toggle>{selectedCategory?.category_name || "Выберите категорию"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.category.map((categ) => (
                <Dropdown.Item key={categ.category_id} onClick={() => setSelectedCategory(categ)}>
                  {categ.category_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={upProd}>
          Обновить данные о продукте
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateProduct;
