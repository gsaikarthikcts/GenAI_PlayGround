import { useState } from "react";
import "./ProofRead.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";

export default function ProofRead() {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, settextInput] = useState("");
  const [selectedRadioOption, setSelectedRadioOption] = useState("");

  const handleChange = (e) => {
    setSelectedRadioOption(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTextContent = (e) => {
    settextInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Selected Option:", selectedOption);
    // Reset form fields if needed
  };
  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Proofread and Correct Content</h2>
      <br></br>
      <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col xs={12} md={5} className="containerBox1  ">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  {/* <h4>Select a Language Model</h4> */}
                  <h5>Select a Language Model</h5>
                </Form.Label>
                <Form.Select
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="">Choose a model</option>
                  <option value="option1">Azure OpenAI</option>
                  <option value="option2">Google Palm</option>
                  <option value="option3">Google Gemini Pro</option>
                </Form.Select>
              </Form.Group>
              <br></br>

              <Form.Group className="mb-3">
                <Form.Label><h5>Choose action</h5></Form.Label>
                <Form.Check
                  type="radio"
                  id="option1"
                  name="options"
                  value="Option 1"
                  label="Proof Read"
                  checked={selectedRadioOption === "Option 1"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  id="option2"
                  name="options"
                  value="Option 2"
                  label="Proof Read and Translate"
                  checked={selectedRadioOption === "Option 2"}
                  onChange={handleChange}
                />
              </Form.Group>
              <br></br>

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Enter Text for Proof Reading:</h5>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={textInput}
                  onChange={handleTextContent}
                />
              </Form.Group>
              <br></br>
              <br></br>

              <Button variant="light" type="submit">
                Submit
              </Button>
            </Form>
          </Col>

          <Col xs={12} md={6} className="containerBox2">
            <h4>Proof Reading Results</h4>
            <br></br>
            <h5>
              Select a model, choose the action and enter text for proof
              reading. Your output will be displayed here...{" "}
            </h5>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
