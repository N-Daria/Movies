import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies(props) {
  const moviesClass = props.moviesBlock ? 'content_open' : 'content_none';

  function showContent() {
    props.togglePreloaderBlock(true);
    props.getSavedFilms();
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
        <MoviesCardList
          renderedCards={props.filteredSavedMovies}
          handleCardDelete={props.handleCardDelete}
        />
      </main>
    </>
  )
};