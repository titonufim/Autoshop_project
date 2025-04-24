// для работы с mobx
import { makeAutoObservable } from "mobx";

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

  // для получения переменных из нашего состояния
  // это computed функции, которые вызываются только в том случае, если переменная используемая внутри была изменена (из appRouter)
  get IsAuth() {
    return this._isAuth;
  }

  get User() {
    return this._user;
  }
}
