import { useState } from "react";
import AuthForm from "./AuthForm";
function Register({ onRegister }) {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    function handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const { email, password } = formValues;
        onRegister(email, password);
    }

    return (
        <AuthForm
            title={'Регистрация'}
            buttonText={'Зарегистрироваться'}
            authTextActive={'auth__text_active'}
            onSubmit={handleSubmit}
        >
            <>
                <input type="email" className="auth__input" name='email' value={formValues.email} placeholder="Emain" onChange={handleChange} />
                <input type="text" onChange={handleChange} className="auth__input" name='password' value={formValues.password} placeholder="Пароль" />
            </>
        </AuthForm>
    )
}

export default Register; 