import { useState } from "react";
import "./Translate.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer"

export default function Translate(){
    const [selectedOption, setSelectedOption] = useState("");
    const [sourceLanguage, setSourceLanguage] =useState("")
    const [targetLanguage, setTargetLanguage] =useState("")
   
    const [textInput, settextInput] = useState("");
  
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
      settextInput(e.target.value);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log("Selected Option:", selectedOption);
    };
    return(
        <>
        <NavigationBar/>
        <h2 className="titleheading">Translate from One Language to Another</h2>
        <br/>
        <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col  xs={12} md={5}  className="containerBox1  "  >
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
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

              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h5>Select Source Language:</h5>
                </Form.Label>
                <Form.Select
                  value={sourceLanguage}
                  onChange={handleSourceLanguage}
                >
                  <option value="">Choose a Language</option>
                  <option value="option1">English</option>
                  <option value="option2">Tamil</option>
                  <option value="option3">Spanish</option>
                
                 
                </Form.Select>
              </Form.Group>
              <br/>

              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h5>Select Target Language:</h5>
                </Form.Label>
                <Form.Select
                  value={targetLanguage}
                  onChange={handleTargetLanguage}
                >
                  <option value="">Choose a Language</option>
                  <option value="option1">English</option>
                  <option value="option2">Tamil</option>
                  <option value="option3">Spanish</option>
                  
                </Form.Select>
              </Form.Group>
              <br/>

             

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Enter text for Translation</h5>
                </Form.Label>
                <Form.Control as="textarea" value={textInput} onChange={handleTextContent} />
              </Form.Group>
              <br/><br/>

              <Button variant="light" type="submit">
                Submit
              </Button> 
            </Form>
          </Col>
          
        
          <Col xs={12} md={6} className="containerBox2"  >
          <h4>Translation</h4>
          <br/>
          <h5>Select a model, source & target languages and enter the text for Translation. Your output will be displayed here... </h5>
         
          </Col>
        </Row>
      </Container>
      <Footer/>
      
      </>
    )
}