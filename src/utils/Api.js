class Api {
  constructor (url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        Promise.reject(`Ошибка: ${response.status}`);
      })
  }

  getUserInfoApi () {
    return this._sendRequest(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  sendUserInfoApi (userData) {
    return this._sendRequest(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
  }

  getInitialCards () {
    return this._sendRequest(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  sendNewCard (card) {
    return this._sendRequest(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
  }

  deleteCard (id) {
    return this._sendRequest(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  increaseLike (id) {
    return this._sendRequest(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  decreaseLike (id) {
    return this._sendRequest(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  setUserAvatar (avatar) {
    return this._sendRequest(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
  }

  changeLikeCardStatus (id, like) {
    if (like) {
      return this.increaseLike(id)
    } else {
      return this.decreaseLike(id);
    }
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-76/', {
  authorization: '8f8af84c-eec3-4285-befa-34c0d077142c',
  "Content-Type": "application/json"
});

export default api;



