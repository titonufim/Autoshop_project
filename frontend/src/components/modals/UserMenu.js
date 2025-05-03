import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../../index";
import ConfirmDelete from "./ConfirmUserDelete";
import { SHOP_ROUTER } from "../../utils/constants";

const UserMenuModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Профиль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Имя:</strong> {user.user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.user.email}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={() => setShowConfirmDelete(true)}>
            Удалить аккаунт
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              user.logout();
              window.location.reload();
              onHide();
            }}>
            Выйти
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно подтверждения удаления */}
      <ConfirmDelete
        show={showConfirmDelete}
        onHide={() => setShowConfirmDelete(false)}
        onAfterDelete={() => {
          setShowConfirmDelete(false); // закрыть ConfirmDelete
          onHide(); // закрыть UserMenuModal
        }}
      />
    </>
  );
};

export default UserMenuModal;
