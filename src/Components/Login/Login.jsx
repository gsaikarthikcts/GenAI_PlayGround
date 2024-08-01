import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
// import { Link } from 'react-router-dom';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { Link } from "react-router-dom";

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

       

        <Button variant="primary" type="submit" as={Link} to='/'>
          Login
        </Button>
      </Form>
    </div>
  );
}
