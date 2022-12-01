import './Profile.css'

export default function Profile(props) {

  return (
    <main className='profile'>
      <h2 className='profile__header'>Привет, Виталий!{props.name}</h2>

      <div>
        <div className='profile__data-block'>
          <p className='profile__data-type'>Имя</p>
          <p className='profile__user-data'>{props.name} Виталий</p>
        </div>
        <div className='profile__data-block'>
          <p className='profile__data-type'>E-mail</p>
          <p className='profile__user-data'>{props.name} pochta@yandex.ru</p>
        </div>
      </div>

      <a className='profile__edit link' href='#'>Редактировать</a>
      <a className='link profile__logout' href='/'>Выйти из аккаунта</a>
    </main>
  )
};