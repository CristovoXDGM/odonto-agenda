import React from 'react';

import './styles.css';

function Button({ text, icon }) {
  return (
    <button className="button">
      {text}
      {icon &&
        <span className="material-icons">{icon}</span>
      }
    </button>
  );
}

export default Button;