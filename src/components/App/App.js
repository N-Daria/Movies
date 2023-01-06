import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { likeCard, deleteLikeCard, register } from '../../utils/MainApi';

export default React.memo(function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [filteredList, setFilteredList] = React.useState([]);
  const [renderedCards, setRenderedCards] = React.useState([]);
  const [preloaderBlock, setPreloaderBlock] = React.useState(false);
  const [moviesBlock, setMoviesBlock] = React.useState(false);
  const [errorBlock, setErrorBlock] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [isShortMovie, setIsShortMovie] = React.useState(localStorage.getItem('isShortMovie') === 'true' || false);
  const [searchWord, setSearchWord] = React.useState(localStorage.getItem('searchWord') || '');
  const [cardsNumberOnClick, setCardsNumberOnClick] = React.useState(0);
  const [cardsNumber, setCardsNumber] = React.useState(0);
  const [currentCardsNumber, setCurrentCardsNumber] = React.useState(0);
  const [addCardButton, setAddCardButton] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const navigate = useNavigate();

  function redirect(path) {
    navigate(path);
  }

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
        setLikes(allMovies[i]);
        list.push(allMovies[i]);
      }
    }

    setFilteredList(list);

    function setLikes(item) {
      savedMovies.forEach((el) => {
        if (el.movieId === item.movieId) {
          item.isLike = true;
        }
      })
    }

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

    localStorage.setItem('movies', JSON.stringify(list));
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
        filterMovies(searchWord, res);
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

  function handleCardLike(card) {

    function onSetCards(newCard) {
      return setFilteredList((state) => {
        return state.map((cardInCards) => {
          return cardInCards.id === card.id ? newCard : cardInCards;
        });
      });
    }

    card.isLike === true ?
      deleteLikeCard(card._id)
        .then((res) => {
          onSetCards(res)
        })
        .catch(console.log)
      : likeCard(card)
        .then((res) => {
          onSetCards(res);
        })
        .catch(console.log)
  }

  function handleRegister(data) {
    setErrorText('');

    register(data)
      .then((res) => {
        if (res.data._id) {
          localStorage.setItem('userData', JSON.stringify(res.data));
          setLoggedIn(true);
          redirect('/movies');
        }
      })
      .catch((err) => {
        setErrorText(err.message || 'Переданы некорректные данные');
      })
  }

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

  React.useEffect(() => {
    if (localStorage.getItem('movies')) {
      setFilteredList(JSON.parse(localStorage.getItem('movies')));
      toggleMoviesBlock(true)
    }
  }, []);

  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={
        <Register
          handleRegister={handleRegister}
          errorText={errorText}
        />
      } />

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
          handleCardLike={handleCardLike}

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