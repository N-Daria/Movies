import './AboutMe.css';
import img from '../../images/photo.jpg';

export default function AboutMe(props) {

  return (
    <section className='about-me' id='about-me'>
      <h2 className='main__header'>Студент</h2>
      <img src={img} alt='фотография' className='about-me__image'></img>
      <div className='about-me__info'>
        <p className='about-me__header'>Дарья</p>
        <p className='main__text main__text_bold'>Фронтенд-разработчик, 25 лет</p>
        <p className='main__text main__text_sparse'>
          Большую часть жизни я&nbsp;провела в&nbsp;разных городах России. Я&nbsp;всегда любила учиться и&nbsp;именно это привлекло меня в&nbsp;разработке. Гуманитарное образование и&nbsp;опыт работы в&nbsp;социальной сфере позволили мне понять важность проработанного интерфейса для обычного пользователя. В&nbsp;свободное время я&nbsp;играю в&nbsp;настольные игры, читаю художественную литературу и&nbsp;путешествую.
        </p>
        <a className='about-me__link link' href='https://github.com/N-Daria' target="_blank" rel="noreferrer">Github</a>
      </div>
    </section >
  )
};