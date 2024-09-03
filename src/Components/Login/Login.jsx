import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import CognizantLogo from '../Images/Cognizant-Logo.png';
import './Login.css';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.currentTarget;
    const emailInput = form.elements['floatingInput'];
    const emailValue = emailInput.value;

    // Check validity of form and email
    if (form.checkValidity() === false || !emailValue.endsWith('@cognizant.com')) {
      if (!emailValue.endsWith('@cognizant.com')) {
        setEmailError('You are not a Cognizant employee');
      } else {
        setEmailError('');
        setValidated(true);
      }
      setValidated(true);
      return; // Stop further execution
    }

    setEmailError(''); // Clear any previous error
    setValidated(true);
    // Proceed with form submission or other actions here
    window.location.href="/home";
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" className="navbartitle">
            <Image src={CognizantLogo} className="logoimg1" alt="Logo" />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="formContainer">
        <Form
          className="form"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h2 className="formtitle">Cognizant Gen AI</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId="floatingInput" label="Provide Email address" className="mb-3">
              <Form.Control type="email" placeholder="Enter email" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email
              </Form.Control.Feedback>
            </FloatingLabel>
            {emailError && <div className="emailError">{emailError}</div>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}