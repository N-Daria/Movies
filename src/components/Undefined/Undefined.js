import './Undefined.css'

export default function Undefined(props) {
  let back = props.history;

  return (
    <section className='undefined'>
      <div className='undefined__text-block'>
        <p className='undefined__error'>404</p>
        <p className='undefined__text'>Страница не найдена</p>
      </div>
      <a href={back} className='undefined__link link'>Назад</a>
    </section>
  )
}