import React from 'react';
import './Profile.css';
import { inputChange } from '../../utils/formValidation.js';

export default function Profile(props) {
  const [values, setValues] = React.useState({});

  function handleSubmit() {
    debugger
    // props.handleSubmit();
  }

  return (
    <form className='profile' name='edit' onSubmit={handleSubmit} id='edit'>
      <h2 className='profile__header'>Привет, {props.userData.name}!</h2>

      <div className='profile__edit-block'>

        <div className='profile__data-block'>
          <p className='profile__data-type'>Имя</p>
          <input id="name-input"
            onChange={(event) => {
              setValues({ ...values, [event.target.name]: event.target.value })
              inputChange(event)
            }}
            type="text"
            name="name"
            className="profile__user-data"
            required
            minLength="2"
            maxLength="30"
            pattern="[a-zA-Zа-яА-ЯЁё\-\s]+"
            placeholder={props.userData.name}
          />
        </div>

        <span className="name-input-error input-err-text"></span>

        <div className='profile__data-block'>
          <p className='profile__data-type'>E&#8209;mail</p>
          <input id="email-input"
            onChange={(event) => {
              setValues({ ...values, [event.target.name]: event.target.value })
              inputChange(event)
            }}
            type="email"
            name="email"
            className="profile__user-data"
            required
            placeholder={props.userData.email}
          />
        </div>

        <span className="email-input-error input-err-text"></span>

      </div>

      <p className='authorization__error'>{props.errorText}</p>
      <button className='authorization__button  button authorization__button_disabled' type="submit">Редактировать</button>

      <a className='link profile__logout' href='/'>Выйти из аккаунта</a>
    </form>
  )
};