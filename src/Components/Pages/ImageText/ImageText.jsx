import { useState } from "react";
import "./ImageText.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

export default function ImageText() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Process Image");
  const [conversionSuccess, setConversionSuccess] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB. Please upload a smaller file.");
        setSelectedImage(null);
        return;
      }
      // Check file type (PNG, JPG, JPEG)
      const fileType = file.type;
      if (!["image/png", "image/jpeg", "image/jpg"].includes(fileType)) {
        setError("Invalid file type. Only PNG, JPG, and JPEG are accepted.");
        setSelectedImage(null);
        return;
      }
      // If file is valid, clear error and set image
      setError("");
      const imgUrl = URL.createObjectURL(file);
      setSelectedImage(imgUrl);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!selectedImage || !selectedOption) {
      setError("Please select an image and a model before converting.");
      return;
    }

    const formData = new FormData();
    const file = e.target.fileUpload.files[0]; // Access the file from the form

    formData.append("file", file);
    formData.append("model", selectedOption);

    setLoading(true); // Start loading
    setButtonText("Processing Image..."); // Update button text while processing

    fetch("http://localhost:5000/uploadimg", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setOutputText(data.text);
        setLoading(false); // Stop loading
        setButtonText("Process Image"); // Update button text after processing
        setConversionSuccess(true);
      })
      .catch(error => {
        console.error("Error:", error);
        setLoading(false); // Stop loading on error
        setButtonText("Process Image"); // Reset button text on error
        setError("An error occurred while processing the image.");
      });
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Image to Text</h2>
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
                  <option value="option1">HuggingFace Model(Salesforce)</option>
                  <option value="option2" disabled>Google Palm</option>
                  <option value="option3" disabled>Google Gemini Pro</option>
                  <option value="option4" disabled>Llama2</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="fileUpload" className="formgroup">
                <Form.Label>
                  <h5>Upload File</h5>
                </Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageFile} />
                {error && <p className="error-text">{error}</p>}
              </Form.Group>
              <br />

              {selectedImage && (
                <div>
                  <h5>Image Preview</h5>
                  <Image className="imageprev" src={selectedImage} alt="Image Preview" thumbnail />
                </div>
              )}
              {conversionSuccess && (
                <p className="sts1">Image Uploaded Successfully</p>
              )}
              <br />

              <Button variant="light" type="submit" disabled={loading}>
                {loading ? (
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
            <h4>Output</h4>
            <br />
              <h5>{outputText || "Select a model and upload the file. Your output will be displayed here..."}</h5>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}


