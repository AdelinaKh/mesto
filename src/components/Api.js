const onError = res => {
  if (res.ok) {
  return res.json();
  }
  // если ошибка, то отклоняем Promise
  return Promise.reject(`Ошибка: ${res.status}`);
}
export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;     
  }
  //метод для получения начальных карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { 
      method: 'GET',
      headers: this._headers
    })
    .then(onError)
  }
  //метод для получения данных о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(onError)
  }
  //метод для добавления новой карточки на сервер
  postNewCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, { 
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.title ,
        link: newCard.subtitle
      })
    })
      .then(onError);
  }
  //метод для редактирования профиля
  editUserInfo(newData) {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: newData.title,
      about: newData.subtitle
      })
    })
    .then(onError);
  }
  //метод для редактирования аватара
  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar['avatar-link'] //input name
        })
      })
      .then(onError);
  }
  //метод для удаления карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, { 
      method: 'DELETE',
      headers: this._headers,
      })
      .then(onError);
  }
  //метод для установки лайка
  postLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, { 
      method: 'PUT',
      headers: this._headers,
    })
      .then(onError);
  }
  //метод для удаления лайка
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, { 
      method: 'DELETE',
      headers: this._headers,
    })
      .then(onError);
  }
}
