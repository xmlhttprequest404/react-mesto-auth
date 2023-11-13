import {useContext} from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main ({onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDeleteClick, cards, setCards }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
    <main className="content">
      <section className="profile">
        <button type="button" className="profile__button-img" aria-label="Редактировать аватар" onClick={onEditAvatar}>
          <div className="profile__overlay"></div>
          <div className="profile__avatar" style={{background: `url(${currentUser.avatar}) 50%/cover no-repeat`}}></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" aria-label="Кнопка редактировать профиль" type="button" onClick={onEditProfile}></button>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" aria-label="Кнопка добавить" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Фотографии">
        {
          cards.map((card, i) => {
            return (<Card key={card._id}
                      card={card}
                      setCards={setCards}
                      onCardClick={onCardClick}
                      onCardLike={onCardLike}
                      onCardDeleteClick={onCardDeleteClick}
                      />);
          })
        }
      </section>
    </main>
    </>
  );
}

export default Main;
