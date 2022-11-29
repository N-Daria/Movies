import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  let loginBlock = props.loggedIn ? 'header__block_none' : 'header__block';

  return (
    <header className='header'>
      <a href='/'>
        <img src={logo} alt='логотип' className='header__logo' />
      </a>
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
