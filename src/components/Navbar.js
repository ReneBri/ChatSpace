// styles
import './Navbar.css'

// context
import { useAuthContext } from '../hooks/useAuthContext'

// hooks
import { useLogout } from '../hooks/useLogout'

// components
import { NavLink, Link } from 'react-router-dom'


export default function Navbar() {

    const { user } = useAuthContext()
    const { logout } = useLogout()

  return (
    <div className="nav-bar">
        <nav>
            <Link to="/"><h3>ChatSpace</h3></Link>
            <ul>
                {!user && 
                <>
                  <li><NavLink to="/signup">Signup</NavLink></li>
                  <li><NavLink to="/login">Login</NavLink></li>
                </>}
                {user &&
                <>
                  <li>Hello, {user.firstName}</li>
                  <li onClick={logout}><a href="#">Logout</a></li>
                </>}
            </ul>
        </nav>
    </div>
  )
}
