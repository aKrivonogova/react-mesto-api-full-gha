import { Link, useLocation } from 'react-router-dom';
import logoSvg from '../images/Vector.svg'
function Header({ loggedIn, email, onLogout }) {
    const { pathname } = useLocation();
    const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
    
    function handleLogOut(){
        onLogout();
    }
    return (
        <header className="header">
            <img className="header__logo" src={logoSvg} alt="Логорип сайта" />
            {loggedIn ? (
                <div className='header__auth'>
                    <p className='header__email'>{email}</p>
                    <p className='header__link header__link_logOut' onClick={handleLogOut}>Выйти</p>
                </div>
            ) :
                <Link to={linkPath} className='header__link'>{linkText}</Link>
            }
        </header>
    );
}

export default Header; 
