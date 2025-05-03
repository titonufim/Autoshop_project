import { $authHost, $host } from "./index"; // импортируем экземпляры Axios для авторизованных и неавторизованных запросов

// +
export const createProd = async (product) => {
  const { data } = await $authHost.post("api/product", product);
  return data;
};

//+
export const getAllProduct = async (categoryId, page, limit) => {
  const { data } = await $host.get("api/product", {
    params: {
      categoryId,
      page,
      limit,
    },
  });
  return data;
};

// export const getAllProduct = async () => {
//   const { data } = await $host.get("api/product");
//   return data.rows;
// };

// +
export const updateProd = async (id, product) => {
  const { data } = await $authHost.put(`api/product/${id}`, product);
  return data;
};

// +
export const deleteProd = async (id) => {
  const { data } = await $authHost.delete(`api/product/${id}`);
  return data;
};

// +
export const createCat = async (category) => {
  const { data } = await $authHost.post("api/category", category);
  return data;
};

//+
export const getCategory = async () => {
  const { data } = await $host.get("api/category");
  return data;
};

// router.post("/", checkRole("admin"), ProductController.create);
// router.get("/", ProductController.getAll);
// router.get("/:id", ProductController.getOne);
// router.put("/:id", checkRole("admin"), ProductController.update);
// router.delete("/:id", checkRole("admin"), ProductController.delete);

// router.post("/", checkRole("admin"), CategoryController.create);
// router.get("/", CategoryController.getAll);
// router.get("/:id", CategoryController.getOne);
// router.put("/:id", checkRole("admin"), CategoryController.update);
// router.delete("/:id", checkRole("admin"), CategoryController.delete);
