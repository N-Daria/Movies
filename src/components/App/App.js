import './App.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { likeCard, deleteLikeCard, register, login, updateUserInfo, logout, getSavedMovieList, getUserInfo } from '../../utils/MainApi';

export default React.memo(function App() {
  const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem("loggedIn")));
  const [filteredList, setFilteredList] = React.useState([]);
  const [renderedCards, setRenderedCards] = React.useState([]);
  const [preloaderBlock, setPreloaderBlock] = React.useState(false);
  const [moviesBlock, setMoviesBlock] = React.useState(false);
  const [errorBlock, setErrorBlock] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [cardsNumberOnClick, setCardsNumberOnClick] = React.useState(0);
  const [cardsNumber, setCardsNumber] = React.useState(0);
  const [currentCardsNumber, setCurrentCardsNumber] = React.useState(0);
  const [addCardButton, setAddCardButton] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    email: '',
    name: '',
    id: ''
  });

  const navigate = useNavigate();

  function redirect(path) {
    navigate(path);
  }

  // getting needed number of cards on page

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

  // movies filter

  function filterMovies(movieName, allMovies, isShortMovie) {
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
      setMoviesBlock(true);
      setErrorBlock(false);
    } else {
      setErrorBlock(true);
      setErrorText('Ничего не найдено');
    }

    if (list.length > cardsNumber) {
      setAddCardButton(true);
    } else {
      setAddCardButton(false);
    }

    return list
  }

  // add button's work

  function openMoreCards() {

    if (!(renderedCards.length > currentCardsNumber)) {
      setRenderedCards([...renderedCards.concat(filteredList.slice(currentCardsNumber, currentCardsNumber + cardsNumberOnClick))]);
    }

    setCurrentCardsNumber(currentCardsNumber + cardsNumberOnClick);

    if (currentCardsNumber + cardsNumberOnClick >= filteredList.length) {
      setAddCardButton(false);
    }
  }

  // api requests or data extraction

  function getBeatFilms(searchWord, isShortMovie) {
    if (localStorage.getItem('allBeatMovies')) {
      setFilteredList(filterMovies(searchWord, JSON.parse(localStorage.getItem('allBeatMovies')), isShortMovie));
    } else {
      getMovieList()
        .then((res) => {
          const list = filterMovies(searchWord, res, isShortMovie);
          setFilteredList(list);

          if (currentCardsNumber >= list.length) {
            setAddCardButton(false);
          }

          localStorage.setItem('allBeatMovies', JSON.stringify(res))
          localStorage.setItem('movies', JSON.stringify(list));
          localStorage.setItem('isShortMovie', isShortMovie);
          localStorage.setItem('searchWord', searchWord);
        })
        .catch((err) => {
          setMoviesBlock(false);
          setAddCardButton(false);
          setErrorBlock(true);
          setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setPreloaderBlock(false);
        })
    }
  };

  function getSavedFilms(searchWord, isShortMovie) {
    if (savedMovies.length >= 1) {
      setFilteredSavedMovies(filterMovies(searchWord, savedMovies, isShortMovie))
    } else {
      getSavedMovieList()
        .then((res) => {
          if (res.movies.length < 1) {
            throw new Error();
          }
          const list = filterMovies(searchWord, res.movies, isShortMovie);
          setFilteredSavedMovies(list);
        })
        .catch((err) => {
          setMoviesBlock(false);
          setErrorBlock(true);
          setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setPreloaderBlock(false);
        })
    }
  }

  // card's actions

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

    function findCardId() {
      let id = '';
      savedMovies.forEach((el) => {
        if (el.movieId === card.id) {
          id = el._id;
          return
        }
      })
      return id;
    }

    if (card.isLike === true) {
      const cardId = card._id || findCardId();

      deleteLikeCard(cardId)
        .then((res) => {
          onSetCards(res.movie)
        })
        .catch(console.log)
    } else {
      likeCard(card)
        .then((res) => {
          res.movie.isLike = true;
          onSetCards(res.movie);
        })
        .catch(console.log)
    }
  }

  // authorization, update user info && logout 

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
        setCurrentUser({
          name: res.name,
          email: res.email,
          id: res._id
        });
        localStorage.setItem("loggedIn", true);
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
        setCurrentUser({
          name: res.user.name,
          email: res.user.email,
          id: res._id
        });
        setErrorText("Данные успешно изменены!");
      })
      .catch((err) => {
        setErrorText(err);
      })
  }

  function handleLogout() {
    logout(currentUser)
      .then((res) => {
        localStorage.clear();
        setLoggedIn(false);
        setSavedMovies([]);
        setCurrentUser({
          email: '',
          name: '',
          id: ''
        })
        redirect('/');
      })
      .catch((err) => {
        setErrorBlock(true);
        setErrorText(err);
      })
  }

  // set rendered card number

  React.useEffect(() => {
    getScreenWidth();

    if (renderedCards.length > cardsNumber) {
      setRenderedCards(filteredList.slice(0, renderedCards.length));
      setCurrentCardsNumber(renderedCards.length);
      return
    }

    setCurrentCardsNumber(renderedCards.length || cardsNumber);

    if (filteredList.length > cardsNumber) {
      setRenderedCards(filteredList.slice(0, cardsNumber));
    } else {
      setRenderedCards(filteredList.slice(0));
    }
  }, [filteredList]);


  // turn off preloader block after movies render

  React.useEffect(() => {
    setPreloaderBlock(false);
  }, [filteredSavedMovies, filteredList]);

  // check window screen width

  React.useEffect(() => {
    window.addEventListener("resize", () => setTimeout(() => {
      getScreenWidth();
      setCurrentCardsNumber(currentCardsNumber);
    }, 1000));
  });

  // set default saved movies

  React.useEffect(() => {
    if (localStorage.getItem('movies')) {
      setFilteredList(filterMovies(localStorage.getItem('searchWord'), JSON.parse(localStorage.getItem('movies'))));
    }
  }, [savedMovies]);

  // chech if user is registered & get default user & saved movies information 

  const handleTokenCheck = React.useCallback(() => {
    setErrorBlock(false);
    setErrorText('');
    if (localStorage.getItem("loggedIn")) {
      Promise.all([getSavedMovieList(), getUserInfo()])
        .then((res) => {
          const [movies, { name, email, id }] = res;
          setSavedMovies(movies.movies);
          setCurrentUser({
            name: name,
            email: email,
            id: id
          });
        })
        .catch((err) => {
          setErrorText(err);
        })
    }
  }, [loggedIn]);

  React.useEffect(() => {
    handleTokenCheck()
  }, [loggedIn, handleTokenCheck])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>

        <Route
          path='/signin'
          element={
            loggedIn ? <Navigate to='/' /> :
              <Login
                handleLogin={handleLogin}
                errorText={errorText}
              />
          }
        />

        <Route
          path='/signup'
          element={
            loggedIn ? <Navigate to='/' /> :
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
                renderedCards={renderedCards}
                openMoreCards={openMoreCards}
                addCardButton={addCardButton}
                handleCardLike={handleCardLike}
                moviesBlock={moviesBlock}
                getBeatFilms={getBeatFilms}
                filterMovies={filterMovies}
                setPreloaderBlock={setPreloaderBlock}
                setMoviesBlock={setMoviesBlock}
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
                moviesBlock={moviesBlock}
                filteredSavedMovies={filteredSavedMovies}
                setFilteredSavedMovies={setFilteredSavedMovies}
                getSavedFilms={getSavedFilms}
                handleCardDelete={handleCardDelete}
                setPreloaderBlock={setPreloaderBlock}
                setMoviesBlock={setMoviesBlock}
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
                errorText={errorText}
                handleUpdateUserInfo={handleUpdateUserInfo}
                handleLogout={handleLogout}
                setErrorText={setErrorText}
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
    </CurrentUserContext.Provider>
  );
});