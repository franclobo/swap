import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTokens } from '../redux/tokens';
import Tokens from './tokens';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { GrClose } from 'react-icons/gr';

import './token.css';

function Token({ onSelect, search, onClose }) {
  const dispatch = useDispatch();
  const tokens = useSelector(state => state.tokens);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Variable de estado para indicar si los tokens se están cargando

  useEffect(() => {
    dispatch(fetchTokens())
      .then(() => setIsLoading(false)) // Marcar como no cargando una vez que se obtengan los tokens
      .catch(() => setIsLoading(false)); // Manejar cualquier error y marcar como no cargando

    return () => {
      setIsLoading(true); // Restaurar el estado de carga cuando el componente se desmonte
    };
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      const results = tokens.filter(token => token.symbol.toLowerCase().includes(search.toLowerCase()));
      setFilteredTokens(results);
    } else {
      setFilteredTokens(tokens);
    }
  }, [search, tokens]);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose(false);
    }
  };

  useEffect(() => {
    setFilteredTokens(tokens.sort((a, b) => a.symbol.localeCompare(b.symbol)));
  }, [tokens]);

  return (
    <div className="token-container">
      <div className="modalshow">
        <Modal.Dialog className="modal-dialog">
          <div className="token-header">
            <Modal.Header className="modal-header">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={(e) =>
                    setFilteredTokens(
                      tokens.filter(token => token.symbol.toLowerCase().includes(e.target.value.toLowerCase()))
                    )
                  }
                />
              </Form>
              <div className="close-btn">
                <GrClose onClick={handleClose} />
              </div>
            </Modal.Header>
          </div>
          <Modal.Body className="body">
            {isLoading ? (
              <div className="loading">Loading...</div> // Mostrar mensaje de carga mientras se obtienen los tokens
            ) : (
              <ul className="token-list">
                {Array.isArray(filteredTokens) &&
                  filteredTokens.map(token => (
                    <div key={token.address} className="token-item" onClick={() => onSelect(token)}>
                      <Tokens img={token.logoURI} symbol={token.symbol} />
                    </div>
                  ))}
              </ul>
            )}
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default Token;
