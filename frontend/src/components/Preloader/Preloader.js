import './Preloader.css'

export default function Preloader(props) {
  const preloaderClass = props.preloaderBlock ? 'preloader_open' : 'preloader_hide';

  return (
    <div className={`preloader ${preloaderClass}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};
