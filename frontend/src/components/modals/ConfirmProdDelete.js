import React from "react";
import { Modal, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { deleteProd } from "../../http/product_categoryAPI";

const ConfirmDelete = observer(({ show, onHide, productId }) => {
  const handleDelete = async () => {
    try {
      await deleteProd(productId); // Удаляем товар по ID

      window.location.reload();
      onHide(); // Закрываем модалку
    } catch (error) {
      alert("Ошибка при удалении товара");
      console.error("Ошибка удаления товара:", error?.response?.data || error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно желаете удалить данный товар? Это действие необратимо.</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Да, удалить
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ConfirmDelete;
