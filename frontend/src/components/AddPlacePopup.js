import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [place, setPlace] = React.useState('');
  const [placeUrl, setPlaceUrl] = React.useState('');

  function handleChangePlace (evt) {
    setPlace(evt.target.value)
  }

  function handleChangePlaceUrl (evt) {
    setPlaceUrl(evt.target.value)
  }



  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
    //   place:place,
    //   place_url: placeUrl
      name:place,
      link: placeUrl
    }
    );

    //  e.target.reset();
    setPlaceUrl('');
    setPlace('');

 }

  return(
    <PopupWithForm
          name="place"
          title="Новое место"
          submited = "Сохранить"
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose = {onClose}
        >
          <input onChange={handleChangePlace} type="text" id="popup_place" value={place} name="place" minLength="1" maxLength="30" required placeholder="Название" className="popup__input"/>
          <span className='popup__input-error popup__input-error_hidden'
          id='popup_place-input-error'></span>
          <input type="url" value={placeUrl}  onChange={handleChangePlaceUrl}id="popup_link"name="place_url" required placeholder="Ссылка на картинку" className="popup__input"/>
          <span className='popup__input-error' id='popup_link-input-error'></span>
        </PopupWithForm>
  )
}

export default AddPlacePopup;
