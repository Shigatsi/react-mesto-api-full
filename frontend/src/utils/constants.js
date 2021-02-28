
//"коробка" с карточками изначальными
export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'горная долина'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'лесное озеро зимой'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'панельные дома'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'сопка в далеке'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'железная дорога через лес'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'крутой обрыв у замерзшего озера'
  }
];


export const imgForm = document.querySelector('#img-fullsize');//форма просмотра полноразмерного изображения

export const fullsizeImg = document.querySelector('.popup__fullsize-img');//полноразмерное изображение
export const fullsizeImgCaption = document.querySelector('.popup__fullsize-img-caption');// подпись для полноразмерного изображения
//create forms massive
export const popupSection = Array.from(document.querySelectorAll('.popup'));//секция с формами

export const elemSection = document.querySelector('.elements');//сюда будут добавляться карточки
export const cardListSelector = '.elements'// раздел "карточки" для querySelector в классе Section
export const profileForm = document.querySelector('#edit-profile');//форма редактирования профиля
export const editButton = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
export const closeProfileFormBtn = document.querySelector('#profile-close');//кнопка закрытия формы ред профиля

export const closeImgFormBtn = document.querySelector('#img-close');//кнопка закрытия формы просмотра изображения
export const placeForm = document.querySelector('#edit-place');//форма добавления места
export const addCardButton = document.querySelector('.profile__add-button');//кнопка добавления нового места
export const closePlaceFormBtn = document.querySelector('#place-close');//кнопка закрытия формы добавления места

export const EditAvatar = document.querySelector('#edit-avatar');//форма редактирования аватара
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button'); //кнопка редактирования аватара
export const profileName = document.querySelector('.profile__name');//имя профиля
export const profileLifestyle = document.querySelector('.profile__lifestyle');//профессия профиля
export const inputName = document.getElementById('popup_name');//ввод имени профиля
export const inputLifestyle = document.getElementById('popup_lifestyle');// ввод професси в профиле
export const inputPlace = document.querySelector('#popup_place');//ввод названия места
export const inputLink = document.querySelector('#popup_link');//ввод ссылки на фото места


//объект настроек с селекторами и классами формы
export const formConfig = {
 formSelector: '.popup__form',
 inputSelector: '.popup__input',
 inputErrorSelector:'.popup__input-error',
 submitButtonSelector: '.popup__save-button',
 inactiveButtonClass: 'popup__save-button_disabled',
 inputErrorClass: 'popup__input_type_error',
 errorClass: 'popup__input-error_hidden'
}
