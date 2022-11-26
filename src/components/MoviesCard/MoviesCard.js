import './MoviesCard.css';
import CardCheckbox from '../CardCheckbox/CardCheckbox';

export default function MoviesCard(props) {

  return (
    <li className='card'>
      <figure className='card__card-block'>
        <img className='card__image' src={props.movieImg} alt={props.movieName} />
        <figcaption className='card__info'>
          <h3 className='card__header'>{props.movieName}</h3>

          {props.url === "/saved-movies" ?
            <button className='card__delete button' type='button' />
            : <CardCheckbox />
          }

          <p className='card__duration'>{props.movieDuration}</p>
        </figcaption>
      </figure>
    </li>
  )
};
