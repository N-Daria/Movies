import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {

  return (
    <>
      <SearchForm />
      <MoviesCardList url='/movies' />
    </>
  )
};