import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card ({card, onCardClick, onCardLike, onCardDeleteClick}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_theme_dark'}`
  );;

  function handleClick () {
    onCardClick(card)
  }

  function handleDeleteClick () {
    onCardDeleteClick(card)
  }

  function handleLikeClick () {
    onCardLike(card);
  }
  return (
    <article className="element">
      <img className="element__image" src={card.link} onClick={handleClick}/>
      {isOwn && <button className="element__trash" aria-label="Кнопка удаления" onClick={handleDeleteClick} />}
      <div className="element__card-title">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-group">
          <button type="button" className={cardLikeButtonClassName} aria-label="Кнопка лайка" onClick={handleLikeClick}></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
