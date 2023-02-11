// styles 
import './Home.css'

// context
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ExploreUsers from '../../components/ExploreUsers'
import PostNewsUpdate from '../../components/PostNewsUpdate'


export default function Home() {

  const { user } = useAuthContext()


  return (
    <div className="main-wrapper">

      <div className="welcome-container">
        <h1>Welcome Back, {user.firstName}</h1>
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
        </div>
        <div className="friends-list-container">
          
        </div>
      </div>
    </div>
  )
}
