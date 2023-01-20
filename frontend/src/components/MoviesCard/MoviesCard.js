import './MoviesCard.css';
import React from 'react';

export default React.memo(function MoviesCard(props) {
  const buttonType = window.location.pathname === "/saved-movies" ? true : false;
  const likeClass = props.isLike === true ? 'card__like_active' : 'card__like_none';
  const cardImage = props.image.url ? `https://api.nomoreparties.co/${props.image.url}` : props.image;

  function changeCardLike() {
    props.handleCardLike(props);
  }

  return (
    <li className='card'>
      <figure className='card__card-block'>
        <a href={props.trailerLink} className='link'>
          <img className='card__image' src={cardImage} alt={props.nameRU} />
        </a>
        <figcaption className='card__info'>
          <h3 className='card__header'>{props.nameRU}</h3>

          {buttonType ?
            <button className='card__delete button' type='button' onClick={() => props.handleCardDelete(props)} />
            : <button type='button' className={`card__like button ${likeClass}`} onClick={changeCardLike} />
          }

          <p className='card__duration'>{`${Math.floor(props.duration / 60)}ч ${Math.floor(props.duration - props.duration / 60)}м`}</p>
        </figcaption>
      </figure>
    </li>
  )
})