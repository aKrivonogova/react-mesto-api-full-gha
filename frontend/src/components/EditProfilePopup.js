import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({ name, about: description })
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value)
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, isOpen])

    return (
        <PopupWithForm
            title="Редактировать профиль"
            buttonText="Сохранить"
            name="edit"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input name="name" type="text" id="userName" className="form__input" required minLength={2}
                maxLength={40} placeholder="Имя" value={name} onChange={handleChangeName} />
            <span className="form__input-error" id="userName-error"></span>
            <input name="description" type="text" id="userDescription" className="form__input" required
                minLength={2} maxLength={200} placeholder="О себе" value={description} onChange={handleChangeDescription} />
            <span className="form__input-error" id="userDescription-error"></span>
        </PopupWithForm>

    )
}
export default EditProfilePopup;