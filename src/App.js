import React, { useEffect } from 'react';
import Navbar from './navBar';
import MyForm from './form';
import 'chart.js';
import './App.css';




function App() {
  useEffect(() => {
    document.title = "Dive into your stock options";
  }, []);
  return (
    <div className="App">
      <Navbar />
      <MyForm />
    </div>
  );
}
export default App;