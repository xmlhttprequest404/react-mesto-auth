import logo from '../images/logo.svg'
import { Link } from 'react-router-dom';

function Header({ onLogout, isLoggedIn, headerText }) {

  return (
    <header className="header">
      <img src={logo} className="logo logo_place_header" alt="Логотип странички с надписью Mesto Russia" />
      <div>
        <Link to={headerText === 'Регистрация' ? "/sign-up" : headerText === 'Войти' ? "/sign-in" : "/"} className='header__nav'>{headerText}</Link>
        {(isLoggedIn && headerText !== 'Регистрация' && headerText !== 'Войти') && <Link to="/sign-in" onClick={onLogout}>Выйти</Link>}
      </div>
    </header>
  );
}

export default Header;
