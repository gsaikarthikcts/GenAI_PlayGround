import { useState } from "react";
import "./ExtractProductAttributes.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner for the loading symbol

export default function ExtractProductAttributes() {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const [productAttributes, setProductAttributes] = useState("");
  const [submitting, setSubmitting] = useState(false); // State to manage submitting status
  const [buttonText, setButtonText] = useState("Submit"); // State for button text
  const [conversionSuccess, setConversionSuccess] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTextContent = (e) => {
    setTextInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setButtonText("Submitting..."); // Update button text while submitting

    const payload = {
      model: selectedOption,
      product: textInput,
    };

    try {
      const response = await fetch('http://localhost:5000/product-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setProductAttributes(data.product_details);
      setButtonText("Submit"); // Update button text after submission
      setConversionSuccess(true);
    } catch (error) {
      console.error("Error extracting product attributes:", error);
      setButtonText("Submission Failed"); // Handle errors
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Extract Product Attribute</h2>
      <br />
      <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col xs={12} md={5} className="containerBox1">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h5>Select a Language Model</h5>
                </Form.Label>
                <Form.Select value={selectedOption} onChange={handleOptionChange}>
                  <option value="" disabled>Choose a model</option>
                  <option value="azure">Azure OpenAI</option>
                  <option value="palm" disabled>Google Palm</option>
                  <option value="gemini" disabled>Google Gemini Pro</option>
                  <option value="llama" disabled>Llama2</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Enter Product to be Extracted:</h5>
                </Form.Label>
                <Form.Control as="textarea" value={textInput} onChange={handleTextContent} />
              </Form.Group>

              {conversionSuccess && (
                <p className="sts1">Successfull</p>
              )}
              <br />

              <Button variant="light" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" /> {buttonText}
                  </>
                ) : (
                  buttonText
                )}
              </Button>
            </Form>
          </Col>

          <Col xs={12} md={6} className="containerBox2">
            <h4>Product Attribute:</h4>
            <br />
            <h5>
              {productAttributes ? productAttributes : "Select a model and enter the product reviews. Your output will be displayed here..."}
            </h5>
          </Col>
        </Row>
        <br />
      </Container>
      <Footer />
    </>
  );
}