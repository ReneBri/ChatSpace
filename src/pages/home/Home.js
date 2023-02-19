// styles 
import './Home.css'

// context
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ExploreUsers from '../../components/ExploreUsers'
import PostNewsUpdate from '../../components/PostNewsUpdate'
import NewsfeedPosts from '../../components/NewsfeedPosts'
import FriendList from '../../components/FriendList'
import { useFirestore } from '../../hooks/useFirestore'
import { useState } from 'react'


export default function Home() {

  const { user, dispatch } = useAuthContext()

  const { error, updateStatus } = useFirestore('userProfiles')

  const [status, setStatus] = useState('')

  const handleStatusSubmit = async (e) => {
    e.preventDefault()
    await updateStatus(user.userId, status)
    user.status = status
    dispatch({ type: 'UPDATE_STATUS', payload: user})
    setStatus('')
  }


  return (
    <div className="main-wrapper">

      <div className="welcome-container">
        <div className="welcome-content-wrapper">
          <div className="welcome-content-text-wrapper">
            <h1>Welcome Back, {user.firstName}!</h1>
            <h3>Pssst, we've missed you!</h3>
          </div>
          <img className="bg-img" src="/spaceman-logo.png"/>
        </div>
        <div className="status-container">
        <p>Your status is set to: <i>{user.status}</i></p>
          <form onSubmit={handleStatusSubmit}>
              <input 
                type="text"
                onChange={(e) =>{
                  setStatus(e.target.value)}}
                value={status} 
                required
                maxLength="10"
                size="10"
                />
              <button className="status-btn">update status</button>
            </form>
          </div>
      </div>

      <div className="main-content-container">

        <div className="explore-users-container">
          <ExploreUsers />
        </div>

        <div className="news-feed-container">
          <div className="newsfeed-header">
            <p>Newsfeed</p>
          </div>
          <PostNewsUpdate />
          <NewsfeedPosts collection='newsfeedPosts' query={null} orderBy={["createdAt", "desc"]} />
        </div>

        <div className="friends-list-container">
          <div className="explore-users-header">
            <p>Your Friends</p>
          </div>
          <FriendList databaseQuery="userId" dbq2="in" dbq3={user.friendList}/>
        </div>
        
      </div>
    </div>
  )
}
