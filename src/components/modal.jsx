import React from 'react';
import Token from './token';
import './modal.css'

function Popup({ onSelect }) {

  return (
    <div className="modalshow">
      <Token onSelect={onSelect} />
    </div>
  );
}

export default Popup;
