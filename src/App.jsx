import React from 'react';
import './App.css';
import Category from './components/Category/Category';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Category></Category>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
