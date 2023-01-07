import React from 'react';
import Authorization from '../Authorization/Authorization';
import { inputChange } from '../../utils/formValidation.js';

export default function Login(props) {
  const [values, setValues] = React.useState({});

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
          inputChange(event)
        }}
        type="email"
        name="email"
        className="authorization__input"
        required
      />
      <span className="email-input-error input-err-text"></span>

      <span className="authorization__input-name">Пароль</span>
      <input id="password-input"
        onChange={(event) => {
          setValues({ ...values, [event.target.name]: event.target.value })
          inputChange(event)
        }}
        type="text"
        name="password"
        className="authorization__input"
        required
      />
      <span className="password-input-error input-err-text"></span>

    </Authorization>
  )
}