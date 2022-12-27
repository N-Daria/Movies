const serverRequestConfig = {
  // url: 'https://backend.mesto.nomoredomains.icu',
  url: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'credentials': "include",
  },
};

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);
}

export function likeCard(card) {
  return fetch(`${serverRequestConfig.url}/movies`, {
    method: 'POST',
    headers: serverRequestConfig.headers,
    body: JSON.stringify({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: card.image,
      trailerLink: card.trailerLink,
      thumbnail: card.thumbnail,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      movieId: card.id
    })
  })
    .then(checkResponse)
};

export function deleteLikeCard(id) {
  return fetch(`${serverRequestConfig.url}/movies/${id}`, {
    method: 'DELETE',
    headers: serverRequestConfig.headers
  })
    .then(checkResponse)
};
