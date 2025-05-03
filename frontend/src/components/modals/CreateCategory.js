import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { createCat } from "../../http/product_categoryAPI";

// пропсы 1-ый видно или нет. 2ая фукнция скрывает модальное окно
const CreateCategory = ({ show, onHide }) => {
  const [name, setName] = useState("");

  const addCategory = () => {
    // Проверка перед отправкой: если значение пустое, ничего не отправлять
    if (!name.trim()) {
      return alert("Название категории не может быть пустым!");
    }

    createCat({ category_name: name }).then((data) => {
      setName("");
      onHide();
    }); // обновляем input если все гуд
  };

  return (
    <Modal size="lg" centered onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить категорию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Введите название категории"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
