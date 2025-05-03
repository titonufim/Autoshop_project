import { $authHost } from "./index"; // импортируем экземпляры Axios для авторизованных и неавторизованных запросов

// +
export const addItem = async ({ product_id, quantity = 1 }) => {
  const { data } = await $authHost.post("api/cartitem", { product_id, quantity });
  return data;
};

// +
export const decreaseItem = async (cart_item_id) => {
  const { data } = await $authHost.patch(`api/cartitem/${cart_item_id}`);
  return data;
};

// +
export const removeItem = async (cart_item_id) => {
  const { data } = await $authHost.delete(`api/cartitem/${cart_item_id}`);
  return data;
};

//+
export const getCart = async () => {
  const { data } = await $authHost.get("api/cart");
  return data;
};

// +
export const deleteCart = async () => {
  const { data } = await $authHost.delete("api/cart");
  return data;
};

////////////////////////////////////////////////////////////////////////////////
// router.post("/", authMiddleware, cartItemController.add);
// router.patch("/:cart_item_id", authMiddleware, cartItemController.decrease);
// router.delete("/:cart_item_id", authMiddleware, cartItemController.remove);

// router.get("/", authMiddleware, cartController.getCart);
// router.delete("/", authMiddleware, cartController.clearCart);

// const CartItem = sequelize.define("CartItem", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   cart_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cart, key: "id" } },
//   product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } },
//   quantity: { type: DataTypes.INTEGER, allowNull: false },
// });

// const Cart = sequelize.define("Cart", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
//   created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
// });
