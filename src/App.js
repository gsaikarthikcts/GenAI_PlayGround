import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from './Components/Home/Home';
// import NavigationBar from "./Components/NavigationBar/NavigationBar";
import SemanticSearch from "./Components/Pages/SemanticSearch/SemanticSearch";
// import Footer from "./Components/Footer/Footer";
import Summarize from "./Components/Pages/Summarize/Summarize";
import AudioTranscription from "./Components/Pages/AudioTranscription/AudioTranscription";
import CallCenterAnalytics from "./Components/Pages/CallCenterAnalytics/CallCenterAnalytics";
import DescribeImage from "./Components/Pages/DescribeImage/DescribeImage";


function App() {
  return (
    <>
      <div className="watermark"></div>
      <div className="content">
      <BrowserRouter>
      {/* <ConditionalHeader/> */}
      <Routes>
        <Route exact path="/gen_ai" element={<Login />} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/ssearch" element={<SemanticSearch/>} />
        <Route exact path="/summarize" element={<Summarize/>} />
        <Route exact path="/audiotranscript" element={<AudioTranscription/>} />
        <Route exact path="/callcenteranalytics" element={<CallCenterAnalytics/>} />
        <Route exact path="/describe_image" element={<DescribeImage/>} />
      </Routes>
      {/* <ConditionalFooter/> */}
    </BrowserRouter>
        
      </div>
    </>
  );
}

// function ConditionalHeader(){
//   const location= useLocation();
//   const hideNavbarPaths=['/gen_ai']
//   return !hideNavbarPaths.includes(location.pathname)?<NavigationBar/> :null;
// }

// function ConditionalFooter(){
//   const location= useLocation();
//   const hideNavbarPaths=['/gen_ai']
//   return !hideNavbarPaths.includes(location.pathname)?<Footer/> :null;
// }

export default App;
