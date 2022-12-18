import './MoviesCard.css';
import CardCheckbox from '../CardCheckbox/CardCheckbox';
import React from 'react';

export default React.memo(function MoviesCard(props) {

  return (
    <li className='card'>
      <figure className='card__card-block'>
        <img className='card__image' src={`https://api.nomoreparties.co/${props.image.url}`} alt={props.nameRU} />
        <figcaption className='card__info'>
          <h3 className='card__header'>{props.nameRU}</h3>

          {props.url === "/saved-movies" ?
            <button className='card__delete button' type='button' />
            : <CardCheckbox />
          }

          <p className='card__duration'>{`${Math.floor(props.duration / 60)}ч ${Math.floor(props.duration - props.duration / 60)}м`}</p>
        </figcaption>
      </figure>
    </li>
  )
})