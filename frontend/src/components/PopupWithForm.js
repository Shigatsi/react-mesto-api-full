import React from 'react';
import { Link } from 'react-router-dom';

function PopupWithForm ({isOpen, onClose, isAuth, isRegister, onSubmit, ...props }) {
  return (
    <section className={`popup ${isOpen ? "" : "popup_hidden"}`}  id={`edit-${props.name}`}>
    <div className="popup__content">
      <form onSubmit={onSubmit} className={`${isAuth ? "popup__form_theme_auth popup__form" : "popup__form" }`} name={`edit_${props.name}`} method="POST" action="#" noValidate>
        <h2 className={`${isAuth ?" popup__header_theme_auth popup__header" : "popup__header"}`}>{props.title}</h2>
        {props.children}
        <button type="submit" id={`profile-${props.name} `} className={`${isAuth ? " popup__save-button_theme_auth popup__save-button":"popup__save-button"}`}> {props.submited}</button>
      </form>
        <button type="button" id={`${props.name}-close`} onClick = {onClose} className={`${isAuth ? "popup__close-button_theme_auth": "popup__close-button" }`}></button>
        <Link to="/sign-in" className={`${isRegister ? "popup__link" : "popup__link_hidden"}`}>Уже зарегистрированы? Войти</Link>
    </div>
  </section>
  )
}

export default PopupWithForm;
