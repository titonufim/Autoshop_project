import { $authHost, $host } from "./index"; // импортируем экземпляры Axios для авторизованных и неавторизованных запросов
import { jwtDecode } from "jwt-decode"; // для извлечения данных из токена

// реализуем регистрацию авторизацию и проверку токена на валидность
// +
export const registration = async (name, email, password_hash) => {
  // админ на время
  const { data } = await $host.post("api/user/registration", { name, email, password_hash }); // получаем токен на бэке
  // { name, email, password_hash, role }
  localStorage.setItem("token", data.token); // в локальное хранилище по ключу токен помещаем токен
  return jwtDecode(data.token);
  //return data;
};

// +
export const login = async (email, password_hash) => {
  const { data } = await $host.post("api/user/login", { email, password_hash });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

// +-
export const check_auth = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

// +
export const deleteUser = async () => {
  const { data } = await $authHost.delete("api/user/");
  return data; // Возвращаем результат
};

// router.post("/registration", userController.registration);
// router.post("/login", userController.login);
// router.get("/auth", authMiddleware, userController.check_auth);
// не исп router.get("/", checkRole("admin"), userController.getAll);
// router.delete("/", authMiddleware, userController.delete);
