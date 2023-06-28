import '../App.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ProtectedRouteElement from './ProtectedRoute';
import EditAvatarProfilePopup from './EditAvatarProfilePopup';
import AddPlacePopup from './AddPlacePopup'
import EditProfilePopup from './EditProfilePopup';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ImagePopup from './ImagePopup'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip';
import resolveImage from '../images/resolve.svg'
import rejectImage from '../images/reject.svg'
import * as auth from '../utils/auth.js'
import * as message from '../utils/messageConstans'


import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
  });

  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [infoTooltipMessage, setInfoTooltipMessage] = useState({
    text: '',
    image: ''
  })

  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditAvatarProfileOpen, setEditAvatarProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isTooltipPopupOpen, setTooltipPopupOnen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    api.getUserInfo(token)
      .then((res) => {
        setCurrentUser(res);
        console.log(res);
      })
      .catch((error) => console.log(error));

    api.getInitialCards(token)
      .then((res) => {
        setCards(res)
      })
      .catch((error) => console.log(error))
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleCardClick(props) {
    setSelectedCard(props)
  }
  function closeAllPopups() {
    setEditAvatarProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null)
    setTooltipPopupOnen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? res : c))
        );
      })
      .catch(error => console.log(`error: ${error}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, localStorage.token)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(error => console.log(`error: ${error}`));
  }

  function handleUpdateUser(data) {
    api.setUserInfoByAPI(data, localStorage.token)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(error => console.log(`error: ${error}`));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatarByAPI(avatar, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(error => console.log(`error: ${error}`));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data, localStorage.token)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(`error: ${error}`));
  }

  // Проверка токена 
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then(res => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
          console.log(res.data);
        })
        .catch(err => console.log(err))
    }
  }, [])

  // Регистрация пользователя
  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        return res
      })
      .then(() => {
        setInfoTooltipMessage({
          text: message.MESSAGE_RESOLVE_TEXT,
          image: resolveImage
        })
        setTooltipPopupOnen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setInfoTooltipMessage({
          text: message.MESSAGE_REJECT_TEXT,
          image: rejectImage
        })
        setTooltipPopupOnen(true);
      })
  }
  // Авторизация пользователя 
  function handleLogin(email, password) {
    auth.authorization(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          console.log(res.token)
          setEmail(email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err))
  }

  // Выход 
  function handleLogOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <div className="page">
      <div className='page__content'>
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} email={email} onLogout={handleLogOut} />
          <Routes>
            <Route path="/"
              element={<ProtectedRouteElement
                element={Main}
                handleEditAvatarClick={handleEditAvatarClick}
                handleAddPlaceClick={handleAddPlaceClick}
                handleEditProfileClick={handleEditProfileClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />} />
            <Route path="/" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          </Routes>
          <Footer />
          <EditAvatarProfilePopup
            isOpen={isEditAvatarProfileOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip isOpen={isTooltipPopupOpen} message={infoTooltipMessage} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
