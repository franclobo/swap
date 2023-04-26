import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Token from './token';
import './modal.css'

function Popup({ onSelect, onClose }) {

  return (
    <div className="modalshow">
      <Modal.Dialog className="modal-dialog">
        <Modal.Header closeButton onClick={() => onClose(false)}>
          <Modal.Title>Select a token</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <Token handleSelectToken={onSelect} />
        </Modal.Body>

      </Modal.Dialog>
    </div>
  );
}

export default Popup;
