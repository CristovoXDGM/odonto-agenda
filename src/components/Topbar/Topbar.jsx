import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Topbar() {
  return (
    <header className="topbar">
      <Link to="/dashboard">Home</Link>
      <Link to="/clients">Pacientes</Link>
    </header>
  );
}

export default Topbar;