import React from 'react';

import './styles.css';

function Modal({ children }) {

  return (
    <div className="modal-overlay">
      <div className="modal">

        { children }

      </div>
    </div>
  );
}

export default Modal;