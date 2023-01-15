import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

export default React.memo(function Movies(props) {
  const buttonClass = props.addCardButton && props.moviesBlock ? 'content__button_open button' : 'content_none';
  const moviesClass = props.moviesBlock ? 'content_open' : 'content_none';

  function showContent() {
    props.togglePreloaderBlock(true);
    props.toggleMoviesBlock(false);
    props.getBeatFilms();
  }

  return (
    <>
      <SearchForm
        searchWord={props.searchWord}
        changeSearchWord={props.changeSearchWord}
        isShortMovie={props.isShortMovie}
        toggleIsShortMovie={props.toggleIsShortMovie}
        showContent={showContent}
        renderedCards={props.renderedCards}
      />

      <main className={`${moviesClass} content`}>

        < MoviesCardList
          renderedCards={props.renderedCards}
          handleCardLike={props.handleCardLike}
        />

        <button type='button' className={`${buttonClass} content__button`} onClick={props.openMoreCards}>еще</button>
      </main>
    </>
  )
});