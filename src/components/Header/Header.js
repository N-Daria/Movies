import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  let loginBlock = props.loggedIn ? 'header_none' : '';

  return (
    <header className='header'>
      <img src={logo} alt='логотип' className='header__logo' />
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
