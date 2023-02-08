import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';

// components
import Navbar from './components/Navbar'

// routes
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
