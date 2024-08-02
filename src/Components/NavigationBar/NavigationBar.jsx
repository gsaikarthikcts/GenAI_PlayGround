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
            <NavDropdown.Item as={Link} to="/ssearch">Semantic Search UI</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="">Doc Proofread</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="">Extract Product Attributes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="">Semantic Chatbot</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="summarize">Summarize</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Semantic Search" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/ssearch">Description</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/summary">Product Review Summary</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Image" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Image to Text</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Text to Image</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Image Q&A</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/describe_image">Describe Image</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Audio" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/audiotranscript">Audio Transcription</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/callcenteranalytics">Call Center Analytics</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Video" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Video Condense</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">General Subtitles</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Others" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Vector Database Maintenance</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Project Folder Maintenance</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Agents" className='navbartext' id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Agent 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Agent 2</NavDropdown.Item>
          </NavDropdown>

          

          <Nav.Link as={Link} to='/gen_ai' className='navbartext1' >Logout</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    )

}