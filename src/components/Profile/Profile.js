import React from 'react';
import './Profile.css';
import { inputChange, disactivateButtonState } from '../../utils/formValidation.js';
import { RegExEmail, RegExName } from '../../utils/consts.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Profile(props) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUserContext.name);
  const [email, setEmail] = React.useState(currentUserContext.email);

  const [newName, setNewName] = React.useState(currentUserContext.name);
  const [newEmail, setNewEmail] = React.useState(currentUserContext.email);

  const inputList = Array.from(document.querySelectorAll('.profile__user-data'));
  const formButton = document.querySelector('.profile__button');
  const buttonDisabledClass = 'profile__button_disabled';

  React.useEffect(() => {
    setName(currentUserContext.name);
    setEmail(currentUserContext.email);

    setNewName(currentUserContext.name);
    setNewEmail(currentUserContext.email);
  }, [currentUserContext]);

  function handleSubmit(e) {
    e.preventDefault();

    if (name === newName && email === newEmail) {
      props.setErrorText('Данные должны отличаться от первоначальных');
      disactivateButtonState(formButton, buttonDisabledClass)
    } else {
      props.handleUpdateUserInfo({ name: newName, email: newEmail });
    }
  }

  return (
    <form className='profile' name='edit' onSubmit={handleSubmit} id='edit'>
      <h2 className='profile__header'>Привет, {currentUserContext.name}!</h2>

      <div className='profile__edit-block'>

        <div className='profile__data-block'>
          <p className='profile__data-type'>Имя</p>
          <input id="name-input"
            onChange={(event) => {
              props.setErrorText('');
              setNewEmail(event.target.value);
              inputChange(event, inputList, formButton, buttonDisabledClass);
            }}
            type="text"
            name="name"
            className="profile__user-data"
            required
            minLength="2"
            maxLength="30"
            pattern={RegExName}
            value={newName}
          />
        </div>

        <span className="name-input-error input-err-text"></span>

        <div className='profile__data-block'>
          <p className='profile__data-type'>E&#8209;mail</p>
          <input id="email-input"
            onChange={(event) => {
              props.setErrorText('');
              setNewEmail(event.target.value);
              inputChange(event, inputList, formButton, buttonDisabledClass);
            }}
            type="email"
            name="email"
            className="profile__user-data"
            required
            value={newEmail}
            pattern={RegExEmail}
          />
        </div>

        <span className="email-input-error input-err-text"></span>

      </div>

      <p className='authorization__error'>{props.errorText}</p>
      <button className='profile__button  button profile__button_disabled' disabled type="submit">Редактировать</button>

      <button className='profile__logout button' type='button' onClick={props.handleLogout}>Выйти из аккаунта</button>
    </form>
  )
};