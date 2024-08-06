import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
// import { Link } from 'react-router-dom';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CognizantLogo from '../Images/Cognizant-Logo.png'
import Image from 'react-bootstrap/Image';

export default function Login() {
  const [validated, setValidated] = useState(false);

  function handleSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  }
  return (
<>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home" className='navbartitle' >
      <Image src={CognizantLogo} className='logoimg1' alt="Logo" />
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
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a email
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

       

        <Button variant="primary" type="submit" as={Link} to='/home'>
          Login
        </Button>
      </Form>
    </div>
    </>
  );
}
