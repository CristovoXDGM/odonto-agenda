import React from 'react';

import './styles.css';

function Button({ text, icon, handleClick }) {
  return (
    <button
      className="button"
      onClick={e => handleClick(e)}
    >
      {text}
      {icon &&
        <span className="material-icons button__icon">{icon}</span>
      }
    </button>
  );
}

export default Button;