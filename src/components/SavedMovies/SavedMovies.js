import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies(props) {
  const moviesClass = props.moviesBlock ? 'content_open' : 'content_none';

  function showContent() {
    props.togglePreloaderBlock(true);
    props.toggleMoviesBlock(false);
    props.getSavedFilms();
  }

  return (
    <>
      <SearchForm
        isShortMovie={props.isShortMovie}
        toggleIsShortMovie={props.toggleIsShortMovie}
        renderedCards={props.filteredSavedMovies}
        changeSearchWord={props.changeSearchWord}
        showContent={showContent}
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