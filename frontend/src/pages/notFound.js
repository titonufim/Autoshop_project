import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTER } from "../utils/constants";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className=" text-light d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}>
      <Row>
        <Col>
          <Card className="text-center  border-3 shadow-lg p-4" style={{ borderRadius: "20px" }}>
            <Card.Body>
              <Card.Title as="h1" style={{ fontSize: "5rem", fontWeight: "bold" }}>
                404
              </Card.Title>
              <Card.Text className="mb-4 fs-5">Упс! Страница не найдена или не существует.</Card.Text>
              <Button variant="outline-success" onClick={() => navigate(SHOP_ROUTER)}>
                Вернуться на главную
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
