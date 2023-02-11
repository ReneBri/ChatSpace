// styles
import './Profile.css'

// hooks
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// config
import { projectFirestore } from '../../config/config'


export default function Profile() {

  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [isCancelled, setIsCancelled] = useState(false)

  const fetchProfile = async (profileUrl) => {
    setIsLoading(true)
    setError(null)

    try{
      let profile = {}
      const snapshot = await projectFirestore.collection('userProfiles').where("userProfileUrl", "==", profileUrl).get()
      snapshot.forEach((doc) => {
        profile = {...doc.data()}
      })
      if (!isCancelled){
        setUserProfile(profile)
        setIsLoading(false)
        setError(null)
      }
      
    }
    catch (err) {
      if (!isCancelled){
        setIsLoading(false)
        setError(err.message)
      }
    }

    return () => setIsCancelled(true)
  }

  useEffect(() => {
    fetchProfile(params.profileUrl)
  }, [])
  
  console.log(userProfile)

  return (
    <div>
      {error && <h1>{error}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {userProfile && 
      <h1>{userProfile.firstName} {userProfile.lastName}</h1>}
    </div>
  )
}

