import React from 'react';
import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';

export default function NavBar () {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark d-flex'>
        {/* C'est le bouton burger (navbar-toggler) */}
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarColor01' aria-controls='navbarColor01' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse justify-content-end' id='navbarColor01'>
          <ul className='navbar-nav text-right'>
            <li className='nav-item'>
              <NavLink exact to='/' className='nav-link'>Accueil</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink exact to='/a-propos' className='nav-link'>À propos</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink exact to='/projets' className='nav-link'>Projets</NavLink>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='mailto:anaisgagneur@gmail.com'>Me contacter</a>
            </li>
            <li className='nav-item'>
              <NavLink exact to='/admin' className='nav-link'>Administrateur</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}