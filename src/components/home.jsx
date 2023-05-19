import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPrice } from '../redux/prices.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Token from './token';
import Price from './price';
import EstimatedGas from './estimatedGas.jsx';


function Home() {

  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(
    typeof window.ethereum !== "undefined"
  );

  const dispatch = useDispatch();

  async function connectToMetaMask() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setIsConnected(true);
    } catch (error) {
      console.error(error);
    }
  }

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [selectedToken, setSelectedToken] = useState({
    from: null,
    to: null,
    fromAmount: null,
  });

  const handleSelectToken = (token, tokenType) => {
    setOpenModal(false);
    if (token) {
      const from = document.getElementById("from");
      const to = document.getElementById("to");
      if (from.innerText === "Select a token") {
        from.innerHTML = `<img src=${token.logoURI} alt="logo" /> ${token.symbol}`;
        setSelectedToken({ ...selectedToken, from: token });
      } else if (to.innerText === "Select a token") {
        to.innerHTML = `<img src=${token.logoURI} alt="logo" /> ${token.symbol}`;
        setSelectedToken({ ...selectedToken, to: token });
      }
      dispatch(getPrice({ ...selectedToken, [tokenType]: token }));
    }
  };


  const handleChangeAmount = (e) => {
    setSelectedToken({ ...selectedToken, fromAmount: e.target.value });
    handleGetPrice();
  };

  const handleGetPrice = () => {
    console.log(selectedToken);
    dispatch(getPrice(selectedToken)).then(() => {
      console.log("Price fetched successfully.");
    }).catch((error) => {
      console.error("Error fetching price:", error);
    });
  };

  return (
    <div className="home">
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">SWAP</Navbar.Brand>
            <Nav className="me-auto">
              {isMetaMaskInstalled ? (
                <Button className="btn btn-large btn-primary btn-block" onClick={connectToMetaMask}>
                  {isConnected ? "Sign In" : "Connect"}
                </Button>
              ) : (
                <Button className="btn btn-large btn-primary btn-block" disabled>
                  Please install MetaMask before continue
                </Button>
              )}
            </Nav>
          </Container>
        </Navbar>
      </>
      <div className="form-content">
        <h1 className="form-title">SWAP</h1>
        <Form className="form">
          <Form.Group className="mb-3" controlId="mb-3">
            <Form.Label id="from" onClick={() => handleOpenModal()}>
              Select a token
            </Form.Label><br />
            <Form.Control type="number" placeholder="Amount" onChange={handleChangeAmount} id="from-amount"/>
          </Form.Group>

            <Form.Group  className="mb-3" controlId="mb-3">
            <Form.Label id="to" onClick={() => handleOpenModal()}>
              Select a token
            </Form.Label><br />
            <Price selectedToken={selectedToken} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mb-3">
            <Form.Label>
              {
                selectedToken.fromAmount && selectedToken.from && selectedToken.to ? (
                  <span>Estimated Gas: <EstimatedGas selectedToken={selectedToken} /> </span>
                ) : (
                  <span>Estimated Gas: </span>
                )
              }
            </Form.Label>
          </Form.Group>

          {isConnected ? (
            <Button as={Col} md="12" className="btn btn-large btn-primary btn-block" id="swap-btn">
              SWAP
            </Button>
          ) : (
              <Button as={Col} md="12" className="btn btn-large btn-primary btn-block disabled" id="swap-btn">
              SWAP
            </Button>
          )}
        </Form>
      </div>
      {openModal && <Token onClose={() => setOpenModal(false)} onSelect={handleSelectToken}/>}
    </div>
  )
}

export default Home
