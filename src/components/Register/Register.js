import React from 'react';
import Authorization from '../Authorization/Authorization';
import { inputChange } from '../../utils/formValidation.js';

export default function Register(props) {
  const [values, setValues] = React.useState({});

  function handleSubmit() {
    props.handleRegister(values);
  }

  return (
    <Authorization
      header='Добро пожаловать!'
      class='signup'
      buttonText='Зарегистрироваться'
      linktext='Уже зарегистрированы?'
      redirectText='Войти'
      redirect='/signin'
      formName='signup'
      onSubmit={handleSubmit}
      errorText={props.errorText}
    >

      <span className="authorization__input-name">Имя</span>
      <input id="name-input"
        onChange={(event) => {
          setValues({ ...values, [event.target.name]: event.target.value })
          inputChange(event)
        }}
        type="text"
        name="name"
        className="authorization__input"
        required
        minLength="2"
        maxLength="30"
        pattern="[a-zA-Zа-яА-ЯЁё\-\s]+"
      />
      <span className="name-input-error input-err-text"></span>

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