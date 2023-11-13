import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { validationConfigContext } from "../contexts/validationConfigContext";

function AddPlacePopup ({ isOpen, onClose , onAddPlace, loadIndicator, onOverlayClick }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [urlIsValid, setUrlIsValid] = useState(false);
  const [urlValidationMessage, setUrlValidationMessage] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const validationConfig = useContext(validationConfigContext);
  const popupErrorClass = `popup__input-error`;
  const errorVisibleClass = validationConfig.errorVisibleClass;
  const popupInputErrorClass = validationConfig.inputErrorClass;

  useEffect(() => {
    setName('');
    setUrl('');
  }, [isOpen])

  function handleSubmit (e) {
    e.preventDefault();
    onAddPlace({ name, url })
    setNameIsValid(false);
    setUrlIsValid(false);
  }

  function handleNameChange (e) {
    setNameIsValid(e.target.validity.valid);
    setNameValidationMessage(e.target.validationMessage);
    setName(e.target.value)
  }

  function handleUrlChange (e) {
    setUrlIsValid(e.target.validity.valid);
    setUrl(e.target.value);
    setUrlValidationMessage(e.target.validationMessage);
  }

  return (
    <PopupWithForm title="Новое место"
                   name="cards"
                   isOpen={isOpen}
                   onClose={onClose}
                   submitText={'Создать'}
                   isFormValid={nameIsValid && urlIsValid}
                   onSubmit={handleSubmit} loadIndicator={loadIndicator}
                   onOverlayClick={onOverlayClick}>
      <label className="popup__field">
        <input type="text"
               name="name"
               placeholder="Название"
               className={`popup__input popup__input_title ${nameIsValid ? '' : `${popupInputErrorClass}`}`}
               id="title-input" minLength="2" maxLength="30" required
               value={name}
               onChange={handleNameChange}
        />
        <span className={`title-input-error ${popupErrorClass} ${nameIsValid ? '' : `${errorVisibleClass}`}`}>{nameValidationMessage}</span>
      </label>
      <label className="popup__field">
        <input type="url"
               name="link"
               placeholder="Ссылка на картинку"
               className={`popup__input popup__input_url-image ${urlIsValid ? '' : `${popupInputErrorClass}`}`}
               id="url-input" required
               value={url}
               onChange={handleUrlChange}
        />
        <span className={`url-input-error ${popupErrorClass} ${urlIsValid ? '' : `${errorVisibleClass}`}`}>{urlValidationMessage}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
