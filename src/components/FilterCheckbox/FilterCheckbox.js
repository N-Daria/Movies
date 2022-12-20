import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
  const setIsChecked = props.isShortMovie ? true : false;

  return (
    <div className='filter'>
      <input
        id="filter-input"
        name="filter-input"
        className="filter__input"
        type="checkbox"
        onClick={props.toggleIsShortMovie}
        defaultChecked={setIsChecked}
      />
      <label htmlFor="filter-input" className='filter__input-label' />
      <p className='filter__text'>Короткометражки</p>
    </div>
  )
};