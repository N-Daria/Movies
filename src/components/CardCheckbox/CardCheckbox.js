import './CardCheckbox.css';

export default function CardCheckbox(props) {

  return (
    <div className='checkbox'>
      <input
        id="checkbox-input"
        name="checkbox-input"
        className="checkbox__input"
        type="checkbox"
      />
      <label htmlFor="checkbox-input" className='checkbox__input-label' />
    </div>
  )
};