import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm(props) {

  function handleSubmit() {

  }

  return (
    <form className='search' name={props.formName} onSubmit={handleSubmit} id='search'>
      <input
        id="search-input"
        name="search-input"
        className="search__input"
        placeholder="Фильм"
        required
        type="text"
      />
      <button type='submit' className='search__button button' />

      <FilterCheckbox />

    </form>
  )
};