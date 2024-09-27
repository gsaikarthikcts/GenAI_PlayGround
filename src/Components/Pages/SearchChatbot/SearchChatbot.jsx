import { useState, useEffect, useRef } from "react";
import "./SearchChatbot.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import InputGroup from 'react-bootstrap/InputGroup';
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
    const chatEndRef = useRef(null);
 
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
 
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);
 
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
 
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
 
    const handleChatbotSearch = (e) => {
        setChatbotSearch(e.target.value);
        if (e.key === "Enter") {
            handleQuestionSubmit();
            setChatbotSearch("");
        }
    };
 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            // Clear previous data
            setChatHistory([]);
            setProcessingFile(true);
            setFileStatus("");
            setConversionSuccess(false);
           
            const formData = new FormData();
            formData.append("pdf_file", selectedFile);
 
            try {
                await fetch("http://localhost:5000/upload-pdf", {
                    method: "POST",
                    body: formData
                });
                //const data = await response.json();
                setChatHistory(prev => [
                    ...prev,
                    { type: "bot", content: "Hi, my name is CTSGenAI_Bot. Welcome to Cognizant GenAI Playground. Please ask questions relevant to the document uploaded." }
                ]);
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
        const userInput = chatbotSearch.toLowerCase();
   
        // Check if the input contains "thanks", "thank you", or "bye"
        if (userInput.includes("thanks") || userInput.includes("thank you") || userInput.includes("bye")) {
            setChatHistory(prev => [
                ...prev,
                {type: "user", content: chatbotSearch},
                { type: "bot", content: "Thanks for using CTS_GenAI_Bot. Have a good day!" }
            ]);
            setChatbotSearch("");  // Clear the input field
            return;  // Exit the function to skip the rest of the processing
        }
   
        setChatHistory(prev => [...prev, { type: "user", content: chatbotSearch }]);
   
        try {
            const response = await fetch("http://localhost:5000/ask-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: chatbotSearch })
            });
   
            const data = await response.json();
            setChatHistory(prev => [
                ...prev,
                { type: "bot", content: data.answer },
                {
                    type: "bot",
                    content: (
                        <>
                            <span>Are you satisfied with this answer?</span>
                            <div className="review-buttons">
                                <Button variant="success" size="sm" onClick={() => handleReview("satisfied")}>
                                    Satisfied
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleReview("unsatisfied")}>
                                    Unsatisfied
                                </Button>
                            </div>
                        </>
                    )
                }
            ]);
        } catch (error) {
            console.error("Error submitting question:", error);
        } finally {
            setChatbotSearch("");  // Clear the input field
        }
    };
 
    const handleReview = (review) => {
        if (review === "unsatisfied") {
            regenerateAnswer();
            setChatHistory(prev => [...prev, { type: "bot", content: <> <Spinner animation="border" size="sm" /> Loading...</> }]);
        } else if (review === "satisfied") {
            setChatHistory(prev => [...prev, { type: "bot", content: "How can I assist you further?" }]);
        }
    };
 
    const regenerateAnswer = async () => {
        try {
            const response = await fetch("http://localhost:5000/ask-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: chatbotSearch })
            });
            const data = await response.json();
            setChatHistory(prev => [...prev, { type: "bot", content: data.answer }]);
            // Prompt for review again after regenerating
            setChatHistory(prev => [...prev, {
                type: "bot",
                content: (
                    <>
                        <span>Are you satisfied with this answer?</span>
                        <div className="review-buttons">
                            <Button variant="success" size="sm" onClick={() => handleReview("satisfied")}>
                                Satisfied
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleReview("unsatisfied")}>
                                Unsatisfied
                            </Button>
                        </div>
                    </>
                )
            }]);
        } catch (error) {
            console.error("Error regenerating answer:", error);
        }
    };
 
    return (
        <>
            <NavigationBar />
            <h2 className="titleheading">Chatbot For Knowledge Article</h2>
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
                                    <option value="option4" disabled>Llama2</option>
                                </Form.Select>
                            </Form.Group>
                            <br />
                            <Form.Group controlId="fileUpload" className="formgroup">
                                <Form.Label>
                                    <h5>Upload File</h5>
                                </Form.Label>
                                <Form.Control type="file" onChange={handleFileChange}  />
                            </Form.Group>
                            {conversionSuccess && (
                                <p className="sts1">RAG Upload Successfully</p>
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
                            <div ref={chatEndRef} />
                        </div>
                        {/* Input area */}
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                value={chatbotSearch}
                                onChange={handleChatbotSearch}
                                onKeyDown={handleChatbotSearch}
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















// import { useState, useEffect, useRef } from "react";
// import "./SearchChatbot.css";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import NavigationBar from "../../NavigationBar/NavigationBar";
// import Footer from "../../Footer/Footer";
// import InputGroup from 'react-bootstrap/InputGroup';
// import { FaSearch } from "react-icons/fa";
// import Spinner from "react-bootstrap/Spinner";

// export default function SearchChatbot() {
//     const [selectedOption, setSelectedOption] = useState("");
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [chatbotSearch, setChatbotSearch] = useState("");
//     const [chatHistory, setChatHistory] = useState([]);
//     const [processingFile, setProcessingFile] = useState(false);
//     const [fileStatus, setFileStatus] = useState("");
//     const [conversionSuccess, setConversionSuccess] = useState(false);
//     const chatEndRef = useRef(null);

//     const scrollToBottom = () => {
//         chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [chatHistory]);

//     const handleOptionChange = (e) => {
//         setSelectedOption(e.target.value);
//     };

//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleChatbotSearch = (e) => {
//         setChatbotSearch(e.target.value);
//         if (e.key === "Enter") {
//             handleQuestionSubmit();
//             setChatbotSearch("");
//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (selectedFile) {
//             // Clear previous data
//             setChatHistory([]);
//             setProcessingFile(true);
//             setFileStatus("");
//             setConversionSuccess(false);
            
//             const formData = new FormData();
//             formData.append("pdf_file", selectedFile);

//             try {
//                 await fetch("http://localhost:5000/upload-pdf-chatbot", {
//                     method: "POST",
//                     body: formData
//                 });
//                 //const data = await response.json();
//                 setChatHistory(prev => [
//                     ...prev,
//                     { type: "bot", content: "Hi, my name is CTSGenAI_Bot. Welcome to Cognizant GenAI Playground. Please ask questions relevant to the document uploaded." }
//                 ]);
//                 setFileStatus("Process File");
//                 setConversionSuccess(true);
//             } catch (error) {
//                 console.error("Error processing file:", error);
//                 setFileStatus("File Processing Failed");
//             } finally {
//                 setProcessingFile(false);
//             }
//         }
//     };

//     const handleQuestionSubmit = async () => {
//         const userInput = chatbotSearch.toLowerCase();
    
//         // Check if the input contains "thanks", "thank you", or "bye"
//         if (userInput.includes("thanks") || userInput.includes("thank you") || userInput.includes("bye")) {
//             setChatHistory(prev => [
//                 ...prev,
//                 {type: "user", content: chatbotSearch},
//                 { type: "bot", content: "Thanks for using CTS_GenAI_Bot. Have a good day!" }
//             ]);
//             setChatbotSearch("");  // Clear the input field
//             return;  // Exit the function to skip the rest of the processing
//         }
    
//         setChatHistory(prev => [...prev, { type: "user", content: chatbotSearch }]);
    
//         try {
//             const response = await fetch("http://localhost:5000/ask-question-chat", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ question: chatbotSearch })
//             });
    
//             const data = await response.json();
//             setChatHistory(prev => [
//                 ...prev,
//                 { type: "bot", content: data.answer },
//                 {
//                     type: "bot",
//                     content: (
//                         <>
//                             <span>Are you satisfied with this answer?</span>
//                             <div className="review-buttons">
//                                 <Button variant="success" size="sm" onClick={() => handleReview("satisfied")}>
//                                     Satisfied
//                                 </Button>
//                                 <Button variant="danger" size="sm" onClick={() => handleReview("unsatisfied")}>
//                                     Unsatisfied
//                                 </Button>
//                             </div>
//                         </>
//                     )
//                 }
//             ]);
//         } catch (error) {
//             console.error("Error submitting question:", error);
//         } finally {
//             setChatbotSearch("");  // Clear the input field
//         }
//     };

//     const handleReview = (review) => {
//         if (review === "unsatisfied") {
//             regenerateAnswer();
//             setChatHistory(prev => [...prev, { type: "bot", content: <> <Spinner animation="border" size="sm" /> Loading...</> }]);
//         } else if (review === "satisfied") {
//             setChatHistory(prev => [...prev, { type: "bot", content: "How can I assist you further?" }]);
//         }
//     };

//     const regenerateAnswer = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/ask-question-chat", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ question: chatbotSearch })
//             });
//             const data = await response.json();
//             setChatHistory(prev => [...prev, { type: "bot", content: data.answer }]);
//             // Prompt for review again after regenerating
//             setChatHistory(prev => [...prev, {
//                 type: "bot",
//                 content: (
//                     <>
//                         <span>Are you satisfied with this answer?</span>
//                         <div className="review-buttons">
//                             <Button variant="success" size="sm" onClick={() => handleReview("satisfied")}>
//                                 Satisfied
//                             </Button>
//                             <Button variant="danger" size="sm" onClick={() => handleReview("unsatisfied")}>
//                                 Unsatisfied
//                             </Button>
//                         </div>
//                     </>
//                 )
//             }]);
//         } catch (error) {
//             console.error("Error regenerating answer:", error);
//         }
//     };

//     return (
//         <>
//             <NavigationBar />
//             <h2 className="titleheading">Chatbot For Knowledge Article</h2>
//             <br />
//             <Container className="maincontainer">
//                 <Row className="rowcontainer">
//                     <Col xs={12} md={5} className="containerBox1">
//                         <Form onSubmit={handleFormSubmit}>
//                             <Form.Group controlId="selectOption" className="formgroup">
//                                 <Form.Label>
//                                     <h5>Select a Language Model</h5>
//                                 </Form.Label>
//                                 <Form.Select
//                                     value={selectedOption}
//                                     onChange={handleOptionChange}
//                                 >
//                                     <option value="" disabled>Choose a model</option>
//                                     <option value="option1">Azure OpenAI</option>
//                                     <option value="option2" disabled>Google Palm</option>
//                                     <option value="option3" disabled>Google Gemini Pro</option>
//                                     <option value="option4" disabled>Llama2</option>
//                                 </Form.Select>
//                             </Form.Group>
//                             <br />
//                             <Form.Group controlId="fileUpload" className="formgroup">
//                                 <Form.Label>
//                                     <h5>Upload File</h5>
//                                 </Form.Label>
//                                 <Form.Control type="file" onChange={handleFileChange}  />
//                             </Form.Group>
//                             {conversionSuccess && (
//                                 <p className="sts1">RAG Upload Successfully</p>
//                             )}
//                             <br />
//                             <Button variant="light" type="submit" disabled={processingFile}>
//                                 {processingFile ? (
//                                     <>
//                                         <Spinner animation="border" size="sm" /> Processing File...
//                                     </>
//                                 ) : (
//                                     fileStatus || "Process File"
//                                 )}
//                             </Button>
//                         </Form>
//                     </Col>
//                     <Col xs={12} md={6} className="containerBox2">
//                         <h4>Chatbot</h4>
//                         <br />
//                         {/* Chat History Display */}
//                         <div className="chat-history">
//                             {chatHistory.map((message, index) => (
//                                 <div
//                                     key={index}
//                                     className={message.type === "user" ? "user-message" : "bot-message"}
//                                 >
//                                     {message.content}
//                                 </div>
//                             ))}
//                             <div ref={chatEndRef} />
//                         </div>
//                         {/* Input area */}
//                         <InputGroup className="mb-3">
//                             <Form.Control
//                                 type="text"
//                                 value={chatbotSearch}
//                                 onChange={handleChatbotSearch}
//                                 onKeyDown={handleChatbotSearch}
//                                 placeholder="Type your message here"
//                             />
//                             <Button variant="primary" id="button-addon2" onClick={handleQuestionSubmit}>
//                                 <FaSearch />
//                             </Button>
//                         </InputGroup>
//                     </Col>
//                 </Row>
//             </Container>
//             <Footer />
//         </>
//     );
// }