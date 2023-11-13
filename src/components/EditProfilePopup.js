import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { validationConfigContext } from "../contexts/validationConfigContext";

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, loadIndicator, onOverlayClick }) {
  const currentUser = useContext(CurrentUserContext);
  const validationConfig = useContext(validationConfigContext);
  const popupErrorClass = `popup__input-error`;
  const errorVisibleClass = validationConfig.errorVisibleClass;
  const popupInputErrorClass = validationConfig.inputErrorClass;
  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [descriptionValidationMessage, setDescriptionValidationMessage] = useState('');


  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleNameChange (e) {
    setNameIsValid(e.target.validity.valid);
    setNameValidationMessage(e.target.validationMessage);
    setName(e.target.value);
  }

  function handleDescriptionChange (e) {
    setDescriptionIsValid(e.target.validity.valid);
    setDescriptionValidationMessage(e.target.validationMessage);
    setDescription(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    })
    e.target.reset();
    setNameIsValid(false);
    setDescriptionIsValid(false);
  }

  return (
    <PopupWithForm title="Редактировать профиль"
                   name="profile"
                   isOpen={isOpen}
                   onClose={onClose}
                   isFormValid={nameIsValid && descriptionIsValid}
                   onSubmit={handleSubmit}
                   loadIndicator={loadIndicator}
                   onOverlayClick={onOverlayClick}
                   >
    <label className="popup__field">
        <input type="text"
               name="name"
               placeholder="Имя"
               className={`popup__input popup__input_name ${nameIsValid ? '' : `${popupInputErrorClass}`}`}
               id="name-input"
               minLength="2"
               maxLength="40"
               required
               value={name ?? ''}
               onChange={handleNameChange} />
        <span className={`name-input-error  ${popupErrorClass} ${nameIsValid ? '' : `${errorVisibleClass}`}`}>{nameValidationMessage}</span>
    </label>
    <label className="popup__field">
        <input type="text"
               name="about"
               placeholder="О себе"
               className={`popup__input popup__input_occupation ${descriptionIsValid ? '' : `${popupInputErrorClass}`}`}
               id="occupation-input"
               minLength="2"
               maxLength="200"
               required
               value={description ?? ''}
               onChange={handleDescriptionChange} />
        <span className={`occupation-input-error  ${popupErrorClass} ${descriptionIsValid ? '' : `${errorVisibleClass}`}`}>{descriptionValidationMessage}</span>
    </label>
  </PopupWithForm>
  );
}

export default EditProfilePopup;
