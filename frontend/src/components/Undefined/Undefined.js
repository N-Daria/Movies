import './Undefined.css'
import { useNavigate } from "react-router-dom"

export default function Undefined() {
  const navigate = useNavigate();

  function redirect() {
    navigate('/');
  }

  return (
    <main className='undefined'>
      <div className='undefined__text-block'>
        <p className='undefined__error'>404</p>
        <p className='undefined__text'>Страница не найдена</p>
      </div>
      <p onClick={redirect} className='undefined__link link'>Назад</p>
    </main>
  )
}