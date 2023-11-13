import { useState, useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { validationConfigContext } from "../contexts/validationConfigContext";

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, loadIndicator, onOverlayClick }) {
  const currentUser = useContext(CurrentUserContext);
  const validationConfig = useContext(validationConfigContext);
  const popupErrorClass = `popup__input-error`;
  const errorVisibleClass = validationConfig.errorVisibleClass;
  const popupInputErrorClass = validationConfig.inputErrorClass;
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const avatarRef = useRef();
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [urlValidationMessage, setUrlValidationMessage] = useState('');

  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateAvatar ({
      avatar: avatarRef.current.value
    })
    e.target.reset();
    setIsUrlValid(false)
  }

  function handleChange (e) {
    setIsUrlValid(e.target.validity.valid);
    setUrlValidationMessage(e.target.validationMessage);
    setAvatar(e.target.value);
  }

  return (
    <PopupWithForm title="Обновить аватар"
                   name="avatar"
                   isOpen={isOpen}
                   onClose={onClose}
                   isFormValid={isUrlValid}
                   onSubmit={handleSubmit}
                   loadIndicator={loadIndicator}
                   onOverlayClick={onOverlayClick} >
    <label className="popup__field">
      <input type="url"
            name="avatarUrlImage"
            placeholder="Ссылка на фото"
            className={`popup__input popup__input_url-image ${isUrlValid ? '' : `${popupInputErrorClass}`}`}
            id="url-input-avatar"
            ref={avatarRef}
            required
            onChange={handleChange} />
      <span className={`url-input-avatar-error ${popupErrorClass} ${isUrlValid ? '' : `${errorVisibleClass}`}`}>{urlValidationMessage}</span>
    </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
