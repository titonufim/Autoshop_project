import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._orders = []; // Один заказ
    this._orderItems = []; // Список товаров в заказе
    this._users = []; // Список пользователей
    makeAutoObservable(this);
  }

  setOrders(orders) {
    this._orders = orders.map((order) => ({
      id: order.id,
      user_id: order.user_id,
      total_price: order.total_price,
      status: order.status,
    }));
  }

  setOrderItems(items) {
    this._orderItems = items.map((item) => ({
      id: item.id,
      order_id: item.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
    }));
  }

  updateOrderStatus(orderId, newStatus) {
    const orderIndex = this._orders.findIndex((order) => order.id === orderId);
    if (orderIndex !== -1) {
      const updatedOrders = [...this._orders];
      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        status: newStatus,
      };
      this._orders = updatedOrders;
    }
  }

  setUsers(orders) {
    // Вытаскиваем уникальных пользователей из заказов
    const usersMap = {};
    orders.forEach((order) => {
      if (order.User && !usersMap[order.User.id]) {
        usersMap[order.User.id] = order.User;
      }
    });
    this._users = Object.values(usersMap);
  }

  getUserById(userId) {
    return this._users.find((user) => user.id === userId) || null;
  }

  clearOrder() {
    this._orders = [];
    this._orderItems = [];
  }

  get order() {
    return this._orders;
  }

  get orderItems() {
    return this._orderItems;
  }

  get users() {
    return this._users;
  }

  getOrderItemsByOrderId(orderId) {
    return this._orderItems.filter((item) => item.order_id === orderId);
  }
}
