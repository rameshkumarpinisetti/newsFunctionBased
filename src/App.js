import './App.css';
import LoadingBar from "react-top-loading-bar";
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = ()=> {
  const pageSize = 6;
  const country = 'us'
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);
 

  return (
    <div>
      <Router>
      <NavBar />
      <LoadingBar
      height={3}
      color="#f11946"
      progress={progress}
    />
      <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} apiKey={apiKey}  category='general' country={country}/>} />
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} apiKey={apiKey}  category='business'/>} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} apiKey={apiKey}  category='entertainment'/>} />
            <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} apiKey={apiKey}  category='general'/>} />
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} apiKey={apiKey}  category='health'/>} />
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} apiKey={apiKey}  category='science'/>} />
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} apiKey={apiKey}  category='sports'/>} />
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} apiKey={apiKey}  category='technology'/>} />
          </Routes>
      </Router>
    </div>
  )
}

export default App;