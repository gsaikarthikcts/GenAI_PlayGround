import { useState } from "react";
import "./Summarize.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
export default function Summarize(){
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedchainType, setSelectedchainType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    };

    const handlechainType = (e) => {
        setSelectedchainType(e.target.value);
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
      <h2 className="titleheading">Summarize Documents</h2>
      <br></br>
      <Container>
        <Row>
          <Col  className="containerBox1" sm={6} >
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h4>Select a Language Model</h4>
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

              <Form.Group controlId="selectedchainType" >
                <Form.Label>
                  <h4>Choose Chain Type</h4>
                </Form.Label>
                <Form.Select
                  value={selectedchainType}
                  onChange={handlechainType}
                >
                  <option value="">Choose chain type</option>
                  <option value="option1">Auto</option>
                  <option value="option1">Stuff</option>
                  <option value="option1">Map Reduce</option>
                  <option value="option1">Refine</option>


                </Form.Select>
              </Form.Group>
              <br></br>

              <Form.Group controlId="fileUpload" className="formgroup">
                <Form.Label>
                  <h4>Upload File</h4>
                </Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <br></br>

              <Button variant="light" type="submit">
                Upload
              </Button> 
            </Form>
          </Col>
          <Col sm={6} ></Col>
        </Row>
      </Container>
    </>
    )
}