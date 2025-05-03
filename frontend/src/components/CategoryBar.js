import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const Category = observer(() => {
  const { product } = useContext(Context); // получаем из index это для работы с mobx, для работы с состояниями

  // active - пропс
  // onClick слушатель события
  // style {cursor: 'pointer'} для изменения стиля курсора
  return (
    <ListGroup>
      {product.category.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.category_id === product.selectedCategory.category_id}
          onClick={() => product.setSelectedCategory(type)}
          key={type.category_id}>
          {type.category_name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default Category;
