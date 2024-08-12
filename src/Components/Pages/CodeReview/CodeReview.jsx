import { useState } from "react";
import "./CodeReview.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer"

export default function CodeReview(){
    const [selectedOption, setSelectedOption] = useState("");
    const [textInput, settextInput] = useState("");

  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTextContent = (e) => {
    settextInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Selected Option:", selectedOption);
   
    // Reset form fields if needed
  };
  
    return(
        <>
        <NavigationBar/>
          <h2 className="titleheading">Code Review</h2>
          <br></br>
          <Container className="maincontainer">
            <Row className="rowcontainer">
              <Col xs={12} md={5} className="containerBox1  ">
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
                  <br></br>
    
    
                  <Form.Group controlId="textcontent" className="formgroup">
                    <Form.Label>
                      <h5> Enter your Code:</h5>
                    </Form.Label>
                    <Form.Control as="textarea" value={textInput} onChange={handleTextContent} />
                  </Form.Group>
                  <br></br><br></br>
    
                  <Button variant="light" type="submit">
                    Optimize
                  </Button>
                </Form>
              </Col>
    
              <Col xs={12} md={6} className="containerBox2">
                <h4>Code Review</h4>
                <br></br>
                <h5>
                  Select a model and enter your code. Your output will be displayed
                  here...{" "}
                </h5>
              </Col>
            </Row>
            <br></br>
    
          </Container>
          <Footer/>
        </>

    )
}