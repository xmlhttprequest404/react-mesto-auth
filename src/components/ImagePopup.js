function ImagePopup ({ card, onClose, onOverlayClick }) {
  function handleOverlayClick (e) {
    onOverlayClick(e.target.classList.contains('popup'))
  }
  return (
    <div className={`popup popup_element ${card ? 'popup_opened': ''}`} onClick={handleOverlayClick}>
      <div className="popup__container popup__container_element">
        <img src={card ? card.link : ''} alt={card ? card.name: 'Безымянная карточка'} className="popup__image" />
        <h2 className="popup__text">{card ? card.name : 'Безымянная карточка'}</h2>
        <button type="button" className="popup__exit" aria-label="Кнопка выхода" onClick={onClose}></button>
      </div>
    </div>
  );
}
export default ImagePopup;
