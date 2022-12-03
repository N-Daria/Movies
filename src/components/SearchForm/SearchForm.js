import './SearchForm.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm(props) {
  const [movieName, setmovieName] = React.useState("");
  const [errorText, setErrorText] = React.useState("");

  function inputChange(event) {
    getInputValue(event);
    isValid(event.target)
  }

  function getInputValue(event) {
    if (event.target.name === 'movieName') {
      setmovieName(`${event.target.value}`);
    }
  }

  function isValid(formInput) {
    if (formInput.validity.valid) {
      setErrorText('');
      return true
    } else {
      setErrorText('search__error_open');
      return false
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isValid(event.target.movieName)) {
      props.getMovies(movieName);
    }
  }

  return (
    <form noValidate className='search' name={props.formName} onSubmit={handleSubmit} id='search'>
      <span className={`${errorText} search__error`}>Нужно ввести ключевое слово</span>
      <input
        id="search-input"
        name="movieName"
        className="search__input"
        placeholder="Фильм"
        required
        type="text"
        onChange={inputChange}
      />
      <button type='submit' className='search__button button' />

      <FilterCheckbox />

    </form>
  )
};