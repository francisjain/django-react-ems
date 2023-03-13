import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Department from './Department';
import Employee from './Employee';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
 
 <Router>
  <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
         
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
