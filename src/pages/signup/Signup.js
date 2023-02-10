// hooks
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'


export default function Signup() {

  // set initial state for user input
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [hometown, setHometown] = useState('')
  const [status, setStatus] = useState('')

  const { signup, isPending, error } = useSignup()

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, firstName, lastName, age, currentCity, hometown, status)
  }

  return (
    <div className="signup-wrapper">

      <div className="signup-header">
        <h1>Signup</h1>
        <h3>And let the world know what's on your mind...</h3>
      </div>

      <form onSubmit={handleSubmit}>

        <label>
          <span>First Name:</span>
          <input 
              type="text"
              onChange={(e) => {setFirstName(e.target.value)}}
              value={firstName}
              required
          />
        </label>

        <label>
          <span>Last Name:</span>
          <input 
              type="text"
              onChange={(e) => {setLastName(e.target.value)}}
              value={lastName}
              required
          />
        </label>

        <label>
          <span>Age:</span>
          <input 
              type="number"
              onChange={(e) => {setAge(e.target.value)}}
              value={age}
              required
          />
        </label>

        <label>
          <span>Current City:</span>
          <input 
              type="text"
              onChange={(e) => {setCurrentCity(e.target.value)}}
              value={currentCity}
              required
          />
        </label>

        <label>
          <span>Hometown:</span>
          <input 
              type="text"
              onChange={(e) => {setHometown(e.target.value)}}
              value={hometown}
              required
          />
        </label>

        <label>
          <span>Set your Status:</span>
          <input 
              type="text"
              onChange={(e) => {setStatus(e.target.value)}}
              value={status}
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
