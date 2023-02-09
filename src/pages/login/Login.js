// hooks
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'


export default function Login() {

  // set initial state for user input
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, isPending, error } = useLogin()

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="login-wrapper">

      <div className="login-header">
        <h1>Login</h1>
        <h3>And let the world know what's on your mind...</h3>
      </div>

      <form onSubmit={handleSubmit}>

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

        {!isPending && <button>Login</button>}
        {isPending && <button disabled>loading...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}