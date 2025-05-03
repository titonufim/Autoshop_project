// для работы с mobx
import { makeAutoObservable } from "mobx";
// import {
//   login as loginApi,
//   registration as registrationApi,
//   check_auth as checkAuthApi,
//   deleteUser as del,
// } from "../http/userAPI";

export default class UserStore {
  constructor() {
    this._isAuth = false; // _ - переменная изменяться не может
    this._user = {};
    makeAutoObservable(this);
  }

  // экшены - функции изменяющие состояние
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }

  logout() {
    this._isAuth = false;
    this._user = {};
    localStorage.removeItem("token");
  }

  // для получения переменных из нашего состояния
  // это computed функции, которые вызываются только в том случае, если переменная используемая внутри была изменена (из appRouter)
  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
