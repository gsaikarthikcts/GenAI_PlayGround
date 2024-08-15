import { useState } from "react"; 
import "./ManageVector.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";

export default function ManageVector() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [files, setFiles] = useState([
    "file1.txt",
    "file2.jpg",
    "file3.pdf",
    "file4.docx",
  ]);

  const handleDeleteFile = (fileToDelete) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDatabaseChange = (e) => {
    setSelectedDatabase(e.target.value);
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Vector Database Maintenance</h2>
      <br />
      <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col className="containerBox1">
            <Form>
            <Form.Label>
                  <h5>User ID: User1 {}</h5>
                </Form.Label>
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
                </Form.Select>
              </Form.Group> 
              <br/>


              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h5>Select a Vector Database</h5>
                </Form.Label>
                <Form.Select
                  value={selectedDatabase}
                  onChange={handleDatabaseChange}
                >
                  <option value="">Choose a database</option>
                  <option value="option1">FAISS</option>
                  <option value="option2">Demo Database</option>
                </Form.Select>
              </Form.Group>
              <br/>
              <br/>

             <Button variant="light">Fetch Files</Button>


             

              
            </Form>


            
            <ListGroup className="mt-5">
            <h4>Files contained within the Vector Database:</h4>
              {files.map((file, index) => (
                <ListGroup.Item key={index} className="listgroupitem-section">
                  {file}
                  <Button
                    variant="danger"
                    className="delete-button"
                    onClick={() => handleDeleteFile(file)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <br />
      </Container>
      <Footer />
    </>
  );
}

