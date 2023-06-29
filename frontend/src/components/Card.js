import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    function handleCardClick() {
        onCardClick(card)
    }
    function handleLikeClick() {
        onCardLike(card)
    }
    function handleCardDelete() {
        onCardDelete(card)
    }
    const cardDeleteButton = () => isOwn ? (<button className="element__delete" type="button" aria-label="удалить данную карточку" onClick={handleCardDelete}></button>) : null;

    let isLiked = card.likes.some(i => i === currentUser._id);
    console.log("likes", card.likes);
    const cardLikeButtonClassName = `element__like 
    ${isLiked ? ('element__like_active') : ''}`;

    return (
        <li className="element" >
            <img className="element__image" src={card.link} onClick={handleCardClick} alt={card.name} />
            {cardDeleteButton()}
            <div className="element__description-container">
                <h2 className="element__name">{card.name}</h2>
                <div className="element-like__container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="лайкнуть данную карточку"></button>
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card; 