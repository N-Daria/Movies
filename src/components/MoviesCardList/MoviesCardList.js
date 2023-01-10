import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

export default React.memo(function MoviesCardList(props) {

  return (
    <ul className='content__list list'>
      {props.renderedCards && props.renderedCards.map(function (movie) {
        return <MoviesCard {...movie}
          key={movie.id || movie.movieId}
          handleCardLike={props.handleCardLike}
          handleCardDelete={props.handleCardDelete}
        />
      })
      }
    </ul>
  )
}
);
