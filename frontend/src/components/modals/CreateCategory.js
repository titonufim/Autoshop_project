import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { createCat, getCategory } from "../../http/product_categoryAPI";
import { Context } from "../../index";

// пропсы 1-ый видно или нет. 2ая функция скрывает модальное окно
const CreateCategory = ({ show, onHide }) => {
  const { product } = useContext(Context); // Подключаем контекст для получения категорий

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // Локальное состояние для выбранной категории

  // Получаем категории при монтировании компонента
  useEffect(() => {
    getCategory().then((data) => product.setCategory(data)); // Загружаем категории в контекст
  }, [product]);

  const addCategory = () => {
    // Проверка перед отправкой: если значение пустое, ничего не отправлять
    if (!name.trim()) {
      return alert("Название категории не может быть пустым!");
    }

    createCat({ category_name: name }).then((data) => {
      setName(""); // Очистить поле ввода
      onHide(); // Закрыть модалку
    }); // обновляем input если все гуд
  };

  return (
    <Modal size="lg" centered onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить категорию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Форма для ввода новой категории */}
          <Form.Control
            placeholder={"Введите название категории"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Если категории уже загружены, показываем выпадающий список */}
          {product.category && product.category.length > 0 && (
            <Dropdown className="mt-3">
              <Dropdown.Toggle>{selectedCategory?.category_name || "Выберите категорию"}</Dropdown.Toggle>
              <Dropdown.Menu>
                {product.category.map((categ) => (
                  <Dropdown.Item key={categ.category_id} onClick={() => setSelectedCategory(categ)}>
                    {categ.category_name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addCategory}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;
