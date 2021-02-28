import React from 'react';
import { CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup  ({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName (evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription (evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return(
    <PopupWithForm
    name="profile"
    title="Редактировать профиль"
    submited = "Сохранить"
    isOpen={isOpen}
    onClose = {onClose}
    onSubmit = {handleSubmit}
  >
    <input type="text" id="popup_name" name="name" minLength="2" maxLength="40" pattern="[а-яёА-ЯЁA-Za-z \-]*" required placeholder="Имя, Фамилия" className="popup__input" value={name|| ''} onChange={handleChangeName}/>
    <span className='popup__input-error popup__input-error_hidden' id='popup_name-input-error'></span>
    <input type="text" id="popup_lifestyle" name="about" minLength="2" maxLength="200" required value = {description || ''} onChange={handleChangeDescription}placeholder="Род занятий/хобби" className="popup__input"/>
    <span className='popup__input-error popup__input-error_hidden' id='popup_lifestyle-input-error'></span>
  </PopupWithForm>
  )
}

export default EditProfilePopup;
