import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._category = [];
    this._product = [];
    this._selectedCategory = {};

    this._page = 1;
    this._totalCount = 0;
    this._limit = 6;
    makeAutoObservable(this);
  }

  setCategory(category) {
    this._category = category;
  }

  setProduct(products) {
    this._product = products;
  }

  setSelectedCategory(type) {
    this.setPage(1);
    this._selectedCategory = type;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get category() {
    return this._category;
  }

  get product() {
    return this._product;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }
}
