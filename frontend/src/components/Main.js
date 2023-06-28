import { useContext, useEffect, useState } from "react";
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext'
function Main({ handleEditAvatarClick, handleAddPlaceClick, handleEditProfileClick, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-content">
            <img className="profile__avatar" src={currentUser.avatar}
              alt="картинка аватар профиля" />
            <button className="profile__avatar-edit-button" onClick={handleEditAvatarClick}></button>
          </div>
          <div className="profile__info">
            <div className="profile__head">
              <h1 className="profile__name">
                {currentUser.name}
              </h1>
              <button type="button" className="profile__edit-button"
                aria-label="Редактировать профиль" onClick={handleEditProfileClick}></button>
            </div>
            <p className="profile__description">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button type="button" id="profile__add-button" className="profile__add-button"
          aria-label="Создать новую карточку" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {
            cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }

        </ul>
      </section>
    </main>
  )
};
export default Main;