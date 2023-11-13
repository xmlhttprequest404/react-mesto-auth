import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo logo_place_header" alt="Логотип странички с надписью Mesto Russia" />
    </header>
  );
}

export default Header;
