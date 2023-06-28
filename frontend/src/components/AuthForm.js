import { useState } from "react";
import { Link } from "react-router-dom";

function AuthForm({ children, title, buttonText, authTextActive , onSubmit}) {
    return (
        <div className="auth">
            <div className="auth__container">
                <h3 className="auth__title">{title}</h3>
                <form onSubmit={onSubmit}  className="auth__form">
                    {children}
                    <button className="auth__button" type="submit">{buttonText}</button>
                    <p className={`auth__text ${authTextActive}`}>Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
                </form>
            </div>
        </div>
    )
}

export default AuthForm; 