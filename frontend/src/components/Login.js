import { useState } from "react";
import AuthForm from "./AuthForm";
function Login({ onLogin }) {
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
        console.log(email)
        onLogin(email, password);
    }

    return (
        <AuthForm
            title={'Войти'}
            buttonText={'Войти'}
            authTextActive={''}
            onSubmit={handleSubmit}
        >
            <>
                <input type="text" className="auth__input" name='email' value={formValues.email
                } placeholder="Emain" onChange={handleChange} />
                <input type="text" onChange={handleChange} className="auth__input" name='password' value={formValues.password} placeholder="Пароль" />
            </>
        </AuthForm>
    )
}

export default Login; 