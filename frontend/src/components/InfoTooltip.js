import succesImg from "../images/successImg.svg";
import errorImg from "../images/errorImg.svg";

function InfoTooltip ({isOpen, onClose, isSuccess}) {

  const succesMsg = "Вы успешно зарегистрировались!";
  const errorMsg = "Что-то пошло не так! Попробуйте ещё раз."

  return(
    <section className = {`popup ${isOpen ? "" : "popup_hidden"}`} id = "info tooltip">
      <div className="popup__content popup_type_tooltip" >
        <button type="button" id="img-close" className="popup__close-button" onClick = {onClose}></button>
        <figure className="popup__form popup__tooltip-img-container">
          <img className = "popup__tooltip-img" src={isSuccess?succesImg : errorImg} alt={isSuccess? 'чёрная галочка в круге' : "красный крестик в круге"}/>
            <figcaption className="popup__tooltip-img-caption">{isSuccess?succesMsg : errorMsg}</figcaption>
        </figure>
    </div>
    </section>
  )
}

export default InfoTooltip;
