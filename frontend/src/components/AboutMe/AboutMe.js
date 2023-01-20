import './AboutMe.css'
import img from '../../images/pic.png'

export default function AboutMe(props) {

  return (
    <section className='about-me' id='about-me'>
      <h2 className='main__header'>Студент</h2>
      <img src={img} alt='фотография' className='about-me__image'></img>
      <div className='about-me__info'>
        <p className='about-me__header'>Виталий</p>
        <p className='main__text main__text_bold'>Фронтенд-разработчик, 30 лет</p>
        <p className='main__text main__text_sparse'>Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
        <a className='about-me__link link' href='https://github.com/N-Daria' target="_blank" rel="noreferrer">Github</a>
      </div>
    </section >
  )
};