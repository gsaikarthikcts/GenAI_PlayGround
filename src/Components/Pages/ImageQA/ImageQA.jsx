import { useState } from "react";
import "./ImageQA.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner component

export default function ImageQA() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [output, setOutput] = useState(""); // State to hold output
  const [loading, setLoading] = useState(false); // State to manage loading symbol
  const [buttonText, setButtonText] = useState("Process Image"); // State to manage button text
  const [conversionSuccess, setConversionSuccess] = useState(false);
  

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleImageFile = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl); // Set image preview
    }
  };

  const handleTextContent = (e) => {
    setTextInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loading symbol
    setButtonText("Processing Image..."); // Change button text to "Processing Image..."

    const fileInput = document.querySelector('input[type="file"]');
    const imageFile = fileInput?.files[0];

    if (!imageFile) {
      console.error("No file selected");
      setLoading(false);
      setButtonText("Process Image"); // Reset button text
      return;
    }

    const formData = new FormData();
    formData.append("question", textInput);
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:5000/ask-question-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setOutput(result.answer);
        setButtonText("Process Image"); // Change button text to "Image Processed"
        setConversionSuccess(true);
      } else {
        setOutput(result.error || "An error occurred. Please try again.");
        setButtonText("Process Image"); // Reset button text
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("An error occurred. Please try again.");
      setButtonText("Process Image"); // Reset button text
    } finally {
      setLoading(false); // Hide loading symbol
    }
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Image Q&A</h2>
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
                  <option value="option1">Azure OpenAI</option>
                  <option value="option2" disabled>Google Palm</option>
                  <option value="option3" disabled>Google Gemini Pro</option>
                  <option value="option4" disabled>LLaMA2</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="fileUpload" className="formgroup">
                <Form.Label>
                  <h5>Upload File</h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="image"  // This name attribute is crucial for referencing the file input
                  accept="image/*"
                  onChange={handleImageFile}
                />
              </Form.Group>
              <br />

              {selectedImage && (
                <div>
                  <h5>Image Preview</h5>
                  <Image src={selectedImage} alt="Image Preview" fluid />
                </div>
              )}
              <br />

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Ask Question related to the Image</h5>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={textInput}
                  onChange={handleTextContent}
                />
              </Form.Group>
              {conversionSuccess && (
                <p className="sts1">Image Uploaded Successfull</p>
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
            <h4>Image Q&A</h4>
            <br />
            <h5>Your output will be displayed here...</h5>
            {output && <p>{output}</p>}
          </Col>
        </Row>
        <br />
      </Container>
      <Footer />
    </>
  );
}