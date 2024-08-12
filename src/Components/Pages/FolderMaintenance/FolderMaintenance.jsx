import { useState } from "react"; 
import "./FolderMaintenance.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

export default function FolderMaintenance() {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([
    "file1.txt",
    "file2.jpg",
    "file3.pdf",
    "file4.docx",
  ]);
  const [newFile, setNewFile] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddFile = () => {
    if (newFile && !files.includes(newFile)) {
      setFiles([...files, newFile]);
      setNewFile("");
    }
  };

  const handleCreateButton = () => {
    handleShow();
  };

  const handleDeleteFile = (fileToDelete) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  const handleSearch = () => {
    const result = files.find((file) => file.toLowerCase() === searchTerm.toLowerCase());
    setSearchResult(result || "File not found");
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Project Folder Maintenance</h2>
      <br />
      <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col className="containerBox1">
            <Form>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h5>User ID: User1 {}</h5>
                </Form.Label>
              </Form.Group>
             
              <Form.Group controlId="searchBox" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search for a file"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
              <Button variant="light" onClick={handleSearch}>
                Find
              </Button>
              

              {/* Display Search Result */}
              {searchResult && (
                <div className="search-result mt-3">
                  <h5>Search Result: {searchResult}</h5>
                </div>
              )}
              

              <div className="button-group mt-3">
                <Button variant="light" onClick={handleCreateButton}>
                  Create Project
                </Button>
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form controlId="formFileName">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Create a New Project</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter file name"
                          value={newFile}
                          onChange={(e) => setNewFile(e.target.value)}
                          autoFocus
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleAddFile();
                        handleClose();
                      }}
                    >
                      Create
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button variant="light" onClick={() => console.log(files)}>
                  List Projects
                </Button>
              </div>
            </Form>

            <ListGroup className="mt-3">
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

