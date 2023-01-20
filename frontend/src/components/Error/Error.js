import './Error.css';

export default function Error(props) {
  const errorClass = props.errorBlock ? 'error_open' : 'error_none';

  return (
    <section className={`error ${errorClass}`}>
      <p className='error__text'>{props.errorText}</p>
    </section>
  )
};