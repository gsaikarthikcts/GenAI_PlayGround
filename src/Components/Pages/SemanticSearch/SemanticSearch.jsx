import { useState } from "react";
import "./SemanticSearch.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner for the loading symbol

export default function SemanticSearch() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // New state for upload status
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [conversionSuccess, setConversionSuccess] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile && selectedOption) {
      setUploading(true);
      setUploadStatus(""); // Reset the upload status
      const formData = new FormData();
      formData.append("pdf_file", selectedFile);

      try {
        const response = await fetch("http://localhost:5000/upload-pdf", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setSummary(data.summary);
        setUploadStatus("Upload"); // Set the status to "Uploaded" after successful upload
        setConversionSuccess(true);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadStatus("Upload failed"); // Optionally handle upload failure
      } finally {
        setUploading(false);
      }
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      setSubmittingQuestion(true);
      try {
        const response = await fetch("http://localhost:5000/ask-question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });
        const data = await response.json();
        setQuestions([...questions, question]);
        setAnswers([...answers, data.answer]);
        setQuestion("");
      } catch (error) {
        console.error("Error submitting question:", error);
      } finally {
        setSubmittingQuestion(false);
      }
    }
  };

  const handleEnd = () => {
    setQuestions([]);
    setAnswers([]);
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Semantic Search</h2>
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
                  <option value="option1">Azure OpenAI</option>
                  <option value="option2" disabled>Google Palm</option>
                  <option value="option3" disabled>Google Gemini Pro</option>
                  <option value="option4" disabled>LLama2</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="fileUpload" className="formgroup">
                <Form.Label>
                  <h5>Upload File</h5>
                </Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              {conversionSuccess && (
                <p className="sts1">RAG Upload Successfully</p>
              )}
              <br />

              <Button variant="light" type="submit" disabled={uploading}>
                {uploading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Uploading...
                  </>
                ) : uploadStatus === "Uploaded" ? (
                  "Uploaded"
                ) : (
                  "Upload"
                )}
              </Button>
            </Form>
          </Col>

          <Col xs={12} md={6} className="containerBox2">
            <Form onSubmit={handleQuestionSubmit}>
              <Form.Group controlId="questionInput" className="formgroup">
                <Form.Label>
                  <h5>Ask a Question</h5>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question..."
                />
              </Form.Group>
              <br />
              <Button variant="light" type="submit" disabled={submittingQuestion}>
                {submittingQuestion ? (
                  <>
                    <Spinner animation="border" size="sm" /> Submitting...
                  </>
                ) : (
                  "Submit Question"
                )}
              </Button>
            </Form>
            <br />
            <Button variant="light" onClick={handleEnd}>End</Button>
            <br />
            <div>
              {questions.map((q, index) => (
                <div key={index}>
                  <strong>Question:</strong> {q}
                  <br />
                  <strong>Answer:</strong> {answers[index]}
                  <br />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}