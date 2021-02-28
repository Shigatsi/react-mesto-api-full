
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card.js';


function Main ({onEditProfile, onAddPlace, onEditAvatar, onCardLike, onCardDelete,  setSelectedCard, cards}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar-conteiner">
            <img className="profile__avatar" src={currentUser.avatar} alt="фото Профиля"/>
            <div className="profile__avatar-overlay">
              <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
            </div>
          </div>
            <div className="profile__info">
              <p className="profile__name">{currentUser.name}</p>
              <p className="profile__lifestyle">{currentUser.about}</p>
              <button className="profile__edit-button"  type="button" onClick = {onEditProfile}></button>
          </div>
        </div>
          <button className="profile__add-button" type="button" onClick = {onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
           <Card
              key={card.cardId}
              card={card}
              setSelectedCard ={setSelectedCard}
              onCardLike = {onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        )}
      </section>
    </main>
  )
}


export default Main;
