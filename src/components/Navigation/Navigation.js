import './Navigation.css';
import { useState } from "react";

export default function Navigation(props) {
  let navigationClass = props.loggedIn ? "navigation" : "navigation_none";
  let navigationButtonClass = props.loggedIn ? "navigation__button" : "navigation_none";

  const [navButton, setnavButton] = useState("navigation__button_open");
  const [navHide, setnavHide] = useState("navigation_hide");

  function hideNav() {
    navButton === "navigation__button_open"
      ? setnavButton("navigation__button_close")
      : setnavButton("navigation__button_open");

    navHide === "navigation_open"
      ? setnavHide("navigation_hide")
      : setnavHide("navigation_open");
  }

  return (
    <>
      <button className={`${navButton} ${navigationButtonClass} button`} onClick={hideNav} />
      <nav className={`${navigationClass} ${navHide}`}>
        <ul className="navigation__list list">
          <li className="navigation__link navigation__link_hide">
            <a href="/" className="navigation__link-text link">Главная</a>
          </li>
          <li className="navigation__link">
            <a href="/movies" className="navigation__link-text link">Фильмы</a>
          </li>
          <li className="navigation__link">
            <a href="/movies" className="navigation__link-text link">Сохранённые фильмы</a>
          </li>
        </ul>
        <button className="navigation__account-button button">
          <a href="/users/me" className="link navigation__account-text">Аккаунт</a>
        </button>
      </nav>
    </>
  )
}