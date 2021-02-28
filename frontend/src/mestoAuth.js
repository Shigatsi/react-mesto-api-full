// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'http://api.shigatsimesto.students.nomoredomains.icu'

const checkRes = (res) => res.ok ? res.json() : Promise.reject('Ошибка на сервере');
//регистрация
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkRes);
};

//авторизация
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkRes);
};


//получаем токен
export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(checkRes);
}
