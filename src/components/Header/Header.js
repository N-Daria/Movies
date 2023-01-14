import { useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  let loginBlock = props.loggedIn ? 'header__block_none' : 'header__block';
  const navigate = useNavigate();

  function redirect() {
    navigate('/');
  }

  return (
    <header className='header'>
      <p onClick={redirect}>
        <img src={logo} alt='логотип' className='header__logo' />
      </p>
      <section className={loginBlock}>
        <a className='header__login link' href='/signup'>Регистрация</a>
        <a className='link' href='/signin'>
          <button className='header__signin-button button'>Войти</button>
        </a>
      </section >
      <Navigation loggedIn={props.loggedIn} />
    </header >
  )
}
