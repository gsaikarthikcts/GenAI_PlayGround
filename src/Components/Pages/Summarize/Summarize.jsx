import { useState } from "react";
import "./Summarize.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Spinner from "react-bootstrap/Spinner";

export default function SemanticSearch() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [conversionSuccess, setConversionSuccess] = useState(false);
  const [fileError, setFileError] = useState(""); // State for handling file errors

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError(""); // Reset file error state
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB size limit
        setFileError("File size exceeds 2MB. Please upload a smaller file.");
        setSelectedFile(null);
      } else if (file.type !== "application/pdf") {
        setFileError("Only PDF files are allowed.");
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile && selectedOption) {
      setUploading(true);
      setUploadStatus("");
      const formData = new FormData();
      formData.append("pdf_file", selectedFile);

      try {
        await fetch("http://localhost:5000/upload-pdf", {
          method: "POST",
          body: formData,
        });
       // const data = await response.json();
        setUploadStatus("Uploaded");
        setConversionSuccess(true);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadStatus("Upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (question.trim()) {
      setSubmittingQuestion(true);
      setQuestions([]); // Clear previous questions
      setAnswers([]); // Clear previous answers
      try {
        const response = await fetch("http://localhost:5000/ask-question-sum", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });
        const data = await response.json();
        setQuestions([question]);
        setAnswers([data.answer]);
        setQuestion("");
        setSubmittingQuestion(false);
      } catch (error) {
        console.error("Error submitting question:", error);
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
      <h2 className="titleheading">Summarize Your Document</h2>
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
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  isInvalid={!!fileError} // Highlight the input if there's an error
                />
                {fileError && (
                  <p className="error-text">{fileError}</p>
                )}
              </Form.Group>

              {conversionSuccess && (
                <p className="sts1">Doc Uploaded Successfully</p>
              )}
              <br />

              <Button variant="light" type="submit" disabled={uploading || !!fileError}>
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
            <Form autoComplete="off" onSubmit={handleQuestionSubmit}>
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
            <Button variant="light" onClick={handleEnd}>Clear</Button>
            <br />
            <div>
              {questions.length > 0 && (
                <div>
                  <strong>Question:</strong> {questions[0]}
                  <br/>
                  <strong>Responce:</strong> {answers[0]}
                  <br />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
