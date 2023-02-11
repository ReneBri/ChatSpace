// styles
import './PostNewsUpdate.css'

// hooks
import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'

// context
import { useAuthContext } from '../hooks/useAuthContext'

// config
import { timestamp } from '../config/config'


export default function PostNewsUpdate() {

  const [newsUpdate, setNewsUpdate] = useState('')

  const { isPending, error, addDocument } = useFirestore('newsfeedPosts')

  const { user } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const postObject = {
        content: newsUpdate,
        posterName: `${user.firstName} ${user.lastName}`,
        posterId: user.uid,
        createdAt: timestamp.fromDate(new Date())
    }

    addDocument(postObject)
      .then(() => {
        setNewsUpdate('')
      })

  }


  return (
    <div className="news-update-wrapper">
        <form onSubmit={handleSubmit}>
            <textarea 
                onChange={(e) => setNewsUpdate(e.target.value)}
                value={newsUpdate}
                rows="6"
                placeholder="What's on your mind?"
                required
            />
            <button>Submit</button>
        </form>
    </div>
  )
}
