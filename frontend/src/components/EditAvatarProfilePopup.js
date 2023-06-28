import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef('');
    function resetForm() {
        avatarRef.current.value = null;
    }

    useEffect(() => {
        resetForm();
    }, [isOpen])

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({ avatar: avatarRef.current.value })
    }
    return (
        <PopupWithForm
            title="Обновить аватар"
            buttonText="Сохранить"
            name="avatar-edit"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input required name="avatar" type="url" id="avatarLink" className="form__input"
                placeholder="Ссылка на картинку" ref={avatarRef} />
            <span className="form__input-error" id="avatarLink-error"></span>
        </PopupWithForm>

    )
}

export default EditAvatarProfilePopup; 