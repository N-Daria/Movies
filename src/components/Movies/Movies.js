import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

export default React.memo(function Movies(props) {
  const buttonClass = window.location.pathname === '/movies' && props.addCardButton && props.moviesBlock ? 'content__button_open button' : 'content_none';
  const moviesClass = props.moviesBlock ? 'content_open' : 'content_none';

  function showContent() {
    props.togglePreloaderBlock(true);

    if (localStorage.getItem('movies')) {
      props.filterMovies(props.searchWord, JSON.parse(localStorage.movies));
    } else {
      props.getBeatFilms()
    }

    props.togglePreloaderBlock(false);
  }

  return (
    <>
      <SearchForm
        changeSearchWord={props.changeSearchWord}
        toggleIsShortMovie={props.toggleIsShortMovie}
        isShortMovie={props.isShortMovie}
        toggleIsSearch={props.toggleIsSearch}
        showContent={showContent}
      />

      <main className={`${moviesClass} content`}>

        < MoviesCardList
          renderedCards={props.renderedCards}
        />

        <button type='button' className={`${buttonClass} content__button`} onClick={props.openMoreCards}>еще</button>
      </main>
    </>
  )
});