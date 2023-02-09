// styles
import './Navbar.css'

// context
import { useAuthContext } from '../hooks/useAuthContext'

// hooks
import { useLogout } from '../hooks/useLogout'

// components
import { NavLink } from 'react-router-dom'


export default function Navbar() {

    const { user } = useAuthContext()
    const { logout } = useLogout()

  return (
    <div className="nav-bar">
        <nav>
            <h3>Twitter</h3>
            <ul>
                {!user && 
                <>
                  <li><NavLink to="/signup">Signup</NavLink></li>
                  <li><NavLink to="/login">Login</NavLink></li>
                </>}
                {user &&
                <>
                  <li>hello, {user.displayName}</li>
                  <li onClick={logout}><a href="#">Logout</a></li>
                </>}
            </ul>
        </nav>
    </div>
  )
}
