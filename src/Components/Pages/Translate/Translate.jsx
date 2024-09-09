import { useState } from "react";
import "./Translate.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner component

export default function Translate() {
  const [selectedOption, setSelectedOption] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading symbol
  const [buttonText, setButtonText] = useState("Convert Text"); // State to manage button text
  const [conversionSuccess, setConversionSuccess] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSourceLanguage = (e) => {
    setSourceLanguage(e.target.value);
  };

  const handleTargetLanguage = (e) => {
    setTargetLanguage(e.target.value);
  };

  const handleTextContent = (e) => {
    setTextInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loading symbol
    setButtonText("Text Converting..."); // Change button text to "Text Converting..."

    try {
      const response = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedOption,
          sourceLanguage,
          targetLanguage,
          text: textInput,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setTranslatedText(data.translated_text);
        setButtonText("Convert Text"); // Change button text to "Text Converted"
        setConversionSuccess(true);
      } else {
        setTranslatedText("An error occurred. Please try again.");
        setButtonText("Convert Text"); // Reset button text
      }
    } catch (error) {
      console.error("Error:", error);
      setTranslatedText("An error occurred. Please try again.");
      setButtonText("Convert Text"); // Reset button text
    } finally {
      setLoading(false); // Hide loading symbol
    }
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Language Translation</h2>
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
                  <option value="Azure OpenAI">Azure OpenAI</option>
                  <option value="Google Palm" disabled>Google Palm</option>
                  <option value="Google Gemini Pro" disabled>Google Gemini Pro</option>
                  <option value="Llama2" disabled>Llama2</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="selectSourceLanguage" className="formgroup">
                <Form.Label>
                  <h5>Select Source Language:</h5>
                </Form.Label>
                <Form.Select value={sourceLanguage} onChange={handleSourceLanguage}>
                  <option value="">Choose a Language</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Spanish">Spanish</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="selectTargetLanguage" className="formgroup">
                <Form.Label>
                  <h5>Select Target Language:</h5>
                </Form.Label>
                <Form.Select value={targetLanguage} onChange={handleTargetLanguage}>
                  <option value="">Choose a Language</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Spanish">Spanish</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Enter text for Translation</h5>
                </Form.Label>
                <Form.Control as="textarea" value={textInput} onChange={handleTextContent} />
              </Form.Group>
              {conversionSuccess && ( 
                <p className="sts1">Successfull</p>
              )}
              <br />

              <Button variant="light" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" role="status" size="sm">  {/* Display loading spinner */}
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
            <h4>Translation</h4>
            <br />
            <h5>{translatedText || "Your translated text will appear here..."}</h5>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}