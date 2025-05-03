import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const PaginationBar = observer(() => {
  const { product } = useContext(Context);
  const pageCount = Math.ceil(product.totalCount / product.limit); // округляем в большую сторону
  const pages = [];

  for (let index = 0; index < pageCount; index++) {
    pages.push(index + 1);
  }

  return (
    <Pagination className="mt-3 justify-content-center">
      {pages.map((page) => (
        <Pagination.Item key={page} active={product.page === page} onClick={() => product.setPage(page)}>
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default PaginationBar;
