import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { deleteUser } from "../../http/userAPI";

import { SHOP_ROUTER } from "../../utils/constants";

const ConfirmDelete = observer(({ show, onHide, onAfterDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const handleDelete = async () => {
    try {
      await deleteUser(); // Удаляем аккаунт
      user.logout();
      onAfterDelete?.(); // Закрываем ВСЕ модалки
      navigate(SHOP_ROUTER); // Переходим на главную
    } catch (error) {
      alert("Ошибка при удалении аккаунта");
      console.error("Delete error:", error?.response?.data || error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы точно желаете удалить аккаунт? Это действие необратимо.</Modal.Body>
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
