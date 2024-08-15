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
import GenerateImage from "./Components/Pages/GenerateImage/GenerateImage"
import VectorDatabase from "./Components/Pages/VectorDatabase/VectorDatabase";
import ImageQA from "./Components/Pages/ImageQA/ImageQA";
import CodeOptimization from "./Components/Pages/CodeOptimization/CodeOptimization";
import CodeReview from "./Components/Pages/CodeReview/CodeReview";
import CodeAnalysis from "./Components/Pages/CodeAnalysis/CodeAnalysis";
import CodeConversion from "./Components/Pages/CodeConversion/CodeConversion";
import ImageText from "./Components/Pages/ImageText/ImageText";
import TextImage from "./Components/Pages/TextImage/TextImage";
import ProductReview from "./Components/Pages/ProductReview/ProductReview";
import FolderMaintenance from "./Components/Pages/FolderMaintenance/FolderMaintenance";
import ManageVector from "./Components/Pages/ManageVector/ManageVector";
import ProofRead from "./Components/Pages/ProofRead/ProofRead";
import ProviderSearch from "./Components/Pages/ProviderSearch/ProviderSearch";
import VideoSubtitles from "./Components/Pages/VideoSubtitles/VideoSubtitles";
import Translate from "./Components/Pages/Translate/Translate";
import SearchChatbot from "./Components/Pages/SearchChatbot/SearchChatbot";


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
        <Route exact path="/semantic_search" element={<SemanticSearch/>} />
        <Route exact path="/summarize" element={<Summarize/>} />
        <Route exact path="/audiotranscript" element={<AudioTranscription/>} />
        <Route exact path="/callcenteranalytics" element={<CallCenterAnalytics/>} />
        <Route exact path="/describe_image" element={<DescribeImage/>} />
        <Route exact path="/generate_image" element={<GenerateImage/>} />
        <Route exact path="/vector_database" element={<VectorDatabase/>} />
        <Route exact path="/image_q&a" element={<ImageQA/>} />
        <Route exact path="/code_optimization" element={<CodeOptimization/>} />
        <Route exact path="/code_review" element={<CodeReview/>} />
        <Route exact path="/code_analysis" element={<CodeAnalysis/>} />
        <Route exact path="/code_conversion" element={<CodeConversion/>} />
        <Route exact path="/image_text" element={<ImageText/>} />
        <Route exact path="/text_image" element={<TextImage/>} />
        <Route exact path="/product_review" element={<ProductReview/>} />
        <Route exact path="/folder_maintenance" element={<FolderMaintenance/>} />
        <Route exact path="/manage_vector" element={<ManageVector/>} />
        <Route exact path="/proof_read" element={<ProofRead/>} />
        <Route exact path="/provider_search" element={<ProviderSearch/>} />
        <Route exact path="/video_subtitles" element={<VideoSubtitles/>} />
        <Route exact path="/translate" element={<Translate/>} />
        <Route exact path="/search_chatbot" element={<SearchChatbot/>} />
        



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
