import React from 'react';
import { Route, Link } from 'react-router-dom';
import mestoLogo from '../images/logo.svg';

function Header ({userEmail, logOut}) {
  return (
    <header className="header">
        <img className="header__logo" src={mestoLogo} alt="Логотип Mesto Russia"/>
        <Route exact path= "/">
          <div className = "header__info">
            <p className="header__user-login">{userEmail}</p>
            <Link to = "/sign-in" onClick = {logOut} className="header__link"> Выйти </Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <div className = "header__info">
            <Link to = "/sign-in"  className="header__link"> Войти </Link>
          </div>
        </Route>
        <Route path="/sign-in">
          <div className = "header__info">
            <Link to = "/sign-up" className="header__link"> Регистрация </Link>
          </div>
        </Route>
    </header>
  )
};

export default Header;
