import React from 'react';
import {BrowserRouter as Router, Routes,  Route } from "react-router-dom"
import { Chat } from './Components/Chat';
import { Home } from './Components/Home';

const App = () => {
    return (
      <Router>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/chat" element={<Chat/>} />
        </Routes>
      </Router>
    );
  }
export default App;
