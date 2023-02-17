// styles 
import './Home.css'

// context
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ExploreUsers from '../../components/ExploreUsers'
import PostNewsUpdate from '../../components/PostNewsUpdate'
import NewsfeedPosts from '../../components/NewsfeedPosts'
import FriendList from '../../components/FriendList'


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
