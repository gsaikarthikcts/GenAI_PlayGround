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
    <Navbar collapseOnSelect expand="xl" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className='navbartitle' >
          <Image src={CognizantLogo} className='logoimg' alt="Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
          <Nav.Link as={Link} to='/home' className='navbartext1'>Home</Nav.Link>

            <NavDropdown title="LeaderBoard"  className='navbartext' id="collapsible-nav-dropdown" >
              <NavDropdown.Item as={Link} to="/proof_read" disabled>LLM Models(Closed)*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Extract_Product_Attributes" disabled>LLM Models(Open Source)*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/summarize" disabled>SLM(Open Source)*</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Text"  className='navbartext' id="collapsible-nav-dropdown" >
              <NavDropdown.Item as={Link} to="/proof_read">Content Proofread</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Extract_Product_Attributes">Extract Product Attributes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/summarize">Doc Summarize</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/translate">Language Translation</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Semantic Search" className='navbartext' id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/search_chatbot">Chatbot For Knowledge Article</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/semantic_search">Ask Your Own Doc</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/description" disabled>Description*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product_review">Product Review Summary</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/provider_search" disabled>Provider Search*</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Image" className='navbartext' id="collapsible-nav-dropdown">
              <NavDropdown.Item  as={Link} to="/image_text">Image to Text</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/text_image" disabled>Text to Image*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/image_q&a">Q & A On Image</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/describe_image" disabled>Describe Image*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/generate_image" disabled>Generate Image*</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Audio" className='navbartext' id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/audiotranscript" disabled>Audio Transcription*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/callcenteranalytics" disabled>Call Center Analytics*</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Video" className='navbartext' id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/video_subtitles" disabled>Video Subtitles*</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1" disabled>Video Condense*</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" disabled>General Subtitles*</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Agents" className='navbartext' id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" disabled>Agent 1*</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1" disabled>Agent 2*</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Code" className='navbartext' id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/code_optimization">Code Optimization</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/code_review" disabled>Code Review*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/code_analysis" disabled>Code Analysis*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/code_conversion">Code Conversion</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Code_Comment">Code Comment</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Others" className='navbartext custom-dropdown'  id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/manage_vector" disabled>Vector Database Maintenance*</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/folder_maintenance">Project Folder Maintenance</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to='/GenAI_PlayGround' className='navbartext1' >Logout</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )

}