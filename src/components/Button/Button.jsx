import React, { useState, useEffect } from 'react';

import './styles.css';

function Button({ type, text, icon, handleClick }) {
  const [variant, setVariant] = useState('');

  const styles = {
    primary: {
      backgroundColor: 'var(--button-color)',
      color: '#fff',
    },
    save: {
      backgroundColor: 'var(--button-color)',
      color: '#fff',
      width: '100%',
      height: '2.5em'
    },
    cancel: {
      backgroundColor: 'var(--cancel-button)',
      color: '#fff',
      display: 'inline-block',
    },
    delete: {
      backgroundColor: 'var(--delete-button)',
      color: '#fff',
      display: 'inline-block',
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