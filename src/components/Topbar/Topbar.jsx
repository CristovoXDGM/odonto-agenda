import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Topbar() {
  return (
    <header className="topbar">
      <nav className="topbar__nav">
        <ul className="topbar__links">
          <li>
            <Link to="/dashboard" className="topbar__link">Home</Link>
          </li>
          <li>
            <Link to="/clients" className="topbar__link">Pacientes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Topbar;