import React, {useState} from 'react';
import '../navbar/navbar.scss';

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className={`navbar__toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}> ☰ </div>
      <ul className={`navbar__links ${menuOpen ? 'active' : ''}`}>
        <li><a className="nav-link" href="/" onClick={() => setMenuOpen(false)}>Acasă</a></li>
        <li><a className="nav-link" href="/galery" onClick={() => setMenuOpen(false)}>Galerie</a></li>
        <li><a className="nav-link" href="/restaurant" onClick={() => setMenuOpen(false)}>Restaurant</a></li>
        <li><a className="nav-link" href="/partii" onClick={() => setMenuOpen(false)}>Pârtii</a></li>
        <li><a className="nav-link" href="/spa" onClick={() => setMenuOpen(false)}>SPA</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
