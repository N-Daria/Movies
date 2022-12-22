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
  const [renderedCards, setRenderedCards] = React.useState([]);
  const [preloaderBlock, setPreloaderBlock] = React.useState(false);
  const [moviesBlock, setMoviesBlock] = React.useState(false);
  const [errorBlock, setErrorBlock] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState('');
  const [cardsNumberOnClick, setCardsNumberOnClick] = React.useState(0);
  const [cardsNumber, setCardsNumber] = React.useState(0);
  const [currentCardsNumber, setCurrentCardsNumber] = React.useState(0);
  const [addCardButton, setAddCardButton] = React.useState(false);

  const toggleAddCardButton = React.useCallback((state) => {
    setAddCardButton(state);
  }, [])

  const changeSearchWord = React.useCallback((state) => {
    setSearchWord(state);
  }, [])

  const togglePreloaderBlock = React.useCallback((state) => {
    setPreloaderBlock(state);
  }, [])

  const toggleMoviesBlock = React.useCallback((state) => {
    setMoviesBlock(state);
  }, [])

  const toggleErrorBlock = React.useCallback((state) => {
    setErrorBlock(state)
  }, [])

  const changeErrorText = React.useCallback((text) => {
    setErrorText(text)
  }, [])

  const toggleIsShortMovie = React.useCallback(() => {
    isShortMovie ? setIsShortMovie(false) : setIsShortMovie(true);
  }, [])

  function getScreenWidth() {
    if (window.innerWidth <= 577) {
      setCardsNumber(5);
      setCardsNumberOnClick(2);
    } else if (window.innerWidth <= 930) {
      setCardsNumber(8);
      setCardsNumberOnClick(2);
    } else if (window.innerWidth <= 1280) {
      setCardsNumber(9);
      setCardsNumberOnClick(3);
    } else {
      setCardsNumber(12);
      setCardsNumberOnClick(4);
    }
  }

  function filterMovies(movieName, allMovies) {
    movieName = movieName.toLowerCase();
    const movieDuration = isShortMovie ? 40 : 10000;
    const list = [];

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
        list.push(allMovies[i])
      }
    }

    setFilteredList(list)

    if (list.length >= 1) {
      toggleMoviesBlock(true);
      toggleAddCardButton(true);
      toggleErrorBlock(false);
    } else {
      toggleErrorBlock(true);
      changeErrorText('Ничего не найдено');
    }

    if (currentCardsNumber >= list.length) {
      toggleAddCardButton(false);
    }
  };

  function openMoreCards() {
    setRenderedCards([...renderedCards.concat(filteredList.slice(currentCardsNumber, currentCardsNumber + cardsNumberOnClick))]);
    setCurrentCardsNumber(currentCardsNumber + cardsNumberOnClick);

    if (currentCardsNumber + cardsNumberOnClick >= filteredList.length) {
      toggleAddCardButton(false);
    }
  }

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
        toggleAddCardButton(false);
        toggleErrorBlock(true);
        changeErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        togglePreloaderBlock(false);
      })
  };

  React.useEffect(() => {
    getScreenWidth();
    setCurrentCardsNumber(cardsNumber);

    if (filteredList.length > cardsNumber) {
      setRenderedCards(filteredList.slice(0, cardsNumber));
    } else {
      setRenderedCards(filteredList.slice(0));
    }
  }, [filteredList]);

  React.useEffect(() => {
    window.addEventListener("resize", () => setTimeout(() => {
      getScreenWidth();
      setCurrentCardsNumber(currentCardsNumber);
    }, 1000));
  });

  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Register />} />

      <Route path='/movies' element={<>
        <Header loggedIn={loggedIn} />

        < Movies
          filteredList={filteredList}
          changeSearchWord={changeSearchWord}
          toggleIsShortMovie={toggleIsShortMovie}
          isShortMovie={isShortMovie}
          renderedCards={renderedCards}
          openMoreCards={openMoreCards}
          addCardButton={addCardButton}

          moviesBlock={moviesBlock}

          togglePreloaderBlock={togglePreloaderBlock}
          getBeatFilms={getBeatFilms}
          filterMovies={filterMovies}
          searchWord={searchWord}
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
});