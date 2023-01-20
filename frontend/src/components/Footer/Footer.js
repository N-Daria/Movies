import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <p className='footer__annotation'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__text-block'>
        <p className='footer__text'>Яндекс.Практикум</p>
        <a className='footer__text link' href='https://github.com/N-Daria' target="_blank" rel="noreferrer">Github</a>
      </div>
      <p className='footer__year'>&copy; {year} </p>
    </footer>
  )
}