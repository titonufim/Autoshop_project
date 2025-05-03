import { makeAutoObservable } from "mobx";

export default class CartStore {
  constructor() {
    this._cartItems = [];
    this._cart = null;
    makeAutoObservable(this);
  }

  // Экшены
  // иициализация, добавление в стор
  setCartItems(items) {
    this._cartItems = items.map((item) => ({
      id: item.id,
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: item.quantity,
    }));
  }

  // для обновления количества товара в корзине
  updateItemQuantity(productId, quantity) {
    const itemIndex = this._cartItems.findIndex((item) => item.product_id === productId);
    if (itemIndex !== -1) {
      if (quantity > 0) {
        const updatedItems = [...this._cartItems];
        updatedItems[itemIndex].quantity = quantity;
        this.setCartItems(updatedItems);
      } else {
        // Удаляем товар, если количество стало 0
        const filteredItems = this._cartItems.filter((item) => item.product_id !== productId);
        this.setCartItems(filteredItems);
      }
    }
  }

  // Удаление одного товара по productId
  removeItem(productId) {
    this._cartItems = this._cartItems.filter((item) => item.product_id !== productId);
  }

  // Очистка всей корзины
  clearCartItems() {
    this._cartItems = [];
  }

  setCart(cart) {
    this._cart = {
      id: cart.id,
      user_id: cart.user_id,
    };
  }

  // Геттеры
  get cart() {
    return this._cart;
  }

  get cartItems() {
    return this._cartItems;
  }
}
