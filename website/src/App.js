import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import Edit from './pages/edit/';
import Navbar from './component/navbar';
import Footer from './component/footer';
import React, { useEffect, useState } from 'react'
import NotFound from './pages/NotFound';
import axios from "axios";
import { connect } from "react-redux";
import Graphic from './pages/graphic-design';
import Interior from './pages/interior-design';
import View from './pages/view';


function App(props) {
  const [allProject, setAllProject] = useState()

  useEffect(
    async () => {
      let ip = process.env.REACT_APP_IP || "localhost";
      let port = process.env.REACT_APP_PORT || 8080;
      const url = `${ip}:${port}/`;

      axios.defaults.withCredentials = true;

      axios
        .get(`${url + 'login'}`)
        .then((response) => {
          if (response.data.loggedIn == true) {
            let username = response.data.username
            let admin = response.data.admin
            console.log(username, admin);
            props.dispatch({
              type: "login",
              data: { username, admin }
            });
          }
        });

      axios
        .get(`${url + 'image/list/all-project'}`)
        .then((response) => {
          let data = response.data
          setAllProject(data)
        })
    }, [])

  const createEachProjectRoute = () => {
    return allProject.map((item, index) => {
      let urlEncoded = encodeURI(item.name);
      return <Route path={'/view/' + urlEncoded} key={index} element={<View data={item} />} />
    })
  }

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/graphic-design' element={<Graphic />} />
          <Route path='/interior-design' element={<Interior />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {props.admin && <Route path='/edit' element={<Edit />} />}
          {allProject && createEachProjectRoute()}
          <Route exact path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    admin: state.user.admin,
  };
};
export default connect(mapStateToProps)(App);