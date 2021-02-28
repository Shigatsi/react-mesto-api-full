import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
//импорт компонентов
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../mestoAuth';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [succes, isSucces] = React.useState(false);

  React.useEffect(() => {
    tockenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn]);

  const handleRegister= (data) => {
    const {email,password} =data;
     mestoAuth.register(email, password)
    .then(()=>{
      setIsInfoTooltipOpen(true);
      isSucces(true);
      history.push('/sign-in');
    })
    .catch(()=>{
      isSucces(false);
      setIsInfoTooltipOpen(true);
    })
  }

  function handleLogin (data) {
    const {email,password} =data;
    mestoAuth.authorize(email, password)
    .then((res)=>{
      localStorage.setItem('token', res.token)
      setLoggedIn(true)
      history.push('/')
      window.location.reload();//обновляю страницу, чтобы новый юзер отобразился
    })
    .catch(err => console.error(err));//выведем ошибку;
  }

  function tockenCheck () {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      mestoAuth.getToken(jwt)
      .then((res)=> {
        setUserEmail(res.data.email)
        setLoggedIn(true)
      })
      .catch(err => console.error(err));//выведем ошибку;
    }
  }

  const hadleLogout = ()=>{
    setLoggedIn(false);
    localStorage.removeItem('token');
    setUserEmail('')
  }


  const [cards, setCards] = React.useState([]);

  React.useEffect(()=>{
    api
    .getInitialCards()
    .then((initCards)=>{
      const cardsNotSort = initCards.data.map(item =>{
        return{
          cardId:item._id,
          userId:item.owner,
          src:item.link,
          title:item.name,
          likes:item.likes,
          alt: item.name,
          data: item.createdAt,
        }
      })
      debugger;
      const cards = cardsNotSort.sort(function(a, b) {
        return a.data < b.data ? 1 : -1
      })
      debugger;
      setCards(cards);

    })
    .catch(err => console.error(err));
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.cardId, !isLiked)
      .then((item) => {
      const newCard =  {
          cardId:item.data._id,
          userId:item.data.owner,
          src:item.data.link,
          title:item.data.name,
          likes:item.data.likes,
          alt: item.data.name
        }
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c.cardId === card.cardId ? newCard : c);
      // Обновляем стейт
      setCards(newCards)
    })
    .catch(err => console.error(err));//выведем ошибку;
  }


  function handleCardDelete(card){
  api.deleteCard(card.cardId)
  .then(()=>{
    // Формируем новый массив на основе имеющегося, удоляя карточку
    const newCards = cards.filter(с=>{return с.cardId!==card.cardId});
    // Обновляем стейт
    setCards(newCards)
  })
  .catch(err => console.error(err));//выведем ошибку
  }

  const [currentUser, setCurrentUser] = React.useState({});
  const [EditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const  [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const  [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState (false);

  React.useEffect(()=>{
    api.getUserData()
    .then((userData)=>{
      setCurrentUser(userData.data);
    })
    .catch(err => console.error(err));//выведем ошибку
  }, [])

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

   function handleEditPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
   }

   function handleEditProfileClick () {
     setIsEditProfilePopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState({});
  function handleCardClick (card) {
    setSelectedCard(card);
  }


  function handleUpdateUser (currentUser) {
    api.patchUserInfo(currentUser)
    .then((updateUserInfo)=>{
      setCurrentUser(updateUserInfo.data);
      closeAllPopups();
    })
    .catch(err => console.error(err));//выведем ошибку

  }


  function handleUpdateAvatar (avatarUrl) {
    api.patchUserAvatar(avatarUrl)
    .then((userData)=>{
      setCurrentUser(userData.data)
      closeAllPopups ();
    })
    .catch(err => console.error(err));//выведем ошибку
  }


  function handleAddPlaceSubmit (popupData) {
    api.postNewCadr(popupData)
    .then((item)=>{
      const newCard = {
        cardId:item.data._id,
        userId:item.data.owner,
        src:item.data.link,
        title:item.data.name,
        likes:item.data.likes,
        alt: item.data.name
      }
      setCards([newCard, ...cards]);
      closeAllPopups ();
    })
    .catch(err => console.error(err));//выведем ошибку

  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          logOut = {hadleLogout}
        />
        <Switch>

          {/* роут для регистрации пользователя */}
          <Route path='/sign-up'>
            <Register
              onRegister = {handleRegister}
            />
          </Route>
          {/* роут для авторизации пользователя */}
          <Route path='/sign-in'>
            <Login
              onLogin = {handleLogin}
              tockenCheck = {tockenCheck}
            />
          </Route>
          <ProtectedRoute exact path = '/'
            loggedIn = {loggedIn}
            cards = {cards}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleEditPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            setSelectedCard = {handleCardClick}
            component = {Main}
          >
          </ProtectedRoute>
        </Switch>

        <EditProfilePopup
          isOpen={EditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onAddPlace = {handleAddPlaceSubmit}
        />

        <PopupWithForm
          name = "confirm"
          title="Вы уверены?"
          submited = "Да"
          isOpen={false}
          onClose = {closeAllPopups}
        >
        </PopupWithForm>

        <ImagePopup setSelectedCard={handleCardClick} card = {selectedCard || ''} onClose = {closeAllPopups}/>
        <InfoTooltip
          isOpen = {isInfoTooltipOpen}
          onClose = {closeAllPopups}
          isSuccess= {succes}
        />
        { loggedIn && <Footer/>}
    </div>
  </CurrentUserContext.Provider>


  );
}


export default App;
