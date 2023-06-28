import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({ name, link });
    }
    function resetForm() {
        setLink('');
        setName('');
    }

    function handleChangeName(event) {
        setName(event.target.value)
    }
    function handleChangeLink(event) {
        setLink(event.target.value)
    }
    
    useEffect(() => {
        resetForm()
    }, [isOpen])

    return (
        <PopupWithForm
            title="Новое место"
            buttonText="Создать"
            name="add"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input name="name" type="text" id="cardName" className="form__input" placeholder="Название" required
                minLength={"2"} maxLength={"30"} onChange={handleChangeName} value={name} />
            <span className="form__input-error" id="cardName-error"></span>
            <input required name="link" type="url" id="cardImageSrc" className="form__input"
                placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link} />
            <span className="form__input-error" id="cardImageSrc-error"></span>

        </PopupWithForm>
    )
}

export default AddPlacePopup;