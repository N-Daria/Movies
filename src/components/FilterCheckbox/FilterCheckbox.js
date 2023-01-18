import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
  const setIsChecked = props.isShortMovie ? true : false;

  function toggleCheckbox() {
    props.setIsShortMovie(!props.isShortMovie);
    props.handleSubmit(false, !props.isShortMovie);
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