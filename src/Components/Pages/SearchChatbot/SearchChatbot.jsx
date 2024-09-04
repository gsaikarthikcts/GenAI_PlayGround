import { useState } from "react";
import "./SearchChatbot.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";

export default function SearchChatbot() {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [chatbotSearch, setChatbotSearch] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [processingFile, setProcessingFile] = useState(false);
    const [fileStatus, setFileStatus] = useState("");
    const [conversionSuccess, setConversionSuccess] = useState(false);
    const [fileError, setFileError] = useState(""); // State to manage file errors

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setFileError("Only PDF files are allowed.");
                setSelectedFile(null);
            } else if (file.size > 2 * 1024 * 1024) {
                setFileError("File size should not exceed 2MB.");
                setSelectedFile(null);
            } else {
                setFileError("");
                setSelectedFile(file);
            }
        }
    };

    const handleChatbotSearch = (e) => {
        setChatbotSearch(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            setProcessingFile(true);
            setFileStatus("");

            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                const response = await fetch("http://localhost:5000/upload-pdf", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                setChatHistory((prev) => [...prev, { type: "bot", content: data.message }]);
                setFileStatus("Process File");
                setConversionSuccess(true);
            } catch (error) {
                console.error("Error processing file:", error);
                setFileStatus("File Processing Failed");
            } finally {
                setProcessingFile(false);
            }
        }
    };

    const handleQuestionSubmit = async () => {
        setChatHistory((prev) => [...prev, { type: "user", content: chatbotSearch }]);

        try {
            const response = await fetch("http://localhost:5000/ask-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: chatbotSearch }),
            });
            const data = await response.json();
            setChatHistory((prev) => [...prev, { type: "bot", content: data.answer }]);
        } catch (error) {
            console.error("Error submitting question:", error);
        } finally {
            setChatbotSearch("");
        }
    };

    return (
        <>
            <NavigationBar />
            <h2 className="titleheading">Semantic Search Chatbot</h2>
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
                                    <option value="" disabled>
                                        Choose a model
                                    </option>
                                    <option value="option1">Azure OpenAI</option>
                                    <option value="option2" disabled>
                                        Google Palm
                                    </option>
                                    <option value="option3" disabled>
                                        Google Gemini Pro
                                    </option>
                                    <option value="option4" disabled>
                                        Llama2
                                    </option>
                                </Form.Select>
                            </Form.Group>
                            <br />
                            <Form.Group controlId="fileUpload" className="formgroup">
                                <Form.Label>
                                    <h5>Upload File</h5>
                                </Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} />
                                {fileError && <p className="error-text">{fileError}</p>} {/* Error message */}
                            </Form.Group>
                            {conversionSuccess && (
                                <p className="sts1">Doc Uploaded Successfully</p>
                            )}
                            <br />
                            <Button variant="light" type="submit" disabled={processingFile}>
                                {processingFile ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Processing File...
                                    </>
                                ) : (
                                    fileStatus || "Process File"
                                )}
                            </Button>
                        </Form>
                    </Col>

                    <Col xs={12} md={6} className="containerBox2">
                        <h4>Chatbot</h4>
                        <br />

                        {/* Chat History Display */}
                        <div className="chat-history">
                            {chatHistory.map((message, index) => (
                                <div
                                    key={index}
                                    className={message.type === "user" ? "user-message" : "bot-message"}
                                >
                                    {message.content}
                                </div>
                            ))}
                        </div>

                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                value={chatbotSearch}
                                onChange={handleChatbotSearch}
                                placeholder="Type your message here"
                            />
                            <Button variant="primary" id="button-addon2" onClick={handleQuestionSubmit}>
                                <FaSearch />
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}