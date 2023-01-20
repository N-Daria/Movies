import './Navigation.css';
import React from "react";

export default function Navigation(props) {
  const navigationClass = props.loggedIn ? "navigation" : "navigation_none";
  const navigationButtonClass = props.loggedIn ? "navigation-button" : "navigation_none";
  const [navButton, setnavButton] = React.useState("navigation-button_open");
  const [navHide, setnavHide] = React.useState("navigation_hide");

  // highlights current page 

  React.useEffect(() => {
    const currentUrlLink = document.querySelector(`a[href="${window.location.pathname}"]`);
    if (currentUrlLink.closest('.navigation__link')) {
      currentUrlLink.closest('.navigation__link').classList.add('navigation__link_active');
      currentUrlLink.classList.add('navigation__link-text_active');
    }
  }, [])

  function hideNav() {
    navButton === "navigation-button_open"
      ? setnavButton("navigation-button_close")
      : setnavButton("navigation-button_open");

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
            <a href="/saved-movies" className="navigation__link-text link">Сохранённые фильмы</a>
          </li>
        </ul>
        <button className="navigation__account-button button">
          <a href="/profile" className="link navigation__account-text">Аккаунт</a>
        </button>
      </nav>
    </>
  )
}