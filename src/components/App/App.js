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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { likeCard, deleteLikeCard, register, login, updateUserInfo, logout, getSavedMovieList } from '../../utils/MainApi';

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
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);

  const userAuthData = JSON.parse(localStorage.getItem('userData')) || '';

  const [userData, setUserData] = React.useState({
    email: userAuthData.email || '',
    name: userAuthData.name || ''
  });

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

    function setLikes(item) {
      savedMovies.forEach((el) => {
        if (el.movieId === item.movieId || el.movieId === item.id) {
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

    return list
  };

  function openMoreCards() {
    setRenderedCards([...renderedCards.concat(filteredList.slice(currentCardsNumber, currentCardsNumber + cardsNumberOnClick))]);
    setCurrentCardsNumber(currentCardsNumber + cardsNumberOnClick);

    if (currentCardsNumber + cardsNumberOnClick >= filteredList.length) {
      toggleAddCardButton(false);
    }
  }

  function getBeatFilms() {
    getMovieList()
      .then((res) => {
        const list = filterMovies(searchWord, res);
        setFilteredList(list);

        if (currentCardsNumber >= list.length) {
          toggleAddCardButton(false);
        }

        localStorage.setItem('movies', JSON.stringify(list));
        localStorage.setItem('isShortMovie', isShortMovie);
        localStorage.setItem('searchWord', searchWord);
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

  function getSavedFilms() {
    getSavedMovieList()
      .then((res) => {
        const list = filterMovies(searchWord, res.movies);
        setFilteredSavedMovies(list);
      })
      .catch((err) => {
        toggleMoviesBlock(false);
        toggleErrorBlock(true);
        changeErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        togglePreloaderBlock(false);
      })
  }

  function handleCardDelete(card) {
    deleteLikeCard(card._id)
      .then((res) => {
        setFilteredSavedMovies((state) => {
          return state.filter(card => card._id !== res.movie._id)
        })
      })
      .catch(console.log)
  }

  function handleCardLike(card) {

    function onSetCards(newCard) {
      const id = card.movieId ? card.movieId : card.id;

      return setFilteredList((state) => {
        return state.map((cardInCards) => {
          return cardInCards.id === id || cardInCards.movieId === id ? newCard : cardInCards;
        });
      });
    }

    card.isLike === true ?
      deleteLikeCard(card._id)
        .then((res) => {
          onSetCards(res.movie)
        })
        .catch(console.log)
      : likeCard(card)
        .then((res) => {
          res.movie.isLike = !res.movie.isLike;
          onSetCards(res.movie);
        })
        .catch(console.log)
  }

  function handleRegister(data) {
    setErrorText('');

    register(data)
      .then((res) => {
        if (res.data._id) {
          handleLogin(data);
        }
      })
      .catch((err) => {
        setErrorText(err);
      })
  }

  function handleLogin(data) {
    setErrorText('');

    login(data)
      .then((res) => {
        localStorage.setItem('userId', JSON.stringify(res._id));
        localStorage.setItem('userData', JSON.stringify({
          name: res.name,
          email: res.email,
        }));
        setUserData({
          name: res.name,
          email: res.email,
        })
        setLoggedIn(true);
        redirect('/movies');
      })
      .catch((err) => {
        setErrorText(err);
      })
  }

  function handleUpdateUserInfo(data) {
    setErrorText('');

    updateUserInfo(data)
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify({
          name: res.user.name,
          email: res.user.email,
        }));
        setUserData({
          name: res.user.name,
          email: res.user.email,
        })
        setErrorText("Данные успешно изменены!");
      })
      .catch((err) => {
        setErrorText(err);
      })
  }

  function handleLogout() {
    logout(userData)
      .then((res) => {
        localStorage.clear();
        setLoggedIn(false);
        redirect('/');
      })
      .catch((err) => {
        setErrorText(err);
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
      filterMovies(localStorage.getItem('searchWord'), JSON.parse(localStorage.getItem('movies')));
      setFilteredList(JSON.parse(localStorage.getItem('movies')))
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('userData')) {
      setLoggedIn(true)
    }
  }, []);

  React.useEffect(() => {
    getSavedMovieList()
      .then((res) => {
        setSavedMovies(res.movies)
      })
      .catch((err) => {
        setErrorText(err);
      })
  }, []);

  return (
    <Routes>

      <Route
        path='/signin'
        element={
          <Login
            handleLogin={handleLogin}
            errorText={errorText}
          />
        }
      />

      <Route
        path='/signup'
        element={
          <Register
            handleRegister={handleRegister}
            errorText={errorText}
          />
        }
      />

      <Route
        path='/movies'
        element={

          <ProtectedRoute
            loggedIn={loggedIn}
            redirect={redirect}>

            <Header
              loggedIn={loggedIn}
            />
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
              getBeatFilms={getBeatFilms}
              filterMovies={filterMovies}
              searchWord={searchWord}
              togglePreloaderBlock={togglePreloaderBlock}
            />
            <Preloader
              preloaderBlock={preloaderBlock}
            />
            <Error
              errorBlock={errorBlock}
              errorText={errorText}
            />

            <Footer />

          </ProtectedRoute>
        }
      />

      <Route
        path='/saved-movies'
        element={

          <ProtectedRoute
            loggedIn={loggedIn}
            redirect={redirect}>

            <Header
              loggedIn={loggedIn}
            />
            <SavedMovies
              changeSearchWord={changeSearchWord}
              toggleIsShortMovie={toggleIsShortMovie}
              isShortMovie={isShortMovie}
              searchWord={searchWord}
              moviesBlock={moviesBlock}
              filteredSavedMovies={filteredSavedMovies}
              getSavedFilms={getSavedFilms}
              handleCardDelete={handleCardDelete}
              togglePreloaderBlock={togglePreloaderBlock}
            />
            <Footer />

          </ProtectedRoute>
        }
      />

      <Route
        path='/profile'
        element={

          <ProtectedRoute
            loggedIn={loggedIn}
            redirect={redirect}
          >

            <Header
              loggedIn={loggedIn}
            />
            <Profile
              userData={userData}
              errorText={errorText}
              handleUpdateUserInfo={handleUpdateUserInfo}
              handleLogout={handleLogout}
            />

          </ProtectedRoute>
        }
      />

      < Route
        path='/'
        element={<>
          <Header
            loggedIn={loggedIn}
          />
          < Main />
          <Footer />
        </>}
      />

      < Route
        path='*'
        element={
          < Undefined />
        }
      />

    </Routes>
  );
});