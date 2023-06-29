const {REACT_APP_BASE_URL_LINK: BASE_URL } = process.env;

export const checkErrors = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`error: ${res.status}`)
    }
}

export const register = (email, password) => {

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkErrors)
}

export const authorization = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkErrors)
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/user/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(checkErrors);
}