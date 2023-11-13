
function PopupWithForm ({isOpen, name, title, children, submitText, onClose, onSubmit, loadIndicator, isFormValid, onOverlayClick }) {

  function handleOverlayClick (e) {
    onOverlayClick(e.target.classList.contains('popup'))
  }

  return (
    <>
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened': ''}`} onClick={handleOverlayClick}>
        <div className={`popup__container popup__container_${name}`}>
          <form action="#" method="POST" name={name} className={`popup__form popup__form_${name}`} noValidate onSubmit={onSubmit}>
            <h2 className="popup__title">{title}</h2>
            <fieldset className="popup__set">
              {children}
            </fieldset>
            <button type="submit"
              className={`popup__submit ${name === 'avatar' ? 'popup__submit_place_avatar' : ''} ${isFormValid ? '' : 'popup__submit_disabled'}`}
              aria-label="Кнопка сохранить">
              {submitText || 'Сохранить'}<span className={`preloader ${loadIndicator ? 'preloader_visible' : ''}`}>...</span>
            </button>
          </form>
          <button type="button" className="popup__exit" aria-label="Кнопка выхода" onClick={onClose}></button>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
