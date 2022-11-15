import './Header.css';
import logo from '../../images/logo.svg';

export default function Header(props) {

  let loginBlock = props.login ? 'header__login-block' : 'header__login-block_none'

  return (
    <header className="header">
      <img src={logo} alt='логотип' className='header__logo' />
      <section className={loginBlock}>
        <a className='header__login link' href='#'>Регистрация</a>
        <a className='header__signin link' href='#'>
          <button className='header__signin-button'>Войти</button>
        </a>
      </section >
    </header >
  )
}
