import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// Теперь нужно добавить пропс onCardLike для компонента Card и задать в него эту функцию. Также добавьте в Card обработчик клика handleLikeClick и вызовите из него onCardLike с аргументом card — по аналогии с уже имеющимся обработчиком handleClick.

function Card ({card, setSelectedCard, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);


  function handleLikeClick (card) {
    onCardLike(card);
  }

  function handleRBinBtnClick (card){
    onCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.userId === currentUser._id;

  //Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardRBinButtonClassName = (
    `${isOwn ? 'elements__rbin-button' : 'elements__rbin-button elements__rbin-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(id => id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `elements__like-button ${isLiked ? 'elements__like-button_active' : 'elements__like-button_empty'}`
  );;

  return (
    <div className="elements__item">
      <button className={cardRBinButtonClassName} type="button" onClick={_=>handleRBinBtnClick(card)}></button>
      <img className="elements__image" src={card.src}  alt={card.title} onClick={_=>setSelectedCard(card)}/>
      <div className="elements__bar">
        <h2 className="elements__title">{card.title}</h2>
        <div className="elements__like-bar">
          <button className={cardLikeButtonClassName} type="button" onClick={_=>handleLikeClick(card)} ></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
        </div>
      </div>
  )
}

export default Card;
