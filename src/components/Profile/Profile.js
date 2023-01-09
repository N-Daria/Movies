import React from 'react';
import './Profile.css';
import { inputChange } from '../../utils/formValidation.js';

export default function Profile(props) {
  const [name, setName] = React.useState(props.userData.name);
  const [email, setEmail] = React.useState(props.userData.email);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateUserInfo({ name, email });
  }

  return (
    <form className='profile' name='edit' onSubmit={handleSubmit} id='edit'>
      <h2 className='profile__header'>Привет, {props.userData.name}!</h2>

      <div className='profile__edit-block'>

        <div className='profile__data-block'>
          <p className='profile__data-type'>Имя</p>
          <input id="name-input"
            onChange={(event) => {
              setName(event.target.value)
              inputChange(event)
            }}
            type="text"
            name="name"
            className="profile__user-data"
            required
            minLength="2"
            maxLength="30"
            pattern="[a-zA-Zа-яА-ЯЁё\-\s]+"
            value={name}
          />
        </div>

        <span className="name-input-error input-err-text"></span>

        <div className='profile__data-block'>
          <p className='profile__data-type'>E&#8209;mail</p>
          <input id="email-input"
            onChange={(event) => {
              setEmail(event.target.value)
              inputChange(event)
            }}
            type="email"
            name="email"
            className="profile__user-data"
            required
            value={email}
          />
        </div>

        <span className="email-input-error input-err-text"></span>

      </div>

      <p className='authorization__error'>{props.errorText}</p>
      <button className='authorization__button  button authorization__button_disabled ' type="submit">Редактировать</button>

      <button className='profile__logout button' type='button' onClick={props.handleLogout}>Выйти из аккаунта</button>
    </form>
  )
};