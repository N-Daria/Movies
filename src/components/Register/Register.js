import './Register.css'
import React from 'react';
import Authorization from '../Authorization/Authorization'

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function inputChange(event) {
    getInputValue(event);
    isValid(event.target);

    toggleButtonState();
  }

  function getInputValue(event) {
    if (event.target.name === 'name') {
      setName(`${event.target.value}`);
    } else if (event.target.name === 'email') {
      setEmail(`${event.target.value}`);
    } else if (event.target.name === 'password') {
      setPassword(`${event.target.value}`);
    }
  }

  function isValid(formInput) {
    if (formInput.validity.valid) {
      hideInputError(formInput)
    } else {
      showInputError(formInput, formInput.validationMessage)
    }
  }

  function showInputError(formInput, errorMessage) {
    const error = document.querySelector(`.${formInput.id}-error`);
    error.textContent = errorMessage;
  }

  function hideInputError(formInput) {
    const error = document.querySelector(`.${formInput.id}-error`);
    error.textContent = '';
  }

  function toggleButtonState() {
    const inputList = Array.from(document.querySelectorAll('.authorization__input'));
    const formButton = document.querySelector('.authorization__button');

    if (hasInvalidInput(inputList)) {
      disactivateButtonState(formButton)
    } else {
      activateButtonState(formButton)
    }
  }

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  function activateButtonState(formButton) {
    formButton.classList.remove('authorization__button_disabled');
    formButton.disabled = false;
  }

  function disactivateButtonState(formButton) {
    formButton.classList.add('authorization__button_disabled');
    formButton.disabled = true;
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
    >

      <span className="authorization__input-name">Имя</span>
      <input id="name-input"
        value={name || ""}
        onChange={inputChange}
        type="text"
        name="name"
        className="authorization__input"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="name-input-error input-err-text"></span>

      <span className="authorization__input-name">E-mail</span>
      <input id="email-input"
        value={email || ""}
        onChange={inputChange}
        type="text"
        name="email"
        className="authorization__input"
        required
      />
      <span className="email-input-error input-err-text"></span>


      <span className="authorization__input-name">Пароль</span>
      <input id="password-input"
        value={password || ""}
        onChange={inputChange}
        type="text"
        name="password"
        className="authorization__input"
        required
      />
      <span className="password-input-error input-err-text"></span>

    </Authorization>
  )
}