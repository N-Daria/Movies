import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

export default React.memo(function Movies(props) {
  const buttonClass = window.location.pathname === '/movies' && props.moviesBlock ? 'content__button_open button' : 'content_none';
  const moviesClass = props.moviesBlock ? 'content_open' : 'content_none';

  const [renderedCards, setRenderedCards] = React.useState([]);

  const [cardsNumberOnClick, setCardsNumberOnClick] = React.useState(0);
  const [cardsNumber, setCardsNumber] = React.useState(0);
  const [currentCardsNumber, setCurrentCardsNumber] = React.useState(0);

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

    setCurrentCardsNumber(cardsNumber);
  }

  React.useEffect(() => {
    getScreenWidth();

    if (props.filteredList.length > cardsNumber) {
      setRenderedCards(props.filteredList.slice(0, cardsNumber));
    } else {
      setRenderedCards(props.filteredList.slice(0));
    }
  }, [props.filteredList]);

  function openMoreCards() {
    setRenderedCards([...renderedCards.concat(props.filteredList.slice(currentCardsNumber, currentCardsNumber + cardsNumberOnClick))]);
    setCurrentCardsNumber(currentCardsNumber + cardsNumberOnClick);
  }

  function toggleContent() {
    props.togglePreloaderBlock(true);

    if (localStorage.getItem('movies')) {
      props.filterMovies(props.searchWord, JSON.parse(localStorage.movies));
      checkSearchError();
    }
    else {
      props.getBeatFilms()
        .then((res) => {
          checkSearchError();
        })
        .catch(console.log)
    }
  }

  function checkSearchError() {
    if (props.filteredList.length >= 1) {
      props.toggleMoviesBlock(true);
      props.toggleErrorBlock(false);
    } else {
      props.toggleErrorBlock(true);
      props.changeErrorText('Ничего не найдено');
    }

    props.togglePreloaderBlock(false);
  }

  return (
    <>
      <SearchForm
        toggleContent={toggleContent}
        changeSearchWord={props.changeSearchWord}
        toggleIsShortMovie={props.toggleIsShortMovie}
        isShortMovie={props.isShortMovie}
      />

      <main className={`${moviesClass} content`}>

        < MoviesCardList
          renderedCards={renderedCards}
        />

        <button type='button' className={`${buttonClass} content__button`} onClick={openMoreCards}>еще</button>
      </main>
    </>
  )
}
);