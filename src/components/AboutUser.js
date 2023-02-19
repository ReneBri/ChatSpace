// styles
import './AboutUser.css'

// hooks
import { useState } from 'react'


export default function AboutUser({ userProfile }) {

   const [aboutOptions, setAboutOptions] = useState('about')


  return (
    <div className="about-user-main-wrapper">
        <div className="about-user-options">
            <p 
                onClick={() => setAboutOptions('about')}
                className={aboutOptions === 'about' ? "active" : ""}
                >About
            </p>
            <p 
                onClick={() => setAboutOptions('general')}
                className={aboutOptions === 'general' ? "active" : ""}
                >General Info
            </p>
        </div>
        <div className="about-user-content">
            {aboutOptions === "about" && <p>{userProfile.about}</p>}
            {aboutOptions === "general" && 
                <ul>
                    <li>Name: {userProfile.firstName}</li>
                    <li>Age: {userProfile.age}</li>
                    <li>Hometown: {userProfile.hometown}</li>
                    <li>Current City: {userProfile.currentCity}</li>
                </ul>}
        </div>
    </div>
  )
}
