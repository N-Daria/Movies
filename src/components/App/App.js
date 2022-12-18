import './App.css';
import { Route, Routes } from "react-router-dom";
import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Undefined from '../Undefined/Undefined';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import { getMovieList } from '../../utils/MoviesApi';
import Error from '../Error/Error';
import Preloader from '../Preloader/Preloader';

export default React.memo(function App() {
  const [loggedIn, setloggedIn] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState([]);

  const [preloaderBlock, setPreloaderBlock] = React.useState(false);
  const [moviesBlock, setMoviesBlock] = React.useState(false);
  const [errorBlock, setErrorBlock] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState('');

  // const toggleErrorBlock = React.useCallback((state) => {
  //   setErrorBlock(state)
  // }, [moviesBlock])

  function changeSearchWord(state) {
    setSearchWord(state);
  }

  function togglePreloaderBlock(state) {
    setPreloaderBlock(state);
  }

  function toggleMoviesBlock(state) {
    setMoviesBlock(state);
  }

  function toggleErrorBlock(state) {
    setErrorBlock(state)
  }

  function changeErrorText(text) {
    setErrorText(text)
  }

  function toggleIsShortMovie() {
    isShortMovie ? setIsShortMovie(false) : setIsShortMovie(true);
  }

  // const movieList = React.useMemo(() => setFilteredList(filteredList), [isShortMovie]);

  function filterMovies(movieName, allMovies) {
    movieName = movieName.toLowerCase();
    const movieDuration = isShortMovie ? 40 : 10000;
    setFilteredList([]);

    if (!allMovies) {
      return null
    }

    for (let i = 0; i < allMovies.length; i++) {
      if (allMovies[i].duration <= movieDuration &&
        ((allMovies[i].country).toLowerCase().includes(movieName) ||
          (allMovies[i].description).toLowerCase().includes(movieName) ||
          (allMovies[i].director).toLowerCase().includes(movieName) ||
          (allMovies[i].nameEN).toLowerCase().includes(movieName) ||
          (allMovies[i].nameRU).toLowerCase().includes(movieName) ||
          (allMovies[i].year).toLowerCase().includes(movieName))) {
        setFilteredList(list => [...list, allMovies[i]]);
      }
    }
  };

  // const changeMovieList = React.useEffect(() => {
  // }, [loggedIn])

  function getBeatFilms() {
    localStorage.clear();

    return getMovieList()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));
        localStorage.setItem('isShortMovie', isShortMovie);
        localStorage.setItem('searchWord', searchWord);

        filterMovies(searchWord, JSON.parse(localStorage.movies));
      })
      .catch((err) => {
        toggleMoviesBlock(false);
        togglePreloaderBlock(false);
        toggleErrorBlock(true);
        changeErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
  };

  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Register />} />

      <Route path='/movies' element={<>
        <Header loggedIn={loggedIn} />

        < Movies
          filteredList={filteredList}
          getBeatFilms={getBeatFilms}

          togglePreloaderBlock={togglePreloaderBlock}
          filterMovies={filterMovies}
          searchWord={searchWord}

          toggleMoviesBlock={toggleMoviesBlock}
          toggleErrorBlock={toggleErrorBlock}
          changeErrorText={changeErrorText}

          changeSearchWord={changeSearchWord}
          moviesBlock={moviesBlock}

          toggleIsShortMovie={toggleIsShortMovie}
          isShortMovie={isShortMovie}
        />

        <Preloader
          preloaderBlock={preloaderBlock}
        />

        <Error
          errorBlock={errorBlock}
          errorText={errorText}
        />

        <Footer />
      </>} />

      <Route path='/saved-movies' element={<>
        <Header loggedIn={loggedIn} />
        < SavedMovies />
        <Footer />
      </>} />

      <Route path='/profile' element={<>
        <Header loggedIn={loggedIn} />
        <Profile />
        <Footer />
      </>} />

      <Route path='/' element={<>
        <Header loggedIn={loggedIn} />
        < Main />
        <Footer />
      </>} />

      <Route path='*' element={<Undefined />} />

    </Routes>
  );
}
);
