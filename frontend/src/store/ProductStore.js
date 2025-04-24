import { makeAutoObservable } from "mobx";
// для работы с mobx
export default class ProductStore {
  constructor() {
    this._category = [
      { category_id: 1, category_name: "Моторное масло" },
      { category_id: 2, category_name: "Аккумулятор" },
      { category_id: 3, category_name: "Антифриз" },
      { category_id: 4, category_name: "Гидравлическое масло" },
      { category_id: 5, category_name: "Автохмимия" },
    ];
    this._product = [
      {
        id: 3,
        name: "Антифриз NGN Long Life Antifreeze BS",
        description: "Готовый (раствор), 5л",
        price: 1300,
        stock: 28,
        image: "8366fe48-6517-4073-8309-31161b9b2c8b.jpg",
        category_id: 3,
      },
      {
        id: 1,
        name: "Лукойл GENESIS ARMORTECH 5W-40",
        description: "Синтетическое моторное масло, 4л",
        price: 2499,
        stock: 30,
        image: "274bce8b-67ae-450e-86d6-63a158110ddb.jpg",
        category_id: 1,
      },
      {
        id: 2,
        name: "Аккумулятор DELTA CT12201",
        description: "Обратная полярность, 20А",
        price: 6300,
        stock: 13,
        image: "b7ac01ac-4ad0-432f-a0ef-3d79170cddad.jpg",
        category_id: 2,
      },
      {
        id: 4,
        name: "E13C, LYNXauto",
        description: "Прямая полярность, 520A",
        price: 12000,
        stock: 21,
        image: "b8a8b082-a945-4ea4-afa3-8b32fa199dc1.jpg",
        category_id: 2,
      },
    ];
    makeAutoObservable(this);
  }

  // экшены - функции изменяющие состояние
  setCategory(category) {
    this._category = category;
  }
  setProduct(product) {
    this._product = product;
  }

  // для получения переменных из нашего состояния
  // это computed функции, которые вызываются только в том случае, если переменная используемая внутри была изменена (из appRouter)
  get category() {
    return this._category;
  }

  get product() {
    return this._product;
  }
}
