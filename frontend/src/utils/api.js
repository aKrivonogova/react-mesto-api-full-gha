class Api {
    constructor(options) {
        this._headers = options.headers;
        this._url = options.url
    }

    _checkErrors(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`error: ${res.status}`)
        }
    }

    getInitialCards(token) {
        return fetch(this._url + '/cards', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._checkErrors)
    }

    getUserInfo(token) {
        return fetch(this._url + '/user/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(this._checkErrors)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(this._url + `/cards/${id}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then(this._checkErrors)
    }
    addCard(data, token) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }, body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._checkErrors)
    }

    deleteCard(cardId, token) {
        return fetch(this._url + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then(this._checkErrors)
    }

    setUserInfoByAPI(data, token) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkErrors)
    }

    setUserAvatarByAPI(data, token) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(this._checkErrors);
    }

    getData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
}


export default new Api({
    url: 'http://localhost:3000'
})