import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Home() {
  return (
    <Form>
      <h1>SWAP</h1>
      <Form.Group className="mb-3" controlId="mb-3">
        <Form.Label>Select a token</Form.Label><br />
        <Form.Control type="number" placeholder="Amount" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="mb-3">
        <Form.Label>Select a token</Form.Label><br />
        <Form.Control type="number" placeholder="Amount" id="to_amount"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="mb-3">
        <Form.Label>Estimated gas:</Form.Label><br />
      </Form.Group>

      <Button disabled className="btn btn-large btn-primary btn-block" id="swap-btn">
        SWAP
      </Button>
    </Form>
  )
}

export default Home
