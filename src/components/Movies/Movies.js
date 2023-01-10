import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

export default React.memo(function Movies(props) {
  const buttonClass = props.addCardButton && props.moviesBlock ? 'content__button_open button' : 'content_none';
  const moviesClass = props.moviesBlock ? 'content_open' : 'content_none';

  function showContent() {
    props.togglePreloaderBlock(true);
    props.getBeatFilms();
  }

  return (
    <>
      <SearchForm
        changeSearchWord={props.changeSearchWord}
        toggleIsShortMovie={props.toggleIsShortMovie}
        isShortMovie={props.isShortMovie}
        showContent={showContent}
        searchWord={props.searchWord}
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