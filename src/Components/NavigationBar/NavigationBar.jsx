import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import CognizantLogo from '../Images/Cognizant-Logo.png'
import Image from 'react-bootstrap/Image';
export default function NavigationBar(){
    return(
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home" className='navbartitle' >
      <Image src={CognizantLogo} className='logoimg' alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          
        </Nav>
        <Nav>
        <Nav.Link as={Link} to='/home' className='navbartext1'>Home</Nav.Link>

        <NavDropdown title="Text"  className='navbartext' id="collapsible-nav-dropdown" >
            <NavDropdown.Item as={Link} to="/semantic_search">Semantic Search UI</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/proof_read">Doc Proofread</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="">Extract Product Attributes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="">Semantic Chatbot</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/summarize">Summarize</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Semantic Search" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/description">Description</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/product_review">Product Review Summary</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/provider_search">Provider Search</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Image" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item  as={Link} to="/image_text">Image to Text</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/text_image">Text to Image</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/image_q&a">Image Q&A</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/describe_image">Describe Image</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/generate_image">Generate Image</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Audio" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/audiotranscript">Audio Transcription</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/callcenteranalytics">Call Center Analytics</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Video" className='navbartext' id="collapsible-nav-dropdown">
          <NavDropdown.Item as={Link} to="/video_subtitles">Video Subtitles</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Video Condense</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">General Subtitles</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Agents" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Agent 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Agent 2</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Code" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/code_optimization">Code Optimization</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/code_review">Code Review</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/code_analysis">Code Analysis</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/code_conversion">Code Conversion</NavDropdown.Item>


          </NavDropdown>

          <NavDropdown title="Others" className='navbartext custom-dropdown'  id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/manage_vector">Vector Database Maintenance</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/folder_maintenance">Project Folder Maintenance</NavDropdown.Item>
          </NavDropdown>

          

          

          <Nav.Link as={Link} to='/gen_ai' className='navbartext1' >Logout</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    )

}