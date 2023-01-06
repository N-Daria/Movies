import './Authorization.css';
import logo from '../../images/logo.svg';

export default function Authorization(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <main className='authorization'>
      <img src={logo} alt='логотип' className="authorization__logo" />
      <h2 className='authorization__header'>{props.header}</h2>
      <form name={props.formName} onSubmit={handleSubmit} id={props.formName}>

        {props.children}

        <p className='authorization__error'>{props.errorText}</p>
        <button className="authorization__button authorization__button_disabled button" type="submit">{props.buttonText}</button>
        <a className='authorization__link link' href={props.redirect}>{props.linktext}
          <span className='authorization__link-span'>{props.redirectText}</span>
        </a>
      </form>

    </main>
  );
}; 
