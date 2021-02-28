
//конструктор API
class Api {
  constructor ({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //приватный метод проверки ответа сервера и преобразование из json
  _transformResJson (res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  // публичный метод загрузки информации о пользователе
  getUserData () {
    return fetch(this.baseUrl + '/users/me', {
      headers: {
        authorization: this.headers
      }
    })

    .then(this._transformResJson)
  }

  //публичный метод загрузки карточек
  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: {
        authorization:  this.headers
      }
    })
    .then(this._transformResJson)
  }

  //публичный метод сохранения отредактированных данных профиля
  patchUserInfo(popupData) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization:  this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name: popupData.name,
      about: popupData.about
     })
    })
    .then(this._transformResJson)
  }

  //публичный метод добавления новой карточки
  postNewCadr (popupData) {
   return fetch (this.baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: this.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // name: popupData.place,
      // link:popupData.place_url
      name: popupData.name,
      link:popupData.link

      })
    })
    .then(this._transformResJson)
  }

  //публичный метод удоления карточки
  deleteCard (cardId) {
    return fetch (this.baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this.headers,
      }
    })
    .then(this._transformResJson)
  }

  //публичный метод постановки и удоления лайка
  changeLikeCardStatus (cardId, isLiked) {
     if (isLiked) {
      // return fetch (this.baseUrl + '/cards/likes/' + cardId,
      return fetch (this.baseUrl + '/cards/'+ cardId + '/likes/' ,
      {
        method: 'PUT',
        headers: {
          authorization: this.headers,
        }
      })
      .then(this._transformResJson)
      } else {
        // return fetch (this.baseUrl + '/cards/likes/' + cardId,
        return fetch (this.baseUrl + '/cards/'+ cardId + '/likes/' ,{
          method: 'DELETE',
          headers: {
            authorization: this.headers,
          }
        })
        .then(this._transformResJson)
      }
  }

  //публичный метод обновления аватара пользователя
  patchUserAvatar (userAvatarUrl) {
    return fetch (this.baseUrl + '/users/me/avatar/', {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: this.headers,
      },
      body: JSON.stringify({
        avatar: userAvatarUrl,
      }),

    })
    .then(this._transformResJson)
  }
}

const api = new Api  ({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  baseUrl: 'http://api.shigatsimesto.students.nomoredomains.icu',
  headers: `Bearer ${localStorage.getItem('token')}`

})

export default api;
