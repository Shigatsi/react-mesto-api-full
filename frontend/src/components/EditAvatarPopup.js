import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
      e.preventDefault();

      onUpdateAvatar(
         avatarRef.current.value,
      );

      e.target.reset();
   }

  return(
  <PopupWithForm
    name="avatar"
    title="Обновить аватар"
    submited = "Сохранить"
    isOpen={isOpen}
    onClose = {onClose}
    onSubmit={handleSubmit}
  >

      <input
        ref = {avatarRef}
        type="url"
        id="popup_link_avatar"
        name="avatar_url"
        required
        placeholder="Ссылка на аватар"
        className="popup__input"
      />
      <span className='popup__input-error' id='popup_link-input-error'></span>
  </PopupWithForm>
)}

export default EditAvatarPopup;
