// styles
import { useState } from 'react'
import './EditProfile.css'

// use auth
import { useAuthContext } from '../../hooks/useAuthContext'

export default function EditProfile() {

    const { user } = useAuthContext()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [currentCity, setCurrentCity] = useState('')
    const [hometown, setHometown] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const userObject = {
            firstName,
            lastName,
            age,
            currentCity,
            hometown,
            status,
            userId: user.uid,
            email: user.email,
            friendList: [],
            coverPhotoUrl: "",
            isOnline: true
        }
        console.log(userObject)
    }

  return (
    <div className="signup-wrapper">

        <div className="edit-profile-header-container">
            <h1>Complete your Profile</h1>
            <h3>And other things here</h3>
        </div>

        <div className="main-edit-profile-content-container">
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

                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}
