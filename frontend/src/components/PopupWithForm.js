function PopupWithForm({ children, title, buttonText, name, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup_function_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form onSubmit={onSubmit} action="#" method="post" className="form" name={name}>
                    <fieldset className="form__fieldset">
                        {children}
                        <button type="submit" className="form__submit-button" id="saveButton">{buttonText}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm; 