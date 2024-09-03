import { useState } from "react";
import "./CodeOptimization.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner component

export default function CodeOptimization() {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const [optimizedCode, setOptimizedCode] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading symbol
  const [buttonText, setButtonText] = useState("Optimize Code"); // State to manage button text
  const [conversionSuccess, setConversionSuccess] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTextContent = (e) => {
    setTextInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loading symbol
    setButtonText("Optimizing Code..."); // Change button text to "Optimizing Code..."
    setConversionSuccess(false);

    // Create a form data object to send the code and option to Flask
    const formData = new FormData();
    formData.append("code", textInput);
    formData.append("model", selectedOption);

    try {
      const response = await fetch("http://localhost:5000/optimize", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setOptimizedCode(data.optimized_code);
        setButtonText("Optimize Code"); // Change button text to "Code Optimized"
        setConversionSuccess(true);
      } else {
        setOptimizedCode("An error occurred. Please try again.");
        setButtonText("Optimize Code"); // Reset button text
      }
    } catch (error) {
      console.error("Error:", error);
      setOptimizedCode("An error occurred. Please try again.");
      setButtonText("Optimize Code"); // Reset button text
    } finally {
      setLoading(false); // Hide loading symbol
    }
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Code Optimization</h2>
      <br />
      <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col xs={12} md={5} className="containerBox1">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h5>Select a Language Model</h5>
                </Form.Label>
                <Form.Select
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="" disabled>Choose a model</option>
                  <option value="Azure OpenAI">Azure OpenAI</option>
                  <option value="Google Palm" disabled>Google Palm</option>
                  <option value="Google Gemini Pro" disabled>Google Gemini Pro</option>
                  <option value="LLaMA2" disabled>LLaMA2</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Enter your Code:</h5>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={textInput}
                  onChange={handleTextContent}
                />
              </Form.Group>
              <br />
              <Button variant="light" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" role="status" size="sm">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    {" "} {buttonText}
                  </>
                ) : (
                  buttonText
                )}
              </Button>
            </Form>
          </Col>

          <Col xs={12} md={6} className="containerBox2">
            <h4>Optimized Code</h4>
            {conversionSuccess && (  // Conditionally render success message
              <p className="sts">Code Optimized Successfully!!!</p>
            )}
            <br />
            <pre>{optimizedCode || "Select a model and enter your code. Your output will be displayed here..."}</pre>
          </Col>
        </Row>
        <br />
      </Container>
      <Footer />
    </>
  );
}