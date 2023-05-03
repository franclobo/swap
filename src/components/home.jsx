import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Popup from './modal';
import Price from './price';

function Home() {

  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(
    typeof window.ethereum !== "undefined"
  );

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

  const [selectedToken, setSelectedToken] = useState(null);

  const handleSelectToken = (token) => {
    setSelectedToken(token);
    setOpenModal(false);
    if (token) {
      const from = document.getElementById("from");
      const to = document.getElementById("to");

      if (from.innerText === "Select a token") {
        from.innerHTML = `<img src=${token.logoURI} alt="logo" /> ${token.symbol}`;
      } else if (to.innerText === "Select a token") {
        to.innerHTML = `<img src=${token.logoURI} alt="logo" /> ${token.symbol}`;
      }
    }

    const getPrice = async () => {
      const from = document.getElementById("from");
      const to = document.getElementById("to");
      const fromAmount = document.getElementById("from-amount");
      const toAmount = document.getElementById("to-amount");

      if (from.innerText !== "Select a token" && to.innerText !== "Select a token") {
        const fromAddress = from.innerText.split(" ")[1];
        const toAddress = to.innerText.split(" ")[1];

        const url = `https://api.1inch.exchange/v3.0/1/quote?fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&amount=${fromAmount.value}`;

        const response = await fetch(url);
        const data = await response.json();

        toAmount.value = data.toTokenAmount;
      }
    };

    getPrice();
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
            <Form.Control type="number" placeholder="Amount" id="from-amount"/>
          </Form.Group>

            <Form.Group  className="mb-3" controlId="mb-3">
            <Form.Label id="to" onClick={() => handleOpenModal()}>
              Select a token
            </Form.Label><br />
            <Form.Control type="number" placeholder="Amount" id="to-amount"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="mb-3">
            <Form.Label>Estimated gas:</Form.Label><br />
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
      {openModal && <Popup onClose={() => setOpenModal(false)} onSelect={handleSelectToken} />}
    </div>
  )
}

export default Home
