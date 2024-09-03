import { useState } from "react";
import "./CodeComment.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Spinner from "react-bootstrap/Spinner";

export default function CodeComment() {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const [commentedCode, setCommentedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Comment Code");
  const [conversionSuccess, setConversionSuccess] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTextContent = (e) => {
    setTextInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setButtonText("Commenting Code...");
    setConversionSuccess(false);

    const formData = new FormData();
    formData.append("code", textInput);
    formData.append("model", selectedOption);

    try {
      const response = await fetch("http://localhost:5000/comment", {
        method: "POST",
        body: formData,
      });

      // Debug: Log the entire response
      console.log("Response:", response);

      const data = await response.json();
      // Debug: Log the data received
      console.log("Data:", data);

      if (response.ok) {
        setCommentedCode(data.commented_code);
        setButtonText("Comment Code");
        setConversionSuccess(true);
      } else {
        setCommentedCode("An error occurred. Please try again.");
        setButtonText("Comment Code");
      }
    } catch (error) {
      console.error("Error:", error);
      setCommentedCode("An error occurred. Please try again.");
      setButtonText("Comment Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Code Comment</h2>
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
            <h4>Commented Code</h4>
            {conversionSuccess && (  // Conditionally render success message
              <p className="sts">Code Commented Successfully!!!</p>
            )}
            <br />
            <pre>{commentedCode || "Select a model and enter your code. Your output will be displayed here..."}</pre>
          </Col>
        </Row>
        <br />
      </Container>
      <Footer />
    </>
  );
}