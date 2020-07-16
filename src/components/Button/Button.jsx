import React, { useState, useEffect } from 'react';

import './styles.css';

function Button({ type, text, icon, handleClick }) {
  const [variant, setVariant] = useState('');

  const styles = {
    primary: {
      backgroundColor: 'var(--button-color)',
      color: '#fff',
    },
    secondary: {
      backgroundColor: 'var(--cancel-button)',
      color: '#fff',
    }
  }

  useEffect(() => {
    setVariant(type);
  }, [type]);

  return (
    <button
      style={styles[variant]}
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