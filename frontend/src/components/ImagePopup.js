function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_function_image ${card && 'popup_opened'}`} id="popup-image">
            <div className="popup__container-image">
                <img src={card?.link} className="popup__image" alt={card?.name} />
                <p className="popup__image-description">{card?.name}</p>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;