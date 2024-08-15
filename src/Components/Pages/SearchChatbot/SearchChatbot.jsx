import { useState } from "react";
import "./SearchChatbot.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer"
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";


export default function SearchChatbot(){
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [textInput, settextInput] = useState("");
    const [chatbotSearch, setchatbotSearch]=useState("");
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleTextContent = (e) => {
      settextInput(e.target.value);
    };

    const handleSearchChatbottext = (e) => {
      setchatbotSearch(e.target.value);
    };

    const handleChatbotSearch = (e)=>{

    }
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log("Selected Option:", selectedOption);
      console.log("Selected File:", selectedFile);
      // Reset form fields if needed
    };
    return(
        <>
        <NavigationBar/>
        <h2 className="titleheading">Semantic Search Chatbot</h2>
        <br/>
        <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col  xs={12} md={5}  className="containerBox1  "  >
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  {/* <h4>Select a Language Model</h4> */}
                  <h5>Select a Language Model</h5>
                </Form.Label>
                <Form.Select
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="">Choose a model</option>
                  <option value="option1">Azure OpenAI</option>
                  <option value="option2">Google Palm</option>
                  <option value="option3">Google Gemini Pro</option>
                  <option value="option2">LIama2</option>
                </Form.Select>
              </Form.Group>
              <br/>

              <Form.Group controlId="fileUpload" className="formgroup">
                <Form.Label>
                  <h5>Upload File</h5>
                </Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <br/>

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Enter any keywords that are relevant to the context of the file:</h5>
                </Form.Label>
                <Form.Control as="textarea" value={textInput} onChange={handleTextContent} />
              </Form.Group>
              <br/>
              
              <h5>Vector Database:</h5>
              <br/>
              <h5>Project Folder:</h5>
              <br/>
              <h5>Files present in Vector Database:</h5>
              <br/>

              <Button variant="light" type="submit">
                Process Files
              </Button> 
            </Form>
          </Col>
          
        
          <Col xs={12} md={6} className="containerBox2"  >
          <h4>Chatbot</h4>
          <br/>
          {/* <h5>Select a model and upload the file. Your output will be displayed here... </h5> */}
          <InputGroup className="mb-3">
        <Form.Control
         type="text"
         value={chatbotSearch}
         onChange={handleSearchChatbottext}
         placeholder="Type your message here"
        />
        <Button variant="primary" id="button-addon2" onClick={handleChatbotSearch}>
          <FaSearch/>
        </Button>
      </InputGroup>

          </Col>
        </Row>
      </Container>
      <Footer/>
      
      </>
    )
}