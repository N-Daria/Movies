import './SearchForm.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default React.memo(function SearchForm(props) {
  const [errClass, setErrClass] = React.useState("");

  function inputChange(event) {
    props.setSearchWord(event.target.value);
    validateInput(event.target.value);
  }

  function validateInput(data) {
    if (data === '') {
      setErrClass('search__error_open');
      return false
    } else {
      setErrClass('search__error_hide');
      return true
    }
  }

  function handleSubmit(event) {
    debugger
    // if (event) {
    event.preventDefault();
    if (props.isShortMovie || validateInput(props.searchWord)) {
      props.showContent();
    }
    // } else {
    //   if (props.renderedCards.length > 1) {
    //     props.showContent();
    //   }
    // }
  }

  return (
    <form className='search' onSubmit={handleSubmit} id='search'>
      <span className={`${errClass} search__error`}>Нужно ввести ключевое слово или переключить поиск короткометражек</span>
      <input
        id="search-input"
        name="movieName"
        className="search__input"
        placeholder="Фильм"
        type="text"
        onChange={inputChange}
        value={props.searchWord}
      />
      <button type='submit' className='search__button button' />

      <FilterCheckbox
        setIsShortMovie={props.setIsShortMovie}
        isShortMovie={props.isShortMovie}
        handleSubmit={handleSubmit}
      />

    </form>
  )
});