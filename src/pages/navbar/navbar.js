import React from 'react';
import './navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-light navbar-expand-md position-absolute">
            <div className="container">
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav d-flex justify-content-center">
                        <li className="nav-item">
                            <a 
                                className="nav-link active" 
                                aria-current="page" 
                                href="/galery"
                            >
                                Galerie
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link active" 
                                aria-current="page" 
                                href="/restaurant"
                            >
                                Restaurant
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link active" 
                                aria-current="page" 
                                href="/partii"
                            >
                                Partii
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link active" 
                                aria-current="page" 
                                href="/spa"
                            >
                                Spa
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
