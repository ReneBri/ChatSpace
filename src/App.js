import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css';

// components
import Navbar from './components/Navbar'

// routes
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/edit-profile/EditProfile'

// context
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">

      {/* stops loading until firebase has checked if there is a user logged in */}
      {authIsReady && ( 
      <BrowserRouter>

      <Navbar />

        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/userProfile/:profileUrl" element={!user ? <Login /> : <Profile />} />
          <Route path="/edit-profile" element={user ? <EditProfile /> : <Navigate to="/login" />} />
        </Routes>

      </BrowserRouter>
      )}

    </div>
  );
}

export default App;
