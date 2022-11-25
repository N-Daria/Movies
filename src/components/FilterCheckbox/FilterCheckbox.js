import './FilterCheckbox.css';

export default function FilterCheckbox(props) {

  return (
    <div className='filter'>
      <input
        id="filter-input"
        name="filter-input"
        className="filter__input"
        type="checkbox"
      />
      <label htmlFor="filter-input" className='filter__input-label' />
      <p className='filter__text'>Короткометражки</p>
    </div>
  )
};