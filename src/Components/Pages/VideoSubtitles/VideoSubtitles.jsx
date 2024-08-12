import { useState } from "react";
import "./VideoSubtitles.css"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer"

export default function VideoSubtitles(){
    const [videoUrl, setVideoUrl] = useState('');
    const [uploadedVideo, setUploadedVideo] = useState(null);
    
    const handleUrlChange = (e) => {
        setVideoUrl(e.target.value);
        };
        
        const handleFileUpload = (e) => {
        setUploadedVideo(URL.createObjectURL(e.target.files[0]));
        };
        
        const handleSubmit = (e) => {
        e.preventDefault();
        };

        const extractYouTubeVideoID = (url) => {
            const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
            const match = url.match(regex);
            return match ? match[1] : null;
            };
    return(
        <>
        <NavigationBar/>
          <h2 className="titleheading">Generate Subtitles for Video</h2>
          <br></br>
          <Container className="maincontainer">
            <Row className="rowcontainer">
              <Col xs={12} md={5} className="containerBox1  ">
                <Form onSubmit={handleSubmit}>
    
                  <Form.Group controlId="textcontent" className="formgroup">
                    <Form.Label>
                      <h5>Enter YouTube URL</h5>
                    </Form.Label>
                    <Form.Control type="url" value={videoUrl} onChange={handleUrlChange} />
                  </Form.Group>
                  <br></br>


                  <Form.Group controlId="fileUpload" className="formgroup">
                <Form.Label>
                  <h5>Upload Video File</h5>
                </Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
              <br></br>
                  
                  <br></br>
    
                  <Button variant="light" type="submit">
                    Submit
                  </Button>
                </Form>

                <div className="mt-4">
{videoUrl && (
<div>
<h5>Preview from YouTube:</h5>

<iframe
className="videoUrl"
src={`https://www.youtube.com/embed/${extractYouTubeVideoID(videoUrl)}`}
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
></iframe>

</div>
)}

{uploadedVideo && (
<div className="mt-4">
<h5>Preview from Uploaded Video:</h5>
<video width="560" height="315" controls>
<source src={uploadedVideo} type="video/mp4" />
Your browser does not support the video tag.
</video>
</div>
)}
</div>
              </Col>
    
              <Col xs={12} md={6} className="containerBox2">
                <h4>Subtitle</h4>
                <br></br>
                <h5>
                  Provide the url or upload the file. Your output will be displayed
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