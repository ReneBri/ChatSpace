// hooks
import { useState } from 'react'

// styles
import './Signup.css'


export default function Signup() {

  // set initial state for user input
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Username:</span>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Email:</span>
          <input 
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Password:</span>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button>Signup</button>
      </form>
    </div>
  )
}
