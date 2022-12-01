import './App.css';
import { Route, Routes } from "react-router-dom";

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Undefined from '../Undefined/Undefined';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';

export default function App() {

  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Register />} />

      <Route path='/movies' element={<> <Header loggedIn='true' /> < Movies /> <Footer /> </>} />
      <Route path='/saved-movies' element={<> <Header loggedIn='true' /> < SavedMovies /> <Footer /> </>} />
      <Route path='/profile' element={<> <Header loggedIn='true' /> <Profile /> <Footer /> </>} />
      <Route path='/' element={<> <Header loggedIn='true' />< Main /><Footer /> </>} />

      <Route path='*' element={<Undefined />} />

    </Routes>
  );
};
