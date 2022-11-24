import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  let headerHide = props.undefinedPage || props.url === '/signup' || props.url === '/signin' ? 'header_none' : 'header';
  let loginBlock = props.loggedIn ? 'header_none' : '';

  return (
    <header className={headerHide}>
      <img src={logo} alt='логотип' className='header__logo' />
      <section className={loginBlock}>
        <a className='header__login link' href='/signup'>Регистрация</a>
        <a className='link' href='/signin'>
          <button className='header__signin-button button'>Войти</button>
        </a>
      </section >
      <Navigation login={props.loggedIn} />
    </header >
  )
}
