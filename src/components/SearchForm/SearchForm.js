import './SearchForm.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default React.memo(function SearchForm(props) {
  const [errorText, setErrorText] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState(false);

  function inputChange(event) {
    getInputValue(event);
    isValid(event.target);
  }

  function getInputValue(event) {
    if (event.target.name === 'movieName') {
      props.changeSearchWord(`${event.target.value}`);
    }
  }

  function isValid(formInput) {
    if (formInput.validity.valid) {
      setErrorText('');
      setIsNameValid(true);
    } else {
      setErrorText('search__error_open');
      setIsNameValid(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isNameValid || props.isShortMovie) {
      props.showContent();
    }
  }

  return (
    <form noValidate className='search' onSubmit={handleSubmit} id='search'>
      <span className={`${errorText} search__error`}>Нужно ввести ключевое слово</span>
      <input
        id="search-input"
        name="movieName"
        className="search__input"
        placeholder="Фильм"
        required
        type="text"
        onChange={inputChange}
        value={props.searchWord}
      />
      <button type='submit' className='search__button button' />

      <FilterCheckbox
        toggleIsShortMovie={props.toggleIsShortMovie}
        isShortMovie={props.isShortMovie}
      />

    </form>
  )
});