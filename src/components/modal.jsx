
import Modal from 'react-bootstrap/Modal';
import './modal.css'

function Popup({ onClose }) {

  return (
    <div className="modalshow">
      <Modal.Dialog>
        <Modal.Header closeButton onClick={() => onClose(false)}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

      </Modal.Dialog>
    </div>
  );
}

export default Popup;
