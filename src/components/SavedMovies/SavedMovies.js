import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies(props) {
  const moviesClass = props.moviesBlock ? 'content_open' : 'content_none';
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState('');

  function showContent(isShort) {
    props.togglePreloaderBlock(true);
    props.toggleMoviesBlock(false);
    props.getSavedFilms(searchWord, isShort);
  }

  return (
    <>
      <SearchForm
        isShortMovie={isShortMovie}
        setIsShortMovie={setIsShortMovie}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        showContent={showContent}
        renderedCards={props.filteredSavedMovies}
      />

      <main className={`${moviesClass} content`}>
        <MoviesCardList
          renderedCards={props.filteredSavedMovies}
          handleCardDelete={props.handleCardDelete}
        />
      </main>
    </>
  )
};