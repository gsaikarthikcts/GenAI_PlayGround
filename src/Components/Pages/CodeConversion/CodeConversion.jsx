import { useState } from "react";
import "./CodeConversion.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import Spinner from "react-bootstrap/Spinner";

export default function CodeConversion() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFromLanguage, setSelectedFromLanguage] = useState("");
  const [selectedToLanguage, setSelectedToLanguage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Convert Code");
  const [conversionSuccess, setConversionSuccess] = useState(false); // New state for success message

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFromLanguage = (e) => {
    setSelectedFromLanguage(e.target.value);
  };

  const handleToLanguage = (e) => {
    setSelectedToLanguage(e.target.value);
  };

  const handleTextContent = (e) => {
    setTextInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setButtonText("Code Converting...");
    setConversionSuccess(false); // Reset success state before starting conversion

    const requestData = {
      model: selectedOption,
      fromLanguage: selectedFromLanguage,
      toLanguage: selectedToLanguage,
      code: textInput,
    };

    try {
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setConvertedCode(data.convertedCode);
        setButtonText("Convert Code");
        setConversionSuccess(true); // Set success state to true
      } else {
        setConvertedCode("An error occurred. Please try again.");
        setButtonText("Convert Code");
      }
    } catch (error) {
      console.error("Error:", error);
      setConvertedCode("An error occurred. Please try again.");
      setButtonText("Convert Code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <h2 className="titleheading">Code Conversion</h2>
      <br />
      <Container className="maincontainer">
        <Row className="rowcontainer">
          <Col xs={12} md={5} className="containerBox1">
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="selectOption" className="formgroup">
                <Form.Label>
                  <h5>Select a Language Model</h5>
                </Form.Label>
                <Form.Select value={selectedOption} onChange={handleOptionChange}>
                  <option value="" disabled>Choose a model</option>
                  <option value="Azure OpenAI">Azure OpenAI</option>
                  <option value="Google Palm" disabled>Google Palm</option>
                  <option value="Google Gemini Pro" disabled>Google Gemini Pro</option>
                  <option value="Llama2" disabled>Llama2</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="selectFromLanguage" className="formgroup">
                <Form.Label>
                  <h5>From Language</h5>
                </Form.Label>
                <Form.Select value={selectedFromLanguage} onChange={handleFromLanguage}>
                  <option value="">Choose a Language</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Swift">Swift</option>
                  <option value="PHP">PHP</option>
                  <option value="Typescript">Typescript</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="selectToLanguage" className="formgroup">
                <Form.Label>
                  <h5>To Language</h5>
                </Form.Label>
                <Form.Select value={selectedToLanguage} onChange={handleToLanguage}>
                  <option value="">Choose a Language</option>
                  <option value="C#">C#</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Swift">Swift</option>
                  <option value="PHP">PHP</option>
                  <option value="Typescript">Typescript</option>
                </Form.Select>
              </Form.Group>
              <br />

              <Form.Group controlId="textcontent" className="formgroup">
                <Form.Label>
                  <h5>Enter your Code:</h5>
                </Form.Label>
                <Form.Control as="textarea" value={textInput} onChange={handleTextContent} />
              </Form.Group>
              <br />
              <br />

              <Button variant="light" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" role="status" size="sm">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    {" "} {buttonText}
                  </>
                ) : (
                  buttonText
                )}
              </Button>
            </Form>
          </Col>

          <Col xs={12} md={6} className="containerBox2">
            <h4>Code Conversion</h4>
            {conversionSuccess && (  // Conditionally render success message
              <h3 className="sts">Code Converted Successfully!!!</h3>
            )}
            <br />
            <pre>{convertedCode || "Select a model, choose the languages & enter your code. Your output will be displayed here..."}</pre>
          </Col>
        </Row>
        <br />
      </Container>
      <Footer />
    </>
  );
}



















// import { useState } from "react";
// import "./CodeConversion.css";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import NavigationBar from "../../NavigationBar/NavigationBar";
// import Footer from "../../Footer/Footer";
// import Spinner from "react-bootstrap/Spinner"; // Import Spinner component
// import { isVisible } from "@testing-library/user-event/dist/utils";

// export default function CodeConversion() {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [selectedFromLanguage, setSelectedFromLanguage] = useState("");
//   const [selectedToLanguage, setSelectedToLanguage] = useState("");
//   const [textInput, setTextInput] = useState("");
//   const [convertedCode, setConvertedCode] = useState("");
//   const [loading, setLoading] = useState(false); // State to manage loading symbol
//   const [buttonText, setButtonText] = useState("Convert Code"); // State to manage button text

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleFromLanguage = (e) => {
//     setSelectedFromLanguage(e.target.value);
//   };

//   const handleToLanguage = (e) => {
//     setSelectedToLanguage(e.target.value);
//   };

//   const handleTextContent = (e) => {
//     setTextInput(e.target.value);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true); // Show loading symbol
//     setButtonText("Code Converting..."); // Change button text to "Code Converting..."

//     const requestData = {
//       model: selectedOption,
//       fromLanguage: selectedFromLanguage,
//       toLanguage: selectedToLanguage,
//       code: textInput,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/convert", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setConvertedCode(data.convertedCode);
//         setButtonText("Code Converted"); // Change button text to "Code Converted"
//       } else {
//         setConvertedCode("An error occurred. Please try again.");
//         setButtonText("Convert Code"); // Reset button text
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setConvertedCode("An error occurred. Please try again.");
//       setButtonText("Convert Code"); // Reset button text
//     } finally {
//       setLoading(false); // Hide loading symbol
//     }
//   };

//   return (
//     <>
//       <NavigationBar />
//       <h2 className="titleheading">Code Conversion</h2>
//       <br />
//       <Container className="maincontainer">
//         <Row className="rowcontainer">
//           <Col xs={12} md={5} className="containerBox1">
//             <Form onSubmit={handleFormSubmit}>
//               <Form.Group controlId="selectOption" className="formgroup">
//                 <Form.Label>
//                   <h5>Select a Language Model</h5>
//                 </Form.Label>
//                 <Form.Select value={selectedOption} onChange={handleOptionChange}>
//                   <option value="" disabled>Choose a model</option>
//                   <option value="Azure OpenAI">Azure OpenAI</option>
//                   <option value="Google Palm" disabled>Google Palm</option>
//                   <option value="Google Gemini Pro" disabled>Google Gemini Pro</option>
//                   <option value="Llama2" disabled>Llama2</option>
//                 </Form.Select>
//               </Form.Group>
//               <br />

//               <Form.Group controlId="selectFromLanguage" className="formgroup">
//                 <Form.Label>
//                   <h5>From Language</h5>
//                 </Form.Label>
//                 <Form.Select value={selectedFromLanguage} onChange={handleFromLanguage}>
//                   <option value="">Choose a Language</option>
//                   <option value="C#">C#</option>
//                   <option value="C++">C++</option>
//                   <option value="Java">Java</option>
//                   <option value="Python">Python</option>
//                   <option value="Javascript">Javascript</option>
//                   <option value="Ruby">Ruby</option>
//                   <option value="Swift">Swift</option>
//                   <option value="PHP">PHP</option>
//                   <option value="Typescript">Typescript</option>
//                 </Form.Select>
//               </Form.Group>
//               <br />

//               <Form.Group controlId="selectToLanguage" className="formgroup">
//                 <Form.Label>
//                   <h5>To Language</h5>
//                 </Form.Label>
//                 <Form.Select value={selectedToLanguage} onChange={handleToLanguage}>
//                   <option value="">Choose a Language</option>
//                   <option value="C#">C#</option>
//                   <option value="C++">C++</option>
//                   <option value="Java">Java</option>
//                   <option value="Python">Python</option>
//                   <option value="Javascript">Javascript</option>
//                   <option value="Ruby">Ruby</option>
//                   <option value="Swift">Swift</option>
//                   <option value="PHP">PHP</option>
//                   <option value="Typescript">Typescript</option>
//                 </Form.Select>
//               </Form.Group>
//               <br />

//               <Form.Group controlId="textcontent" className="formgroup">
//                 <Form.Label>
//                   <h5>Enter your Code:</h5>
//                 </Form.Label>
//                 <Form.Control as="textarea" value={textInput} onChange={handleTextContent} />
//               </Form.Group>
//               <br />
//               <br />

//               <Button variant="light" type="submit" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <Spinner animation="border" role="status" size="sm">  {/* Display loading spinner */}
//                       <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                     {" "} {buttonText}
//                   </>
//                 ) : (
//                   buttonText
//                 )}
//               </Button>
//             </Form>
//           </Col>

//           <Col xs={12} md={6} className="containerBox2">
//             <h4>Code Conversion</h4>
//             <h3 className="sts" hidden>Code Converted Sucssfully!!!</h3>
//             <br/>
//             <pre>{convertedCode || "Select a model, choose the languages & enter your code. Your output will be displayed here..."}</pre>
//           </Col>
//         </Row>
//         <br />
//       </Container>
//       <Footer />
//     </>
//   );
// }