import './Techs.css'

export default function Techs(props) {

  return (
    <section className='techs' id='techs'>
      <h2 className='main__header'>Технологии</h2>
      <h3 className='techs__header'>7 технологий</h3>
      <p className='main__text main__text_center'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='tech__list list'>
        <li className='tech__item'>HTML</li>
        <li className='tech__item'>CSS</li>
        <li className='tech__item'>JS</li>
        <li className='tech__item'>React</li>
        <li className='tech__item'>Git</li>
        <li className='tech__item'>Express.js</li>
        <li className='tech__item'>mongoDB</li>
      </ul>
    </section >
  )
};