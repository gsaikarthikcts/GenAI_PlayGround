import "./Home.css";
import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar"
import Footer from "../Footer/Footer"
import robot from "../Images/Picture2.jpg"
import Image from 'react-bootstrap/Image';

export default function Home() {
  return (

    <div>
    <NavigationBar/>
      
      
      <h2 className="heading1">Welcome to GenAI Playground!</h2>
      <div className="content">
        <Image src={robot} className='robotimg' alt="Robot"/>
      </div>
      <Footer/>
      </div>
      
      
  );
 
}
