import './NavTab.css'

export default function NavTab(props) {

  return (
    <nav className="nav">
      <ul className="list nav__list">
        <li className="nav__link">
          <a href="#about-project" className="link nav__link-text">О проекте</a>
        </li>
        <li className="nav__link">
          <a href="#techs" className="link nav__link-text">Технологии</a>
        </li>
        <li className="nav__link">
          <a href="#about-me" className="link nav__link-text">Студент</a>
        </li>
      </ul>
    </nav>
  )
};