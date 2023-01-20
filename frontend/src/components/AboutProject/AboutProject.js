import './AboutProject.css'

export default function AboutProject(props) {

  return (
    <section className='about-project' id='about-project'>
      <h2 className='main__header'>О проекте</h2>

      <div className='about-project__info'>
        <h3 className='about-project__header'>Дипломный проект включал 5 этапов</h3>
        <p className='main__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className='about-project__info'>
        <h3 className='about-project__header'>На выполнение диплома ушло 5 недель</h3>
        <p className='main__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>

      <div className='about-project__time-block'>
        <div className='about-project__time-section about-project__time-section_small'>
          <p className='about-project__time about-project__time_small'>1 неделя</p>
          <p className='about-project__type'>Back-end</p>
        </div>
        <div className='about-project__time-section'>
          <p className='about-project__time'>4 недели</p>
          <p className='about-project__type'>Front-end</p>
        </div>
      </div>

    </section >
  )
};