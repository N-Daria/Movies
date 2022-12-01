import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import image from '../../images/image.png';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList(props) {

  let buttonClass = props.url === '/movies' ? 'content__open button' : 'content_none';

  return (
    <section className='content'>
      <ul className='content__list list'>

        {/* 320 _______________________________________________ */}

        <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        />
        <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        />
        <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        />
        <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        />
        <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        />

        {/* 768 _______________________________________________ */}

        {/* <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        />
        <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        />
        <MoviesCard
          movieName='33 слова о дизайне'
          movieImg={image}
          movieDuration='1ч42м'
        /> */}

        {/* 1280 _______________________________________________ */}

        {/*   
      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      />
      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      />
      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      />
      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      />

      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      />

      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      />

      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      />

      <MoviesCard
        movieName='33 слова о дизайне'
        movieImg={image}
        movieDuration='1ч42м'
      /> 
      */}

      </ul>

      <button type='button' className={buttonClass}>еще</button>

    </section >
  )
};
