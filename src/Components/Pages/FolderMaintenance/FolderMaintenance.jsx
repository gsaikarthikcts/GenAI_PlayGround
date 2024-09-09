import { useState, useEffect } from "react";
import "./FolderMaintenance.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";

export default function FolderMaintenance() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  // Fetch files from the backend
  const fetchFiles = () => {
    fetch('http://localhost:5000/files')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFiles(data);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        setError("There was an error fetching the files!");
        console.error("Fetch error:", error);
      });
  };

  // Fetch files when the component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file deletion
  const handleDeleteFile = (fileToDelete) => {
    fetch('http://localhost:5000/delete-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_name: fileToDelete }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setFiles(files.filter((file) => file !== fileToDelete));
      })
      .catch(error => {
        setError("There was an error deleting the file!");
        console.error("Delete error:", error);
      });
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Project Folder Maintenance</h2>
      <br />
      <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col className="containerBox1">
            <div className="button-group mt-3">
              <Button variant="light" onClick={fetchFiles}>
                Refresh
              </Button>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <ListGroup className="mt-3">
              {files.length > 0 ? (
                files.map((file, index) => (
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
                ))
              ) : (
                <ListGroup.Item>No files found</ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
        <br />
      </Container>
      <Footer />
    </>
  );
}