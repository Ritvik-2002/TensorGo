import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './SigninSignup/Signin';
import Signup from './SigninSignup/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
