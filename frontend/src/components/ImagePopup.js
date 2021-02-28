function ImagePopup ({card, onClose}) {

  return (
    <section className={`popup ${Object.entries(card).length===0 ? "popup_hidden" : "" }`}id="img-fullsize">
    <div className="popup__content popup_type_image-disp" >
      <button type="button" id="img-close" className="popup__close-button" onClick = {onClose}></button>
      <figure className="popup__fullsize-img-container">
      <img className = "popup__fullsize-img" src={card.src} alt={card.title}/>
        <figcaption className="popup__fullsize-img-caption">{card.title}</figcaption>
      </figure>
    </div>
  </section>
  )
}

export default ImagePopup;
