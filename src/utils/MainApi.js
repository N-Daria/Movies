const serverRequestConfig = {
  url: 'https://api.movies.daria.nomoredomains.icu',
  // url: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  cardImageUrl: 'https://api.nomoreparties.co'
};

const checkResponse = (response) => {
  return response.ok ?
    response.json()
    : response.json()
      .then((res) => {
        return res.validation ?
          Promise.reject(res.validation.body.message)
          :
          Promise.reject(res.message);
      })
};

export function likeCard(card) {
  return fetch(`${serverRequestConfig.url}/movies`, {
    method: 'POST',
    headers: serverRequestConfig.headers,
    credentials: "include",
    body: JSON.stringify({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: card.image.url ? `${serverRequestConfig.cardImageUrl}/${card.image.url}` : card.image,
      trailerLink: card.trailerLink,
      thumbnail: card.image.url ? `${serverRequestConfig.cardImageUrl}/${card.image.url}` : card.image,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      movieId: card.id || card.movieId
    })
  })
    .then(checkResponse)
};

export function deleteLikeCard(id) {
  return fetch(`${serverRequestConfig.url}/movies/${id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: serverRequestConfig.headers
  })
    .then(checkResponse)
};


export function register(data) {
  return fetch(`${serverRequestConfig.url}/signup`, {
    method: 'POST',
    headers: serverRequestConfig.headers,
    credentials: "include",
    body: JSON.stringify({
      password: data.password,
      email: data.email,
      name: data.name
    })
  })
    .then(checkResponse)
};

export function login(data) {
  return fetch(`${serverRequestConfig.url}/signin`, {
    method: 'POST',
    headers: serverRequestConfig.headers,
    credentials: "include",
    body: JSON.stringify({
      password: data.password,
      email: data.email,
    })
  })
    .then(checkResponse)
};

export function updateUserInfo(data) {
  return fetch(`${serverRequestConfig.url}/users/me`, {
    method: 'PATCH',
    headers: serverRequestConfig.headers,
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    })
  })
    .then(checkResponse)
};

export function logout(data) {
  return fetch(`${serverRequestConfig.url}/signout`, {
    method: 'POST',
    headers: serverRequestConfig.headers,
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    })
  })
    .then(checkResponse)
};

export function getSavedMovieList() {
  return fetch(`${serverRequestConfig.url}/movies`, {
    headers: serverRequestConfig.headers,
    credentials: "include",
  })
    .then(checkResponse)
};