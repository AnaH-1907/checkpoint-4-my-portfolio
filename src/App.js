import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <div className='App'>
        <Router>
          <div className='App'>
            <Navbar />
            <Main />
            <Footer />
          </div>
      </Router>
    </div>
  );
};

export default App;
