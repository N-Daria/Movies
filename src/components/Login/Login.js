import React from 'react';
import Authorization from '../Authorization/Authorization';
import { inputChange } from '../../utils/formValidation.js';
import { RegExEmail } from '../../utils/consts.js';

export default function Login(props) {
  const [values, setValues] = React.useState({});

  const inputList = Array.from(document.querySelectorAll('.authorization__input'));
  const formButton = document.querySelector('.authorization__button');
  const buttonDisabledClass = 'authorization__button_disabled';

  function handleSubmit() {
    props.handleLogin(values)
  }

  return (
    <Authorization
      header='Рады видеть!'
      class='signin'
      buttonText='Войти'
      linktext='Ещё не зарегистрированы?'
      redirectText='Регистрация'
      redirect='/signup'
      formName='signin'
      onSubmit={handleSubmit}
      errorText={props.errorText}
    >
      <span className="authorization__input-name">E-mail</span>
      <input id="email-input"
        onChange={(event) => {
          setValues({ ...values, [event.target.name]: event.target.value })
          inputChange(event, inputList, formButton, buttonDisabledClass)
        }}
        type="email"
        name="email"
        className="authorization__input"
        required
        pattern={RegExEmail}
      />
      <span className="email-input-error input-err-text"></span>

      <span className="authorization__input-name">Пароль</span>
      <input id="password-input"
        onChange={(event) => {
          setValues({ ...values, [event.target.name]: event.target.value })
          inputChange(event, inputList, formButton, buttonDisabledClass)
        }}
        type="password"
        name="password"
        className="authorization__input authorization__password"
        required
      />
      <span className="password-input-error input-err-text"></span>

    </Authorization>
  )
}