import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Edit from './pages/edit';
import Navbar from './component/navbar';
import Footer from './component/footer';
import React, { useEffect } from 'react'


function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit' element={<Edit />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
