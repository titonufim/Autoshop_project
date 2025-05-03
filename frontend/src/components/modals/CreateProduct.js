import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import { Context } from "../..";
import { getCategory, createProd } from "../../http/product_categoryAPI";
import { observer } from "mobx-react-lite";

const CreateProduct = observer(({ show, onHide }) => {
  const { product } = useContext(Context);

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    // если запрос на получение типов был успешным, то (then) передаем то, что вернулось из запроса
    getCategory().then((data) => product.setCategory(data));
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
    //console.log(e.target.files);
  };

  // const addProduct = () => {
  //   const formData = new FormData(); // тк данные хранятьсяв массиве
  //   formData.append("name", name);
  //   formData.append("description", description);
  //   formData.append("price", price);
  //   formData.append("stock", stock);
  //   formData.append("image", file);
  //   formData.append("category_id", product.selectedCategory.id);

  //   createProd(formData)
  //     .then((data) => {
  //       onHide();
  //       // очистим форму, если хочешь
  //       setName("");
  //       setDescription("");
  //       setPrice("");
  //       setStock("");
  //       setFile(null);
  //       product.setSelectedCategory({});
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка при добавлении товара:", error);
  //     });
  // };

  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", file);
    formData.append("category_id", product.selectedCategory.category_id);

    createProd(formData)
      .then((data) => {
        onHide(); // закрываем модалку после успешного добавления
        //очистим форму, если хочешь
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setFile(null);
        product.setSelectedCategory({});
      })
      .catch((error) => {
        return alert(error.response.data.message);
      });
  };

  // id: 3,
  //         name: "Антифриз NGN Long Life Antifreeze BS",
  //         description: "Готовый (раствор), 5л",
  //         price: 1300,
  //         stock: 28,
  //         image:
  //           "https://avatars.mds.yandex.net/i?id=b5c9ba6179133899aa78d2a00319eb45bb6d158d-7751470-images-thumbs&n=13",
  //         category_id: 3,

  return (
    <Modal size="lg" centered onHide={onHide} show={show}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить продукт</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control className="mb-2" type="file" onChange={selectFile} />

          <Form.Control
            className="mb-2"
            placeholder={"Введите название продукта"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mb-2"
            placeholder={"Введите описание товара"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control
            className="mb-2"
            type="text"
            placeholder={"Введите стоимость товара "}
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
            placeholder={"Введите, какое количество товара имеется в наличии"}
            value={stock}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, ""); // Убираем всё, кроме цифр
              input = input.replace(/^0+/, ""); // Убираем начальные нули
              setStock(input);
            }}
          />

          <Dropdown className="mb-3">
            <Dropdown.Toggle>{product.selectedCategory.category_name || "Выберите категорию"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.category.map((categ) => (
                <Dropdown.Item onClick={() => product.setSelectedCategory(categ)} key={categ.category_id}>
                  {categ.category_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addProduct}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;
