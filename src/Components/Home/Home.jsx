import "./Home.css";
import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar"
import Footer from "../Footer/Footer"
export default function Home() {
  return (

    <div>
    <NavigationBar/>
      
      
      <h2 className="heading1">Welcome to GenAI Playground!</h2>
      <div className="content"></div>
      <Footer/>
      </div>
      
      
  );
 
}
