import { useState } from "react";
import "./CallCenterAnalytics.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer"

export default function CallCenterAnalytics(){
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectAudioOption, setselectAudioOption] = useState("");

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };

    const handleAudioChange = (e) => {
        setselectAudioOption(e.target.value);
      };
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

 
  
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
        <h2 className="titleheading">Call Center Analytics</h2>
        <br></br>
        <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col  xs={12} md={5}  className="containerBox1  "  >
            <Form onSubmit={handleFormSubmit}>

            <Form.Group controlId="fileUpload" className="formgroup">
                <Form.Label>
                  <h5>Upload File</h5>
                </Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <br></br>


              <Form.Group controlId="selectOptionAudio" className="formgroup">
                <Form.Label>
                  <h5>Choose Method for Audio Transcription:</h5>
                </Form.Label>
                <Form.Select
                  value={selectAudioOption}
                  onChange={handleAudioChange}
                >
                  <option value="">Choose a method</option>
                  <option value="option1">Option A</option>
                  <option value="option2">Option B</option>
                  <option value="option3">Option C </option>
                  <option value="option2">Option D</option>
                </Form.Select>
              </Form.Group>
              <br></br>

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
              <br></br>


             

           


              <Button variant="light" type="submit">
                Upload
              </Button> 
            </Form>
          </Col>
          
        
          <Col xs={12} md={6} className="containerBox2"  >
          <h4>Call Transcript:</h4>
          <br></br>
          <h5>Select a model and upload the file. Your output will be displayed here... </h5>
         
          </Col>
        </Row>
        <br></br>

        <Row className="rowcontainer2">
        <Col xs={12} md={11} className="containerBox1 "  >
          <h4>Sentiment Analysis Output:</h4>
          <br></br>
          <h5>Call Intent:</h5>
          <p className="paragraphtext">Select a model and upload the file. Your output will be displayed here... </p>
         
          <br></br>
          <h5>Call Sentiment:</h5>
          <p className="paragraphtext">Select a model and upload the file. Your output will be displayed here... </p>

          <br></br>
          <h5>After Call Summary Notes:</h5>
          <p className="paragraphtext">Select a model and upload the file. Your output will be displayed here... </p>
          </Col>
        </Row>
      </Container>
      <Footer/>
      </>
    )
}