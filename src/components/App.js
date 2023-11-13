import { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js"
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeletePopup from "./DeletePopup.js";
import { validationConfigContext, validationConfig } from "../contexts/validationConfigContext.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAllPopupsClosed, setIsAllPopupsClosed] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardForDel, setCardForDel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  function handleCloseByOverlay (isItOverlay) {
    isItOverlay && closeAllPopups();
  }

  useEffect(() => {
    api.getInitialCards()
    .then(res => {
      setCards(res)
    })
    .catch(error => {
      console.log(error);
    })

    api.getUserInfoApi()
    .then(res => {
      setCurrentUser(res);
    })
    .catch(error => {
      console.log(error)
    })
  }, []);

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
    setIsAllPopupsClosed(false);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
    setIsAllPopupsClosed(false);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
    setIsAllPopupsClosed(false);
  }

  function handleDeleteClick (card) {
    setCardForDel(card);
    setIsDeletePopupOpen(true);
    setIsAllPopupsClosed(false)
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsAllPopupsClosed(false);
  }

  function closeAllPopups () {
      setIsAddPlacePopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsDeletePopupOpen(false);
      setSelectedCard(null);
      setIsAllPopupsClosed(true);
  }

  function handleUpdateUser ({name, about:description}) {
    setIsLoading(true);
    api.sendUserInfoApi({name, about:description})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar (avatarRef) {
    setIsLoading(true);
    api.setUserAvatar(avatarRef)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit (card) {
    setIsLoading(true);
    api.sendNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }))
      .catch(error => {
        console.log(error)
      })
  }

  function handleCardDelete () {
    setIsLoading(true);
    api.deleteCard(cardForDel._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardForDel._id))
      closeAllPopups();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    <Header />
    <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleDeleteClick}
          cards={cards}
          setCards={setCards}
          />
    <Footer />
    <validationConfigContext.Provider value={validationConfig}>
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
                        onOverlayClick={handleCloseByOverlay}
                        onClose={closeAllPopups}
                        onUpdateUser={({name, about:description}) => {handleUpdateUser({name, about:description})}}
                        loadIndicator={isLoading} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                       onOverlayClick={handleCloseByOverlay}
                       onClose={closeAllPopups}
                       onUpdateAvatar={({avatar:avatarRef})=>{handleUpdateAvatar({avatar:avatarRef})}}
                       loadIndicator={isLoading} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen}
                     onOverlayClick={handleCloseByOverlay}
                     onClose={closeAllPopups}
                     onAddPlace={({name, url}) => {handleAddPlaceSubmit({name, link:url})}}
                     loadIndicator={isLoading} />
    </validationConfigContext.Provider>
    <DeletePopup isOpen={isDeletePopupOpen}
                 onOverlayClick={handleCloseByOverlay}
                 onClose={closeAllPopups}
                 onDeleteCard={handleCardDelete}
                 loadIndicator={isLoading}/>
    <ImagePopup card={selectedCard}
                onOverlayClick={handleCloseByOverlay}
                onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
    </>
  );
}

export default App;
