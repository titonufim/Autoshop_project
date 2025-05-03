import axios from "axios";
// создание axios инстансов
// Создаем инстансы?

//для неавторизованного
const $host = axios.create({
  // укажем URL
  baseURL: process.env.REACT_APP_API_URL,
});

// для авторизованного
// здесь автоматически подставляется хэдер Authorization и добавляетсся токен
const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// интерцептор - принимающая параметром config
// токен получаем из локального хранилища, по ключу 'token' (он сохраняется влокальное хранилище при авторизации)
const authInteceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

// добавляем интерцептор к $authHost отрабатывает перед каждым request и подставляет токен в хедер Authorization
$authHost.interceptors.request.use(authInteceptor);

export { $host, $authHost };
