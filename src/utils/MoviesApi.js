const url = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);
}

export function getMovieList() {
  return fetch(url)
    .then(checkResponse)
};
