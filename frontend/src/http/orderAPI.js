import { $authHost } from "./index"; // импортируем экземпляры Axios для авторизованных и неавторизованных запросов

// +
export const createOrder = async () => {
  const { data } = await $authHost.post("api/order");
  return data;
};

//
export const getOrders = async () => {
  const { data } = await $authHost.get("api/order");
  return data;
};

export const getAllOrders = async () => {
  const { data } = await $authHost.get("api/order/admin/all");
  return data;
};

export const changeStatus = async (order_id, status) => {
  const { data } = await $authHost.put(`api/order/${order_id}`, { status });
  return data;
};

//////////////////////////////////////////////////
// router.post("/", authMiddleware, orderController.create);

// router.get("/", authMiddleware, orderController.getUserOrders);

// // // Админ может видеть все заказы
// router.get("/admin/all", checkRole("admin"), orderController.getAllOrders);

// // // Обновить статус заказа ("admin")
// router.put("/:order_id", checkRole("admin"), orderController.updateStatus);
