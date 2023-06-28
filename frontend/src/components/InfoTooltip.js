function InfoTooltip({ name, isOpen, onClose, message }) {
    return (
        <div className={`popup popup_function_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container-tooltip">
            <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img src={message.image} className="popup__tooltip-image" alt="картинка ответ сервера"/>
                <h3  className="popup__tooltip-text">{message.text}</h3>
            </div>
        </div>
    );
}

export default InfoTooltip; 