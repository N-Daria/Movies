import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
  const setIsChecked = props.defaultIsShort ? true : false;

  function toggleCheckbox() {
    props.defaultIsShort ? props.toggleIsShortMovie(false) : props.toggleIsShortMovie(true);
    props.handleSubmit();
  }

  return (
    <div className='filter'>
      <input
        id="filter-input"
        name="filter-input"
        className="filter__input"
        type="checkbox"
        onClick={toggleCheckbox}
        defaultChecked={setIsChecked}
      />
      <label htmlFor="filter-input" className='filter__input-label' />
      <p className='filter__text'>Короткометражки</p>
    </div>
  )
};