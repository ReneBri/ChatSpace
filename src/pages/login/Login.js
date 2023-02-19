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

  const handleSignInAsAvatar = (inputEmail) => {
    setEmail(inputEmail)
    setPassword(inputEmail)
    setTimeout(() => {
      login(inputEmail, inputEmail)
    }, 750)
    

  }

  return (
    <div className="login-wrapper signup-wrapper">

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
        {error && <p>{error.message}</p>}

      </form>

      
      <div className="avatar-container">
        <h2> Orrrr </h2>
        <h3>Sign-in as a guest by clicking on one of these names</h3>
        <button onClick={(e) => handleSignInAsAvatar('daisie@daisie.com')}>Daisie</button>
        <button onClick={(e) => handleSignInAsAvatar('Francheskia@Francheskia.com')}>Francheskia</button>
        <button onClick={(e) => handleSignInAsAvatar('anni@anni.com')}>Anni</button>
        <button onClick={(e) => handleSignInAsAvatar('Bobby@bobby.com')}>Bobby Lee</button>
        <button onClick={(e) => handleSignInAsAvatar('ben@ben.com')}>Ben</button>
        <button onClick={(e) => handleSignInAsAvatar('Rebecca@Rebecca.com')}>Rebecca</button>
        <button onClick={(e) => handleSignInAsAvatar('tim@tim.com')}>Tim</button>
      </div>
    </div>
  )
}