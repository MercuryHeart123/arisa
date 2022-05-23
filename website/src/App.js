import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Edit from './pages/edit';
import Navbar from './component/navbar';
import Footer from './component/footer';
import React, { useEffect } from 'react'
import NotFound from './pages/NotFound';
import axios from "axios";
import { connect } from "react-redux";


function App(props) {
  useEffect(
    async () => {
      axios.defaults.withCredentials = true;
      axios
        .get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`)
        .then((response) => {
          if (response.data.loggedIn == true) {
            props.dispatch({
              type: "login",
              data: response.data.username,
            });
          }
        });

    }, [])

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/edit' element={<Edit />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};
export default connect(mapStateToProps)(App);