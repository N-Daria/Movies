import './Portfolio.css'

export default function Portfolio(props) {

  return (
    <section className="portfolio">
      <h3 className='portfolio__header'>Портфолио</h3>
      <ul className="list portfolio__list">
        <li className="portfolio__link">
          <a href="https://n-daria.github.io/how-to-learn/" className="link portfolio__link-text" target="_blank" rel="noreferrer">Статичный сайт</a>
        </li>
        <li className="portfolio__link">
          <a href="https://n-daria.github.io/russian-travel/#" className="link portfolio__link-text" target="_blank" rel="noreferrer">Адаптивный сайт</a>
        </li>
        <li className="portfolio__link">
          <a href="https://n-daria.github.io/mesto/" className="link portfolio__link-text" target="_blank" rel="noreferrer">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
};