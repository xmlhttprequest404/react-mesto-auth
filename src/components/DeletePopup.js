import PopupWithForm from "./PopupWithForm";

function DeletePopup ({ onClose, isOpen, onDeleteCard, loadIndicator, onOverlayClick }) {
  function handleDeleteClick (e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm title="Вы уверены?"
                   name="delete"
                   onClose={onClose}
                   isOpen={isOpen}
                   submitText={'Да'}
                   onSubmit={handleDeleteClick}
                   loadIndicator={loadIndicator}
                   isFormValid={true}
                   onOverlayClick={onOverlayClick}
    />
  )
}

export default DeletePopup;


