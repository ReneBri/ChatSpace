// hooks
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'


export default function Signup() {

  // set initial state for user input
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signup, isPending, error } = useSignup()

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, username)
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-header">
        <h1>Signup</h1>
        <h3>And let the world know what's on your mind...</h3>
      </div>
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

        {!isPending && <button>Signup</button>}
        {isPending && <button disabled>loading...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}
