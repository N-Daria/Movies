import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  let buttonClass = props.url === '/movies' ? 'content__button_open button' : 'content_none';

  return (
    <section className='content'>
      <ul className='content__list list'>
        {props.movies !== undefined && props.movies.length > 1 && props.movies.map(function (movie) {
          return <MoviesCard {...movie}
            key={movie.id}
          />
        })}
      </ul>
      <button type='button' className={`${buttonClass} content__button`}>еще</button>
    </section >
  )
};
